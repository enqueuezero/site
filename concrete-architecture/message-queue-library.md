---
Title: A Message Queue Can be A Library!
---

# A Message Queue Can be A Library!

## People Don't Like Complicated Solution

Many of my friends have complained of Celery, a Python client library for AMQP-compatible broker programs, being too complicated to use. They'd rather directly using Redis `lpush` command for sending message and `rpop` for receiving messages.

```python
# publisher
client = Redis()
client.lpush(json.dumps(message))
```

```python
# consumer
client = Redis()
message = json.loads(client.rpop())
```

It raises me a question, after all the safety guarantee and message queue encapsulation, why do people still choose send and recv alike solution? The answer is simple, AMQP adds too much to programmers that very few human could cope with it easily.

## Deploy is not the end of development but the start of operations

In order to run you application in normal state, you need to make sure the message queue application is in normal state. Maintenance cost is huge. It means you need operational people and network gurus keep standing by.

A traditional broker software like RabbitMQ, Kafka, Redis needs to run as a standalone application, then clients send messages to broker, and workers consumes messages from broker. Such component seems so natural that a lot of enterprise software place the "broker" into the center place in their seemingly beautiful architecture diagram.

## Another Perspective

Nonetheless, ZeroMQ decides to be a ~~black sheep~~ library, rather than a standalone broker program.
Whoever wants to use ZeroMQ, he shall wave his wand and whisper, "pip install zmq gem install zmq push () { m=$(cat) && echo \ -e $(printf '\\x01\\x00\\x%02x\\x00%s' \ $((1 + ${#m})) "$m") | nc -q1 $@; } 唵嘛呢叭咪吽". After installing the library into the application as a project dependency, he should be able to use it immediately. No broker, less maintenance cost, less risk of SPOF.
This is the most interesting design of ZeroMQ.

[Insert Broker v/s Brokerless Diagram Here]

## Use

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

## Pros and Cons

The major benefit with the library design is less network round trip and thus higher performance. The messages don't need to go over the network hop twice from senders to receivers.

If you still want to have a broker in your architecture design, ZeroMQ won't leash you. It provides building blocks implementing a "broker" in just a few lines of code, probably equal to the lines of configuration files of a typical broker software. This "broker" is just an internal thread within your server process. Again, less maintenance cost.

From an implementation perspective, the "official" low-level core API is [libzmq](https://github.com/zeromq/libzmq) written in C/C++. Nonetheless, several language bindings wrap the low-level API in a consistency way, adding more or less sugar for corresponding languages. Therefore, you can use ZeroMQ in Bash, C, Python, Ruby, Common Lisp, Node.js, Java, etc. The benefit is that you can use ZeroMQ library in almost all popular languages  Thanks to the enthusiastic ZeroMQ community!

There are indeed disadvantages of using library. You'll eat you dog food from the coding perspective. If you write shitty code, then you give a shitty application despite of ZeroMQ offering a set of powerful message patterns. You're no longer able to use global state since ZeroMQ encourages multi-threading model. Global state requires locking, mutex, etc, which harm the performance of the application. However, one might be thrilled to get the hell out of dead lock problem.

All in all, whether you like it or not, being a library stands as the first fundamental design of ZeroMQ. It's goal is high performance and less maintenance cost. Being a standalone application goes against this goal and never is an option.

## Questions

Let's pretend you are the designer of ZeroMQ, how would you solve below challenges?

1. How do you subscribe from multiple publishers? How does the programming API look like?
2. How do you adds topic-based and content-based subscription to sockets API?
3. What could happen if timeout occurs when sending and receiving messages?


## Further Readings

This chapter only discussed the library design of ZeroMQ. If you are interested in learning how various message queue patterns are applied in ZeroMQ, don't miss ZGuide (<https://zguide.zeromq.org>). In the article, it even implemented a primary-backup application by using pub-sub model.

