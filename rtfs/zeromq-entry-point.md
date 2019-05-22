---
title: ZeroMQ Entry Point
---

# ZeroMQ Entry Point

If I were to read the source code of a project, I would start from the entry point. The entry point of ZeroMQ is [zmq.h](https://github.com/zeromq/libzmq/blob/master/include/zmq.h) and [zmq.cpp](https://github.com/zeromq/libzmq/blob/master/src/zmq.cpp), which provides a high-level interface to end users. Starting from these two files, we can get a quick glance on how various modules are scattered and compiled.

There are some context related functions (`ctx_`), message related functions (`msg_`), poller related functions (`zmq_poller_`), and most importantly socket related functions (`zmq_socket`, `zmq_bind`, `zmq_connect`, `zmq_send`, `zmq_recv`), etc. The header file `zmq.h` serves as a contract to the ZeroMQ users and hence the stability is the most concerned thing. If there is ever a change in the file, it must not break existing applications.

The cpp file `zmq.cpp` exposes internal modules as stable APIs. Most of the implementations of `zmq_xyz_abc` map to `(static_cast<zmq::xyz *> (xyz_))->abc` or `zmq::xyz_t *s = ...; s->abc(...);`, with some additional error code handling. The lines of code is quite a lot but the code is easy to understand.

To better understand how ZeroMQ works, it's essential to understand some fundamental concepts.

* In main thread, user creates a singleton object **zmq.Context()** holds the global state and is accessible by all the sockets and all the asynchronous objects in worker threads.
* In worker threads, user creates socket objects from the context. Internally, ZeroMQ maintains various objects in each worker thread.
  * The **Listener** listens for the incoming connections and creates an engine/session object for each new connection.
  * The **Connector** attempts to connect to a peer and maintain an engine/session object for each connection.
  * The **Engine** is responsible for communicating over the network.
  * The **Session** exchanges messages through pipes.
  * Each **Pipe** is basically a lock-free queue optimized for fast passing of messages between threads.
