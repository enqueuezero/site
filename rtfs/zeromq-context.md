---
title: ZeroMQ Context
---

# ZeroMQ Context

Context is probably the next piece you want to check, [ctx.hpp](https://github.com/zeromq/libzmq/blob/master/src/ctx.hpp) and [ctx.cpp](https://github.com/zeromq/libzmq/blob/master/src/ctx.cpp). The context contains the global state shared among all threads. To be fair, context is not *global variable*. Global variables is notorious since we need to introduce locking, otherwise we'll see concurrency bugs. ZeroMQrequires you to create a context before using any ZeroMQ APIs. Coming along with the history of software engineering, we would find that context is a useful technique applied to many projects, such as ZeroMQ, Flask, etc. Typically, a context keeps track of the application-level data during the life time of library use.
