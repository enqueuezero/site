---
title: The Landscape of Cloud Native Application
sidebar: auto
---

# The Landscape of Cloud Native Application

:::tip
After reading this chapter, you should be able to:

* Understand the relationship between Cloud Native Application and its underlying technologies.
* Understand the advantages and disadvantages of Cloud Native Application.
* Understand the life cycle of a Cloud Native Application.
:::

Cloud Native technology empowers organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable infrastructure, and declarative APIs exemplify this approach. The Cloud Native Application has become the next generation technology that programmers and managers have to know about.

## What is Cloud Native Application?

Here is a general definition from Wikipedia.

> [Cloud Native Application is] a type of computer software that natively utilizes services and infrastructure provided by cloud computing providers.

The Cloud native application runs as microservices using an open source software stack, each part of which are packaged into its own container. From a systematic perspective, these individual parts are dynamically orchestrated. The Cloud Native approach has changed the industry and the way people think of the application development and operations. The application running on the cloud computing platform does not necessarily to be a Cloud Native Application, although cloud computing platform provides a lot of infrastructure helping applications being Cloud Native. By providing nearly limitless computer power and on-demand provisions, the cloud computing platform has helped the Cloud Native Application deliver to market faster and run more stable.

For example, a startup company decides to push a new software product to the market. The engineers took one month building a prototype running by docker in local development environment. Next, they launches a Kubernetes cluster on cloud computing platform, such as Amazon EKS, Azure Kubernetes Service, Google Kubernetes Engine, etc. Then, they deploy the application as microservices to the Kubernetes cluster, which runs as the exact the same thing as they build in development environment. With more and more consumers start using the product, these smart engineers scale their product for more traffics in 30 seconds. Again, there is no modification in the application. Failures might happen, and thus application crash. Fortunately, the Kubernetes cluster can automatically bring the application back to life and happy customers. With all these happening, both the technology stack remains the same and drives the company growing.

## Why use Cloud Native Application?

### Cost Less

There are two basic kinds of costs in business, capital expenses and operational expenses, the former of which includes equipment and cloud resources in order to operate the service, and the latter of which includes people and consumable goods. Cloud Native Application reduces the capital expenses as it runs on cheap computing powers and outsources the maintenance of these computing resources to dedicated commercial vendors.

The amount of operational expenses varies depending on which kind of cloud resources are consumed. Function-as-a-service is usually the cheapest, for example, the monthly compute price of AWS Lambda is $0.00001667 per GB-s and the free tier provides 400,000 GB-s. The monthly request price is $0.20 per 1 million requests and the free tier provides 1M requests per month. Platform-as-a-service and Infrastructure-as-a-service usually cost more, but it also brings better performance and finer-grain control. Nonetheless, all these technologies that Cloud Native Application relies on cost less than building multiple-regional data centers, not to mention the human resource on maintaining them. More importantly, the cloud resources are provisioned on demands. It means business owners doesn't need to overpay the resources. Moving from capital expenses towards operational expenses creates a smoother cash flow for business operations.

### Dedicated Microservices

Microservices architecture is an architectural style that runs an application as a fleet of services that are loosely coupled, highly maintainable and testable. The Cloud Native Application is naturally affiliated to microservices architecture.

Typically, A Cloud Native Application can have an ingress that dispatches traffic to frontend microservice. Then, the frontend microservice goes through a service mesh to look up and establish connections to backend microservices for remote procedure control (RPC). The backend microservices can have a chain of services dependencies. Eventually, the data are persisted into storages or databases. What's more, the application can take event sourcing practice by sending messages asynchronously to other microservices.

The Cloud Native Application shares the benefits of microservices architecture:

* It enables continuous integration and continuous delivery for a large and complex application.
* Each microservice is relatively small and hence has an easy to understand problem domain.
* Each team can dedicate to one or several microservices.

### Full Observability

### Resilience

### Scale Out

<!-- TODO -->

To summarize, the pros of Cloud Native are:

* Cost less. Allocate sufficient cloud resources just as you need.
* In favor of microservices architecture.
* Getting full observability on every components in the system.
* Resilient environments: a Cloud Native application can handle well from failure.
* Automatically scale up and down.

## The Life-Cycle of Cloud Native Application

[Please donate this project. It takes time and efforts writing these articles.](/)

### Demonstrate in Development Environment

### Deliver Containers to Production Environment

### Container Orchestration Occupies the Rest

## Challenges Introduced by Cloud Native Application

:::tip
There is no free lunch (NFL).
:::

### Data Persistence

### Latency

### Cloud In Development Environment

### Dependency

To summarize, Cloud Native Application is facing below challenges:

* The data persistence is hard.
* The latency of microservices architecture is unavoidable.
* Replicating the cloud into local development is hard.
* Maintaining dependencies is hard.

## References

* CNCF Cloud Native Definition v1.0, github.com, <https://github.com/cncf/toc/blob/master/DEFINITION.md>
* What are Cloud-Native Applications?, pivotal.io, <https://pivotal.io/de/cloud-native>
