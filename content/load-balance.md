---
title: Load Balance
category: Computer Science
tags: load-balance, algorithm
date: 2018-06-20
---

## Context

When the load in a single machine can't bear so much traffics, a natural solution is to distribute load on several machines. 

It introduced a new problem to us: how to distribute traffics to several machines? This kind of problem is called load balancing.

## Introduction

### Round-Robin DNS

The simplest way to perform load balancing without any additional software installed is by setting multiple DNS records for servers. The client decides which IP address should be used, normally in round-robin algorithm.

For example, there is a DNS record associated with two IP addresses. The first request will be sent to the first IP address; the second request will be sent to the second IP address; the third request will be sent to the first IP address; and so forth.

Round-Robin DNS has a number of drawbacks. First, client can rewrite DNS through files like `/etc/hosts`, which leads to all traffic sent to just a few servers of all. Second, invalidating DNS record takes up to hours or days, which leads to 1/N traffic sent to the crashed server during this time period. Besides, you usually need to manually remove DNS record for the crashed server.

### Load Balancer

Load Balancer distributes requests across multiple servers in the farm. It can be expensive dedicated high-performance hardware device, or a linux server running Open Source Load Balancer Software, for example, LVS, ipvsadm, or keepalived. In the architecture topology, the load balancer stands logically between the client and the server farm. The Load Balancers increases the capacity and reliability of the backend applications, decreases the burden on backend servers managing and maintaining network sessions.

From OSI layer point of view, it can be categorized into L4 Switch and L7 Switch. L4 Switch works on data following Layer 4 protocols, such as TCP, UDP. L7 Switch works on data following Layer 7 protocols, such as HTTP, SMTP, etc.

## Patterns

### Virtual IP

A Virtual IP, or VIP, is an IP address that corresponds to no actual network interface. Typically a Router routes the data packets with a VIP as the destined address to one of the actual IP addresses in the pool. In this case, Router is a Load Balancer.

For example, we have two hosts with IP addresses configured: `10.0.1.101`, `10.0.1.102` and a VIP with no network interface configured: `10.0.1.100`. We can let Router translate IP packets with `10.0.1.100` as destined address into either `10.0.1.101` or `10.0.1.102`.

### Scheduling Algorithms

Scheduling Algorithm is an essential configuration item for any load balancer software. It specifies how Load Balancer distributes requests to one of the destined backend servers in the farm. We should evaluate the condition of the server farm and make a wise choice, otherwise the load will be unbalanced. Below lists some common seen scheduling algorithms.

#### Round Robin

It distributes requests in equal portion and in circular order. It's simple and starvation-free, generally creating very few load on Load Balancer. It's recommended for cases like all servers having equal performance and generally low or medium size traffic.

#### Least Connections

It selects the server with the least number of active connections for serving requests. It's usually the default algorithm and provides the best performance at most times. For example server-01 is handling 68 active connections, server-02 is handling 1 active connections, server-03 is handling no active connections. By using least connections, the Load Balancer selects server-03 for the next request.

#### Weighted Round Robin

Similar to Round Robin, it distributes requests in circular order but introduces weight for each server in the farm. Servers with higher weight will serve more requests.

#### Weighted Least Connections

It selects the server with the smallest value of `(connection_count + 1) / weight` for serving requests. Similar to Weighted Round Robin, we generally apply these two methods due to some servers having larger computation ability or performance.

## Solutions

* LVS
* ipvsadm
* keepalived
* big-ip ltm

## Conclusions

Load balancing is fundamental way to build a large distributed system, and hence knowing it well is important. To build a reliable system, a mature load balancer hardware or software is essential. If you have a lot of money, then buy a load balancing hardware. Otherwise, a load balancing software is recommended.
