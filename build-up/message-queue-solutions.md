---
title: Message Queue Solutions
---

# Message Queue Solutions

There are many solutions to the message queues.

**ActiveMQ.** ActiveMQ (<https://activemq.apache.org/>) is an open source, multi-protocol, Java-based messaging server. It supports protocols like AMQP, MQTT, STOMP, JMS, etc. It has bindings in different languages and platforms. It has built-in REST and Ajax support. What's more, it supports very fast persistence.

**Beanstalkd.** Beanstalkd (<https://beanstalkd.github.io/>) is a simple, fast work queue. It came up with a memcached-inspired text-based protocol that manages the life cycle of messages. It was originally designed for off-loading time-consuming tasks to the background workers and hence reduce the latency of web application. It's written in C and super fast and lightweight.

**Kafka.** Kafka (<https://kafka.apache.org/>) is a messaging system that implemented as a distributed commit log. Message queue is just one of the offerings; the other messaging pattern is pub-sub. It stores the messages in a fault-tolerant durable way. It's a relative heavyweight solution since it runs as a cluster on one or more servers. Its interface is built on top of language-agnostic TCP protocol and versioned. The most traditional usage of Kafka is for real-time stream processing; each message is a record of the stream.

**RabbitMQ.** RabbitMQ (<https://www.rabbitmq.com>) is the most popular open source message broker. It's lightweight and supports multiple messaging protocols, especially the Advanced Message Queuing Protocol (AMQP).  It can be distributed and federated to meet high-scale, high-availability requirements. It also has several offerings, such as message queue, pub-sub, routing, topics, RPC, etc.

**ZeroMQ.** ZeroMQ (<https://www.zeromq.org>) is a brokerless message queue software. It's supposed to be installed into your application rather than managed as a standalone software; that is the message queue resides in the runtime memory of your application. It carries messages across different protocols, such as IPC, TCP, multicast, inproc. Unlike other message queue software, it provides a set of APIs that is more closed to BSD Socket operations.

There are some more SaaS solutions, for example, Amazon MQ, Amazon Simple Queue Service (SQS), Azure Queue, Google Cloud Pub/Sub etc. Cloud solutions doesn't require infrastructure cost. By delegating the maintenance to cloud venders, developers can focus on business logic.