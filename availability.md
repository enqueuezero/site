---
title: Availability
---

# Availability

## Context

Today, most services need to run in 7x24. It's a challenge keeping the system functional and working.

The service provider has commitments to the customers that the service should be up and running. The [SLI, SLO, and SLA](/the-difference-between-sli-slo-and-sla.html) helps dev teams defining the quality of the service. Inside the SLI, SLO, and SLA, the availability is the essence.

## Overview

Availability defines the percentage of the time that the system is functional and working.

It has a straightforward formula:

```
   uptime
------------  x 100%
 total time
```

For example, 99.95% as the availability of the service means it must not have outage over 30(days) * 86400(seconds/per day) * 0.05% = 1296(seconds), which is less than 22 minutes.

## Patterns

### SLO & SLA

SLO, or Service Level Objective, defines the expected availability and how the availability is measured. Every company might have their definition. Nonetheless, SLO is based on the health check or the average request success rates.

SLA, or Service Level Agreement, defines the commitment for the uptime and connectivity.

Getting 99.95% as the SLA is loose than 99.99%. Setting a strict SLA takes a large number of human efforts and infrastructure constantly improvements.

### Target

Getting the availability 100% doesn't necessarily mean that it satisfies customers, depending on the target of the availability measurements. Setting a wrong target to measure will make customers feel cheated.

To set a right target, it requires you:

* Understand the business context.
* Think of issues that impact customers.

For example, you separate a login microservice but screw it up. Now no customers can log into the system doing their jobs. Considering customers being able to log into the system is in the critical business functions, you might want to set targets:

```
<50% of tenants failed login: degradation
<25% of tenants failed login: disruption (SLA impacting)
```

### Frequency

The frequency and the duration of uptime can affect customers as well.

In practical, setting a maximum frequency for different outage durations is good. For example, you have a payslip microservice that run hours often. Frequently occurring short-period outages can make customers annoying. Below frequency SLA on the uptime might make more sense.

* duration 0~2 minutes: maximum 2 times per day.
* duration 2~30 minutes: maximum 1 time per week.
* duration >30minutes: maximum 1 time per month.

### Quantify Tenanted Impacts

It makes sense to derive the availability by the percentage of customers being impacted in an outage for multi-tenanted applications. Not every incident cause complete loss of service for every customer. Some customers might have trouble, while others not.

For example, there are 100 tenants in total. If an outage causes more than 5 tenants, then it means 5% of tenants are impacted.

If there are shared services running for tenanted applications, it also makes sense to collect measurements based on requests per tenant.

### Breach

Breaching the SLA means the availability of the service is beyond the commitment. It often leads to refund or other kinds of compensations.

### Maintenance

Planned maintenance windows usually do not count in the availability report. Any incident occurring in the maintenance window will not lower the bar of the availability. Any maintenance outside the maintenance window should count as outages.

Therefore, a revised version of the formula is like below. The SLA  should clearly define how to report the maintenance window.

```
  total time - outages - maintaince
--------------------------------------  x 100%
             total time

```

### Reporting Period

The unit of the dividend `total time` makes the availability varies. Declare it to a week or a month in the SLA.

For example, a 30 minutes outage makes 99.7% as the availability reporting on a weekly basis, but 99.93% as the availability reporting on a monthly basis.

### Report

Incidents that deviate the availability from 100% often requires a post-mortem report, even if it hasn't breached the commitment.

Having such process helps dev teams do better. It also shows transparency to the customers and possibly gains more trust.

### How to measure?

There are two primary ways of collecting measurements:

* Black-box collecting. The monitoring simulates customers' behaviors. It can leverage by commercial Health Check services like Pingdom, or home-brew ping checks.
* White-box collecting. The monitoring instrument collectors into applications. It can leverage by monitoring agents like Prometheus, Nagios, sensu, etc.

If possible, combining the two to make the availability as accurate as possible.

### How to report?

After collecting the measurement, it's vital how to report those data to customers.

A status page website is a common sense in the industry. You can check [statuspage.io](http://statuspage.io/) or [status.io](https://status.io/). These are useful tools not just reporting availability but also enabling customers to integrate their favorite tools.

It's important to let customers know something like it exists. For example, [GitHub](https://github.com) made an [announcement](https://blog.github.com/2018-12-11-introducing-the-new-github-status-site/) on a new Status Site.

## Conclusions

The availability clearly defines how well the system succeeds in providing services to the customers. Improving the availability of the service is hard. Note that the important thing is not to deliver the agreed SLA but to happy customers. If the numbers are good, but customers are not satisfied, then you need to reconsider the whole thing, set the right measurement target, and validate that again.

