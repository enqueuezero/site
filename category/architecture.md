---
title: Concrete Architecture
sidebar: auto
---

# Concrete Architecture

## Part I: Architecture Styles

### [Availability](/availability.html)

Availability measures the percentage of the time that the system is functional and working. It has a very simple formula:

```
   uptime
------------  x 100%
 total time
```

The availability clearly defines how well the system succeeds providing services to the customers. Improving the availability even a little bit needs a lot of men and efforts.

### [Maintainability](/maintainability.md)

It's not surprising that more people are hired for maintaining a legacy system, instead of building from scratch. Improving the maintainability of a system reduces the cost and hence it's an over-going thing that most companies are thriving to achieve.

There is no easy way to measure the maintainability of a system, though we can take a lot of actions to make it simpler, make the life of operations easier, and make it easier to extend and grow.

### [Reliability](/reliability.html)

Reliability defines if the system continuous to work correctly.  To provide a reliable service, the system should be fault-tolerant, or resilient.

Providing a reliable service requires not to just do everything that keeps system available, but also introducing more thorough validations and reviews. A lot of engineering practises makes the service more reliable, for example, code review, continuous integration, security review, health checking, alerting, etc. By leveraging the monitoring & alerting system, we can reduce the time that system is deviated from spec. If necessary, degrade the surrounding features and let the service process only critical business logics.

### [Scalability](/scalability.html)

There are two ways of scaling.

* Vertical scaling, or scaling up, by using more powerful machines with faster CPU, higher memory, and larger disk space.
* Horizontal scaling, or scaling out, by adding more machines into a cluster. The performance of the cluster is the summary of all machines and the network in-between.

Moore's law has reached the end, meaning the limit of vertical scaling is out there.
As a result, if you want your system continuously grow, do horizontal scale!

### [Layered Architecture](/layered-architecture.html)

The layered architecture has several other names, such as onion architecture, the clean architecture, etc. The basic theory is, you organize the components layer by layer in which only the upstream layer can make calls to the downstream layers.

### [Microservices Architecture](/microservices-architecture.html)

Microservices architecture is an architectural style that structured applications as a set of loosely decoupled services. The advantage of microservices architecture is it enables large and complex application to continuously scale and evolve.

## Part II: Architecture Blocks

### [Access Token](/concrete-architecture/access-token.html)

Access Token is a unique string that represents who is using an account browsing the internet.

### [Back-pressure](/back-pressure.html)

Producer-consumer model is very helpful to decouple the system components. However, the situation is quite often in which producer produces jobs more rapidly than consumers can consume them. It's a challenge to manage a large number of unconsumed jobs.

Applying back-pressure is one effective technique to handle high-load. We tend to handle already accepted requests and transactions first, and reject those can't be handled. If you have many components and the producing-consuming speed might mismatch, consider back-pressure.

### [Container](/container.html)

A container is merely an OS process, except that it's being isolated, secured, and limited. All values added to the process make the container the dominant technology in the cloud era.

#### [Container and CGroups](/container-and-cgroups.html)

CGroups is a Kernel feature that organizes processes into hierarchical groups to limit and monitor their system usage such as CPU, memory, disk, network and so on.

#### [Container and Namespace](/container-and-namespace.html)

One major use case of the namespace is to isolate processes belonging to a container from other containers or the system namespace.

#### [Container and NSEnter](/container-and-nsenter.html)

NSEnter is a utility enters the namespaces of one or more other processes and then executes the specified program. In other words, we jump to the inner side of the namespace.

#### [Container and UnionFS](/container-and-unionfs.html)

Union File System or UnionFS variants such as AUFS, btrfs, vfs, and devicemapper are the file system that used by most container engines.  It allows files and directories of separate file systems overlaid one by one, forming a final single coherent file system.

### [Circuit Breaker](/circuit-breaker.html)

Performance issue on upstream service often leads to downstream application crash. By applying with Circuit Breaker on downstream application side, we can prevent the entire system from cascading failure.  The state machine is in the core algorithm of Circuit Breaker. You can choose one of the listed library above and apply one of the listed API style above to improve your service.

### [Data Serialization](/data-serialization.html)

* JSON is usually your first choice. It's simple, human readable, and has most widespread support.
* Use MsgPack instead of JSON if performance is an issue.
* Use Protobuf if type check and schema check is essential. gRPC is recommended as an RPC framework based on Protobuf.
    * Use Thrift if you're developing RPC services and don't like Protobuf syntax.
* Use TOML if you're serializing some config files.
* Use CSV if you're serializing data to non-technical people.
    * Use INI if you want something simpler.
    * Use YAML if you want something more complex.
* Use language built-in serialization functions or methods if the use case is only limited in a single language, and you don't care security that much (not good). 

### [Deployment](/deployment.html)

The goal of software deployment is to prepare a software application to run and operation in a specific environment. There are several deployment models but all of them have the same exit criteria, having a new version of application up and running and the old version retired.

### [Load Balance](/load-balance.html)

Load balancing is fundamental way to build a large distributed system, and hence knowing it well is important. To build a reliable system, a mature load balancer hardware or software is essential. If you have a lot of money, then buy a load balancing hardware. Otherwise, a load balancing software is recommended.

### [DNS Load Balancing](/dns-load-balancing.html)

DNS load balancing distributes requests across multiple IP addresses by configuring various DNS A records. Modern tools enable programmatically updating DNS records. When the incident happens, some of them can even automatically update the DNS records. The downside of DNS load balancing is that it cannot distribute requests evenly to the backend servers.

### [In-Memory Database](/in-memory-database.html)

In-memory databases are faster than on-disk databases because disk access is slower than memory access. Meanwhile, to overcome the drawback of data losing from crashing, we have to introduce strategies like snapshotting, transaction logging, consistent hashing, high availability. Despite of all the complexity introduced, people love in-memory databases when response time is really a criterion since it's probably the best solution. And in most case, Redis could be the first choice.

### [Job Queue](/job-queue.html)

Job queue is an essential component to extend request-response model for handling time-consuming jobs. Choose a Job Queue framework that has API and features you like, and make sure that you have solutions to overcome the disadvantages.

### [Load](/load.html)

Load is a set of numbers that describe performance of system. The meaning of numbers depends on what system is running.

If you are maintaining a production system, the high load averages or percentiles are things to worry about. When they're high, either identify the bottleneck or simply assign more servers or instances.

### [Periodic Scheduler](/periodic-scheduler.html)

Using crontab is the easiest way to schedule periodic jobs. The limitation is that you can’t control the resource usage and it’s less flexible. To run periodic jobs in a fine-controlled environment, you might want to choose Kubernetes CronJob. To leverage the power of periodic scheduler, you might want to integrate a scheduler library into your application.

### Raft

* [Raft and Unreliable Network](/raft-and-unreliable-network.html)

* [Raft and The Nature of Time](/raft-and-the-nature-of-time.html)

### [Sharding](/sharding.html)

Sharding is a type of database partitioning technique that manages the subsets of data on several server hosts. It solves SPOF problem and single server resource limitation but introduces sharding logic to be implemented. Data sharding can be simple or complex depending on the sharding strategy.

### [Sidecar](/sidecar.html)

Sidecar is a term for a one-wheeled device attached to the side of a motorcycle. In engineering, it signifies a deployment model that one or more separate processes or containers deployed along with the application. The solution is:

* Place peripheral tasks like logging, monitoring, proxy, circuit breaker inside a standalone process or container.
* The independent process or container co-locate with the supporting application.
* Provide a generic interface for sending data whatever the programming language of the app is.

### [Status Site](/status-site.html)

The status site is an individual website listing the particular component statuses that make up the product.

It shows below two information:

* Display the status of each function of the business.
* Display A list of incidents organized on a daily basis. If nothing happens, show "No incidents reported.", otherwise, show the details of the incidents, such as when the incidents were detected, how the incidents were handled, and when the incidents were resolved.

It has below goals:

* Show how reliable the platform is.
* Show how well the platform is recovering from failure.
* Show how performance is as it evolves.

The status site shows the statuses of components of the product. It's about to be transparent to users. Users know exactly where to look where there is downtime and staffs will be acting on the information they know is up-to-date.

### [Time-consuming Jobs](/time-consuming-jobs.html)

It's impossible to achieve both goals without changing the execution model, to keep the system responsive all the time and to complete the time-consuming jobs.

There are at least three solutions: slicing jobs, pre-executing jobs, post-executing jobs.

### [Time Series](/concrete-architecture/time-series.html)

A time series is a series of data points indexed (or listed or graphed) in time order.

For example, A Linux system expose its load data by reading from `/proc/loadavg`. Then we could have such a metric that has `proc.loadavg.1m` as metric name, `host=web-1.svc.prod.example.com` as tag, `0.03` as data point value. The time series is a sequence of floating value like `0.03` that reflects system load over time.

## Part III: Architecture Examples

### [SQLAlchemy](/concrete-architecture/sqlalchemy.html)

SQLAlchemy might be the best ORM software in the Python world regardless of your taste. Though you need to learn several fundamental concepts, it's still easy to use. If you're writing a Web application and needs to manipulate data with databases, SQLAlchemy is always a strong candidate.

### [APScheduler](/concrete-architecture/apscheduler.html)

APScheduler is a job scheduling framework that executes code either one-off or periodically. People often integrate it into an existing Python application for running interval jobs.

### [Airbnb](/airbnb-architecture.html)

Airbnb is a website that operates an online marketplace and hospitality service for people to lease or rent short-term lodging. The challenges for the engineering team includes high-availability, quick-scaling, etc.

### [Skipper](/concrete-architecture/skipper.html)

Skipper is an HTTP router and reverse proxy for service composition. The internal modules are well-decoupled and extendable.
It makes adding new data sources and new routing strategies without losing performance.
