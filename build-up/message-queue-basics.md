---
title: Message Queue Basics
---

# Message Queue Basics

A *message* is the data transported between applications. In essence, it's a sequence of bytes. In the runtimes of the sender and receiver application, each message is a data structure. 

How to interpret the message depends on specific applications. The sender and receiver application have to agree on one particular messaging format. Otherwise, the receiver receives just some random 0s and 1s. Some popular choices for the messaging formats are JSON, XML, Msgpack, gPRC, Thrift, etc.

The sender application has serializer that serializes the data structure of the message into a sequence of bytes. The receiver application has deserializer that reverses it back.

A *message queue* is a queue of messages waiting to be processed. It's, in essence, a buffer data structure and a collection of network interfaces exposing atomic operations on such a data structure. The buffer temporarily holds messages. The network interfaces allow putting, getting, and deleting messages.

The *sender* is a component that plays the role of calling putting messages to the message queue. The *receiver* is a component that plays the role of getting and deleting messages to the message queue.

The message queue provides an asynchronous communications protocol; the sender doesn't require an immediate response for the message to be processed. The benefit is we decouple the sender and the receiver. The downside is the sender never knows if the message is processed unless the receiver sends a processed message back to the message queue.

```
request-response: [ app ] --request--> <--response--- [ app ]
message queue: [ app ] --- (messages) ---> [ app ]
```

The serverless and microservices architecture use the message queue widely.  Since it decouples the software into several pieces of self-contained components, the sender can offload heavyweight processing or batch work to other components. Each component then becomes a single serverless function or a separate microservices.