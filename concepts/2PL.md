---
title: 2PL
permalink: /2PL.html
date: 2018-08-26
category: Computer Science
---

# 2PL

[[toc]]

## Context

The serializability is a concurrency control property that a transaction system guarantees each transaction is getting executed one by one.

The 2PL or Two-Phase Locking is such method to reach serializability.

## Overview

The 2PL is straightforward like its name - it has two phases.

* Phase 1, growing phase.
    * New locks may be acquired.
    * None of them can be released.
* Phase 2, shrinking phase.
    * Existing locks may be released.
    * No new locks can be acquired.

Notably, a LOCK POINT is at which phase 1 ends, that is, when the transaction acquires the last lock it needs.

## Solutions

* SQL Server uses 2PL by default.
* Postgres uses 2PL for the statement BEGIN.
* MySQL InnoDB uses MVCC as its core, however, it uses 2PL for the serializable isolation level. That says MySQL acquires a shared lock on every row or range of rows that are selected in a SQL query.

## Patterns

### Shared Lock v/s Exclusive Lock

2PL handles below two locks.

* Shared Lock: nobody can write anything if one or more shared locks already exist.
* Exclusive Lock: nobody can read or write anything if an exclusive lock exists.

### Cascading Rollback

The cascading rollback is at when handling multiple transactions a failed transaction leads to all other transaction rollbacked in some cases.

For example, say we have below 3 transactions on 2 resources x and y.

* Transaction 1: read(x), write(x), read(y), rollback()
* Transaction 2: read(x), write(x), commit()
* Transaction 3: read(x), commit()
* The scheduler proceeds the operations in below sequence: T1 read(x), T1 write(x), T1 read(y), T2 read(x), T2 write(x), T3 read(x), T1 rollback(), T2 rollback(), T3 rollback(). The dirty read in T2 and T3 causes the rollbacks.

Note: T1=Transaction 1, T2=Transaction 2, T3=Transaction 3. And so as below example.

The 2PL cannot avoid the cascading failure.

### Deadlocks and Starvation

A deadlock is a state when each operation is waiting for some other operations to take action. However, no operation can proceed at all. When the deadlock happens, the system enters a state called starvation.

For example, say we have below two transactions on two resources x and y.

* Transaction 1: write(x), write(y)
* Transaction 2: write(y), write(x)
* The scheduler proceeds the operations in below sequence: T1 write(x), T2 write(y), T1 write(y), T2 write(x). You might notice that none of T1 write(y) and T2 write(x) can proceed as for T1 resource y has been locked by T2, and T2 resource x has been locked by T1.

The 2PL cannot avoid the deadlock.

## References

* [Wikipedia - Two-phase locking](https://en.wikipedia.org/wiki/Two-phase_locking)
* [Two Phase Locking (2-PL)-I](https://www.geeksforgeeks.org/dbms-concurrency-control-protocols-two-phase-locking-2-pl/)
* [A beginner’s guide to the Phantom Read anomaly, and how it differs between 2PL and MVCC](https://vladmihalcea.com/a-beginners-guide-to-the-phantom-read-anomaly-and-how-it-differs-between-2pl-and-mvcc/)
* [Postgres SQL BEGIN](https://www.postgresql.org/docs/6.4/static/sql-beginwork.htm)
