---
title: JIT Uncover - Getting Started
permalink: /projects/libjit/getting-started.html
prev: /projects/libjit/
next: jit_init.md
---

# JIT Uncover - Getting Started

Should you feel excited to begin with a `main()` function. Open your favorite text editor and start typing.

```c
#include "ju.h"

int main(int argc, char* argv[]) {
    return 0;
}
```
(Create a new file "src/main.c".)

We will have a single header file "ju.h", in which all the future function signatures are declared. For now, we simply include some basic c header files.

```c
#ifndef JU_H
#define JU_H

#include <stdio.h>
#include <stdbool.h>
#include <stdint.h>
#include <stddef.h>
#include <stdlib.h>

#endif
```
(Create a new file "src/ju.h".)

To make our life easier, we can add a tiny Makefile so that the compilation is to simply type "make" on the console.

```bash
# create a new file "Makefile"
PWD = $(shell pwd)
CFLAGS =
HOSTCC = gcc -g -Wall -pedantic -Wcast-qual
CC = $(HOSTCC)
SOURCES = ju.h main.c

$(OFILES): $(SOURCES)

a.out: $(OFILES)
	cd src && $(CC) $(CFLAGS) $(SOURCES)
	mkdir -p bin && mv src/a.out bin/ju && chmod +x bin/ju
```
(Create a new file "Makefile".)

Hooray, our environment is setup. Run it.

```bash
$ make
$ bin/ju
$ echo $?
0
```
(Run on terminal.)

As of now, the c code is compiled successfully, since the last exit code is 0.

From now on, at the end of each article in this series, we can always re-run "make" to validate the progress.
