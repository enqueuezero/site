---
title: Status Site
---

# Status Site

## Context

Nowadays, most products are built on top of a platform of distributed services,
which are very likely across multiple data centers in different regions.
The platform as a complicated system is vulnerable to the incidents occurring
in each one of the services.

To be transparent to the community, service provider needs to find out a way to
expose the health of the platform / services. It has below goals:

* Show how reliable the platform / services are.
* Show how well the platform / services recovering from failure.
* Show how performance is as it evolves over time.

In the industry, service providers pivot their heads to a common solution: Status Site.

## Overview

The status site is an individual website listing the individual component statuses
that make up the product.

In order to show incidents, it's essential to maintain and deploy the status site
in a separated environment other than the platform that the main product runs on.

## Solutions

### Commercial Services

There are several commercial status site solutions. Some popular vendors are:

* [statuspage.io](https://www.statuspage.io/)
* [status.io](https://status.io/)
* [statushub.com](https://statushub.com/)

### Open Source Softwares

There are also some OSS projects on the table:

* [Staytus](https://github.com/adamcooke/staytus)
* [Cachethq](https://github.com/CachetHQ/Cachet)
* [cstate](https://github.com/cstate/cstate)

## Patterns

### Different Environment

As the platform hosting the main services might be affected by the incidents,
running the status site in the same platform is a highly risky solution.

For example, [GitHub](https://github.com/) experienced an [incident](https://blog.github.com/2018-10-30-oct21-post-incident-analysis/) that resulted in degraded service for 24 hours and 11 minutes. During the time, the status site was also down. Unfortunately, the status site was built on top of GitHub Pages, which is one of the products running on the GitHub platform. Since the platform was impacted, the status site failed to take up the duty. Two months later, GitHub released a new [Status Page](https://githubstatus.com/) which is based on the commercial solution [statuspage.io](https://statuspage.io/).

Running the status site in a different environment from the main technology stack reduces the risk of being impacted by the incidents in the platform.

### High Availability

The high availability of the status site as the most vital requirement needs it
use infrastructure spanning across multiple regions and providers. Though the status
site as a product is not complicated, it's a great challenge from technical perspective
to keep it highly available.

It means you need to think of below things:

* Monitoring of the status site.
* Auto-scaling system resources. When the incident occurs, many users will come visiting the status site.
* Redundant infrastructure.
* DNS of the status site.
* ...

### Business Context

Showing the uptime is just the basic functionality. Most importantly, 
The status site should show the statuses of the components that matter most to the users.

For example, the status site of a video platform can show below components:

* Is video uploading operational?
* Is video playing operational?
* Is the CDN operational?
* Is the subtitle service operational?
* ...

### Incidents

Showing the progress of ongoing incident is another basic functionality.
The life-cycle of the incident from investigation to remediation gains trust from users.

### Integrating Tools

Allowing users integrating tools to the status site is an add-on.
The status site can provide a range of means to notify users of the incidents,
for example, email, chat applications, SMS, RSS, webhook, etc.

## Conclusions

The status site shows the statuses of components of the product. It's about to
be transparent to users. The reliability and performance being part of the product
feature shows the commitment of not just the engineering team but also the entire
organization.
