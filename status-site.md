---
title: Status Site
---

# Status Site

## Context

Nowadays, most products are built on top of the platform of distributed services,
which are across multiple data centers in different regions.
The platform as a complicated system is vulnerable to the incidents occurring
in each one of the services.

To be transparent to the community, the service provider needs to find out a way to
expose the health of the platform. It has below goals:

* Show how reliable the platform is.
* Show how well the platform is recovering from failure.
* Show how performance is as it evolves.

In the industry, service providers pivot their heads to a solution: Status Site.

## Overview

The status site is an individual website listing the particular component statuses
that make up the product.

It shows below two information:

* Display the status of each function of the business.
* Display A list of incidents organized on a  daily basis. If nothing happens, show
  "No incidents reported.", otherwise, show the details of the incidents, such as
  when the incidents were detected, how the incidents were handled, and when the
  incidents were resolved.

## Solutions

### Commercial SAAS

There are several commercial status site solutions. Some popular vendors are:

* [statuspage.io](https://www.statuspage.io/)
* [status.io](https://status.io/)
* [statushub.com](https://statushub.com/)

### Open Source Softwares

There are also some OSS projects on the table:

* [Staytus](https://github.com/adamcooke/staytus)
* [Cachethq](https://github.com/CachetHQ/Cachet)
* [cstate](https://github.com/cstate/cstate)

### Pros and Cons

Using commercial SAAS let you focus on improving the accuracy of the status and incident
reporting, rather than thinking of keeping the OSS platform highly available. After all,
high availability is a very tough challenge comprised of many subtle techniques.

Using OSS projects let you own the data and not lock into any vendors.

## Patterns

### Domain Concepts

* Pages. A page of statuses and incidents.
* Subscribers. A list of email address that registered to get notified on status change.
* Services & Metrics. The time series data behind the scene supporting the display
  of the statuses.
* Incidents / Issues. The information of what causes the status change. Usually,
  it comprised of title, content, state, impacted services, message.
* Admin Dashboard. The dashboard that staff can update information. It should be
  authenticated and authorized.

### Business Context

The status site should show not just the uptime,  but more importantly,
the status of critical business functions that matter most to the users.

For example, the status site of a video platform can show below statuses:

* Is video uploading operational?
* Is video playing operational?
* Is the subtitle service operational?
* Are all regions operational?
* Is the CDN operational?
* ...

Fine-grained statuses help both users and engineering team understanding the situation quickly.

### Different Environment

As the platform hosting the main service might be affected by the incidents,
running the status site in the same environment is a highly risky solution.

For example, [GitHub](https://github.com/) experienced an
[incident](https://blog.github.com/2018-10-30-oct21-post-incident-analysis/) that
resulted in degraded service for 24 hours and 11 minutes. During the time, the status
site was also down — unfortunately, the status site builts on top of GitHub Pages,
which is one of the products delivered by the GitHub platform. Since the incident impacted the platform, the status site failed to take up the duty. Two months later, GitHub
released a new [Status Site](https://githubstatus.com/) which builds on the
commercial solution [statuspage.io](https://statuspage.io/).

Running the status site in a different environment from the main technology stack
reduces the risk of being impacted by the incidents in the platform.

### High Availability

The high availability of the status site as the most vital technical requirement
needs it using infrastructure spanning across multiple regions and providers.
Though the status site as a product is not complicated, it's a great challenge
to keep it highly available from a technical perspective.

It means you need to think of below things:

* Monitoring of the status site.
* Auto-scaling system resources. When the incident occurs, many users will come to the status site.
* Redundant infrastructure. Deploy the status site to available zones across multiple data centers.
* Duplicate DNS records of the status site.
* Backup network.
* ...

### Integrating Tools

The status site can provide a range of means to notify users of the incidents,
for example, email, chat applications, SMS, RSS, webhook, etc.
When a status changes, subscribers will be instantly notified and prepared.

The implementation of the status site application should use [Job Queue](/job-queue.html) model to distribute notifications.

### Ingest Metrics

To keep the statuses of services up-to-date, a pipeline ingesting metrics to the status site is essential.

In general, the data come from the internal monitoring system, such as Graphite, prometheus, InfluxDB, etc.

Below is an example of minimum set of configurations and scripts to send metrics from prometheus to statuspage.

```bash
#!/usr/bin/env bash
# Save as /usr/local/bin/statuspage-collector (chmod +x)
# crontab: */1 * * * * /usr/local/bin/statuspage-collector

curl -X POST "https://api.statuspage.io/v1/page/${PAGE_ID}/metrics/data" \
  -H"Content-Type: application/json" \
  -H"Authorization: Bearer $TOKEN"
  -d `python /usr/local/bin/collect_metrics.py`
```

Simplified code is like below.

```python
"""
Save as /usr/local/bin/collect_metrics.py
"""
import json
from datetime import datetime
import requests

time = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
res = requests.get('http://localhost:9090/api/v1/query?query=up&time=%s' % time, timeout=10)
data = res.json()
print(json.dumps({
    'data': {
        'metric_id': {
            'timestamp': data['data']['result'][0]['value'][0],
            'value': data['data']['result'][0]['value'][1],
        }
    }
}))
```

## Conclusions

The status site shows the statuses of components of the product. It's about to
be transparent to users.  Users know exactly where to look where there is downtime
and staffs will be acting on the information they know is up-to-date.

The reliability and performance being part of the product feature show the commitment of not just the engineering team but the entire organization.
