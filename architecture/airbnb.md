---
title: Airbnb Architecture
permalink: /airbnb-architecture.html
date: 2018-08-28
category: Architecture
tags: airbnb, aws, load-blance, service-discovery, microservices, mysql
---

# Airbnb Architecture

[[toc]]

## Overview

Airbnb is a website that operates an online marketplace and hospitality service for people to lease or rent short-term lodging. The challenges for the engineering team includes high-availability, quick-scaling, etc. In this post, I put the architecture of Airbnb website in one article. Please tweet to [@enqueuezero] if you think anything is incorrect or out-dated.

Disclaimer: I'm not from Airbnb team and don't know anybody from Airbnb. All information can be found on the Internet, mainly from [the Airbnb engineering blog](https://medium.com/airbnb-engineering).

## Solutions

### AWS Stack

Airbnb uses below AWS services.

* It uses EC2 instances for its application, memcache, and search servers. 
* It uses RDS as main MySQL database.
* It used ELB for traffic load balancing (Note: seems no longer used anymore, check section `Load Balancer` below.).
* It uses EMR for daily data processing and analyzing (Note: seems somewhat out-dated, check section `Data Warehouse` below).
* It uses S3 for backups and static files, including user pictures.
* It uses Amazon CloudWatch to supervise ES2 assets.

### Load Balancer

Charon is Airbnb's front-facing load balancer. Previously it was Amazon's ELB. The decision based on the fact that ELB was clunky and less helpful to troubleshoot.

With Charon, Akamai traffic hits Nginx servers directly. Then the traffic routes to the backend services by Synapse and HAProxy.

### Service Discovery

* SmartStack is an OSS service discovery framework. It has two components: [Nerve](https://github.com/airbnb/nerve) and [Synapse](https://github.com/airbnb/synapse). It relies on Zookeeper to store discovery data, as well as HAProxy for routing.
* Nerve manages the life-cycle of microservices based on health checks.
* Synapse looks up microservices instances and automatically update HAProxy configuration.
* Zookeeper stores znode for the name of the services and provide microservice instances change via Zookeeper watches.

## Web Tier

Airbnb users Rails for the front-end.

## Data Tier

Airbnb uses Amazon RDS as main MySQL database. The databases are deployed in multi-AZ (availability zone). Below 3-tier architecture reflects the basic pattern. Note that there are several types of databases for different scenarios, for example, `airmaster`, `calendar`, `message`, etc. Therefore, there are over a dozen dbproxy and hundreds of database instances gets deployed.

![3 Tier DB](/static/images/airbnb-architecture-3-tier-db.png)

* They're the community edition of MySQL server.
* Each MySQL server uses one-thread-per-connection model.
* Airbnb [forked and modified](https://github.com/airbnb/MaxScale) MariaDB MaxScale for database proxy.
* Main functionalities of this proxy layer include connection pooling, request throttling, query blocklist, etc.

### Infrastructure as code

Airbnb manages infrastructure with [Chef](https://www.chef.io/chef/).

### Data Warehouse

The Airbnb data infrastructure handles metrics, trains machine learning models, and runs business analytics, etc. 

![Data Pipeline](/static/images/airbnb-architecture-data-pipeline.png)

* Kafka performs as a broker for event logs.
* Sqoop performs as a broker for production database dumps.
* The Gold and Silver Hive cluster are the data sinks. The Gold Hive cluster replicates data to silver. The Gold Hive cluster has a higher SLA guarantee.
* A Spark Cluster works on machine learning for stream processing.
* A Presto Cluster is for ad hoc querying.
* An Airflow application runs in front-end for job scheduling.
* S3 is a long-term solution for HDFS data.

### Microservices

Airbnb uses [Dropwizard](https://www.dropwizard.io/1.3.5/docs/) service framework, and customized a Thrift service IDL.

* Developers can choose between JSON-over-http and Thrift-over-http.
* Downstream services need to install generated RPC clients from upstream.
* Downstream services also need to apply standard timeout, retry, and circuit breaker logic.
* The framework adds request and response metrics on both service-side and client-side.
* The framework adds requests context, including request id to all underlying service requests.
* The framework supports adding alerts based on metrics like `p95_latency`, `p99_latency`, etc.

### Search Service

![Search Service](/static/images/airbnb-architecture-search.png)

* Nebula is a schema-less, versioned data store service with both real-time random data access and offline batch data management.
* The search flow only adds some search indexing logic into this system.
* The snapshot is generated daily as a part of the offline data merge.
* The search index is built from the snapshot and then deployed to search periodically as an ordinary binary deploy.

## References

* [Data Infrastructure at Airbnb](https://medium.com/airbnb-engineering/data-infrastructure-at-airbnb-8adfb34f169c)
* [Scaling Airbnb's Experimentation Platform](https://medium.com/airbnb-engineering/https-medium-com-jonathan-parks-scaling-erf-23fd17c91166)
* [What is the Airbnb Software Architecture](https://www.quora.com/What-is-the-AirBNB-Software-Architecture)
* [Airbnb Case Study](https://aws.amazon.com/solutions/case-studies/airbnb/)
* [BinaryAlert: Real-time Serverless Malware Detection](https://medium.com/airbnb-engineering/binaryalert-real-time-serverless-malware-detection-ca44370c1b90)
* [Alerting Framework at Airbnb](https://medium.com/airbnb-engineering/alerting-framework-at-airbnb-35ba48df894f)
* [Scaling Airbnb Payment Platform](https://medium.com/airbnb-engineering/scaling-airbnbs-payment-platform-43ebfc99b324)
* [Measuring Transactional Integrity in Airbnb's Distributed Payment Ecosystem](https://medium.com/airbnb-engineering/measuring-transactional-integrity-in-airbnbs-distributed-payment-ecosystem-a670d6926d22)
* [Tracking the Money - Scaling Financial Reporting at Airbnb](https://medium.com/airbnb-engineering/tracking-the-money-scaling-financial-reporting-at-airbnb-6d742b80f040)
* Building Services, [Part 1](https://medium.com/airbnb-engineering/building-services-at-airbnb-part-1-c4c1d8fa811b), [Part 2](https://medium.com/airbnb-engineering/building-services-at-airbnb-part-2-142be1c5d506)
* [How Airbnb manages to monitor customer issues at scale](https://medium.com/airbnb-engineering/how-airbnb-manages-to-monitor-customer-issues-at-scale-b883301ca461)
* [Experiment Reporting Framework](https://medium.com/airbnb-engineering/experiment-reporting-framework-4e3fcd29e6c0)
* [Streamalert: Real-time Data Analysis and Alerting](https://medium.com/airbnb-engineering/streamalert-real-time-data-analysis-and-alerting-e8619e3e5043)
* [Nebula as a Storage Platform to build Airbnb's Search Backends](https://medium.com/airbnb-engineering/nebula-as-a-storage-platform-to-build-airbnbs-search-backends-ecc577b05f06)
* [Unlocking Horizontal Scalability in Web Serving Tier](https://medium.com/airbnb-engineering/unlocking-horizontal-scalability-in-our-web-serving-tier-d907449cdbcf)
* [Smartstack service discovery in the cloud](https://medium.com/airbnb-engineering/smartstack-service-discovery-in-the-cloud-4b8a080de619)
* [Service Discovery with Smartstack and Docker](https://techblog.poppulo.com/microservices-service-discovery-with-smartstack-and-docker/)


[@enqueuezero]: https://twitter.com/enqueuezero
