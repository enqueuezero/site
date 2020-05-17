---
title: An Introduction to Terraform
permalink: /projects/terraform.html
---

# An Introduction to Terraform

## Terraform, A Provisioning Tool

If you feel it is uneasy to understand "Terraform is an Infrastructure as Code provisioning tool", this is the right article to get started.

*Infrastructure* refers to hardware/software components that a cloud vendor or on-premise data center offers, such as racks of physical servers, virtualized machines, load balancers, or managed services, etc. In modern indunstry, we now have either *Graphical User Interface* (GUI) or *Application Programming Interface* (API) to create, update, and delete these infrastructure components. 

*Infrastructure as Code* takes an efficient approach by tracking these API calls by code, which can be audited and version controlled. *Configuration Management* tools, such as Ansible, Chef, Puppet, and SaltStack, were designed for configuring bare metals or virtual machines, but not good at provisioning servers and services.

With *Terraform* into the scene, it enables us easily provisioning infrastructure. A typical usage is like this: Terraform provisions infrastructure stack first, then Configuration Management Tools configures the servers among the stack.

There are a little overlaps between Terraform and Configuration Management Tools, such as running some script on servers. But Terraform is weak at this. Usually, we only trigger a simple bootstrap script for the server through Terraform.

By using Terraform, we can create and destroy the entire infrasture quickly and repeatably. 

## Terraform, A Multi-Cloud Approach

Terraform can provision loads of infrastructure components for multiple cloud vendors, for example, AWS, Google Cloud, Microsoft Azure, DigitalOcean, etc. Many of them might have already provided their own provisioning solutions, such as Cloud Formation, Azure Resource Manage, etc. But the great benefit is  to prevent *vendor lock* - being forced to use a single cloud provider and hard to move out. If the tool is a superset of all these cloud-specific provisioning solutions, why not just use Terraform?

By using Terraform, you can choose the best fit to your business or even mix using several cloud vendors, aka hybrid strategy.

Underlying, it's not complicated at all though. Many cloud vendors provides APIs. And, Terraform standardizes the provisioning of infrastructure components as API requests. So, if you have your own internal infrastructure components, you can simply extend Terraform by writing some Golang code.

## Terraform, A Declarative Style

There are two traditional code styles: imperative and declarative. Terraform belongs to the latter. Imperative code is comprised of instructions, while declarative code is comprised of a set of eventual state you want to achieve. For example, `execute(code)` is imperative, and `code: ensure_executed` is declarative.

Such a programming paradigm brings us a benefit: we don't need to concern about how to provision infrastructure, but to focus on what the exact infrasture we want to provision.

In terraform, we always start from an *initial state*, and declare the *desired state* through code. Everytime the command `terraform` is executed, it will inspect the *current state*, and converge it to the *desired state*. Once the *desired state* is reached, the infrasture is ready to use.

## Terraform, Getting Started!

There are plenty of great Terraform getting started articles over the Internet. Here lists a few:

* [Learn to provision infrastructure with HashiCorp Terraform](https://learn.hashicorp.com/terraform) (AWS, Azure, Google Cloud)
* [Hello Terraform!](https://livebook.manning.com/book/terraform-in-action/chapter-1/v-6/64) (AWS)

* [Getting started with Terraform](https://www.redpill-linpro.com/techblog/2018/08/14/getting-started-with-terraform.html) (AWS)

If you ever walked through all the code and command executions, you should have provisioned and destroyed some infrastructure components. You should also have a sense of some important concepts: providers, resources, data sources, apply, destroy, state, backend, etc. We'll dive deeper into these concepts next.

## Terraform, The Lifecycle

From a programmer's perspective, terraform is a command-line tool managing states. Knowing how Terraform converges and manages states builds a solid foundation before learning further.

Below is a typical process managing the resource provisioning.

1. Define/modify infrastructure through Terrafrom HCL script.
2. Prepare an execution plan via `terraform plan`.
3. Execute the plan via `terraform apply`. It is where Terraform loads configurations and the HCL script, obtain the earlier state, converge, and store the final state.

## Terraform, The Basic Concepts

**State**. The state is a set of metadata that maps the resources in your HCL script to the real world infrastructure components, such as IDs and other attributes. By default, Terraform stores the state in a local file named `terraform.tfstate`, which is in essential a JSON file, though we don't usually edit it manually. Remote state bakend is allowed. Terraform determines what to create, what to modify and what to destroy based on the difference between the local state and the real infrastructure.

**Provider**. Any service provider that provides an API can have a corresponding Terraform provider. In the HCL script, the provider block is where we configure the token or other settings. There are plenty of available providers provided by HarshiCorp and the Terraform community. See [more](https://www.terraform.io/docs/providers/index.html). Terraform downloads provider binary file to local before applying.

**Resource**. Almost any infrastructure type can have a corresponding Terraform resource, such as a virtual machine, a NAT gateway, a DNS record, etc. A resource always belongs to a provider. In the HCL script, the resource block defines the desire state of a real world infrastructure component. Once applied, there is one or more real world infrastructure component mapping to a particular resource.

**Data Source**. Data Sources are those state not managed by Terraform. It allows Terraform uses the metadata even those infrastructrure components are not created by Terraform. In the HCL script, the data block defines how to access the metadata for a special kind of resource.

**Module**. A module is a package of HCL scripts grouping together. It makes code reuse possible.

## Terraform, Build Your Own Providers

If you hasn't found a suitable provider, you can always build your own. Here is a good video: [Creating a Terraform Provider for Just About Anything](https://www.youtube.com/watch?v=noxwUVet5RE). 

<iframe width="560" height="315" src="https://www.youtube.com/embed/noxwUVet5RE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Terraform, Protect Credentials in State

Terraform state reveals not just the IDs and attributes, but also the sensitive credentials. Therefore, you should never track the local state file to through Git. Look at how many times people have made this mistake: [github.com](https://github.com/search?q=terraform.tfstate&type=Commits). If you accidentally commited the file, you should revise the git history, instead of deleting via a new commit. It won't go away.

Storing state remotely usually provides better security, because the state are on held in memory. If you're using remote state, the backend should be well encrypted and communication-secured. Checkout available backends: [terraform.io](https://www.terraform.io/docs/backends/types/index.html).

I'd recommend having one S3 backend per team. It will give each team enough autonomy to do their job.

## Terraform, Some Good Practices

* Enable `create_before_destroy` tag for your resources. It reduces the down time of the change.
* Only manipulate Terraform state via `terraform state` and `terraform import` CLI commands.
* Have a provisioner for your service to perform health check.
* Have a blue-green deployment model. Cut over when the idle infrastructure is well tested and prepared.
