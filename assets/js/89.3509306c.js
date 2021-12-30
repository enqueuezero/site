(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{475:function(t,a,e){"use strict";e.r(a);var s=e(54),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"ffi"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ffi"}},[t._v("#")]),t._v(" FFI")]),t._v(" "),e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#context"}},[t._v("Context")])]),e("li",[e("a",{attrs:{href:"#overview"}},[t._v("Overview")])]),e("li",[e("a",{attrs:{href:"#solutions"}},[t._v("Solutions")]),e("ul",[e("li",[e("a",{attrs:{href:"#luajit-ffi"}},[t._v("LuaJit - FFI")])]),e("li",[e("a",{attrs:{href:"#common-lisp-ffi"}},[t._v("Common Lisp - FFI")])]),e("li",[e("a",{attrs:{href:"#pony-ffi"}},[t._v("Pony - FFI")])]),e("li",[e("a",{attrs:{href:"#c-libffi"}},[t._v("C - libffi")])])])]),e("li",[e("a",{attrs:{href:"#patterns"}},[t._v("Patterns")]),e("ul",[e("li",[e("a",{attrs:{href:"#how-it-works"}},[t._v("How it works")])]),e("li",[e("a",{attrs:{href:"#abi-v-s-api"}},[t._v("ABI v/s API")])]),e("li",[e("a",{attrs:{href:"#type-conversion"}},[t._v("Type Conversion")])]),e("li",[e("a",{attrs:{href:"#c-headers-copy-n-paste-v-s-semantic-signature"}},[t._v("C Headers Copy-n-Paste v/s Semantic Signature")])]),e("li",[e("a",{attrs:{href:"#alignment-in-32-bit-v-s-64-bit"}},[t._v("!!! Alignment in 32-bit v/s 64-bit")])]),e("li",[e("a",{attrs:{href:"#long-long"}},[t._v("Long Long")])]),e("li",[e("a",{attrs:{href:"#callback"}},[t._v("Callback")])]),e("li",[e("a",{attrs:{href:"#garbage-collect"}},[t._v("Garbage Collect")])]),e("li",[e("a",{attrs:{href:"#thread-safe-v-s-thread-unsafe"}},[t._v("Thread-safe v/s Thread-unsafe")])]),e("li",[e("a",{attrs:{href:"#advantage-and-disadvantage"}},[t._v("Advantage and Disadvantage")])])])]),e("li",[e("a",{attrs:{href:"#conclusions"}},[t._v("Conclusions")])]),e("li",[e("a",{attrs:{href:"#references"}},[t._v("References")])])])]),e("p"),t._v(" "),e("h2",{attrs:{id:"context"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[t._v("#")]),t._v(" Context")]),t._v(" "),e("p",[t._v("C function parameter types and return type are nowhere in compiled shared dynamic library. Some other programs may not know what arguments are to be passed to a function in this program.")]),t._v(" "),e("p",[t._v("In Python, we can dynamically load a dynamic library, resolve FuncPointers by symbols of functions and even call it. The only problem is that the program would crash without the right parameters passing into functions.")]),t._v(" "),e("div",{staticClass:"language-python extra-class"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" ctypes\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" libc "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ctypes"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CDLL"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'libc.dylib'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" libc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("atoi\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("_FuncPtr "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("object")]),t._v(" at "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x100a509a8")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" libc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("atoi"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" libc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("atoi"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("    "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("47162")]),t._v(" segmentation fault  python\n")])])]),e("p",[t._v("The reason is simple. Everything in the dynamic library is machine instruction. We have registers like "),e("code",[t._v("%esi")]),t._v(", "),e("code",[t._v("%xmm0")]),t._v(" in dynamic library, but no "),e("code",[t._v("const point_t* p1, const point_t* p2")]),t._v(" at all.")]),t._v(" "),e("p",[t._v("[img[ffi-after-dlopen.jpg]]")]),t._v(" "),e("p",[t._v("It's easy to know such information in C by sharing header file definition, but calling it in another language might seems a big challenge.")]),t._v(" "),e("p",[t._v("FFI is a technology that solved this problem.")]),t._v(" "),e("h2",{attrs:{id:"overview"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),e("p",[t._v("FFI, or Foreign Function Interface, allows code written in one language to call code written in another language. The major use case is for dynamic VM languages calling dynamic libraries. For example, Python has CFFI or ctypes, same as Ruby, Java, Lua using it in similar C FFI libraries.")]),t._v(" "),e("p",[t._v("Basically after dynamically loaded and resolved symbols in "),e("code",[t._v(".so")]),t._v(" or "),e("code",[t._v(".ddl")]),t._v(" file, we use FFI constructing foreign function call.")]),t._v(" "),e("p",[t._v("FFI code can be described in below steps:")]),t._v(" "),e("ul",[e("li",[t._v("Define FFI signatures.")]),t._v(" "),e("li",[t._v("Construct FFI exchange.")]),t._v(" "),e("li",[t._v("Perform FFI call.")])]),t._v(" "),e("p",[t._v("We'll explain these three later. But let's see some solutions first.")]),t._v(" "),e("h2",{attrs:{id:"solutions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#solutions"}},[t._v("#")]),t._v(" Solutions")]),t._v(" "),e("h3",{attrs:{id:"luajit-ffi"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#luajit-ffi"}},[t._v("#")]),t._v(" LuaJit - FFI")]),t._v(" "),e("p",[t._v("The LuaJit FFI library allows calling external C functions and using C data structures from pure Lua code. It parses plain C declarations. The arguments passed to this function are automatically converted from Lua objects to the corresponding C types.")]),t._v(" "),e("p",[t._v("Below is the "),e("code",[t._v("hello world")]),t._v(" example.")]),t._v(" "),e("div",{staticClass:"language-lua extra-class"},[e("pre",{pre:!0,attrs:{class:"language-lua"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("local")]),t._v(" ffi "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ffi"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- Define FFI signatures")]),t._v("\nffi"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cdef"),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("[[\nint printf(const char *fmt, ...);\n]]")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- Construct FFI exchange and Perform FFI call")]),t._v("\nffi"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("C"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("printf")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Hello %s!"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"world"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[e("code",[t._v("ffi.cdef")]),t._v(" also supports defining c structs. LuaJit needs to remember the essential field names and field byte size for the function call.")]),t._v(" "),e("div",{staticClass:"language-lua extra-class"},[e("pre",{pre:!0,attrs:{class:"language-lua"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- Guide LuaJit how to setup FFI exchange.")]),t._v("\nffi"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cdef"),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("[[\ntypedef struct point point_t;\nstruct point {\n  double x;\n  double y;\n};\n]]")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- Setup FFI exchange")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("local")]),t._v(" points "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ffi"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("new")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"point_t[?]"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\npoints"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("x "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.0")]),t._v("\npoints"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("y "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.0")]),t._v("\n")])])]),e("h3",{attrs:{id:"common-lisp-ffi"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#common-lisp-ffi"}},[t._v("#")]),t._v(" Common Lisp - FFI")]),t._v(" "),e("p",[t._v("Common Lisp has CFFI, which stands for Common Foreign Function Interface.  In Common Lisp, we have something similar in LuaJit but in different looking feels.")]),t._v(" "),e("div",{staticClass:"language-lisp extra-class"},[e("pre",{pre:!0,attrs:{class:"language-lisp"}},[e("code",[e("span",{pre:!0,attrs:{class:"token heading comment title"}},[t._v(";;; load cffi")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token car"}},[t._v("asdf")]),e("span",{pre:!0,attrs:{class:"token lisp-property property"}},[t._v(":load-system")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token lisp-property property"}},[t._v(":cffi")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token car"}},[t._v("defpackage")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token lisp-property property"}},[t._v(":cffi-user")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token lisp-property property"}},[t._v(":use")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token lisp-property property"}},[t._v(":common-lisp")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token lisp-property property"}},[t._v(":cffi")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token heading comment title"}},[t._v(";;; load the library")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token car"}},[t._v("define-foreign-library")]),t._v(" libc\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("t")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token lisp-property property"}},[t._v(":default")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"libc"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token heading comment title"}},[t._v(";;; use the library")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token car"}},[t._v("use-foreign-library")]),t._v(" libc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token heading comment title"}},[t._v(";;; define FFI signature")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token car"}},[t._v("defcfun")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"printf"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token lisp-property property"}},[t._v(":int")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token car"}},[t._v("str")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token lisp-property property"}},[t._v(":pointer")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" &rest"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token heading comment title"}},[t._v(";;; construct FFI exchange and perform FFI call")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token car"}},[t._v("printf")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello world"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[t._v("Everything expressed in Common Lisp is just in S-expression, even when you're writing CFFI bindings.")]),t._v(" "),e("h3",{attrs:{id:"pony-ffi"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pony-ffi"}},[t._v("#")]),t._v(" Pony - FFI")]),t._v(" "),e("p",[t._v("In Pony, you can use FFI directly. The FFI call syntax is very much like a function call with little difference. Below example shows how to call a file write operation directly.")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("@fwrite[U64](data.cstring(), U64(1), data.size(), _handle)\n")])])]),e("p",[t._v("Calling FFI without predefined signatures looks convenient. Nonetheless, it's very dangerous. Without the signature, it might cause some potential bugs. And hence, it's still recommended defining signature first. Pony declare function signature via 'use' keyword.")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("// define FFI signature\nuse @fwrite[U64](ptr: Pointer[U8] tag, size: U64, count: U64, stream: Pointer[U8] tag)\n\n// construct FFI exchange and perform FFI call\n@fwrite[U64](data.cstring(), U64(1), data.size(), _handle)\n")])])]),e("h3",{attrs:{id:"c-libffi"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#c-libffi"}},[t._v("#")]),t._v(" C - libffi")]),t._v(" "),e("p",[t._v("libffi a C library for FFI. Many VM languages written in C language use libffi to perform FFI calls.  Below code comes from "),e("a",{attrs:{href:"https://www.chiark.greenend.org.uk/doc/libffi-dev/html/Simple-Example.html#Simple-Example",target:"_blank",rel:"noopener noreferrer"}},[t._v("libffi simple example"),e("OutboundLink")],1),t._v(":")]),t._v(" "),e("div",{staticClass:"language-c extra-class"},[e("pre",{pre:!0,attrs:{class:"language-c"}},[e("code",[e("span",{pre:!0,attrs:{class:"token macro property"}},[e("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("<stdio.h>")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token macro property"}},[e("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("<ffi.h>")])]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  ffi_cif cif"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  ffi_type "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("args"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("values"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("s"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  ffi_arg rc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  \n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Initialize the argument info vectors */")]),t._v("    \n  args"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("ffi_type_pointer"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  values"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("s"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  \n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Initialize the cif */")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ffi_prep_cif")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("cif"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" FFI_DEFAULT_ABI"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n               "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("ffi_type_sint"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" FFI_OK"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      s "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Hello World!"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ffi_call")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("cif"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" puts"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("rc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" values"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* rc now holds the result of the call to puts */")]),t._v("\n      \n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* values hold a pointer to the function's arg, so to \n         call puts() again all we need to do is change the \n         value of s */")]),t._v("\n      s "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"This is cool!"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ffi_call")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("cif"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" puts"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("rc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" values"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  \n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("It has a set of "),e("code",[t._v("ffi_")]),t._v(" prefixed functions. Especially, "),e("code",[t._v("ffi_prep_cif")]),t._v(" is used to define signatures, "),e("code",[t._v("ffi_prep_cif_var")]),t._v(" is used to define signatures for those varargs needed, "),e("code",[t._v("ffi_call")]),t._v(" is for making calls.")]),t._v(" "),e("h2",{attrs:{id:"patterns"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#patterns"}},[t._v("#")]),t._v(" Patterns")]),t._v(" "),e("h3",{attrs:{id:"how-it-works"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#how-it-works"}},[t._v("#")]),t._v(" How it works")]),t._v(" "),e("p",[t._v("FFI works by setting machine exchange information for you. Calling function has nothing special but does some simple but non-trivial register value moving. Once done, we extract return value from exchange information.")]),t._v(" "),e("h3",{attrs:{id:"abi-v-s-api"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#abi-v-s-api"}},[t._v("#")]),t._v(" ABI v/s API")]),t._v(" "),e("p",[t._v("ABI, or application binary interface, is on the contrary of API. It's a term describing communications between programs in machine level.")]),t._v(" "),e("p",[t._v("FFI define function signatures by API, but it performs ABI calls.")]),t._v(" "),e("h3",{attrs:{id:"type-conversion"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#type-conversion"}},[t._v("#")]),t._v(" Type Conversion")]),t._v(" "),e("p",[t._v("VM languages usually have two extra things to do:")]),t._v(" "),e("ul",[e("li",[t._v("Before calling "),e("code",[t._v("ffi_call")]),t._v(", convert language types into FFI types.")]),t._v(" "),e("li",[t._v("After calling "),e("code",[t._v("ffi_call")]),t._v(", convert FFI types back to language types.")])]),t._v(" "),e("p",[t._v("We can easily find such tables in every language FFI implementation:")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("ffi types")]),t._v(" "),e("th",[t._v("language types")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("double,float")]),t._v(" "),e("td",[t._v("number")])]),t._v(" "),e("tr",[e("td",[t._v("char *")]),t._v(" "),e("td",[t._v("string")])]),t._v(" "),e("tr",[e("td",[t._v("book")]),t._v(" "),e("td",[t._v("boolean")])]),t._v(" "),e("tr",[e("td",[t._v("struct")]),t._v(" "),e("td",[t._v("class")])]),t._v(" "),e("tr",[e("td",[t._v("...")]),t._v(" "),e("td",[t._v("...")])])])]),t._v(" "),e("p",[t._v("Type conversion impacts performance but the impact is small considering below cases:")]),t._v(" "),e("ul",[e("li",[t._v("Very slow: implement everything in VM languages.")]),t._v(" "),e("li",[t._v("Very fast: implement slow operations in C, and then make FFI calls in VM languages.")]),t._v(" "),e("li",[t._v("Fastest: implement everything in C, or in assembly if you like. 😃")])]),t._v(" "),e("p",[t._v("The example in "),e("a",{attrs:{href:"https://luajit.org/ext_ffi.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("LuaJit FFI"),e("OutboundLink")],1),t._v(" shows LuaJit FFI call is 110x faster than in pure Lua interpreter.")]),t._v(" "),e("h3",{attrs:{id:"c-headers-copy-n-paste-v-s-semantic-signature"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#c-headers-copy-n-paste-v-s-semantic-signature"}},[t._v("#")]),t._v(" C Headers Copy-n-Paste v/s Semantic Signature")]),t._v(" "),e("p",[t._v("LuaJit and Python support copy-n-pasting C header file when defining function signatures. It's easy to use for users, cause the header file is very easy to find from library source code. The downside is that it needs to parse C code in runtime.")]),t._v(" "),e("p",[t._v("Ruby and Common Lisp use semantic signatures, that is to explicitly define function name, argument types, and return type. Basically, copy-n-pasting can be built on top of semantic signature.")]),t._v(" "),e("p",[t._v("Pony and Rust allow defining signatures in their language code. They compile code anyway, so the language compilers help you do the dirty work. It makes code styling more unified.")]),t._v(" "),e("h3",{attrs:{id:"alignment-in-32-bit-v-s-64-bit"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#alignment-in-32-bit-v-s-64-bit"}},[t._v("#")]),t._v(" !!! Alignment in 32-bit v/s 64-bit")]),t._v(" "),e("p",[t._v("We need the size of values, otherwise, we'll get a different binary sequence. Without getting data aligned, the library will get the wrong data and thus lead the application crash.")]),t._v(" "),e("p",[t._v("For example, in a 32-bit platform, a pointer has 4 bytes; while in a 64-bit platform, a pointer has 8 bytes. Below comparison shows the same pointer value has different results generated when passing to the dynamic library.")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("# in 32-bit\n0x00000000111111110000000011111111\n\n# in 64-bit\n0x0000000011111111000000001111111100000000111111110000000011111111\n")])])]),e("p",[t._v("It's also essential to align some insufficient values to minimum size. For example, if a value has 6 bytes size in a 64-bit platform, we need to add zero padding so that it has a minimum of 8 bytes.")]),t._v(" "),e("h3",{attrs:{id:"long-long"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#long-long"}},[t._v("#")]),t._v(" Long Long")]),t._v(" "),e("p",[t._v("Not every platform support types like "),e("code",[t._v("long long")]),t._v(".  FFI libraries might need to implement that internally. When using the FFI library, watch out if you can use this feature.")]),t._v(" "),e("h3",{attrs:{id:"callback"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#callback"}},[t._v("#")]),t._v(" Callback")]),t._v(" "),e("p",[t._v("In C code, we often write Function Pointers. For example, in libuv, we have below definitions:")]),t._v(" "),e("div",{staticClass:"language-c extra-class"},[e("pre",{pre:!0,attrs:{class:"language-c"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("uv_walk_cb"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uv_handle_t")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" handle"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" arg"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("uv_walk")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("uv_loop_t")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" loop"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" uv_walk_cb walk_cb"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" arg"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("It's essential to have a way to map VM functions into FFI functions. Luckily, we have "),e("a",{attrs:{href:"https://www.chiark.greenend.org.uk/doc/libffi-dev/html/The-Closure-API.html#The-Closure-API",target:"_blank",rel:"noopener noreferrer"}},[t._v("ffi_closure"),e("OutboundLink")],1),t._v(" to achieve that. It enables arbitrary functions to be passed into an FFI call. You need to do below things:")]),t._v(" "),e("ul",[e("li",[t._v("allocate memory for ffi_closure")]),t._v(" "),e("li",[t._v("set a ffi_closure pointer into the exchange.")]),t._v(" "),e("li",[t._v("free memory for ffi_closure")])]),t._v(" "),e("h3",{attrs:{id:"garbage-collect"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#garbage-collect"}},[t._v("#")]),t._v(" Garbage Collect")]),t._v(" "),e("p",[t._v("You don't need to care about memory management due to GC is usually built-in in VM language. However, when writing FFI calls, you need to worry about low-level memory management problem.")]),t._v(" "),e("p",[t._v("There is no C stack in FFI. All data live either in the native heap or VM-managed heap. Free those useless when becomes useless.")]),t._v(" "),e("h3",{attrs:{id:"thread-safe-v-s-thread-unsafe"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#thread-safe-v-s-thread-unsafe"}},[t._v("#")]),t._v(" Thread-safe v/s Thread-unsafe")]),t._v(" "),e("p",[t._v("Some C operations are not thread-safe. Be careful when calling them when you're writing concurrency.")]),t._v(" "),e("h3",{attrs:{id:"advantage-and-disadvantage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#advantage-and-disadvantage"}},[t._v("#")]),t._v(" Advantage and Disadvantage")]),t._v(" "),e("ul",[e("li",[t._v("Advantage\n"),e("ul",[e("li",[t._v("Very good performance, as long as your C code not sucks.")]),t._v(" "),e("li",[t._v("Reuse whatsoever in-place in the system.")]),t._v(" "),e("li",[t._v("Easily port C library to another VM language. For example, "),e("a",{attrs:{href:"https://www.imagemagick.org/script/api.php",target:"_blank",rel:"noopener noreferrer"}},[t._v("ImageMagick"),e("OutboundLink")],1),t._v(" can be integrated into almost every VM language via FFI without changing C code.")])])]),t._v(" "),e("li",[t._v("Disadvantage\n"),e("ul",[e("li",[t._v("Introduce system dependency.")]),t._v(" "),e("li",[t._v("Portability. Some interfaces might not work in another platform or architect. For example, you can't use Windows "),e("code",[t._v("MessageBoxA")]),t._v(" in Linux.")])])])]),t._v(" "),e("h2",{attrs:{id:"conclusions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#conclusions"}},[t._v("#")]),t._v(" Conclusions")]),t._v(" "),e("p",[t._v("If you have performance bottleneck when running the CPU-intensive calculation in VM language, and ALSO feels VM interpreter runs so slow, take a look at FFI! If you want to write your own interpreter language, also try to integrate libffi as a bonus!")]),t._v(" "),e("h2",{attrs:{id:"references"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[t._v("#")]),t._v(" References")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://eli.thegreenplace.net/2013/03/04/flexible-runtime-interface-to-shared-libraries-with-libffi",target:"_blank",rel:"noopener noreferrer"}},[t._v("Flexible runtime interface to shared libraries with libffi"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/ffi/ffi/wiki/Why-use-FFI",target:"_blank",rel:"noopener noreferrer"}},[t._v("Why use FFI"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://luajit.org/ext_ffi.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("LuaJit - FFI"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://cffi.readthedocs.io/en/latest/overview.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Python - CFFI"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://www.chiark.greenend.org.uk/doc/libffi-dev/html/Using-libffi.html#Using-libffi",target:"_blank",rel:"noopener noreferrer"}},[t._v("Using LibFFI"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://stackoverflow.com/questions/5963266/call-c-function-from-java",target:"_blank",rel:"noopener noreferrer"}},[t._v("Java JNI example"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://tutorial.ponylang.org/c-ffi/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Pony - FFI"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://doc.rust-lang.org/book/first-edition/ffi.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Rust - FFI"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://common-lisp.net/project/cffi/manual/cffi-manual.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("CommonLisp - FFI"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://gist.github.com/soasme/1ddbf4de79e341cbf2e0cf7357a166f7",target:"_blank",rel:"noopener noreferrer"}},[t._v("Example of source code in this post"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://techbrahmana.blogspot.com/2008/08/how-libffi-actually-works.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("How libffi actually works?"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=n.exports}}]);