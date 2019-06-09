---
Title: Server is not a necessity
Parent: Release
---

## Server is not a necessity

*"Server is not a necessity*" is a principle of offering functions without running a standalone server-side program.  There are a wide variaty of software that needs to run as servers, such as database, cache, message queue, if you will. They have proved to be stable and mature as many areas as backing system, social network website, blogging website, and even space exploration program. Server, as one of the most closed-form modelings to the real-world challenges, takes care of the queries, messages, caches, etc. It listens on network packages, and send instant responses. However, it doesn't necessarily means such functions have to be in the server form. What if we opt for a library design, that is, fully shift to a design that functions are invoked locally.

In the rest of the chapter,  let's learn from some great open source software that embrace the principle of "*Server is not a necessity*".

A traditional *broker* software like RabbitMQ and Kafka needs to run as a standalone server process.  Clients first send messages to the broker, and then workers consume messages from the broker. To access the feature of broker software, a client library is often necessary; each function call made to such library is a remote procedure call to the broker. To run the application in a healthy state, we need to make sure the message queue application is in a healthy state. However, the administrative cost is enormous. It means we need operational people and network gurus keep standing by.

Nonetheless, ZeroMQ can overcome such short. After installing the library into the application, he should be able to use it immediately. Note that such a library is completely different from the above thin wrapper library: no broker, less maintenance cost, no risk of single point of failure (SPOF). It is the most interesting design of ZeroMQ.

Below is ZeroMQ client in five lines of code:

```python
c = Context() # create context
s = c.socket (REQ) # create socket
s.connect("tcp://192.168.0.111:5555") # connect to the remote queue endpoint
s.send("Hello World!") # send something
print(s.recv ()) # receive something
```

ZeroMQ provides BSD Sockets style API. That's why you see words like `socket`, `connect`, `tcp://`, `send` and `recv`. The code is self-explanatory, and anyone familiar with sockets API should be able to understand what happens here; the program connects to a TCP endpoint `192.168.0.111:5555`, then sends a byte string, then receives something, and print out.

If you are curious what makes the server, I'd say it can be something simpler:

```python
c = Context() # create context
s = c.socket(REP) # create socket
s.bind("tcp://192.168.0.111:5555") # bind address
s.send(s.recv()) # receive and send
```

The server code, again, follows BSD Sockets style API; it binds the TCP endpoint `192.168.0.111:5555`, then receives something, and then sends whatever received. And yes, it's a short-enough version of `echo` program.

Wait, aren't we talking about message queue? Why did you show me socket thing? Fair enough. I just haven't explained REQ and REP yet. They represent request and reply and lets the socket being synchronous. The `send` and `recv` calls suspend the thread until a new message arrives. Though the code looks like socket operation, it encapsulates message queue semantic in the two constants. If you change the REQ-REP to PUB-SUB, you'll get a full working publisher-subscriber model without changing other code. What's more, you can launch multiple subscribers at the same time. All of them can receive the messages sent from the publisher.

We've all seen how UNIX gets quirky that printing stuff by performing `write` function call to a file under directory `/dev`. It has demonstrated that most read and write can be achieved within a small set of I/O operations. Similarly, why can't the message queue stand on the shoulder of sockets? 

Since the above cose usually runs in a worker thread, there is no additional server process, which means no extra network round-trip when client makes calls. The messages don't need to go over the network hop twice from senders to broker and then from broker to receivers. All calls are vanilla functions invokes inside the process. It tends to get higher performance since the network, in essence, is totally unreliable.

If you still want to have a broker in your architecture design, ZeroMQ won't leash you. It provides building blocks implementing a "broker" in just a few lines of code, probably equal to the amount of work of configuring a broker software. This newly built "broker" is yet another internal thread within your server process. Again, less maintenance cost.

From an implementation perspective, the "official" low-level core API is [libzmq](https://github.com/zeromq/libzmq) written in C/C++. Nonetheless, several language bindings wrap the low-level API in a consistency way, adding more or less sugar that follows the philosophy of different programming languages. Therefore, you can use ZeroMQ in Bash, C, Python, Ruby, Common Lisp, Node.js, Java, etc. The benefit is that you can use the ZeroMQ library in almost all popular languages. Thanks to the enthusiastic ZeroMQ community!

We can find a lot of users of ZeroMQ. The Jupyter Notebook is an open-source web application that provides live code, equations, plotting, and many other features interactively. Under the hood, ZeroMQ plays a vital role in exchanging interactive code, program output, images, etc. The Jupyter *Kernel*, the core of Jupyter Notebook,  uses ZeroMQ accepting incoming frontend connections, handling interactive user inputs, broadcasting responses to all connected frontends. [^3]  Since there is no additional Message Queue process to launch, the users of Jupyter Noteboook only need to type a simple command in a terminal to start the Jupyter Notebook:

```bash
$ jupyter notebook
```

All in all, whether you like it or not, being a library instead of a server process stands as the first fundamental design of ZeroMQ. Its goal is high performance and less maintenance cost. Being a standalone application goes against this goal and never is an option.

Let's see another example. SQLite is a beautifully designed library that is probrarly the most widely deployed and used embedded database engine in the wild. It exists in every Android device, iPhone device, Mac device, Window device, most browsers, and millions of applications. Compacting as less then 600kb, it amazingly runs on different platforms in high performance and meanwhile provides a lot of features. Some programming languages such as Python even integrate it as core modules. As a library, SQLite is in nature "serverless," [^1]. that is, there is no separate server process. 

For example, in Python, you can create a database file, create a table, save a record in below few lines of code (from [Python sqlite3 module](https://docs.python.org/3/library/sqlite3.html)).

```python
import sqlite3
conn = sqlite3.connect('example.db')
c = conn.cursor()
c.execute('''CREATE TABLE stocks
             (date text, trans text, symbol text, qty real, price real)''')
c.execute("INSERT INTO stocks VALUES ('2006-01-05','BUY','RHAT',100,35.14)")
conn.commit()
conn.close()
```

Above code connects to a file named `example.db` on local disk. Then, it executes two statements by running `execute` method on a cursor. The `commit` method flushes data on disk. The last line of code close the file handle.

To keep thing simple, SQLite decides to write all data and the data schema into a single file on disk, which means there is no round-trips over the network.  The storing capacity of SQLite is up to the size of the disk. In some ways, SQLite is more like `fopen()` than a database engine, just like ZeroMQ is more like socket than a message queue.  By bringing all of the SQL semantics into a single local file, SQLite simplified the design of many applications.

Finer adjustment to the library is nothing different from calling other API functions. Since the library doesn't need to be started, stopped, or configured. And there is nothing needs to be done to tell the system operator that SQLite is running. There is no need for an administrator to create a running instance or add monitoring checks. It just works.

There is greater danger that a remote service process dies or upgrades to a backward-incompatible version; but it never happens if the source code is released as a library. The user of a library can lock down the library version and make the application very stable in production. It implies that the responsibility of the software is not up to some other people, other organization, or other services, but the people who needs it.

Because of its simplicity and wide popularity, many web frameworks also choose SQLite as the default backend for Object-Relational Mapping (ORM). For example, when you inititate a Ruby-on-Rails project, you don't need to install MySQL or Postgres in development environment. When you execute `rake test`, a command that runs all test cases. If you add configuration `database: ":memory:"`, SQLite can even execute data read and write only in memory.

In short, SQLite is a database in a library form, not in client/server form. Such a design greatly brodens the use of SQLite. Since it doesn't need administration, it's used in many embedded devices and the internet of things. Since it doesn't require network, it's used in many desktop applications and mobile applications.

**Further Readings.** This chapter only discusses the library design part of ZeroMQ. If you are interested in learning how various message queue patterns are applied in ZeroMQ, don't miss ZGuide (<https://zguide.zeromq.org>). In the article, the author describes the philosophy of ZeroMQ and how to master using ZeroMQ. The ZeroMQ chapter in book "The Architecture of Open Source Applications" written by Martin Sústrik is a good supplement for learning the architecture of ZeroMQ. In particular, "24.1 Application vs. Library" discusses why ZeroMQ opted for a library design. SQLite has a series of well-documented articles on its design and use. Check [SQLite Documentation](https://www.sqlite.org/docs.html).

**Conclusion.** Through some examples, we learned that the principle of "*server is not a necessity*" redefines the problem domains and yields unavoidably to the most extensive solution for developers. Opting for library encourages rich client-side development. By thinking the problem upside down, such a design makes all library functions living in the application runtime and often ends up to a distributed system with fewer components. It allows us to discover and exploit a solution towards the best performance and extendability from the scope of the problem we want to solve. Most of the time, people do love simplicity. And that is the most valuable treasure we get from this principle.



[^1]: Serverless also refers to running a piece of code on server. Here it means no server process is needed.

[^2]: The Python SQL Toolkit and Object Relational Mapper. https://pypi.org/project/SQLAlchemy/
[^3]: The document of Jupyter Client describes how Jupyter is built on top of ZeroMQ, in particular, python binding of libzmq, <https://jupyter-client.readthedocs.io/en/stable/index.html>.