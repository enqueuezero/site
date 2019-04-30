---
title: ZeroMQ
---

# ZeroMQ

## Disclaimer

I am not an expert of ZeroMQ but just interesting how ZeroMQ works. Let me know if I made something wrong! Please report it in [GitHub Issues](https://github.com/soasme/enqueuezero/issues).

## Overview

ZeroMQ in five lines of code: (you know I'm just showing a tip of iceberg, right?)

```python
c = Context() # create context
s = c.socket (REQ) # create socket
s.connect("tcp://192.168.0.111:5555") # connect to the remote queue endpoint
s.send("Hello World!") # send something
print(s.recv ()) # receive something
```

ZeroMQ provides BSD Sockets style API. That's why you see words like `socket`, `connect`, `tcp://`, `send` and `recv`. The code is self-explanatory and anyone who is familiar with sockets api should be able to understand what happens here; the program connects to a TCP endpoint `192.168.0.111:5555`, then sends a bytestring, then receives something, and print out.

I should have shown you the server code: (you know both the client code and server code are just for educational purpose and not useful at all, right?)

```python
c = Context() # create context
s = c.socket(REP)
s.bind("tcp://192.168.0.111:5555")
s.send(s.recv())
```

The server code, again, follows BSD Sockets style API; it binds the TCP endpoint `192.168.0.111:5555`, then receives something, and then sends whatever received. Hmm, let me guess, it's an `echo` program. It's not the [smallest echo implementation](https://github.com/matz/streem/blob/master/examples/06echo.strm) yet, but is easy enough for a human being.

I haven't explain REQ and REP yet. They represents request and reply and let the socket being synchronous. The `send` and `recv` calls suspend the thread until new network data arrives.

Okay. The story ends here if you just want to know how ZeroMQ looks like.

Just in case, if you want to know a little bit more, well, keep reading. You're traversing the stargate into a space full of high energy cosmic rays, quantum information from secret China military satellites, and frog eggs. 🐸

* **Architecture**: As a brokerless message queue library for building distributed applications, ZeroMQ delivers blobs of data (messages) to threads, processes, or even other nodes quickly and efficiently. We'll look into how ZeroMQ achieves this goal.
* **Use**: ZeroMQ acts as a concurrency framework. We'll explore different message patterns and how real-world applications use ZeroMQ.
* **Source Code**: And, enjoy the beauty in the source code of ZeroMQ!
* **Pros/Cons**: Last but not least, we'll see when to use it and when not to use it.

## Architecture

A traditional broker software like RabbitMQ, Kafka, Redis needs to run as a standalone program, then clients send messages to broker, and workers consumes messages from broker.
It seems so natural that a lot of enterprise software place the "broker" into the center place in their seemingly beautiful architecture diagram.
Nonetheless, ZeroMQ decides to be a ~~black sheep~~ library, rather than a standalone broker program.
Whoever wants to use ZeroMQ, he shall wave his wand and whisper, "pip install zmq gem install zmq push () { m=$(cat) && echo \ -e $(printf '\\x01\\x00\\x%02x\\x00%s' \ $((1 + ${#m})) "$m") | nc -q1 $@; } 唵嘛呢叭咪吽". After installing the library into the application as a project dependency, he should be able to use it immediately. No broker, no maintenance cost, no SPOF.
This is the most interesting design of ZeroMQ.

[Insert Broker v/s Brokerless Diagram Here]

## Use

## Source Code

## Pros v/s Cons

## Further Readings

* If you want to know the architecture of ZeroMQ, don't miss out the chapter written by [Martin Sústrik](http://aosabook.org/en/intro2.html#sustrik-martin) in the [aosabook](http://aosabook.org/en/zeromq.html) (The Architecture of Open Source Applications) 
* If you want to know ZeroMQ inside out, read [ZeroMQ - The Guide](http://zguide.zeromq.org/page:all).
