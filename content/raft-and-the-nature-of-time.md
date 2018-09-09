---
title: Raft and The Nature of Time
category: Computer Science
tags: raft distributed
date: 2018-09-09
---

The Raft consensus algorithm assumes nodes are in the vicinity, meaning they should be able to communicate very fast. Let's imagine the case of one node on Earth, one node on Mars, and one node on the Moon. It would take minutes for messages communicating between nodes and hence minutes to reach consensus with the best of luck. Most people would rather deploy Raft nodes in one Data Center for the best performance. Also, the defaults heartbeat and election timeout are set to a hundred milliseconds to a few seconds.

At a given moment, the states of different nodes in the Raft cluster are very likely different, meaning they might return different values for a GET command for the same key. The reason is that the Raft consensus algorithm only ensures EVENTUAL CONSENSUS, though we don't know the exact time of reaching consensus. It could be a hundred milliseconds after a heartbeat or a few hours for a crashed node to catch up with the latest leader's state. In essence, it needs time to reach consensus.

In fact, any notion of time in the distributed system control must be tightly tied to the communication. The network latency adds the time the most. Interestingly, the relation of time and communication also appears in Albert Einstein's Theory of Relativity. It seems that it's one the tough problems we need to solve in the physical universe, not necessarily in the Computer Science.
