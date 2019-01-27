---
title: Terraform Setup
---

## What is Terraform?

Terraform is a tool for configuring and deploying your infrastructure in declarative code.

## Why use Terraform?

* As a Infrastructure-as-Code tool, Terraform lets you define and deploy infrastructure with ease.
* Terraform is cloud platform agnostic and supports many cloud platform services in a consistent set a APIs.
* Terraform lets you follow all kinds of code principles, for example, source version control, separation of code and config, etc.
* The people in the community is nice.

## How Terraform Works?

The `terraform` binary makes API calls on your behalf to one or more providers through their APIs. By running `terraform apply`, it convert code written in a customized programming language into a set of API requests. The cloud platforms should take over the cloud resource provision work and get your cloud infrastructure set up.

## Create Terraform Workspace

For macOS users, you can install Terraform by Homebrew.
```
$ brew install terraform
```

## Alternatives

Pulumi, <https://www.pulumi.com/>, delivers Cloud Native Infrastructure as Code on any cloud with real programming languages and a consistent programming model. It defines your infrastructure in JavaScript, Python, instead a declarative language.

## References

Why use Terraform, oreilly.com, <https://www.oreilly.com/learning/why-use-terraform>
