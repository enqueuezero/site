---
title: Count Distinct
category: Computer Science
tags: algorithm
date: 2018-05-31
---

## Problem

Count-distinct problem is a problem of finding the number of distinct elements in a data set or data stream, within which you might possibly see some repeated elements. For example, `[1, 3, 2, 1, 5, 2, 4]` has 5 distinct elements `[1, 2, 3, 4, 5]`.

## Solutions

### Unix commands

Sort input from stdin, and then count lines with unique values.

```bash
$ echo '1
3
2
1
5
2
4' > data.txt
$ sort data.txt | uniq | wc -l
       5
```

* Advantage
    * Easy to use
* Disadvantage
    * Poor performance when data set grows.
    * Huge memory usage when data set grows.
    * Limited data input types
    * Can't handle data set greater than 10^9  (Memory can store so many data).

### Python script

Hold values into a Python `set` data structure, and then count the size of the set.

```python
>>> dataset = [1, 3, 2, 1, 5, 2, 4]
>>> distinct = set()
>>> for element in dataset:
...     distinct.add(element)
...
>>> print(len(distinct))
5
```

* Advantage
    * Easy to use
    * Good performance
    * Broad data input types
* Disadvantage
    * Huge memory usage when data set grows.
    * Can't handle data set greater than 10^9 (Memory can store so many data).

References

* [Python data structures - Set](https://docs.python.org/3/tutorial/datastructures.html#sets)

### SQL Database

Counting distinct values from a table is a built-in feature for most SQL databases.

```sql
> SELECT COUNT(DISTINCT value) FROM table;
```

* Advantage
    * Can handle huge data set (when index is properly set).
* Disadvantage
    * Need to create connection to a database.
    * Limited use case

Reference

* [W3C School - SQL SELECT DISTINCT Statement](https://www.w3schools.com/sql/sql_distinct.asp)

### Redis HyperLogLog Commands

Applying dataset with HyperLogLog algorithm when inserting data. HyperLogLog can give estimated counting results.

```bash
redis> PFADD dataset  1 3 2 1 5 2 4
(integer) 1

redis> PFCOUNT dataset
(integer) 5
```

* Advantage
    * Fast (O(1))
    * Memory efficient (a few KB in memory even counting 10^9 data set).
    * Can be paralleled.
* Disadvantage
    * Only provide estimated counting, not accurate value.

Reference

* [Redis command - PFADD](https://redis.io/commands/pfadd)
* [Redis command - PFCOUNT](https://redis.io/commands/pfcount)
