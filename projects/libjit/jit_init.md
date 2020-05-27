---
title: JIT Uncover - Init
permalink: /projects/libjit/jit-init.html
prev: getting_started.md
---

# JIT Uncover - Initialize Libjit

## Install Libjit

To use libjit, we need to install libjit. Let's first fetch the libjit source code.

```bash
$ git submodule init
$ git submodule add https://git.savannah.gnu.org/git/libjit.git
```
(Run on terminal.)

This is just a one-time setup. We may need to run `git submodule update` when there is an update on libjit.

Next, let's add a "make jit" command in the Makefile, which builds libjit into the current project.

```{5,6,7,8,9,10,11}
a.out: $(OFILES)
	cd src && $(CC) $(CFLAGS) $(SOURCES)
	mkdir -p bin && mv src/a.out bin/ju && chmod +x bin/ju

jit:
	mkdir -p $(PWD)/./dist/usr/local
	cd $(PWD)/libjit \
		&& ./bootstrap \
		&& ./configure --prefix=$(PWD)/./dist/usr/local \
		&& make \
		&& make install
```
(Edit "Makefile". Append to the last.)

By running the command "make jit", libjit should be installed under the project "dist" directory.

```bash{1}
$ make jit
```
(Run on terminal.)

Since the command "gcc" doesn't know we have installed libjit, we need to tell gcc where to find libjit headers and where to link libjit shared object files.

```bash{2}
PWD = $(shell pwd)
CFLAGS = -I$(PWD)/dist/usr/local/include -L$(PWD)/dist/usr/local/lib -ljit
HOSTCC = gcc -g -Wall -pedantic -Wcast-qual
CC = $(HOSTCC)
```
(Edit "Makefile". Specify `CFLAGS` with `-I`, `-L`, `-l`)

## Initialize Libjit Context

Now, the scene has setup.

To use libjit, we first include "jit/jit.h" file in our header file. It allows us calling any libjit function in ".c" files.

```diff{2}
#include <stdlib.h>
#include <jit/jit.h>

#endif
```
(Edit "ju.h", insert a line.)

We can now call libjit functions in `main(()`.

```c{4,5}
#include "ju.h"

int main(int argc, char* argv[]) {
    jit_context_t ctx = jit_context_create();
    jit_context_destroy(ctx);
    return 0;
}
```
(Edit "src/main.c". Add two lines.)

The function `jit_context_create()` is usually the first function to call when using libjit. It initializes the library and prepares for JIT operations. All later function calls are attached to this context.

The function `jit_context_destroy()` is called once JIT context is no longer needed. In our program, it means our JIT interpreter has done its works.

## Handle Out-Of-Memory

To make our program robust, we need to handle a special case: `jit_context_create()` returns NULL if out of memory. It can be achieved by quitting the program with an non-zero exit code.

:::tip
In programming, out of memory (OOM) is an often undesired state a program might falls in since operating system refuses to allocate memory to the program. There is nothing for the program to recover thus crashing being the only option.
:::

Let's wrap this exiting logic into a function `ju_oom()`.

```c{3}
#include <jit/jit.h>

void ju_oom();

#endif
```
(Edit "src/ju.h". Insert "ju_oom()".)

```c{3,4,5,6,10,11,12}
#include "ju.h"

void ju_oom() {
    fputs("error: out of memory.\n", stderr);
    exit(1);
}

int main(int argc, char* argv[]) {
    jit_context_t ctx = jit_context_create();
    if (ctx == NULL) {
        ju_oom();
    }
    jit_context_destroy(ctx);
```
(Edit "src/main.c". Add `ju_oom()`.)

So far, we have installed libjit and call it in our program. Nice work!
