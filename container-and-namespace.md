---
title: Container and Namespace
content: /container-and-namespace.html
category: Programming
tags: container
date: 2018-07-26
---

# Container and Namespace

Namespace enables us having the same name for some global system resources. For example, A PID namespace empowers the process inside the namespace running with 1 as PID, which at the same time, `init` is running with 1 as PID in the regular namespace.

![Container PID namespace](/static/images/container-PID-namespace.png)

The namespace has various kinds. You have seen PID namespace. There are some more: IPC namespace, Network namespace, Mount namespace, User namespace, UTS namespace. Each type isolates different system resources. 

It's worth noting that namespace doesn't limit access to physical resources such as CPU, Memory, and disk I/O. We'll introduce another tool cgroup for this specific use case.

One major use case of the namespace is to isolate processes belonging to a container from other containers or the system namespace.

Each process has a `/proc/[pid]/ns/` subdirectory. Go and check one in your Linux system! And also check the man page of [namespaces.7](http://man7.org/linux/man-pages/man7/namespaces.7.html).
