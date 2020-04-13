---
title: In-Memory Database
permalink: /in-memory-database.html
category: Architecture
date: 2018-06-11
---

# In-Memory Database

[[toc]]

## Context

Accessing data in memory can be faster than from disk.

In-memory database is a database that keeps the entire dataset in RAM. So it generally has better performance than on-disk databases.

## Use

* When fast data access is a criterion.
* Used as caching layer in front of on-disk databases.

## Common Patterns

Below compares some popular in-memory softwares like Memcached, Redis, etc.

### Socket Connection

Connecting to in-memory databases is usually through a UNIX socket. The in-memory database is designed to be connected fast, so the connection should never hang. We tend to set connection timeout very short, otherwise the frontend servers will have very serious latency and in worst case leading to system crash.

For the same reason, in-memory databases should respond quickly, usually in less than a millisecond.

The in-memory database often can easily handle massive amount of requests per second.

### Key - Value

The fundamental data structure that most in-memory database would provide is setting key-value pairs. It's often called key-value store as well.

For example, both in Memcached and Redis, it supports GET and SET commands:

```
> SET key "hello-world"
> GET key
"hello-world"
```

### GetMulti / SetMulti

Batch data operation is an enhancement on GET / SET. Instead of sending GET operations a thousand times, some in-memory databases provide batch get and get in a single round-trip of network connection.

For example, Redis provides MGET / MSET command:

```
> MSET key1 "hello" key2 "world"
> MGET key1 key2
1) "hello"
2) "world"
```

Not every in-memory database support GetMulti, in some case, it will need in-memory database client library provide a wrapper of GetMulti / SetMulti based on key hashing algorithm. However, the efficient will be less better.

### TTL

Key-values in in-memory databases are often required to set time-to-live (TTL) integers. The key-value pairs applying with TTL will be purged after timeout. This is to reduce the amount of less frequency data in memory, since memory is a very limited resource.

### Data Serialization

Most clients accept complex data structures but will serialize the data structure to a string or byte stream before storing into in-memory database.

Check [Data Serialization](data-serialization) fore more details.

### Richer Data Structures

Key-value cannot meet demands sometimes, therefore some in-memory databases provides richer data structures like relational rows

### Hashing

In-memory database clients could hash keys across multiple servers. This can ensure designated key will only appear in designated servers. This trick help us quickly identify which server stores data.

### Consistent Hashing

Consistent hashing is a special technique of hashing such that when the server number increased, only a portion of keys need to be rehash to the new server. Without consistent hashing, when the new server being added, data cross all servers will be re-hashed, which is unacceptable.

### High Availability

With the help of consistent hashing algorithm, hive availability can be achieved by simply deploying in-memory databases across multiple servers. It's the client's responsibility to ensure the key scattered properly.


### Snapshotting

Recoverability is a big challenge for In-memory databases. Imaging we're experiencing server reboot or process crash, then the data is lost.

Below lists two snapshotting strategies:

* No snapshotting
* Regular Snapshotting

###! No Snapshotting

Some choose no snapshotting at all. It means all data in in-memory database should be durable to lose.

###! Regular Snapshotting

Some offer an alternative solution of persisting data from memory to disk. The requirement is it won't harm the advantage of in-memory. The trick is to sync data in a forked process at an preset interval frequency.

For example, Redis snapshotting can be achieved in below command. It means Redis dumps the dataset to disk every 6000 seconds if at least 1000 keys changed:

```
save 60 1000
```

It works by forking a child process for dumping. The child process writes all data in memory inherited from parent process to a file in disk. It writes data to a new file and replace the new with old when complete. Such process is so-called copy-on-write.

It's recommended to always enable snapshotting. It's for faster reboot that heating the dataset slowing.

### Transaction Logging

Sometimes snapshotting entire dataset can take a huge amount of time. Another approach to boot disaster recovery is to do transaction logging. The theory of transaction logging is to save all WRITE operations into disk. When recovering the data, we replay the WRITE operations. There are generally three options to flush the data to the disk:

* Save but slow: Flush to disk on every update.
* Less save but faster: Flush every a few seconds.
* Least save but fastest: Let Operating System do the flush.

Note that in some case, the transaction replay might leads to different result set. It's not as safety as Snapshotting in data consistency perspective.

The data consistency in in-memory database is often not a strong requirement. So we might possibly see the latest line of transaction logging item is not complete. The solution of Redis is to run a command to fix the broken file:

```
$ redis-check-aof --fix
$ diff old new # check the change manually
$ mv new old # cover the backup file
```

In this case, AOF means append-only fashion. It's a way of describing adding new transactions by appending to logs only, with no update and no deletion on appended transactions.

### Hybrids with on-disk databases

The web application often wrap the cache functionality as a decorator to improve the performance of on-disk database. For example, below Python code demonstrates the pattern:

```
@cache(key='mymodel:{id}', ttl=3600)
def get_my_model(id):
    return Model.query.get(id)
```

Without changing too much to the logic, the function now tries to get data from cache first and only query data from on-disk database when cache missed.

It's a good strategy to reduce QoS on on-disk databases. The downside is that the code become complicated when we need to clean the cache on data updated.

## Comparisons

### Memcached

Memcached is a free & open source, high-performance, distributed memory object caching system.

* Advantages
    * Very simple.
    * Widely supported.
* Disadvantages
    * Commands are not guarantee to be operated successfully, leading to cache inconsitency.

### Redis

> Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs and geospatial indexes with radius queries.

* Advantages
    * Rich document.
    * Rich data structures and features.
    * Small memory footprint.
    * Friendly community.
    * A nice inventor @antirez.
* Disadvantages
    * Neither RDB and AOF is safe, although we must accept such trade-off.

### InMemory Engines

On-disk databases like SQLite, MySQL also ship with an in-memory engine by default. For example, you can open a sqlite database in memory only: 

```
rc = sqlite3_open(":memory:", &db);
```

* Advantages
    * No need to introduce more thing.
* Disadvantages
    * Limited use case.
    * No good support for in-memory database clustering. It's more often used for testing purpose.

## Conclusion

In-memory databases are faster than on-disk databases because disk access is slower than memory access. Meanwhile, to overcome the drawback of data losing from crashing, we have to introduce strategies like snapshotting, transaction logging, consistent hashing, high availability. Despite of all the complexity introduced, people love in-memory databases when response time is really a criterion since it's probably the best solution. And in most case, Redis could be the first choice.
