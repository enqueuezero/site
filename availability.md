---
title: Availability
---

# Availability

## Context

Services running in a 7x24 manner is everywhere. It's a challenge on keeping the system functional and working.

As a service provider, he has commitment to the customers the service is running all good. The [SLI, SLO, and SLA](/the-difference-between-sli-slo-and-sla.html) helps service provider fulfil the commitment. Inside the SLI, SLO, and SLA, the availability is the essence.

## Overview

Availability measures the percentage of the time that the system is functional and working.

It has a very simple formula:

```
   uptime
------------  x 100%
 total time
```

For example, 99.95% as the availability of the service means it must not have outage over 30(days) * 86400(seconds/per day) * 0.05% = 1296(seconds), which is less than 22 minutes.

## Patterns

[Please donate this project. It takes time and efforts writing these articles.](/)

## Conclusions

The availability clearly defines how well the system succeeds providing services to the customers. Improving the availability even a little bit needs a lot of men and efforts.
