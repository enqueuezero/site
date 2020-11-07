---
title: Container and clone
---

The most essential system call of creating a Linux container is `clone()`.

Function signature:

```
int clone(int (*fn)(void *), void *stack, int flags, void *arg, ...);
```

The child process runs whatever `fn` defines. When `fn` finishes, the child process exits. In the context of a container runtime, `fn` does a lot of isolate the process from those on the host. It's appropriate to say this system call is the starting of the life cycle of the first process in the container.

The `stack` argument specifies the location of the stack used by the child process.

The `flags` argument is a bit mask. We set it to

```
CLONE_NEWNS|CLONE_NEWPID|CLONE_NEWUSER|...
```

Such a flags setting place the cloned process into some dedicated namespaces, such as file system, pid, user, etc.
