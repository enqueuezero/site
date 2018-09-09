---
title: Hyperloglog
tags: algorithm
category: Computer Science
date: 2018-09-09
---

HyperLogLog is an algorithm that can solve [Count Distinct](count-distinct) problem. A Count Distinct problem is something like getting number 5 for a data set like [1, 3, 2, 1, 5, 2, 4], for it has [1, 2, 3, 4, 5] 5 elements. 

HyperLogLog can provide estimated count on a very large data stream.

* Advantage
    * Fast (O(1)).
    * Memory efficient.
    * Can be distributed and paralleled.
* Disadvantage
    * Only provides estimated count.

## Theory

* Hash each item.
* Place each item into 32 buckets based on first 5-bits of the hash.
* Update value for each item in 32 buckets based on last 27-bits of the hash.
* Apply to some fancy mathematical formulas to get the number based on the 32 buckets data. 

References:

* [Damn Cool Algorithms: Cardinality Estimation](http://blog.notdot.net/2012/09/Dam-Cool-Algorithms-Cardinality-Estimation)
* [Using Linear Counting, LogLog, and HyperLogLog to Estimate Cardinality](http://www.moderndescartes.com/essays/hyperloglog/index.html)
* [HyperLogLog  Playground](https://djhworld.github.io/hyperloglog/)


## Enhancements

### HyperLogLog++

HyperLogLogPlusPlus is an enhancement of HyperLogLog.

* Uses 64-bit integers rather than 32-bit
* Sparse data structure rather than one huge array
* Better bias correction algorithm at lower cardinalities.

## Tools

### Redis

Commands `PFADD`, `PFCOUNT`, and `PFMERGE` are the main interfaces for manipulating HyperLogLog data structure in Redis.

```
redis> PFADD hll a b c d e f g
(integer) 1
redis> PFCOUNT hll
(integer) 7

redis> PFADD hll1 foo bar zap a
(integer) 1
redis> PFADD hll2 a b c foo
(integer) 1
redis> PFMERGE hll3 hll1 hll2
"OK"
redis> PFCOUNT hll3
(integer) 6
```

References:

* [Redis new data structure: the HyperLogLog](http://antirez.com/news/75): If you're developing a web service, Redis might be a good choice.
* [HyperLogLogs in Redis](https://robots.thoughtbot.com/hyperloglogs-in-redis)
* [PFADD](https://redis.io/commands/pfadd): Add all the element arguments to the HyperLogLog data structure referenced as `key`.
* [PFCOUNT](https://redis.io/commands/pfcount): Get the approximated cardinality computed by the HyperLogLog data structure
* [PFMERGE](https://redis.io/commands/pfmerge): Merge multiple HyperLogLog values into one.

### Datasketch

Source code of the script `test.py`:

```
from datasketch import HyperLogLog

data = [1, 2, 3, 5, 2, 4, 1, 6, 7]

hll = HyperLogLog()
for element in data:
    hll.update(str(element).encode('utf8'))

print(f'estimate: {hll.count()}')
print(f'real: {len(set(data))}')
```

Run the script:

```
$ mkdir testdatasketch
$ python3 -mvenv venv
$ source venv/bin/activate
(venv) $ pip install datasketch
(venv) $ python test.py
estimate: 7.097484291802821
real: 7
```

References:

* [datasketch - big data looks small](https://ekzhu.github.io/datasketch/hyperloglog.html): If you're trying to write a simple Python script to solve problem, datasketch might be a good choice.

### Logswan

Logswan can find unique IP addresses in very large log files but only consumes 4MB memory.

```
$ logswan access.log
```

References:

* [logswan - Fast Web log analyzer using probabilistic data structures](https://www.logswan.org/): Good choice for unique visitors counting on common logging file.

## Strategies

### Short-term Bucket & Long-term Merge

* Keep HyperLogLog data for every 10 minutes for the past 24 hours.
* Merge HyperLogLog data into hourly HLL after 24 hours.
* Merge HyperLogLog data into daily HLL after 60 days.
* ...

Example redis usage: `PFADD users:<date>:<hour>:<MM> <UID>`, MM=[00, 10, 20, 30, 40, 50]

References:

* [A lab for HyperLogLogs using Redis & Python](https://gist.github.com/DavidJFelix/113fad6a0a7affdd880d)

