---
title: Hands-On Cloud Native Application
sidebar: auto
---

# Hands-On Cloud Native Application

:::tip
This book is still working in-progress. Please support this project by donating via [Patreon](https://www.patreon.com/join/enqueuezero) or sending [Pull Requests](https://github.com/soasme/enqueuezero).
:::

Since the wide adoption of the container technology and cloud computing, the Cloud Native application has become one of the most popular engineering practices. Now, even programmers with very few infrastructure knowledge can launch a great fleet of cloud native applications for serving millions of requests. The practical book shows you how to make it happen.

Through the book, you will learn concrete examples, minimal theory, and how to build and deliver a typical React-based front-end and Flask-based back-end to cloud platform.

# Table of Content


## [Preface](preface.md)

* [The Cloud Native Wave](preface.md#the-cloud-native-wave)
* [Make Your Application Cloud Native](preface.md#make-your-application-cloud-native)
* [Objective and Approach](preface.md#objective-and-approach)
* [Prerequisites](preface.md#prerequisites)
* [Roadmap](preface.md#roadmap)
* [Conventions](preface.md#conventions)
* [Resources](preface.md#resources)
* [How to Contact Me](preface.md#how-to-contact-me)
* [Acknowledgements](preface.md#acknowledgements)
* [References in Preface](preface.md#references-in-preface)

## [Chapter 1. The Landscape of Cloud Native Application](the-landscape.md)

* [What is Cloud Native Application?](the-landscape.md#what-is-cloud-native-application)
* [Why use Cloud Native Application?](the-landscape.md#why-use-cloud-native-application)
  * [Cost Less](the-landscape.md#cost-less)
  * [Dedicated Microservices](the-landscape.md#dedicated-microservices)
  * [Full Observability](the-landscape.md#full-observability)
  * [Resilience](the-landscape.md#resilience)
  * [Scale](the-landscape.md#scale)
* [The Life-Cycle of Cloud Native Application](the-landscape.md#the-life-cycle-of-cloud-native-application)
  * [Demonstrate in Development Environment](the-landscape.md#demonstrate-in-development-environment)
  * [Deliver Containers to Production Environment](the-landscape.md#deliver-containers-to-production-environment)
  * [Container Orchestration Occupies the Rest](the-landscape.md#container-orchestration-occupies-the-rest)
* [Challenges Introduced by Cloud Native Application](the-landscape.md#challenges-introduced-by-cloud-native-application)
  * [Data Persistence](the-landscape.md#data-persistence)
  * [Latency](the-landscape.md#latency)
  * [Cloud Services](the-landscape.md#cloud-services)
  * [Security](the-landscape.md#security)
* [References](the-landscape.md#references)

## Part I

* Craft Toolkit
  * Setup Homebrew
  * Setup Git
  * Setup Python
  * Setup NodeJS
  * Setup Terraform
  * Setup Virtualbox
  * Setup Minikube
  * Setup Docker
  * Setup Docker-Compose
  * Setup Helm

## [Chapter 2. Getting Started with React](react.md)

* [What is React?](react.md#what-is-react)
* [Play Around with React](react.md#play-around-with-react)
  * [Create a New App](react.md#create-a-new-app)
  * [Start React App](react.md#start-react-app)
  * [Test React App](react.md#test-react-app)
  * [Make the First Change](react.md#make-the-first-change)
  * [Handle Routes](react.md#handle-routes)
  * [Setup 404 Page](react.md#setup-404-page)
  * [Setup App Page](react.md#setup-app-page)
* [Why use React?](react.md#why-use-react)
  * [Declarative](react.md#declarative)
  * [Virtual DOM is Fast](react.md#virtual-dom-is-fast)
  * One-Way Data Binding
* [Essential Knowledge](react.md#essential-knowledge)
  * [JSX](react.md#jsx)
  * [Virtual DOM](react.md#virtual-dom)
  * [Actual DOM](react.md#actual-dom)
  * [Components](react.md#components)
  * [States](react.md#states)
  * [Events](react.md#events)
  * [Hooks](react.md#hooks)
  * Functional Programming
* Summary
* [References](react.md#references)

## [Chapter 3. Play around with Containers](container.md)

* [What is Container?](container.md#what-is-container)
  * [Container Introduction](container.md#container-introduction)
  * [A Little Bit Background, Visualization](container.md#a-little-bit-background-visualization)
  * [Container v/s Visualization](container.md#container-v-s-visualization)
* [Why use Container?](container.md#why-use-container)
  * [Physical Resources Isolation](container.md#physical-resources-isolation)
  * [Kernel Resources Isolation](container.md#kernel-resources-isolation)
  * [Eliminate the Difference between Environments](container.md#eliminate-the-difference-between-environments)
* [Essential Knowledge](container.md#essential-knowledge)
  * [Host Machine](container.md#host-machine)
  * [CGroups](container.md#cgroups)
  * [Unshare](container.md#unshare)
  * [Namespace](container.md#namespace)
  * [UnionFS](container.md#unionfs)
  * [OCI](container.md#oci)
  * [Image](container.md#image)
  * [Volume](container.md#volume)
* [Containerize the Front-End Application](container.md#containerize-the-front-end-application)
  * [Run Busybox Container](container.md#run-busybox-container)
  * [Dockerfile](container.md#dockerfile)
  * [Build Our First Image](container.md#build-our-first-image)
  * [Run Front-End Container](container.md#run-front-end-container)
  * [Inspect Container](container.md#inspect-container)
  * [Clean Up](container.md#clean-up)
  * [Push Image to DockerHub Registry](container.md#push-image-to-registry)
* [References](container.md#references)

## [Chapter 4. Build Front End App](/hands-on-cloud-native/front-end.html)

* Before We Start the Development
* Overview
* Wrapping Up
* References

## [Chapter 5. Build a Microservice](/)

* What is HTTP Framework?
* Why use HTTP Framework?
* Essential Knowledge
  * ASGI v/s WSGI
  * Request & Response
* Getting Started
  * Project Setup
  * Run a Server
  * Create Schema
  * Add GraphQL Endpoint
  * Connect to a PostgreSQL Database
  * Add WebSockets Support
  * Add OAuth2 Login
  * Add Dockerfile
* Summary
* References

## [Chapter 6. Play around with GraphQL](graphql.md)

* [What is GraphQL?](graphql.md#what-is-graphql)
  * [GraphQL v/s RESTful](graphql.md#graphql-v-s-restful)
* [Why use GraphQL?](graphql.md#why-use-graphql)
  * [No Over-Fetching](graphql.md#no-over-fetching)
  * [No Under-Fetching](graphql.md#no-under-fetching)
  * [Strongly Typed Schema](graphql.md#strongly-typed-schema)
* [Challenges](graphql.md#challenges)
  * [Server-side Cache](graphql.md#server-side-cache)
* [Essential Knowledge](graphql.md#essential-knowledge)
  * [Schema Definition Language](graphql.md#schema-definition-language)
  * [Fetch Data](graphql.md#fetch-data)
  * [Query Arguments](graphql.md#query-arguments)
  * [Apply Mutations](graphql.md#apply-mutations)
  * [Define Schema](graphql.md#define-schema)
  * [Resolvers](graphql.md#resolvers)
* [Solutions](graphql.md#solutions)
* [Play around with GraphQL](graphql.md#play-around-with-graphql)
  * Install json-graphql-server
  * Install Apollo
  * Prepare React Component
  * Write GraphQL Query
  * Send Out Query
  * Write GraphQL Mutation
  * Send Out Mutation
  * Pagination
* Summary
* [References](graphql.md#references)

## Part II

## [Chapter 7. Play Around With Kubernetes](/)

* What is Kubernetes?
* Why use Kubernetes?
* Essential Knowledge
  * Master
  * Nodes
  * Pods
  * Deployments
  * StatefulSets
  * Volume
* Play around with Minikube
  * Install Minikube
  * Create a Cluster
  * Run a Pod
  * Inspect the Pod
  * Kill the Pod
  * Apply a Deployment
  * Apply a StatefulSet
* Summary
* References

## [Chapter 8. Create Kubernetes Cluster on the Cloud](/)

* What is Kubernetes Cluster on the Cloud?
* Why use Kubernetes Cluster on the Cloud?
* Essential Knowledge
  * VPC, Subnet, Routing Tables
  * Security Group
  * Kubernetes Cluster
  * Load Balancer
* Create Kubernetes Cluster the Hard Way
  * Create Kubernetes Cluster on AWS
  * Create Kubernetes Cluster on GKE
  * Create Kubernetes Cluster on Azure
  * Create Kubernetes Cluster on DigitalOcean
* Summary
* References

## [Chapter 9. Advance Use of Kubernetes](/)

* The Missing Parts
* Essential Knowledge
  * Role, ClusterRole
  * Namespace
  * Network Policy
  * Resource Quota
  * ConfigMap
  * Secret
  * Ingress
  * Storage Class
* Play Around with Kubernetes
* Summary
* References

## [Chapter 10. Write a Helm Chart](/)

* What is Helm?
* Why use Helm?
* Essential Knowledge
* Write a Helm Chart
* Play around with Helm
* Summary
* References

## [Chapter 11. GitOps](/) (TODO)

* What is GitOps
* Why use GitOps
  * Single Source of Truth
  * Declarative Architecture
  * Version Control
  * No kubectl, no scripts
* Essential Knowledge
  * Continuous Integration
  * Continuous Delivery
  * GitOps Principle
* GitOps Practise

## [Chapter 12. Lightweight Option: Platform-as-a-Service](/hands-on-cloud-native/deploy-to-heroku.html)

* What is 

## [Chapter 13. Lightweight Option: Function-as-a-Service](/)

## Part III

## [Chapter 14. Collect Logs by Fluentd](/)

* What are Logs？
* Why Do We Need Logs？
* Essential Knowledge
* Manage Logs
* Build Logging Pipeline
* Summary
* References

## [Chapter 15. Collect Metrics by Prometheus](/)

* What are Metrics?
* Why Do We Need Metrics?
* Emit Metrics
* Collect Metrics
* Summary
* References

## [Chapter 16. Build a Monitoring Dashboard by Grafana](/)

* What is Monitoring Dashboard?
* Why Use Monitoring Dashboard?
* Essential Knowledge
  * Liveness
  * Readyness
  * Probe
  * Query
  * Dashboard
  * Panel
  * Chart
* Build a Monitoring Dashboard
  * Deploy Grafana
  * Provisioning of Datasources
  * Provisioning of Dashboards
  * Up and Running
  * Organize Dashboards
* Summary
* References

## [Chapter 17. Build a Status Site](/)
## [Chapter 18. Canary Deployment](/)
## [Chapter 19. Chaos Engineering](/)
## [Chapter 20. Automate Toil Work by Python](/)
