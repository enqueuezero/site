---
title: Crafting Just-In-Time - Getting Started
permalink: /projects/libjit/getting-started.html
---

# Crafting Just-In-Time - Getting Started

Should you feel excited to begin with a `main()` function. Open your favourite text editor and start typing.

```c
// create a new file "src/main.c"
#include "ju.h"

int main(int argc, char* argv[]) {
    return 0;
}
```

We will have a single header file "ju.h", in which all the future function signatures are declared. For now, we simply include some basic c header files.

```c
// create a new file "src/ju.h"
#ifndef JU_H
#define JU_H

#include <stdio.h>
#include <stdbool.h>
#include <stdint.h>
#include <stddef.h>
#include <stdlib.h>

#endif
```

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

Hooray, our environment is setup. Run it.

```bash
$ make
$ bin/ju
$ echo $?
0
```

As of now, the c code is compiled successfully, since the last exit code is 0.
