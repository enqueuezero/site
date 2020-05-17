---
title: The Queues of io_uring
permalink: /projects/io-uring/queues.html
---

# The Queues of io_uring

io_uring is asynchronous I/O programming for Linux. Traditionally, we do async via select, poll, epoll, ugly aio, etc. However, they're meant for sockets and pipes. For high performant applications, since Kernel 5.6, when even file I/O becomes the bottleneck, io_uring is a better solution. io_uring provides a general interface handling both sockets and regular files.

Fundamentally, io_uring is about operating two ring buffers,

* Submission Queue (SQ)
* Completion Queue (CQ)

These two ring buffers are shared between the kernel and user space, so the data transfering between the kernal and user space is a zero-copy.

Having that in mind, let's see how io_uring works.

![](/static/images/io_uring-queues.svg)

1. Your program sets up two ring buffers at first.
2. Enqueue Submission Queue Entry (SQE) to SQ.
3. Kernal consumes SQEs and puts Completion Queue Events (CQE) to CQ.
4. Your program consumes CQEs.
