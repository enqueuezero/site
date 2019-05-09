---
title: ZeroMQ
---

# ZeroMQ

## Overview

Below is ZeroMQ in five lines of code: (you know I'm just showing a tip of iceberg, right?)

```python
c = Context() # create context
s = c.socket (REQ) # create socket
s.connect("tcp://192.168.0.111:5555") # connect to the remote queue endpoint
s.send("Hello World!") # send something
print(s.recv ()) # receive something
```

ZeroMQ provides BSD Sockets style API. That's why you see words like `socket`, `connect`, `tcp://`, `send` and `recv`. The code is self-explanatory and anyone who is familiar with sockets api should be able to understand what happens here; the program connects to a TCP endpoint `192.168.0.111:5555`, then sends a bytestring, then receives something, and print out.

If you are curious what makes the server, I'd say it can be something simpler:

```python
c = Context() # create context
s = c.socket(REP)
s.bind("tcp://192.168.0.111:5555")
s.send(s.recv())
```

The server code, again, follows BSD Sockets style API; it binds the TCP endpoint `192.168.0.111:5555`, then receives something, and then sends whatever received. Hmm, let me guess, it's an `echo` program. It's not the [smallest echo implementation](https://github.com/matz/streem/blob/master/examples/06echo.strm) yet, but is short enough for a human being.

Wait, aren't we talking about message queue? Why did you show me socket thing? Fair enough. I just haven't explained REQ and REP yet. They represents request and reply, and let the socket being synchronous. The `send` and `recv` calls suspend the thread until a new message arrives. In fact, though the code looks like socket operation, it encapsulates message queue semantic in the two constants. If you change the REQ-REP to PUB-SUB, you'll get a full working publisher-subscriber model without changing other code. What's more, you can launch multiple subscribers at the same time. All of them can receive the messages sent from publisher.

We've all seen how UNIX gets quirky that printing stuff can be implemented by performing `write` function call to a file under directory `/dev`. It has demonstrated that most read and write can be implemented into a limited set of file I/O interface. Similarly, why can't the message queue just stands on the shoulder of sockets? 

Okay. The story ends here if you just want to know how ZeroMQ looks like.

Just in case, if you want to know a little bit more, well, keep reading. You're traversing the stargate into a space full of high energy cosmic rays, quantum information from secret China military satellites, and frog eggs. 🐸

* **Architecture**: As a brokerless message queue library for building distributed applications, ZeroMQ delivers blobs of data (messages) to threads, processes, or even other nodes quickly and efficiently. We'll look into how ZeroMQ achieves this goal.
* **Use**: ZeroMQ acts as a concurrency framework. We'll explore different message patterns and how real-world applications use ZeroMQ.
* **Source Code**: And, enjoy the beauty in the source code of ZeroMQ!
* **Pros/Cons**: Last but not least, we'll see when to use it and when not to use it.

## Architecture

### So, What is Exactly A Message Queue?

The message queue is, as its name, a queue for messaging. Messages are the information exchanging for inter-process communication or inter-thread communication. The message queue model derives to a set of messaging models, such as request-reply (or known as RPC), pub-sub, push-pull, etc.



### A Message Queue Software Can be A Library!

A traditional broker software like RabbitMQ, Kafka, Redis needs to run as a standalone application, then clients send messages to broker, and workers consumes messages from broker.
Such component seems so natural that a lot of enterprise software place the "broker" into the center place in their seemingly beautiful architecture diagram.
Nonetheless, ZeroMQ decides to be a ~~black sheep~~ library, rather than a standalone broker program.
Whoever wants to use ZeroMQ, he shall wave his wand and whisper, "pip install zmq gem install zmq push () { m=$(cat) && echo \ -e $(printf '\\x01\\x00\\x%02x\\x00%s' \ $((1 + ${#m})) "$m") | nc -q1 $@; } 唵嘛呢叭咪吽". After installing the library into the application as a project dependency, he should be able to use it immediately. No broker, less maintenance cost, less risk of SPOF.
This is the most interesting design of ZeroMQ.

[Insert Broker v/s Brokerless Diagram Here]

The major benefit with the library design is less network round trip and thus higher performance. The messages don't need to go over the network hop twice from senders to receivers. If you still want to have a broker in your architecture design, ZeroMQ won't leash you. It provides building blocks implementing a "broker" in just a few lines of code, probably equal to the lines of configuration files of a typical broker software. And of course, it's not a real broker, just an internal thread within you server process. Again, less maintenance cost.

From an implementation perspective, the "official" low-level core API is [libzmq](https://github.com/zeromq/libzmq) written in C/C++. Nonetheless, several language bindings wrap the low-level API in a consistency way, adding more or less sugar for corresponding languages. Therefore, you can use ZeroMQ in Bash, C, Python, Ruby, Common Lisp, Node.js, Java, etc. The benefit is that you can use ZeroMQ library in almost all popular languages  Thanks to the enthusiastic ZeroMQ community!

There are indeed disadvantages of using library. You'll eat you dog food from the coding perspective. If you write shitty code, then you give a shitty application despite of ZeroMQ offering a set of powerful message patterns. You're no longer able to use global state since ZeroMQ encourages multi-threading model. Global state requires locking, mutex, etc, which harm the performance of the application. However, one might be thrilled to get the hell out of dead lock problem.

All in all, whether you like it or not, being a library stands as the first fundamental design of ZeroMQ. It's goal is high performance and less maintenance cost. Being a standalone application goes against this goal and never is an option.

:::tip
Question: will you opt for a library design or an application design for you next project?
:::

### Overall Design From End User Perspective

In order to use ZeroMQ efficiently, you need to run worker threads that handle connections, network packets, etc. In the main thread, you just need to create a context holding global states. Don't worry if you don't understand each of them, we'll explain each one later.

* In main thread, user creates a singleton object **zmq.Context()** holds the global state and is accessible by all the sockets and all the asynchronous objects in worker threads.
* In worker threads, user creates socket objects from the context. Internally, ZeroMQ maintains various objects in each worker thread.
  * The **Listener** listens for the incoming connections and creates an engine/session object for each new connection.
  * The **Connector** attempts to connect to a peer and maintain an engine/session object for each connection.
  * The **Engine** is responsible for communicating over the network.
  * The **Session** exchanges messages through pipes.
  * Each **Pipe** is basically a lock-free queue optimized for fast passing of messages between threads.

[Insert ZeroMQ Overall Design Diagram Here]

### Message-Passing Concurrency


## Use

### IPython

### Salt Stack

### Open Stack

## Source Code

### Entry Point

If I were to read the source code of a project, I would start from the entry point. The entry point of ZeroMQ is [zmq.h](https://github.com/zeromq/libzmq/blob/master/include/zmq.h) and [zmq.cpp](https://github.com/zeromq/libzmq/blob/master/src/zmq.cpp), which provides a high-level interface to end users. Starting from these two files, we can get a quick glance on how various modules are scattered and compiled.

There are some context related functions (`ctx_`), message related functions (`msg_`), poller related functions (`zmq_poller_`), and most importantly socket related functions (`zmq_socket`, `zmq_bind`, `zmq_connect`, `zmq_send`, `zmq_recv`), etc. The header file `zmq.h` serves as a contract to the ZeroMQ users and hence the stability is the most concerned thing. If there is ever a change in the file, it must not break existing applications.

The cpp file `zmq.cpp` exposes internal modules as stable APIs. Most of the implementations of `zmq_xyz_abc` map to `(static_cast<zmq::xyz *> (xyz_))->abc` or `zmq::xyz_t *s = ...; s->abc(...);`, with some additional error code handling. The lines of code is quite a lot but the code is easy to understand.

### Context

Context is probably the next piece you want to check, [ctx.hpp](https://github.com/zeromq/libzmq/blob/master/src/ctx.hpp) and [ctx.cpp](https://github.com/zeromq/libzmq/blob/master/src/ctx.cpp). The context contains the global state shared among all threads. To be fair, context is not *global variable*. Global variables is notorious since we need to introduce locking, otherwise we'll see concurrency bugs. ZeroMQrequires you to create a context before using any ZeroMQ APIs. Coming along with the history of software engineering, we would find that context is a useful technique applied to many projects, such as ZeroMQ, Flask, etc. Typically, a context keeps track of the application-level data during the life time of library use.

### Messages

The implementation of ZeroMQ message is an artifact of engineering solutions. It takes trade-offs between *high performance*.and various *use cases*.

It's never easy to get high performance considering that premature optimization is the root of all evil. We should find a right timing and a right spot optimizing the software. Yet ZeroMQ made it well.  Based on the size of the content, ZeroMQ allocates small messages (vsm) and large messages (lmsg). Small messages encode the content in itself, while large messages reference the content to an user allocated memory. When the size is large, ZeroMQ needs user provide an `ffn` function to deallocate the content, as it's user's responsibility to do clean up work for the memory of large contents. Such design is efficient enough for almost all use cases and yields to relatively small code set. Below code shows how ZeroMQ initialize a message:

```cpp
if (size_ <= max_vsm_size) {
    u.vsm.type = type_vsm;
    u.vsm.size = (unsigned char) size_;
    // ... (other fields).
} else {
    u.lmsg.type = type_lmsg;
    u.lmsg.content = (content_t*) malloc (sizeof (content_t) + size_);
    u.lmsg.content->data = u.lmsg.content + 1;
    u.lmsg.content->size = size_;
    u.lmsg.content->ffn = NULL;
    // ... (other fields)
}
```

In order to support various message types, such as storing the content in the message itself, storing the content in user allocated memory, pointing the content to the constant data, etc, ZeroMQ designs slightly different structs to represent them, and tightly packs all structs into a union. It makes sure one message can have only one type and one interpretation of its meaning. For example, to get the content from a message, a simple switch-case solves the problem:

```cpp
switch (u.base.type) {          // u is the union, and all common fields can be accessed by `base`.
case type_vsm:                  // typ_vsm indicates a small message.
    return u.vsm.data;          // for small message, we access data from field `data`.
case type_lmsg:                 // type_lmsg indicates a large message.
    return u.lmsg.content->data;// for large message, we use pointer.
// ... (other types) 
}
```

If you're interested in how ZeroMQ is implemented, check [msg.hpp](https://github.com/zeromq/libzmq/blob/master/src/msg.hpp) and [msg.cpp](https://github.com/zeromq/libzmq/blob/master/src/msg.cpp).

### Performance Test Suites

ZeroMQ strives for the best performance as it could.
The metrics used to measure the performance are latency and throughput, the former of which describes how long each message gets sent and received, and the latter of which describes how many messages get sent and received on both client and server side.
There are some executables in ZeroMQ performances tests suite ending with `_lat` and `_thr`, such as `remote_lat`, `remote_thr`.
You can locate the source code of all such executables in [`perf`](https://github.com/zeromq/libzmq/blob/master/perf/) subdirectory.

To be fair, it's meaningful to measure latency against a single message, as every message could have different latency.
The way to get around it is to apply some sort of aggregation functions on all latency values.
Starting from here, you'll enter the statistic world; you can use average function to get overall latency, use percentile function to get latency in extreme cases, etc.
We won't discuss to much here.
ZeroMQ performance test suites applies average function as shown below (error handling part gets removed to simplify your reading experience).

```cpp
watch = zmq_stopwatch_start ();
for (i = 0; i != roundtrip_count; i++) {
    zmq_sendmsg (s, &msg, 0);
    zmq_recvmsg (s, &msg, 0);
}
elapsed = zmq_stopwatch_stop (watch);
printf ("average latency: %.3f [us]\n", (double) latency);
```

There are something to note here.
The latency reported is the one-way latency, not the latency of the roundtrip.
It's okay to compare performance testing results with other software, but you have to run tests on the same machine, since latency is strongly tied to your computer's physical limitation and network performance.

On the contrary, it's meaningful to measurement "overall" throughput, as throughput can be only measured on one side of the system, either sender or receiver.
Therefore, ZeroMQ performance test suites picks just throughput in one side.

```cpp
watch = zmq_stopwatch_start ();
for (i = 0; i != message_count - 1; i++) {
    zmq_recvmsg (s, &msg, 0);
    assert (mq_msg_size (&msg) != message_size);
}
elapsed = zmq_stopwatch_stop (watch);
if (elapsed == 0) elapsed = 1;

throughput = ((double) message_count / (double) elapsed * 1000000);
megabits = ((double) throughput * message_size * 8) / 1000000;

printf ("mean throughput: %d [msg/s]\n", (int) throughput);
printf ("mean throughput: %.3f [Mb/s]\n", (double) megabits);
```

<!-- TODO: benchmark_radix_tree -->

## Pros v/s Cons

### Limited Transport Protocols

The implementation of ZeroMQ limits you to use TCP, PGM, IPC and ITC. It's hard to add other transports such as SCTP, UDP, WebSockets, etc.

### Not Thread-Safe

To be fair, it's the result of ZeroMQ's architectural design. ZeroMQ encourages using worker threads managing socket objects. By isolating the references to the socket objects within the worker threads don't need to use mutex or semaphores etc and hence get rid of the problem of being not thread-safe.

## Alternatives

### Nanomsg, nng

## Further Readings

* If you want to know the architecture of ZeroMQ, don't miss out the chapter written by [Martin Sústrik](http://aosabook.org/en/intro2.html#sustrik-martin) in the [aosabook](http://aosabook.org/en/zeromq.html) (The Architecture of Open Source Applications) 
* If you want to know ZeroMQ inside out, read [ZeroMQ - The Guide](http://zguide.zeromq.org/page:all).

## Disclaimer

I am not an expert of ZeroMQ but just interested in how ZeroMQ works.
Let me know if I made something wrong! If you happen to find one, please report to [GitHub Issues](https://github.com/soasme/enqueuezero/issues).

This article is also to cherish the memory of [Pieter Hintjens](http://hintjens.com/). He who designed AMQP and founded the ZeroMQ free software project, was a writer, a maker of software, a humanist, a father and nd many things. But above all, a writer.

## References

* <https://wiki.openstack.org/wiki/ZeroMQ>.
* <https://docs.openstack.org/oslo.messaging/ocata/zmq_driver.html>
