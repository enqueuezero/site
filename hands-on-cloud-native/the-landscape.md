---
title: The Landscape of Cloud Native Application
sidebar: auto
---

# The Landscape of Cloud Native Application

:::tip
**Learning Objectives**

After reading this chapter, you should be able to:

* Understand the relationship between Cloud Native Application and its underlying technologies.
* Understand the advantages and disadvantages of Cloud Native Application.
* Understand the life cycle of a Cloud Native Application.
:::

Cloud Native technology empowers organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable infrastructure, and declarative APIs exemplify this approach. The Cloud Native Application has become the next generation technology that programmers and managers have to know about.

## What is Cloud Native Application?

Here is a general definition from Wikipedia.

> [Cloud Native Application is] a type of computer software that natively utilizes services and infrastructure provided by cloud computing providers.

The Cloud native application runs as microservices using an open source software stack, each part of which are packaged into its own container. From a systematic perspective, these individual parts are dynamically orchestrated. The Cloud Native approach has changed the industry and the way people think of the application development and operations.

For example, a startup company decides to deliver a software product to the market. The engineers took one month building a prototype running by docker in local development environment. Next, they launches a Kubernetes cluster on cloud computing platform, such as Amazon EKS, Azure Kubernetes Service, Google Kubernetes Engine, etc. Then, they deploy the application as microservices to the Kubernetes cluster. With more and more consumers start using the product, these smart engineers scale their product for more traffics in 30 seconds. With all these happening, the technology stack remains the same and drives the company growing.

The application running on the cloud computing platform does not necessarily to be a Cloud Native Application, although cloud computing platform provides a lot of infrastructure helping applications being Cloud Native. By providing nearly limitless computer power and on-demand provisions, the cloud computing platform has helped the Cloud Native Application deliver to market faster and performance without pain.

## Why use Cloud Native Application?

<!-- TODO -->

To summarize, the pros of Cloud Native are:

* Cost less, but gain more. Allocate sufficient cloud resources just as you need.
* In favor of microservices architecture.
* Getting full observability on every components in the system.
* Resilient environments: a Cloud Native application can handle well from failure.
* Automatically scale up and down.

## The Life-Cycle of Cloud Native Application

[Please donate this project. It takes time and efforts writing these articles.](/)

## Challenges Introduced by Cloud Native Application

:::tip
There is no free lunch (NFL).
:::

<!-- TODO -->

To summarize, Cloud Native Application is facing below challenges:

* The data persistence is hard.
* Designing a well-decoupled microservices is hard.
* Bring the cloud into local development is hard.
* Maintaining dependencies is hard.

## References

* CNCF Cloud Native Definition v1.0, github.com, <https://github.com/cncf/toc/blob/master/DEFINITION.md>
* What are Cloud-Native Applications?, pivotal.io, <https://pivotal.io/de/cloud-native>
