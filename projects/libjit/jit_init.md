---
title: Crafting Just-In-Time
permalink: /projects/libjit/init.html
---

# Crafting JIT - Init

To use the JIT, we first include "jit/jit.h" file in our header file.

```diff{2}
 #include <stdlib.h>
+#include <jit/jit.h>

 #endif
```
(Edit "ju.h", insert a line.)

This requires us to have libjit installed. Let's fetch the libjit source code. This is just a one-time setup. We may need to run `git submodule update` when there is an update on libjit.

```bash
$ git submodule init
$ git submodule add https://git.savannah.gnu.org/git/libjit.git
```

Next, let's forge libjit into our project.

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

```bash
$ make jit
autoreconf: Entering directory `.'
autoreconf: configure.ac: not using Gettext
... (very long output)
make[3]: Nothing to be done for `install-exec-am'.
make[3]: Nothing to be done for `install-data-am'.
```

Since the command "gcc" doesn't know we have installed libjit, we need to tell gcc where to find libjit headers and where to link libjit shared object files.

```bash{1}
PWD = $(shell pwd)
CFLAGS = -I$(PWD)/dist/usr/local/include -L$(PWD)/dist/usr/local/lib -ljit -lm
HOSTCC = gcc -g -Wall -pedantic -Wcast-qual
CC = $(HOSTCC)
```

Now, the scene has setup. We can initialize libjit in `main(()` function.

```c{4,5}
#include "ju.h"

int main(int argc, char* argv[]) {
    jit_context_t ctx = jit_context_create();
    jit_context_destroy(ctx);
    return 0;
}
```

Re-run "make" command should bring us the next available version of "bin/ju". From now on, at the end of each article in this series, we can always re-run "make" to validate and check-in our progress.
