---
title: Make Chaos Experiments in Production
---

# Make Chaos Experiments in Production

It may sounds horrible that you deliberately break things to test the production systems. But it's actually a very promising discipline entitled Chaos Engineering orignated from Netflix's Resilience Engineering team. The goal of Chaos Engineering is to verify if the system behaves under a degraded state, instead of a completely disruption, when some of the components are in unhealthy states. It acts as a naughty monkey that randomly stops a service, blocks network traffic on some ports, or makes the system out of disk, etc. If we can make sure the system runs well during the chaos experiments, it's very likely it can defend from the real failures. [1]

**Case Study: Netflix.** Netflix has a fleet of microservices deployed to the public cloud. The complexity of the system determines most of the time the system is in a partial degraded state. The engineers developed Failure Injection Testing (FIT) [2] and Chaos automation platform (ChAP) [3] to build confidences that the failure parts won't turn to a system-wide catastrophic.

[1]: https://blog.acolyer.org/2019/07/05/automating-chaos-experiments-in-production/
[2]: https://medium.com/netflix-techblog/fit-failure-injection-testing-35d8e2a9bb2
[3]: https://blog.acolyer.org/2019/07/05/automating-chaos-experiments-in-production/