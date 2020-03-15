---
title: FFI
permalink: /ffi.html
tags: ffi
category: Programming
date: 2018-07-17
---

# FFI

[[toc]]

## Context

C function parameter types and return type are nowhere in compiled shared dynamic library. Some other programs may not know what arguments are to be passed to a function in this program.

In Python, we can dynamically load a dynamic library, resolve FuncPointers by symbols of functions and even call it. The only problem is that the program would crash without the right parameters passing into functions.

```python
>>> import ctypes
>>> libc = ctypes.CDLL('libc.dylib')
>>> libc.atoi
<_FuncPtr object at 0x100a509a8>
>>> libc.atoi("1")
1
>>> libc.atoi(1)
[1]    47162 segmentation fault  python
```

The reason is simple. Everything in the dynamic library is machine instruction. We have registers like `%esi`, `%xmm0` in dynamic library, but no `const point_t* p1, const point_t* p2` at all.

[img[ffi-after-dlopen.jpg]]

It's easy to know such information in C by sharing header file definition, but calling it in another language might seems a big challenge.

FFI is a technology that solved this problem.

## Overview

FFI, or Foreign Function Interface, allows code written in one language to call code written in another language. The major use case is for dynamic VM languages calling dynamic libraries. For example, Python has CFFI or ctypes, same as Ruby, Java, Lua using it in similar C FFI libraries.

Basically after dynamically loaded and resolved symbols in `.so` or `.ddl` file, we use FFI constructing foreign function call.

FFI code can be described in below steps:

* Define FFI signatures.
* Construct FFI exchange.
* Perform FFI call.

We'll explain these three later. But let's see some solutions first.

## Solutions

### LuaJit - FFI

The LuaJit FFI library allows calling external C functions and using C data structures from pure Lua code. It parses plain C declarations. The arguments passed to this function are automatically converted from Lua objects to the corresponding C types. 

Below is the `hello world` example.

```lua
local ffi = require("ffi")

-- Define FFI signatures
ffi.cdef[[
int printf(const char *fmt, ...);
]]

-- Construct FFI exchange and Perform FFI call
ffi.C.printf("Hello %s!", "world")
```

`ffi.cdef` also supports defining c structs. LuaJit needs to remember the essential field names and field byte size for the function call.

```lua
-- Guide LuaJit how to setup FFI exchange.
ffi.cdef[[
typedef struct point point_t;
struct point {
  double x;
  double y;
};
]]

-- Setup FFI exchange
local points = ffi.new("point_t[?]", n)
points[1].x = 1.0
points[2].y = 3.0
```

### Common Lisp - FFI

Common Lisp has CFFI, which stands for Common Foreign Function Interface.  In Common Lisp, we have something similar in LuaJit but in different looking feels.

```lisp
;;; load cffi
(asdf:load-system :cffi)
(defpackage :cffi-user (:use :common-lisp :cffi))

;;; load the library
(define-foreign-library libc
  (t (:default "libc")))

;;; use the library
(use-foreign-library libc)

;;; define FFI signature
(defcfun "printf" :int (str :pointer) &rest))

;;; construct FFI exchange and perform FFI call
(printf "hello world")
```

Everything expressed in Common Lisp is just in S-expression, even when you're writing CFFI bindings.

### Pony - FFI

In Pony, you can use FFI directly. The FFI call syntax is very much like a function call with little difference. Below example shows how to call a file write operation directly.

```pony
@fwrite[U64](data.cstring(), U64(1), data.size(), _handle)
```

Calling FFI without predefined signatures looks convenient. Nonetheless, it's very dangerous. Without the signature, it might cause some potential bugs. And hence, it's still recommended defining signature first. Pony declare function signature via 'use' keyword.

```pony
// define FFI signature
use @fwrite[U64](ptr: Pointer[U8] tag, size: U64, count: U64, stream: Pointer[U8] tag)

// construct FFI exchange and perform FFI call
@fwrite[U64](data.cstring(), U64(1), data.size(), _handle)
```

### C - libffi

libffi a C library for FFI. Many VM languages written in C language use libffi to perform FFI calls.  Below code comes from [libffi simple example](https://www.chiark.greenend.org.uk/doc/libffi-dev/html/Simple-Example.html#Simple-Example):

```c
#include <stdio.h>
#include <ffi.h>

int main()
{
  ffi_cif cif;
  ffi_type *args[1];
  void *values[1];
  char *s;
  ffi_arg rc;
  
  /* Initialize the argument info vectors */    
  args[0] = &ffi_type_pointer;
  values[0] = &s;
  
  /* Initialize the cif */
  if (ffi_prep_cif(&cif, FFI_DEFAULT_ABI, 1, 
               &ffi_type_sint, args) == FFI_OK)
    {
      s = "Hello World!";
      ffi_call(&cif, puts, &rc, values);
      /* rc now holds the result of the call to puts */
      
      /* values hold a pointer to the function's arg, so to 
         call puts() again all we need to do is change the 
         value of s */
      s = "This is cool!";
      ffi_call(&cif, puts, &rc, values);
    }
  
  return 0;
}
```

It has a set of `ffi_` prefixed functions. Especially, `ffi_prep_cif` is used to define signatures, `ffi_prep_cif_var` is used to define signatures for those varargs needed, `ffi_call` is for making calls.

## Patterns

### How it works

FFI works by setting machine exchange information for you. Calling function has nothing special but does some simple but non-trivial register value moving. Once done, we extract return value from exchange information.

### ABI v/s API

ABI, or application binary interface, is on the contrary of API. It's a term describing communications between programs in machine level.

FFI define function signatures by API, but it performs ABI calls.

### Type Conversion

VM languages usually have two extra things to do:

* Before calling `ffi_call`, convert language types into FFI types.
* After calling `ffi_call`, convert FFI types back to language types.

We can easily find such tables in every language FFI implementation:

|ffi types|language types|
|---------|--------------|
|double,float|number|
|char \*|string|
|book|boolean|
|struct|class|
|...|...|

Type conversion impacts performance but the impact is small considering below cases:

* Very slow: implement everything in VM languages.
* Very fast: implement slow operations in C, and then make FFI calls in VM languages.
* Fastest: implement everything in C, or in assembly if you like. :)

The example in [LuaJit FFI](https://luajit.org/ext_ffi.html) shows LuaJit FFI call is 110x faster than in pure Lua interpreter.

### C Headers Copy-n-Paste v/s Semantic Signature

LuaJit and Python support copy-n-pasting C header file when defining function signatures. It's easy to use for users, cause the header file is very easy to find from library source code. The downside is that it needs to parse C code in runtime.

Ruby and Common Lisp use semantic signatures, that is to explicitly define function name, argument types, and return type. Basically, copy-n-pasting can be built on top of semantic signature.

Pony and Rust allow defining signatures in their language code. They compile code anyway, so the language compilers help you do the dirty work. It makes code styling more unified.

### !!! Alignment in 32-bit v/s 64-bit

We need the size of values, otherwise, we'll get a different binary sequence. Without getting data aligned, the library will get the wrong data and thus lead the application crash.

For example, in a 32-bit platform, a pointer has 4 bytes; while in a 64-bit platform, a pointer has 8 bytes. Below comparison shows the same pointer value has different results generated when passing to the dynamic library.

```
# in 32-bit
0x00000000111111110000000011111111

# in 64-bit
0x0000000011111111000000001111111100000000111111110000000011111111
```

It's also essential to align some insufficient values to minimum size. For example, if a value has 6 bytes size in a 64-bit platform, we need to add zero padding so that it has a minimum of 8 bytes.

### Long Long

Not every platform support types like `long long`.  FFI libraries might need to implement that internally. When using the FFI library, watch out if you can use this feature.

### Callback

In C code, we often write Function Pointers. For example, in libuv, we have below definitions:

```c
void (*uv_walk_cb)(uv_handle_t* handle, void* arg);

void uv_walk(uv_loop_t* loop, uv_walk_cb walk_cb, void* arg);
```

It's essential to have a way to map VM functions into FFI functions. Luckily, we have [ffi_closure](https://www.chiark.greenend.org.uk/doc/libffi-dev/html/The-Closure-API.html#The-Closure-API) to achieve that. It enables arbitrary functions to be passed into an FFI call. You need to do below things:

* allocate memory for ffi_closure
* set a ffi_closure pointer into the exchange.
* free memory for ffi_closure

### Garbage Collect

You don't need to care about memory management due to GC is usually built-in in VM language. However, when writing FFI calls, you need to worry about low-level memory management problem. 

There is no C stack in FFI. All data live either in the native heap or VM-managed heap. Free those useless when becomes useless.

### Thread-safe v/s Thread-unsafe

Some C operations are not thread-safe. Be careful when calling them when you're writing concurrency.

### Advantage and Disadvantage

* Advantage
    * Very good performance, as long as your C code not sucks.
    * Reuse whatsoever in-place in the system.
    * Easily port C library to another VM language. For example, [ImageMagick](https://www.imagemagick.org/script/api.php) can be integrated into almost every VM language via FFI without changing C code.
* Disadvantage
    * Introduce system dependency.
    * Portability. Some interfaces might not work in another platform or architect. For example, you can't use Windows `MessageBoxA` in Linux.

## Conclusions

If you have performance bottleneck when running the CPU-intensive calculation in VM language, and ALSO feels VM interpreter runs so slow, take a look at FFI! If you want to write your own interpreter language, also try to integrate libffi as a bonus!

## References

* [Flexible runtime interface to shared libraries with libffi](https://eli.thegreenplace.net/2013/03/04/flexible-runtime-interface-to-shared-libraries-with-libffi)
* [Why use FFI](https://github.com/ffi/ffi/wiki/Why-use-FFI)
* [LuaJit - FFI](https://luajit.org/ext_ffi.html)
* [Python - CFFI](https://cffi.readthedocs.io/en/latest/overview.html)
* [Using LibFFI](https://www.chiark.greenend.org.uk/doc/libffi-dev/html/Using-libffi.html#Using-libffi)
* [Java JNI example](https://stackoverflow.com/questions/5963266/call-c-function-from-java)
* [Pony - FFI](https://tutorial.ponylang.org/c-ffi/)
* [Rust - FFI](https://doc.rust-lang.org/book/first-edition/ffi.html)
* [CommonLisp - FFI](https://common-lisp.net/project/cffi/manual/cffi-manual.html)
* [Example of source code in this post](https://gist.github.com/soasme/1ddbf4de79e341cbf2e0cf7357a166f7)
* [How libffi actually works?](https://techbrahmana.blogspot.com/2008/08/how-libffi-actually-works.html)
