---
Title: Opt for Library Design
---

# Opt for Library Design

Opting for library design is a principle for distributing software as libraries rather than standalone applications. That is, the user accesses the features of the software by invoking function calls.

Distribution is among the crucial steps in the life cycle of any software. Other than opting for library design, you could choose to opt for command-line interface design, service design, or even mix all of them. Through opting for library design, we guarantee the data and functions provided by the library coexist in the same runtime with the main application. It allows us to discover and exploit a solution towards the best performance and extendability from the scope of the problem we want to solve.

## ZeroMQ: Message Queue as a Library

A traditional broker software like RabbitMQ and Kafka needs to run as a standalone application, then clients send messages to the broker, and workers consume messages from the broker. To access the feature of broker software, a client library is often necessary; each function call made to the broker is a remote procedure call. Such component seems so natural that a lot of enterprise systems place the "broker" into the center place in their seemingly beautiful architecture diagram. To run your application in a healthy state, you need to make sure the message queue application is in a healthy state. However, the maintenance cost is enormous. It means you need operational people and network gurus keep standing by.

Nonetheless, ZeroMQ decides to be a ~~black sheep~~ library, rather than a standalone broker program. Whoever wants to use ZeroMQ, he shall wave his wand and whisper, "pip install zmq; gem install zmq; push () { m=$(cat) && echo \ -e $(printf '\\x01\\x00\\x%02x\\x00%s' \ $((1 + ${#m})) "$m") | nc -q1 $@; }; 唵嘛呢叭咪吽". After installing the library into the application as a project dependency, he should be able to use it immediately. Note that such a library is completely different from the above thin library: no broker, less maintenance cost, less risk of SPOF. It is the most interesting design of ZeroMQ.

[Insert Broker v/s Brokerless Diagram Here]

Below is ZeroMQ in five lines of code:

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

The server code, again, follows BSD Sockets style API; it binds the TCP endpoint `192.168.0.111:5555`, then receives something, and then sends whatever received. Hmm, let me guess, it's an `echo` program. It's not the [smallest echo implementation](https://github.com/matz/streem/blob/master/examples/06echo.strm) yet but is short enough for a human being.

Wait, aren't we talking about message queue? Why did you show me socket thing? Fair enough. I just haven't explained REQ and REP yet. They represent request and reply and lets the socket being synchronous. The `send` and `recv` calls suspend the thread until a new message arrives. Though the code looks like socket operation, it encapsulates message queue semantic in the two constants. If you change the REQ-REP to PUB-SUB, you'll get a full working publisher-subscriber model without changing other code. What's more, you can launch multiple subscribers at the same time. All of them can receive the messages sent from the publisher.

We've all seen how UNIX gets quirky that printing stuff by performing `write` function call to a file under directory `/dev`. It has demonstrated that most read and write can be achieved within a small set of I/O operations. Similarly, why can't the message queue stand on the shoulder of sockets? 

The benefit with the library design is less network round trip and thus higher performance. The messages don't need to go over the network hop twice from senders to broker and then from broker to receivers.

If you still want to have a broker in your architecture design, ZeroMQ won't leash you. It provides building blocks implementing a "broker" in just a few lines of code, probably equal to the amount of work of configuring a broker software. This newly built "broker" is yet another internal thread within your server process. Again, less maintenance cost.

From an implementation perspective, the "official" low-level core API is [libzmq](https://github.com/zeromq/libzmq) written in C/C++. Nonetheless, several language bindings wrap the low-level API in a consistency way, adding more or less sugar that follows the philosophy of different programming languages. Therefore, you can use ZeroMQ in Bash, C, Python, Ruby, Common Lisp, Node.js, Java, etc. The benefit is that you can use the ZeroMQ library in almost all popular languages. Thanks to the enthusiastic ZeroMQ community!

There are indeed disadvantages to using the ZeroMQ library. You'll eat your dog food from the coding perspective. If you write shitty code, then you get a shitty application despite ZeroMQ offering several message patterns. You're no longer able to use global state since ZeroMQ encourages the multi-threading model. The global state requires locking, mutex, etc., which harm the performance of the application. However, one might be thrilled to get the hell out of the deadlock problem.

All in all, whether you like it or not, being a library stands as the first fundamental design of ZeroMQ. Its goal is high performance and less maintenance cost. Being a standalone application goes against this goal and never is an option.

## Questions for ZeroMQ

Let's pretend you are the designer of ZeroMQ, how would you solve below challenges?

1. How do you add a topic-based and content-based subscription to sockets API?
2. What could happen if a timeout occurs when sending and receiving messages.
3. Due to the nature of the distributed system, messages can take forever to send, can be lost, can be duplicated. How would you deal with such cases?
4. Can you improve ZeroMQ to support message persistency before sending the message?

## SQLite: Database as a Library

SQLite is an embedded database engine that is probably the most widely used and deployed in the wild. It exists in every Android device, iPhone device, Mac device, Window device, most browsers, and millions of applications. SQLite is also a beautifully designed library. Compacting as less then 600kb, it amazingly runs on different platforms in high performance and meanwhile provides a lot of features.

As a library, SQLite becomes in nature "serverless," that is, there is no separate server process. A traditional database configuration is needless since every configuration is a [`sqlite_config`](https://www.sqlite.org/c3ref/config.html) function call. You don't need to worry the data inconsistency due to system crash and power failure (SQLite won't save corrupted data).

To keep thing simple, SQLite decides to write all data into a single file on disk. The design of choosing a single disk-file for persistence with a well-defined schema makes SQLite even more popular. In some ways, SQLite is more like `fopen()` than a database engine, just like ZeroMQ is more like socket than a message queue.  By combining all of the SQL semantics with single file operations, SQLite indeed simplified the design of many applications.

SQLite is a built-in module in many programming languages. For example, in Python, you can create a database file, create a table, save a record in below few lines of code (from [Python sqlite3 module](https://docs.python.org/3/library/sqlite3.html)).

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

Because of its simplicity and wide popularity, most web frameworks also choose SQLite as default backend for Object-Relational Mapping (ORM). People can write code at a higher abstraction level. For example, in SQLAlchemy, you can do above similar stuff in below few lines of code. We won't discuss the advantage and disadvantage of ORM here; what's interesting is SQLite works like all other database engines in ORM frameworks under most circumstances without additional setup.

```python
from sqlalchemy import create_engine, Table, Column, Float, String, MetaData, ForeignKey

engine = create_engine('sqlite:///example.db')
metadata = MetaData()

stocks = Table('stocks', metadata,
    Column('date', String),
    Column('trans', String),
    Column('symbol', String),
    Column('qty', Float),
    Column('price', Float)
)

metadata.create_all(engine)

ins = stocks.insert().values(date='2006-01-05', trans='BUY', symbol='RHAT', qty=100, price=35.14)
conn = engine.connect()
conn.execute(ins)
```

## Further Readings

This chapter only discussed the library design part of ZeroMQ. If you are interested in learning how various message queue patterns are applied in ZeroMQ, don't miss ZGuide (<https://zguide.zeromq.org>). In the article, the author described the philosophy of ZeroMQ and how to master using ZeroMQ.

SQLite has a series of well-documented articles on its design and use. Check [SQLite Documentation](https://www.sqlite.org/docs.html).

## Conclusion

Through some examples, we learned that opting for library design redefines the problem domains and yields unavoidably to the most extensive solution. By thinking the problem upside down, such design embedded all functions of the library to the application runtime and often ends up to a distributed system with fewer components. Most of the time, people do love simplicity. And that is the most valuable property we can get from it.
