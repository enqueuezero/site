---
title: Deployment
---

# Deployment

## What is Deployment?

From Wikipedia:

> Software deployment is all of the activities that make a software system available for use.

The goal of software deployment is to prepare a software application to run an operation in a specific environment. A typical software deployment involves:

* Release
* Installation & Uninstallation.
* Configuration
* Upgrade & Update.
* Version tracking.

## Where to Deploy?

From 1 to 4, it requires more and more management cost, meaning you spent more efforts on managing underlying infrastructure and environments.

1. Function as a service. We can upload function code to the cloud platform and let platform provision the runtime instance. Such a platform could be AWS Lambda, Azure functions, etc.
2. Platform as a service. We can upload application code to the cloud platform and let platform provision the runtime instances. Such a platform could be Heroku, OpenShift, Google App Engine, etc.
3. Kubernetes. We can apply `Deployment` or `StatefulSet` resources to Kubernetes platform.
4. Bare Metal. We can provision bare metal hosts, running with Linux OS, and then run applications on the host as processes.

## How to Deploy?

From 1 to 4, it requires less self-management cost, meaning you spent fewer efforts on managing underlying infrastructure.

1. To management function as a service, it often just needs you to copy and paste a few lines of code to cloud platform from the web console. And that's it.
2. To manage platform as a service, it often needs to build and push code to the cloud platform. You don't necessarily need to have a heavy deployment pipeline.
3. To manage Kubernetes, it often involves writing YAML files and applies them by Kubernetes client, kubectl (pronounced as cube-cuddle, or cube-see-tee-el, or cube-control, or whatever you like). Some prefer writing YAML templates and apply them by Helm. Some prefer adopting GitOps by running operators in-cluster and listening to the deployment events.
4. To manage bare metal, it often requires configuration management software to provision a useful OS, such as ansible, chef, saltstack, puppet. Then, you need to launch the application on it by using tools like Capistrano, or even simple bash scripts equipped by SSH. Oh wait, one of the fundamental problems haven't been solved, how to get bare metals? The answer is either to build your data center or to provision virtual machine instances from cloud vendors like AWS, Azure, GCE, etc.

## What to Deploy?

1. Source code. In the option of function-as-a-service and platform-as-a-service, you deploy source code, which becomes runnable instances. In the option of bare metal, source code can also be an option by using tools like capistrano; such a tool can update source code on bare metal and restart applications.
2. Container. In the option of Kubernetes, you deploy images, and then images become containers in runtime.
3. Packages. In the option of bare metal, you can pre-build source code to packages and then deploy packages in production. By introducing one more step in the pipeline, you can simplify the system dependencies for building the application in production environments. The package formats are often OS-specific, such as RPM for RedHat or CentOS, Deb for Debian and Ubuntu, etc. Some people also prefer language-specific packages, such as wheel package installed to `virtualenv` for Python applications, Gem package installed to `bundle`for Ruby applications, etc.

## When is exit criteria?

There are several deployment models but all of them have the same exit criteria, having a new version of application up and running and the old version retired.

These deployment models include:

* Blue-green model. Every time you deploy something, it's switching in-between blue and green environment.
* Canary. You deploy a new version of the application and let it serve 5% traffic. Once verified, you expand the deployment and let it serve 100% traffic.
* In-Place update model.
* Immutable model.