---
title: Preface
---

# Preface

## The Cloud Native Wave

Since 2015, Cloud Native Computing Foundation has brought the concept Cloud Native into the community and made it one of the hottest topics in software development. The goal of Cloud Native is to advance the state-of-the-art for building Cloud Native applications and services, allowing developers to take full advantage of existing and to-be-developed open source technologies.

In short, the Cloud Native technology means your applications or services are container-packaged, dynamically scheduled and micro services-oriented.

The benefit of Cloud Native is both for developers and the entire organization they belong to. This enthusiasm soon spread to many companies.

## Make Your Application Cloud Native

With a broad range of organizations having adopted Cloud Native into their architecture, it's essential for developers and managers learning Cloud Native. Besides, it's really fun.

Perhaps you have made your little web application for your side project or internal tools for the company you work for?

Anyway, you have decided to learn Cloud Native application and apply it to your projects. Great idea!

## Objective and Approach

The book assumes that you know close to nothing about Cloud Native. It's goal is to give you the concepts, the architecture paradigm, and the technologies you need to actually *develop, build, deploy, and operate a Cloud Native application*.

We will cover a large number of techniques on practicing the Cloud Native application, including the front-end, the back-end, the build tools set, the infrastructure tools set, and the monitoring tools set.

Rather than implementing everything from scratch, we will be using production bullet-proof tools or frameworks:

* React (<https://reactjs.org/>) is a Javascript library for building user interfaces.
* Flask (<http://flask.pocoo.org/>) is a microframework for Python based on Werkzeug, Jinja 2 and good intentions.
* PostgreSQL ()
* Docker (<https://www.docker.com/>) is the most advanced container technology.
  * Docker-Compose (<https://docs.docker.com/compose/>) is a tool for defining and running multi-container Docker applications.
* Kubernetes (<https://kubernetes.io/>) is the de-facto production-grade container orchestration.
  * minikube (<https://github.com/kubernetes/minikube>) is a tool for running Kubernetes locally.
* Terraform (<https://www.terraform.io/>) is Infrastructure-as-Code.
* Fluentd (<https://www.fluentd.org/>) is an open source data collector for unified logging layer.
* Prometheus (<https://prometheus.io/>) is an open source monitoring solution for metrics and alerts.
* Grafana (<https://grafana.com/>) is an open source dashboard application for beautiful analytics and monitoring.

We also use cloud service to empower our Cloud Native applications.

* GitHub (<https://github.com>) is a development platform for code collaboration.
* Travis-CI (<https://travis-ci.org/>) is a Continuous Integration platform.
* DigitalOcean (<https://www.digitalocean.com/>) is Cloud computing platform, which provides computing instances, storage, Kubernetes, etc.

The book favors a hands-on approach, starting from basic concepts and just enough theory. While reading the book, we encourage your pick up your laptop and start typing the given code and command examples.

During the journey, we'll start building a Cloud Native application from scratch. All code examples are online at <https://github.com/soasme/tomato-coffee>.

## Prerequisites

This book assumes that you have some programming experience and you're comfortable with programming in JavaScript (ES6), Python 3. The Cloud Native application we'll build is a React-based front-end single page application, a Flask-based back-end API service, and a set of supporting infrastructure.

## Roadmap

The book is organized in three parts.

Part I, Dev, covers the following topics:

* What is Cloud Native? What was the background when the Cloud Native technology emerged? What problem does it try to solve? What are the fundamental concepts of a Cloud Native application?
* The life-cycle of a typical Cloud Native project.

Part II, DevOps, covers the following topics:

* How to do continuous integration?
* How to create infrastructure in a cloud platform?
* how to deploy a Cloud Native application into a Kubernetes Cluster?

Part III, Ops, covers the following topics:

* How to monitor a Cloud Native application?
* How to observe a Cloud Native application?
* How to maintain a Cloud Native application?

## Conventions

The following typographical conventions are used in this book:

*Italic*

**Emphasis**

```python
def example():
    return "Hello World"
```

:::warning
Warning:
:::

:::tip
Warning:
:::


## Resources

* Serverless-stack, (https://serverless-stack.com) helps you to build Full-Stack apps with serverless and React on AWS.
* Full Stack Python, (https://www.fullstackpython.com/) helps you to build, deploy and operate Python applications.

## How to Contact Me

Please create an issue at GitHub Issues (<https://github.com/soasme/enqueuezero/issues>).

## Acknowledgements

I would like to thank all EnqueueZero patrons on Patreon (<https://www.patreon.com/enqueuezero>) for funding me to make all these happen! I could never have started this project without them.

## References in Preface

* New Cloud Native Computing Foundation to Drive Alignment Among Container Technologies, cncf.io, <https://www.cncf.io/announcement/2015/06/21/new-cloud-native-computing-foundation-to-drive-alignment-among-container-technologies/>
