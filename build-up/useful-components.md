---
title: Useful Components
---



**Virtual Private Cloud (VPC).** The VPC is a virtual network that provides resource provisioning and allocations in a trusted environment. Within the VPC, it typically has several *Availability Zones*, each of which is a high-available offering that protects applications from data center failures. There are more network components inside an availability zone, such as internet gateway, NAT gateway, VPN gateway, routing tables, etc. 

**Computation Node.** Nodes are the entities performing computations. They can be physical hosts or a virtual machine that exists on top of a guest operating system. From a security perspective, it's recommended nodes runs inside a VPC.

**Container.** The container is a lightweight solution that a virtual machine. A set of technologies, such as unionfs, cgroups, namespace, make the container a higher-level abstraction for applications. All required files are packaged into a single container. What's more, the containers run on a resource-limited environment so we don't need to worry about the resource competitions between containers. Containers are essential a collection of processes running in the same namespace. Unlike network gears and nodes, containers are "invisible", that is, only exists in the runtime.

**Load Balancer.** The load balancer handles requests from end-user or internal services, and then forward them to one of the healthy backend instances in the pool.

**Web Service.** The web service is any piece of software that is used for data exchanging over the internet. Popular data exchanging protocols include XML, JSON, gRPC, Thrift, etc.

**Web App.** The web app is any piece of software that is available over the internet. It's a superset of web services. People often relates the web app to those web services have GUI and user interations. Web frameworks were invented to distribute web apps more easily, for example, spring, django, ruby on rails, etc. In the modern era, frontend web frameworks derives a single-page-app design, which encourages implementing the entire user interface in one page by using JavaScript technology.

**Storage.** The storage provides data retrieving and saving. There are many types of storage engines, each of which is optimized for a specific problem domain, such as relational database, in-memory database, searching database, document-oriented database, key-value database, column-oriented database, object database, graph database, time series database, etc.

**Cache.** The cache is a software that caches results from a database. It can return the result faster when calling next time.

**Message Queue.** The message queue is a software that is used for inter-process communication. The processes can be in the same node or different node. The message queue makes it possible that the senders and the receivers do not need to interact with each other directly.

**Artifact Warehouse.** The artifact warehouse is a repository of software for the programming language. It's in essence a database of libraries.

**Logging Warehouse.** The logging warehouse is a repository of logs. Without logging warehouse, logging records either eats all disk spaces in a node or lose due to the logging rotation. We can derive more useful data from logging records. This is where data science steps in!



