---
title: Message Queue Basics
---

# Message Queue Basics

A *message* is the data transported between applications. In essence, it's a sequence of bytes. In the runtimes of the sender and receiver application, each message is a data structure. 

How to interpret the message depends on specific applications. The sender and receiver application has to agree on a specific messaging format. Otherwise, the receiver receives just some random 0s and 1s. Some popular choices for the messaging formats are JSON, XML, Msgpack, gPRC, Thrift, etc.

The sender application has serializer that serializes the data structure of the message into a sequence of bytes. The receiver application has deserializer that recover the sequence of bytes back to the data structure.