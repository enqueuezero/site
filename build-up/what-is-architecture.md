---
title: So, What is Design?
---

# So, What is Architecture?

Every software looks different and have different shape. For example, we can manage HTTP connections by either Apache or Nginx; despite of the same functionality, both software have completely different interfaces, internal components, etc. The *software architecture* is then used to describe such differences.

Software architecture is as a blueprint for the software. It describes the fundamental structures of the software and the discipline of creating such structures.

The structure of the software is among the critical part of the software architecture. It consists of components and connectors between components. It's common the structure have different views, just as a 3d model can be projected to several 2d graphics in different directions.

Software architecture also includes some important architectural design decisions. It consists of a set of decisions that explains why the software is as-is, what constraints restrict the software, what parts are hard to change, etc.

The software architecture is made by a role - software architect. But it doesn't necessarily map to a dedicated person; anywho who participating the building of the software can be a software architect. When playing as a software architect, we don't care the code implementation that much. Instead, we think from a higher-level, for example, what interfaces is the best for providing user friendly experience, how the components to be connected can make the system easy to understand, develop, maintain, deploy and use. We care people so much because people are the force that drives the software architecting.

---

**Case Study: Redis.** Redis is an in-memory, key-value database. We can describe the architecture of Redis by listing components, connectors, and decisions one by one.

* A software that uses Redis consists of two components: *Redis server* and  *Redis client* (List critical components). Redis clients get or set data. Redis server stores data in-memory by a single-threaded process. (Describe the purpose of the each component). In-between Redis client and Redis server, there is a *request-response* connector (Describe the connector between components).
* All data managed by Redis are in-memory, thus data will be lost when Redis process dies (Specify a decision and its consequence). To overcome it, Redis provides three persistances that dump data to disk: RDB, AOF, and SAVE command. RDB makes a full copy of all data via `fsync()` periodically in another thread. AOF logs all the write commands received by the Redis server in an append-only fasion. You can also force Redis server taking RDB snapshot anytime by sending `SAVE` command via the connector. (Specify another decision)
* ... (There are more decisions to list, for example, key eviction policies, Pub/Sub, Lua scripting, partitioning, transaction, etc)
* Redis is maintained and developed by Salvatore Sanfilippo. But there are more people involved, providing ideas, testing, and bug reporting through code commiting, GitHub issue and mainling list discussions, etc. All these people is playing or played the role of software architect in making Redis. Redis is released under BSD license (Describe who makes the software).

