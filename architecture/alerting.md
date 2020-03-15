---
title: Alerting
---

# Alerting

## Context

In case the application falling into some unexpected state, we need human intervention to recover the application from normal state. Alerting is the approach to notify humans when there is a notable thing occurs.

## Overview

Alerts indicates the application deviates from a normal state.
The goal of alerting is to reach a human to remedy an issue.
Alerting usually consists of two parts: setting rules and setting notification targets.
Alerting rules defines when to trigger alerts, such as "average response time over last 5 minutes is greater than 2 seconds", "ping check failed over consecutive 3 times", etc.
Alerting targets defines where to send alerts, such as IRC, Slack, Email, PagerDuty, etc.

## Challenges

### Alert Fatigue

Operations is a team of members handling alerts on a daily basis.
Watching a wallboard of alerts can rapidly cause people insensitive to some constant alarms and tends to ignore a potential series issue when happens.
To be fair, over-monitoring is a much harder problem than under-monitoring.

The solution of alert fatigue is to reduce signal-to-noise ratio.
False alarms should be removed and reduced.
Un-actionable alarms should be adjusted. If there is no action needed for the alert, remove the alert.

The point is, human resource is expensive. Keep folks focusing on truly important issues.

### Categorize Alerts

Alerts should be well-organized. Normally, an alert belongs to one of the below kinds.

* Availability and Functionality.
* Latency and Performance.
* Correctness and Durability of data.

Availability check should always be the most critical alerts. Usually, it means some simple up and down check.  The other two kinds can be second-tier alerts.


### Cause-based v/s Symptom-based

Cause-based alerts focus on direct causes such as "host is unreachable", "db connection to sql-42 is unavailable", etc.
Symptom-based alerts focus on abnormal system behaviours, such as "too much 500", "ping check failed", etc 

Symptoms are a better way to capture more problems more comprehensively and robustly with less effort.

### De-duplication


When scaling the alerting components to multiple servers, alerting de-duplication becomes a problem.
Graphite provided a nice solution by using [PySyncObj](https://github.com/bakwc/PySyncObj) to replicate health check data to all servers.

![graphite alerting](https://uploads-ssl.webflow.com/5a57aa7ad1fa2300015ca257/5bf2ed9911bde2ef84554b7a_alerter_beta_pysyncobj.png)

## References

* [My Philosophy on Alerting](https://docs.google.com/document/d/199PqyG3UsyXlwieHaqbGiWVa8eMWi8zzAn0YfcApr8Q/edit#)
* [Adventures in fault tolerant alerting with Python](https://www.hostedgraphite.com/blog/adventures-in-fault-tolerant-alerting-with-python)
