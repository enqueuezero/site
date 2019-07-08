---
title: Make Chaos Experiments in Production
---

# Make Chaos Experiments in Production

It may sounds scary that you deliberately make some of the production services unavailable for testing purpose. But it's actually a very promising discipline entitled Chaos Engineering orignated from Netflix's Resilience Engineering team. The goal of Chaos Engineering is to verify if the system behaves under a degraded state, instead of a completely disruption, when some of the components are in unhealthy states. It acts as a naughty monkey that randomly stops a service, blocks network traffic on some ports, or makes the system out of disk, etc.