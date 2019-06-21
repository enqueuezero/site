---
title: Push-Pull Connector
---

Pipe. Pipe provides unidirectional data stream from one component to the other component. Usually one component produces data to one end of the pipe, and the other component consumes them from the other end. It models a very simple producer-consumer interaction. 

UNIX pipe has existed for a very long time and is one of the most elegantly designed connectors. Below program is an example of using UNIX pipe.

    # producer.py
    import sys
    for i in range(100):
        sys.stdout.write("%d\n" % i)

    # consumer.py
    import sys
    for i in sys.stdin.readlines():
        print(i)

    $ python producer.py | python consumer.py

Pipe is not just an inter-process communication (IPC), such a connector has evolved in the cloud-computing era. For example, AWS SQS FIFO queues guarantee that data are processed exactly once in the exact order that they are sent. Despite of the API difference, below programs do the same thing as the UNIX pipe example.

    # producer.py
    import boto3
    sqs = boto3.resource('sqs')
    queue = sqs.get_queue_by_name(QueueName='Example.fifo')
    for i in range(100):
        queue.send_message(
            MessageBody=str(i),
            MessageGroupId='Example'
        )

    # consumer.py
    import boto3
    sqs = boto3.resource('sqs')
    queue = sqs.get_queue_by_name(QueueName='Example.fifo')
    for message in queue.receive_messages():
        print(message.body)
        message.delete()

    $ python producer.py
    $ python consumer.py

(We don't use | operator here since the cloud vendor has move it to the cloud.)

