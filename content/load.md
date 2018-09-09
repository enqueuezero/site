---
title: Load
category: Computer Science
tags: load
date: 2018-07-14
---

## Context 

A system might perform very bad sometimes, and thus we need something to measure how bad it is.

Generally such metric is called Load.

## Overview

Load is a set of numbers that describe performance of system. The meaning of numbers depends on what system is running. For example,

* A web application can use "requests per minute" as load.
* A database can use "read per minute" and "write per minute" as load.
* A job queue can use "Number of running jobs" as load.

## Patterns

### Defining system behavior

It's important to define system behavior before describing performance.

If the system is intended to be responsive, then response time or latency can be as load. If the system aims to handle a lot of data, then throughput can be as load. If the system is multi-tasking, then CPU context switch should be considered.

### Response Time v/s Latency

Response time and latency are different. Response time starts from client sending requests and ends when response received. Latency starts from server receiving requests and ends when it starts to handle requests.

### Average v/s Percentile

We generally use monitoring tools getting load parameters, such as Nagios, Sensu, etc. After getting enough sample of monitoring metrics, we needs algorithm to aggregate these concrete values to derive performance load.

The most two important algorithms are average and percentile. 

Average number, or mean: given n numbers, we sum them first and then divide by n.

Percentile: given n numbers, we make sure xx% of metrics are less than defined threshold. For example, percentile 99.9 can mean 99.9% of requests are faster than 200ms.

## Solutions

Generally we categorize system in three types:

* Responsive Systems
* Background Job Systems
* One-Off Job Systems

For Responsive Systems, we usually measure below metrics as load:

* Query per second, or qps.
* Query per minute, or qpm.
* Error Rates.
* Latency.

For Background Job Systems, we usually measure below metrics as load:

* Number of running jobs.
* Number of pending jobs.

For One-Off Job Systems, we usually measure below metrics as load:

* Total seconds of previous job.

Since all systems runs on top of OS, after getting load of systems, it's helpful to have OS load. Below metrics are usually we cares:

* load average over the last 1 minute.
* load average over the last 5 minutes.
* load average over the last 15 minutes.

Are three load metrics can get in one command `uptime`. If you want to know real-time load in terminal, check command `top`. If you want to collect real-time load metric continuously, check command `sar`.

## Conclusions

If you are maintaining a production system, the high load averages or percentiles are things to worry about. When they're high, either identify the bottleneck or simply assign more servers or instances.

## References

* [Prometheus Instrumentation](https://prometheus.io/docs/practices/instrumentation/)
