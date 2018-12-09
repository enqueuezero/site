---
title: Sharding
permalink: /sharding.html
category: Architecture
tags: database
date: 2018-12-09
---

# Sharding

## Context

Running a single server as data store has below disadvantages:

1. Single point of failure. Once the server dies, the data store is unavailable.
2. Limited CPU, I/O, and disk space.

Running a cluster as a data store can overcome both #1 and #2. The challenge is how to manage data sharding across servers in the cluster.

## Overview

> A database shard is a horizontal partition of data in a database or search engine. Each of multiple shards is held on a separate database server instance to spread the load. [1]

[1]: https://en.wikipedia.org/wiki/Shard_(database_architecture)

Sharding the database means to break up a big database into many smaller databases that distributed across various servers. Each server host a distinct subset of the whole data set with the same schema.

## Solutions

### MySQL Cluster

* [Database Sharding - How does it work?](https://severalnines.com/blog/database-sharding-how-does-it-work)
* [Challenges of Sharding MySQL](https://www.clustrix.com/bettersql/challenges-sharding-mysql/). This post raises a few challenges on sharding: How to handle schema changes on shardings? How to map between sharding key, shards, and physical servers? How to perform cross-node transactions and ACID transactionality?

### GlusterFS

* [GlusterFS - Architecture](https://docs.gluster.org/en/latest/Quick-Start-Guide/Architecture/). Understand basic concepts `brick`, `volume` helps knowing how GlusterFS sharding works. Data in GlusterFS is organized into volumes comprised of bricks. Each shard is a disk on a host called a brick. Each volume is a logical set of disks. The given page shows various sharding strategies and how `glusterfs-server` performs sharding.

### Redis

* [Partitioning: how to split data among multiple Redis instances.](https://redis.io/topics/partitioning): Sharding data among multiple [Redis](https://redis.io) instances can be achieved by [Redis Cluster](https://redis.io/topics/cluster-tutorial) ([spec](https://redis.io/topics/cluster-spec)), [Twenproxy](https://github.com/twitter/twemproxy), or those Redis clients like [Redis-rb](https://github.com/redis/redis-rb) and [Predis](https://github.com/nrk/predis) with support for consistent hashing.

### Elastic

* [[How many shards should I have in my Elasticsearch cluster](https://www.elastic.co/cn/blog/how-many-shards-should-i-have-in-my-elasticsearch-cluster): Data in Elasticsearch is organized into indices. Each index is made up of one or more shards. Each shard is an instance of a Lucene index, which provides a subset of the data in a cluster. Each shard keeps data structure in memory and uses heap space for better performance. Information about mappings and state is stored in the cluster state.

## Patterns

### Horizontal Scaling

It's relatively easy to scale the disk capacity of the cluster by adding more servers. In general, horizontal partitioning is equivalent to sharding.

The advantage is that you don't need to buy expensive commercial DB machines, but instead, run your data store on a set of commodity hardware.

### Sharding Strategies

Deciding which shard to distribute depends on the sharding keys, which are generated from one or more attributes of the data. There are various sharding strategies.

* Geographically sharding. Shard the data by the geo information of the data.
* Range sharding. Shard the data by the id range or time range of the data.
* Hash sharding. Shard the data by applying a hash function to the data.
* Striped sharding. Chunk the data and then shard each chunk.

#### Geographically Sharding

The sharding can be distributed by regions. You can shard data to the region physically close the users accessing the data.

The advantage of geographical sharding is user can access the data faster considering the users are distributed in many places. The disadvantage is that it's naturally vulnerable to the regional infrastructure incident.

#### Hash Sharding

You can shard data to a server based on the hash number, which signifies a host in the cluster. The hash function guarantees the data will be distributed evenly across the shards.

The advantage of hash sharding is each shard can have similar load and resource usage. The disadvantage of hash sharding is when adding a new shard, it will take some time doing re-hashing. Note that [consistent hash]https://en.wikipedia.org/wiki/Consistent_hashing) algorithm can overcome the disadvantage. [Consistent Hash Rings Explained Simply](https://akshatm.svbtle.com/consistent-hash-rings-theory-and-implementation) is an excellent resource for understanding consistent hash.

#### Range Sharding

You can store user data from id=1~1000000 to server A, user data from id=10000001~2000000 to server B, and so forth.

Or, you can store user data created in the year 2018 to server A, 2019 to server B, and so forth.

The advantage of range sharding is the performance is good when executing range queries frequently. The disadvantage is the data might not be evenly distributed.

#### Striped Sharding

You can split a large file into small chunks and then distribute these chunks to different servers.

The advantage is fetching can be faster than distributing a single file, especially when handling a large file. The disadvantage is it involves more server nodes for saving files.

#### Other Sharding Strategies

* Shard randomly.
* Shard by the tenant.
* Shard by server workload.
* Shard by customized logic.
* etc.

### Server-side Sharding v/s Client-side Sharding

Both the server-side and client-side can implement sharding logic.

The server-side sharding has the advantage of client-transparency. The client-side sharding has the advantage of reducing server-side layers.

For example, [MySQL NDB Cluster](https://www.mysql.com/products/cluster/scalability.html) implements server-side sharding. 

### Multiple Replicas

The copies of the data can be distributed to multiple servers to defend single server failure.

When querying, the client-side can perform requests to several servers in parallel.

## Conclusions

Sharding is a type of database partitioning technique that manages the subsets of data on several server hosts. It solves SPOF problem and single server resource limitation but introduces sharding logic to be implemented. Data sharding can be simple or complex depending on the sharding strategy.

