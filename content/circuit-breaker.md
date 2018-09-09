---
title: Circuit Breaker
date: 2018-09-09
category: Computer Science
tags: reactive, circuit-breaker
---

## Context

In a distributed system, an application often has at least one upstream system. When upstream is overloaded, or doomed to fail, the application is very likely to be bogged down as well. Such circumstance is called cascading failure.

As an example, we have an application requiring a remote service. Somehow, the remote service is experiencing performance issue and takes very long time to send response back to the application. Meanwhile, in the application side, it's holding all of the connections that get stuck.  Such behavior eventually causes the application overloaded and even the entire system down.

There are several techniques that can solve cascading failures. Circuit Breaker is among one of them.

## Introduction

Circuit Breaker solves the problem based on below assumptions:

* Something is better than nothing.
    * Provide default fallback values.
    * Provide cached values.
* Partially degraded is better than entirely crash.
    * Fail fast for the features that are using functionalities dependent on upstream.
    * Keep other features all available that are not using functionalities dependent on upstream.

## Use

* Protect upstream service
* Prevent cascading failure

## Patterns

### State Machine

A circuit breaker decorates and monitors a protected function call.  In general, a circuit breaker has a built-in state machine. It implements three types of state: OPEN, CLOSED, and HALF_OPEN.

* Circuit breaker goes into OPEN state when upstream service is doomed to fail.
* Circuit breaker goes into CLOSED state when upstream service is all good.
* Circuit breaker goes into HALF_OPEN state when a timeout timer is expired after going into OPEN state. In such state, Circuit Breaker will try to test if upstream is all good. It switches back to CLOSED state if the answer is yes.

### State Retention

Implementation of the Circuit Breaker needs to retain connection state from upstream. It counts bad state and disallow new requests to upstream when the number of bad state over the threshold.

* In a single-node application, the state of the upstream can be retained in memory. 
* In a multi-node application, the state of upstream can be stored through a persistent storage layer, e.g. a network caching system such as Redis, or local cache such as filesystem.

## APIs

### Set and Check

The following script could be run on a set interval through a daemon or crontab.

```
#!/usr/env/bin python

import pymysql
from redis import Redis

redis = Redis()
connection = None

try:
    connection = pymysql.connect(host='localhost',
                                 port=3306)
    redis.set('circuit-breaker.mysql', 0)
except pymysql.OperationalError:
    redis.set('circuit-breaker.mysql', 1)
finally:
    if connection:
        connection.close()
```

Usage in application is like below.

```
def get_database_record():
    if redis.get('circuit-breaker.mysql'):
        raise ServerInternalError
    connection = pymysql.connect(host='localhost',
                                 port=3306)
    # ...
```

* Advantage:
    * Simplified application usage.
    * Minimum instrument on application.
* Disadvantage:
    * The check is based on ping result, which is not that accurate.

## Decorator Pattern

Circuit breaker can be implemented as a function decorator over the call function. For example, below code has very little semantic change on original code:

Original code:

```
def get_database_record():
    connection = pymysql.connect(host='localhost',
                                 port=3306)
    # ...

record = get_database_record()
```

Decorated code:

```
@circuit_breaker(
    failure_threshold_seconds=5,
    success_threshold_seconds=5,
    delay_seconds=60,
    default_value=None,
)
def get_database_record():
    connection = pymysql.connect(host='localhost',
                                 port=3306)
    # ...

record = get_database_record.failsafe()
```

The decorator function `circuit_breaker` analyzes the error rate of `get_database_record`. When it's over the threshold, it returns `default_value` instead and prevent the function call from hanging.

Another approach of `default_value` is to provide `fallback_function` instead. When it's over the threshold, it calls `fallback_function` and return the value of it.

Netflix `Hystrix` belongs to such pattern.

* Advantage
    * Keep an original function and fail-safety function both.
    * Accurate
    * Can auto heal
* Disadvantage
    * Increase code complexity.

## Future Pattern

In the case of asynchronous programming, Circuit Breaker can also be applied with Future style API. For example, vert.x provides below interface:

```
CircuitBreaker breaker = CircuitBreaker.create("my-circuit-breaker", vertx,
    new CircuitBreakerOptions()
        .setMaxFailures(2.5)
        .setTimeout(2000)
        .setFallbackOnFailure(true)
        .setResetTimeout(10000)
);

breaker.execute(future -> {
  vertx.createHttpClient().getNow(8080, "localhost", "/", response -> {
    if (response.statusCode() != 200) {
      future.fail('unexpected status code');
    } else {
      response
          .exceptionHandler(future::fail)
          .bodyHandler(buffer -> {
            future.complete(buffer.toString());
          });
    }
  }
})
```

* Advantage
    * Accurate
    * Can auto heal
* Disadvantage
    * Increase code complexity.
    * Callback hell.

## Solutions

Below are popular Circuit Breaker libraries.

* [Failsafe](https://github.com/jhalterman/failsafe/)
* [Hystrix](https://github.com/Netflix/Hystrix/)
* [Akka](https://akka.io/)
* [Vert.x](https://vertx.io/)

## Conclusion

Performance issue on upstream service often leads to downstream application crash. By applying with Circuit Breaker on downstream application side, we can prevent the entire system from cascading failure.  The state machine is in the core algorithm of Circuit Breaker. You can choose one of the listed library above and apply one of the listed API style above to improve your service.

## References

* [Akka common: Circuit Breaker](https://doc.akka.io/docs/akka/2.5/common/circuitbreaker.html)
* [Circuit breaker design pattern implementation](https://stackoverflow.com/questions/30285637/circuit-breaker-design-pattern-implementation)
* [Vertx circuit breaker document](https://vertx.io/docs/vertx-circuit-breaker/java/)
