---
Title: Server is not a necessity
Parent: Release
---

## Server is not a necessity

*"Server is not a necessity*" is a principle of offering functions without running a standalone server-side program. 

There are a wide variaty of software that needs to run as servers, such as database, cache, message queue, if you will. They have proved to be stable and mature as many areas as backing system, social network website, blogging website, and even space exploration program. Server, as one of the most closed-form modelings to the real-world challenges, takes care of the queries, messages, caches, etc. It listens on network packages, and send instant responses.

However, it doesn't necessarily means such functions have to be in the server form. There’s a chance to run no additional processes. What if we opt for a library design, that is, fully shift to a design that functions are invoked locally. When opting for a library design, we guarantee the functions provided by the library coexist in the same runtime with the main application. To use an application, you don't need to start process X, Y, Z.

In the rest of the chapter,  I'll show you some industry-proven examples that embrace that principle of "*Server is not a necessity*".

## ZeroMQ: Message Queue as a Library

A traditional *broker* software like RabbitMQ and Kafka needs to run as a standalone application.  Clients first send messages to the broker, and then workers consume messages from the broker. To access the feature of broker software, a client library is often necessary; each function call made to such library is a remote procedure call to the broker. Such component seems so natural that a lot of enterprise systems place the "broker" into the center place of the architecture diagram. To run the application in a healthy state, we need to make sure the message queue application is in a healthy state. However, the maintenance cost is enormous. It means we need operational people and network gurus keep standing by.

Nonetheless, ZeroMQ decides to be a ~~black sheep~~ library, rather than a standalone broker program. Whoever wants to use ZeroMQ, he shall wave his wand and whisper, `pip install zmq; gem install zmq; push () { m=$(cat) && echo \ -e $(printf '\\x01\\x00\\x%02x\\x00%s' \ $((1 + ${#m})) "$m") | nc -q1 $@; }; 唵嘛呢叭咪吽`. After installing the library into the application, he should be able to use it immediately. Note that such a library is completely different from the above thin wrapper library: no broker, less maintenance cost, no risk of single point of failure (SPOF). It is the most interesting design of ZeroMQ.

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

The benefit with the library design is less network round trip and thus higher performance. The messages don't need to go over the network hop twice from senders to broker and then from broker to receivers.

If you still want to have a broker in your architecture design, ZeroMQ won't leash you. It provides building blocks implementing a "broker" in just a few lines of code, probably equal to the amount of work of configuring a broker software. This newly built "broker" is yet another internal thread within your server process. Again, less maintenance cost.

From an implementation perspective, the "official" low-level core API is [libzmq](https://github.com/zeromq/libzmq) written in C/C++. Nonetheless, several language bindings wrap the low-level API in a consistency way, adding more or less sugar that follows the philosophy of different programming languages. Therefore, you can use ZeroMQ in Bash, C, Python, Ruby, Common Lisp, Node.js, Java, etc. The benefit is that you can use the ZeroMQ library in almost all popular languages. Thanks to the enthusiastic ZeroMQ community!

We can find a lot of users of ZeroMQ. The Jupyter Notebook is an open-source web application that provides live code, equations, plotting, and many other features interactively. Under the hood, ZeroMQ plays a vital role in exchanging interactive code, program output, images, etc. The Jupyter *Kernel*, the core of Jupyter Notebook,  uses ZeroMQ accepting incoming frontend connections, handling interactive user inputs, broadcasting responses to all connected frontends. [^3]  Since there is no additional Message Queue process to launch, the users of Jupyter Noteboook only need to type a simple command in a terminal to start the Jupyter Notebook:

```bash
$ jupyter notebook
```

All in all, whether you like it or not, being a library stands as the first fundamental design of ZeroMQ. Its goal is high performance and less maintenance cost. Being a standalone application goes against this goal and never is an option.

## SQLite: Database as a Library

SQLite is a beautifully designed library that is probrarly the most widely deployed and used embedded database engine in the wild. It exists in every Android device, iPhone device, Mac device, Window device, most browsers, and millions of applications. Compacting as less then 600kb, it amazingly runs on different platforms in high performance and meanwhile provides a lot of features. Some programming languages such as Python even integrate it as core modules. For example, in Python, you can create a database file, create a table, save a record in below few lines of code (from [Python sqlite3 module](https://docs.python.org/3/library/sqlite3.html)).

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

As a library, SQLite is in nature "serverless," [^1]. that is, there is no separate server process. You don't need to worry about the data inconsistency due to system crash and power failure (SQLite won't save corrupted data). Since every database statement has to be executed on application side, there is no message round-trips over the network. The trade-off SQLite made is SQLite will only allow one writer at any instant in time.

To keep thing simple, SQLite decides to write all data and the data schema into a single file on disk. The storing capacity of SQLite is up to the size of the disk. In some ways, SQLite is more like `fopen()` than a database engine, just like ZeroMQ is more like socket than a message queue.  By bringing all of the SQL semantics into a single local file, SQLite simplified the design of many applications.

The principle task of SQLite is to evaluate SQL statements. To achieve this goal, SQLite has over 200 APIs, but most of the time you would only use only a few. 

* First, you need to open a connection to an SQLite database file by `sqlite3_open()`;
* Second, you'll execute a SQL statement by `sqlite3_exec() `;
* Last, once consumed the data, you'll need to close the connection by `sqlite3_close()`.

In particular, the function `sqlite3_exec()` wraps four internal functions:

* `sqlite_prepare()` converts SQL string into a *prepared statement* object.
* `sqlite3_step()` evaluates the statement up until the first row. Call this function again and again until the statement is complete. SQL statements such as INSERT, UPDATE, DELETE only need one `sqlite3_step()` call.
* `sqlite3_column()` returns a single column from the result from `sqlite3_step()`.
* `sqlite3_finalize()` destroy the *prepared statement* object returned by `sqlite_prepare()`.

Most of the developers only need to understand what is *connection*, what is *prepared statement* and the given core API. They're simple and easy to use.

Because of its simplicity and wide popularity, many web frameworks also choose SQLite as the default backend for Object-Relational Mapping (ORM). People can write code at a higher abstraction level. For example, in SQLAlchemy, you can use SQLite just as other database engines. It's a wise design because you don't need to launch a database instance when testing the web application.

In short, SQLite is a database in a library form, not in client/server form. Such a design greatly brodens the use of SQLite. Since it doesn't need administration, it's used in many embedded devices and the internet of things. Since it doesn't require network, it's used in many desktop applications and mobile applications.

## DiskCache: Cache as a Library

Caching is a popular add-on layer to any applications that need to accept large volume of traffic. Memcached and Redis are typically the first options to try. Both Memcached and Redis serve as in-memory, key-value data stores. They keeps all data in RAM, which makes them super fast as options for a caching layer. To use Caching reliably, it's often not as easy as starting a Redis instance; it involves setting up a cluster of Redis instances (replication), spliting data set to different Redis instances set (partition), and dynamically determining which instance to be the master (sentinel).

As of today, the cloud-based computing offers not just memory but also gigabytes of empty spaces on disk. Memory usage costs a lot but those disk spaces are for free. It's a bad idea not to use them.

DiskCache is a file backed cache library, written in pure-Python. The interface is pretty simple.

```python
import diskcache as dc
cache = dc.Cache('tmp')
cache[b'key'] = b'value'
print(cache[b'key'])
```

(TODO)

## Conventions

Releasing as a library is often the solution for the principle of *server is not a necessity*.

**Good APIs.** Releasing as a library encourages good APIs. For the good of the library users, the library should provide APIs that are easy to learn, easy to use, hard to misuse, easy to read, easy to extend. The less the library user has to learn how to use the library, the more willingness they want to use it.

**Zero Configuration.** Releasing as a library encourages zero configuration. To be accurate, finer adjustment to the library is nothing different from calling other API functions. Since the library doesn't need to be started, stopped, or configured. And there is nothing needs to be done to tell the system operator that the library is running. There is no need for an administrator to create a running instance or add monitoring checks.  Some libraries support reading configurations, though it's usually not a restriction. The rule of thumb is, it just works.

**The Single Responsibility Principle.** Releasing as a library is affiliated to *the single responsibility principle*; a software should entirely encapsulate its modules, functions and data structures over a single artifact.

There is greater danger that a remote service process dies or upgrades to a backward-incompatible version; but it never happens if the source code is released as a library. The user of a library can lock down the library version and make the application very stable in production.

If you ever need a message queue, or a database, fine; don't ask me to launch a process or set firewall policies, just use a library. It implies that the responsibility of the software is not up to some other people, other organization, or other services, but the people who develops it. If there is a change on the underlying message queue or database, you can always safely upgrade the version in your project dependency and fully test it before re-compiling.

## Further Readings

This chapter only discusses the library design part of ZeroMQ. If you are interested in learning how various message queue patterns are applied in ZeroMQ, don't miss ZGuide (<https://zguide.zeromq.org>). In the article, the author describes the philosophy of ZeroMQ and how to master using ZeroMQ.

The ZeroMQ chapter in book "The Architecture of Open Source Applications" written by Martin Sústrik is a good supplement for learning the architecture of ZeroMQ. In particular, "24.1 Application vs. Library" discusses why ZeroMQ opted for a library design.

SQLite has a series of well-documented articles on its design and use. Check [SQLite Documentation](https://www.sqlite.org/docs.html).

## Conclusion

Through some examples, we learned that the principle of "*server is not a necessity*" redefines the problem domains and yields unavoidably to the most extensive solution for developers. Opting for library encourages rich client-side development. By thinking the problem upside down, such a design makes all library functions living in the application runtime and often ends up to a distributed system with fewer components. It allows us to discover and exploit a solution towards the best performance and extendability from the scope of the problem we want to solve. Most of the time, people do love simplicity. And that is the most valuable treasure we get from this principle.



[^1]: Serverless also refers to running a piece of code on server. Here it means no server process is needed.

[^2]: The Python SQL Toolkit and Object Relational Mapper. https://pypi.org/project/SQLAlchemy/
[^3]: The document of Jupyter Client describes how Jupyter is built on top of ZeroMQ, in particular, python binding of libzmq, <https://jupyter-client.readthedocs.io/en/stable/index.html>.