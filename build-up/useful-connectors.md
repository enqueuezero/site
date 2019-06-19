---
title: Useful Connectors
---

# Useful Connectors

The goal of connectors is to provide a meshanism that allows interaction between components. They can have many forms, not just simple peer-to-peer connections. Advanced connectors are powerful tools that simplifies the problem domains. We'll illustrate some of the most useful connectors in this chapter.

Let's first review what is component. A component performs some computation, and needs input and output. While the connectors are mearly the interconnection mechanisms that transfer input and output between components. To exploit useful connectors, we need to first findout the patterns of data flows.

---

**Remote Procedure Call (RPC).** RPC acts as local procedure call to the program, but it delegates the execution in a different *address space*, commonly on another node. The programmer writes the same code for both remote and local procedure calls. Due to the closed form, RPC is the easiest connector to program with.

RPC models the client-server interaction. Such kind of connector provides request-response as the basic semantic. Caller, as the client, request data; and executor, as the server, response data.

It seems such a connector can only be synchronous; in fact, it can also register callbacks to make the system asynchronous.

**Pipe.** Pipe provides unidirectional data stream from one component to the other component. Usually one component produces data to one end of the pipe, and the other component consumes them from the other end. It models a very simple producer-consumer interaction. 

UNIX pipe has existed for a very long time and is one of the most elegantly designed connectors. Below program is an example of using UNIX pipe.

```python
# producer.py
import sys
for i in range(100):
    sys.stdout.write("%d\n" % i)
```

```python
# consumer.py
import sys
for i in sys.stdin.readlines():
    print(i)
```

```bash
$ python producer.py | python consumer.py
```

Pipe is not just an inter-process communication (IPC), such a connector has evolved in the cloud-computing era. For example, AWS SQS FIFO queues guarantee that data are processed exactly once in the exact order that they are sent. Despite of the API difference, below programs do the same thing as the UNIX pipe example.

```python
# producer.py
import boto3
sqs = boto3.resource('sqs')
queue = sqs.get_queue_by_name(QueueName='Example.fifo')
for i in range(100):
    queue.send_message(
        MessageBody=str(i),
        MessageGroupId='Example'
    )
```

```python
# consumer.py
import boto3
sqs = boto3.resource('sqs')
queue = sqs.get_queue_by_name(QueueName='Example.fifo')
for message in queue.receive_messages():
    print(message.body)
    message.delete()
```

```bash
$ python producer.py
$ python consumer.py
```

(We don't use `|` operator here since the cloud vendor has move it to the cloud.)



