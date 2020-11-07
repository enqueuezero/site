---
title: Container and clone
---

# Container and Clone

## Clone a Process

The system call `clone()` create a new process.

Let's see the function signature of `clone()`:

```
int clone(int (*fn)(void *), void *stack, int flags, void *arg, ...);
```

The child process runs whatever `fn` defines. When `fn` finishes, the child process exits. In the context of a container runtime, `fn` does a lot of isolate the process from those on the host. It's appropriate to say this system call is the starting of the life cycle of the first process in the container.

The `fn` argument is the entry point for the child process.

The `stack` argument specifies the location of the stack used by the child process.

The `flags` argument is a bit mask.

## Clone v/s Fork

The system call `clone()` is similar to `fork()`, but provides more precise control for creating the execution environment between the calling process and the child process.

The system call `fork()` returns twice; when the child process is forked, both parent process and child process continue running the rest of code.

Example of `fork()`:

```python
pid = fork()
if pid == 0:
    pass     # parent does something.
else:
    pass     # entry point of the child process
```

Unlike `fork()`, `clone()` uses `fn` as the entry point. When `fn` returns, the child process is terminated.

Example of `clone()`:

```python
def child_fn():
    pass        # entry point of the child process
    return 0

assert clone(child_fn, 1024*1024, 0) != -1
```
