---
title: Architecture
---

# Architecture

## Topic-wise

### [Layered Architecture](/layered-architecture.html)

The layered architecture has several other names, such as onion architecture, the clean architecture, etc. The basic theory is, you organize the components layer by layer in which only the upstream layer can make calls to the downstream layers.

Most systems are designed in the layered architecture.

## Software-wise

### [The Architecture of SQLAlchemy](/the-architecture-of-sqlalchemy.html)

SQLAlchemy might be the best ORM software in the Python world regardless of your taste. Though you need to learn several fundamental concepts, it's still easy to use. If you're writing a Web application and needs to manipulate data with databases, SQLAlchemy is always a strong candidate.

### [The Architecture of APScheduler](/apscheduler.html)

APScheduler is a job scheduling framework that executes code either one-off or periodically. People often integrate it into an existing Python application for running interval jobs.

## Company-wise

### [Airbnb Architecture](/airbnb-architecture.html)

Airbnb is a website that operates an online marketplace and hospitality service for people to lease or rent short-term lodging. The challenges for the engineering team includes high-availability, quick-scaling, etc.

TODO:

programming:
async-and-sync
lock-free-queues
actor-model
asgi
wsgi
pseudo-random numbers
timezone
raft-and-stream-paradigm
container-and-cgroups
container-and-unionfs
container-and-namespace
container-and-nsenter
container-and-unshare
ffi
coroutine
language grammar



architecture:
job-queue
time-consuming-jobs
in-memory-database
secure-socks5-proxy
circuit-breaker
data-serialization
load-balance
back-pressure
url-dispatcher
2pl
periodic-scheduler
the-difference-between-sli-slo-sla
raft-and-unreliable-network
raft-and-the-nature-of-time
container
load

