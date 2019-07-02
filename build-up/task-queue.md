---
title: Task Queues
---

# Task Queues

In the previous example, we demonstrate a typical use case of using message queue to send and receive tasks from a message queue. This pattern has a name - task queues.

Task queues, a.k.a work queues, are message queues that distribute time-consuming tasks as messages among multiple workers.

The goal of task queues is to avoid time-consuming tasks from blocking the application by delaying the execution. The actual execution happens at a different component - worker. A worker process runs in the background, popping tasks from the queue and executing the job. The task is merely a message that has job definition as payload.

There is no limitation on the numbers of the publishers and workers. When there are multiple workers running,  worker processes compete with each other for getting new tasks. The task queue is able to dispatch tasks to different workers evenly. 

```
 [publisher]                   [worker]
              -> [||||||||] -> [worker]
 [publisher]                   [worker]
                     ^ task queue
```

It's pretty common multiple task queues are provisioned for processing different kinds of tasks. Some queue-as-a-service companies can have over thousands of task queues running in the production environment in practice. Such a pattern also serves as a solution for multi-tenanted applications.

```

                           -> [worker]
 [publisher] -> [||||||||] 
                           -> [worker]
                     ^ task queue for image cropping
                     
 [publisher] -> [||||||||] -> [worker]
                     ^ task queue for 3party service calls
```

