---
title: Hands-On Cloud Native Application
sidebar: auto
---

# Hands-On Cloud Native Application

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
  * Setup Minikube
  * Setup Docker
  * Setup Docker-Compose
  * Setup Helm

## [Chapter 2. Getting Started with React](react.md)

* [What is React?](react.md#what-is-react)
* [Why use React?](react.md#why-use-react)
  * [Declarative](react.md#declarative)
  * Components Hold Stats Internally
  * Virtual DOM is Fast
  * One-Way Data Binding
* [Essential Knowledge](react.md#essential-knowledge)
  * Virtual DOM
  * JSX
  * Components
  * Props
  * States
  * Events
  * Hooks
  * Rendering
  * Functional Programming
* Play Around with React
  * Create a New React App
  * Start React App
  * Test React App
  * Test Driven Development
  * Make the First Change
  * Handle Routes
  * Setup 404 Page
  * Setup App Page  
* References

## [Chapter 3. Build Front End App](/hands-on-cloud-native/front-end.html)

* Before We Start the Development
  * Pomodoro Technique
  * Prerequisites
* Overview
  * Finite State Machine
  * Passing Data Through Props
* Install Dependency
* Completing the DOM Tree
  * Create CancelButton Component
  * Use Countdown Component
  * Implement a Finite State Machine
  * Implement a Pomodoro Component
  * Implement a History Component
  * Create an Error Boundary Component
* Wrapping Up
* References

## [Chapter 4. Play around with Containers](/)

* What is Container?
  * Container Introduction
  * A Little Bit Background, Visualization
  * Container v/s Visualization
* Why use Container?
  * Physical Resources Isolation
  * Kernel Resources Isolation
  * Eliminate the Difference between Environments
* Essential Knowledge
  * Host Machine
  * CGroups
  * Unshare
  * Namespace
  * UnionFS
  * OCI
  * Image
  * Volume
* Containerize the Front-End Application
  * Run Busybox Container
  * Dockerfile
  * Build Our First Image
  * Run Front-End Container
  * Inspect Container
  * Clean Up
  * Push Image to DockerHub Registry
  * Deploying a Change
* References

## [Chapter 5. Play around with GraphQL](/)

* What is GraphQL?
  * GraphQL Introduction
  * GraphQL v/s RESTful
  * GraphQL Architecture
    * Client
    * Server
* Why use GraphQL?
  * Strongly Typed Schema
  * Fetch Just Enough Data
  * Composable APIs
  * Friendly Tracing on the Backend
  * Nice Community
* Essential Knowledge
  * The Schema Definition Language (SDL)
  * Schemas
  * TypeDefs
  * Resolvers
  * Mutation
  * Subscription
  * Network Layer
* Play around with GraphQL
  * Install json-graphql-server
  * Generated Types and Queries
  * Get Entity
  * Relationships
  * Get A List of Entities
  * Sorting
  * Pagination
  * Filtering
  * Send Queries
  * Make Mutations
* Summary
* References

## [Chapter 6. Build Back End App](/)

* What is HTTP Framework?
* Why use HTTP Framework?
* Essential Knowledge
  * ASGI v/s WSGI
  * Request & Response
* Getting Started
  * Project Setup
  * Run a Server
  * Create Pomodoro Schema
  * Add GraphQL Endpoint
  * Connect to a PostgreSQL Database
  * Add WebSockets Support
  * Add OAuth2 Login
  * Add Dockerfile
* Summary
* References

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

## [Chapter 10. Write a Helm Chart](/) (TODO)

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

## [Chapter 17. Build a Status Site](/) (TODO)
## [Chapter 18. Canary Deployment](/) (TODO)
## [Chapter 19. Chaos Engineering](/) (TODO)
## [Chapter 20. Automate Toil Work by Python](/) (TODO)
