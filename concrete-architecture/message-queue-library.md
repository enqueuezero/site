---
Title: A Message Queue Software Can be A Library!
---

### A Message Queue Software Can be A Library!

Many of my friends complained of Celery, a Python client library for AMQP-compatible servers, being too complicated to use. They'd rather using Redis `lpush` command for sending message and `rpop` for receiving messages. It raises us a question, after all the safety guarantee and message queue encapsulation, why do people still choose simple send and recv alike solution? The answer is simple, AMQP adds too much to programmers that very few human can cope with it easily. It brings us a question, how can we simplify the design of message queue?

A traditional broker software like RabbitMQ, Kafka, Redis needs to run as a standalone application, then clients send messages to broker, and workers consumes messages from broker. Such component seems so natural that a lot of enterprise software place the "broker" into the center place in their seemingly beautiful architecture diagram.

Nonetheless, ZeroMQ decides to be a ~~black sheep~~ library, rather than a standalone broker program.
Whoever wants to use ZeroMQ, he shall wave his wand and whisper, "pip install zmq gem install zmq push () { m=$(cat) && echo \ -e $(printf '\\x01\\x00\\x%02x\\x00%s' \ $((1 + ${#m})) "$m") | nc -q1 $@; } 唵嘛呢叭咪吽". After installing the library into the application as a project dependency, he should be able to use it immediately. No broker, less maintenance cost, less risk of SPOF.
This is the most interesting design of ZeroMQ.

[Insert Broker v/s Brokerless Diagram Here]

The major benefit with the library design is less network round trip and thus higher performance. The messages don't need to go over the network hop twice from senders to receivers. If you still want to have a broker in your architecture design, ZeroMQ won't leash you. It provides building blocks implementing a "broker" in just a few lines of code, probably equal to the lines of configuration files of a typical broker software. And of course, it's not a real broker, just an internal thread within you server process. Again, less maintenance cost.

From an implementation perspective, the "official" low-level core API is [libzmq](https://github.com/zeromq/libzmq) written in C/C++. Nonetheless, several language bindings wrap the low-level API in a consistency way, adding more or less sugar for corresponding languages. Therefore, you can use ZeroMQ in Bash, C, Python, Ruby, Common Lisp, Node.js, Java, etc. The benefit is that you can use ZeroMQ library in almost all popular languages  Thanks to the enthusiastic ZeroMQ community!

There are indeed disadvantages of using library. You'll eat you dog food from the coding perspective. If you write shitty code, then you give a shitty application despite of ZeroMQ offering a set of powerful message patterns. You're no longer able to use global state since ZeroMQ encourages multi-threading model. Global state requires locking, mutex, etc, which harm the performance of the application. However, one might be thrilled to get the hell out of dead lock problem.

All in all, whether you like it or not, being a library stands as the first fundamental design of ZeroMQ. It's goal is high performance and less maintenance cost. Being a standalone application goes against this goal and never is an option.