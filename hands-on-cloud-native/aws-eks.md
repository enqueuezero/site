---
title: Create AWS EKS Cluster By Terraform
sidebar: auto
---

# Create Amazon EKS Cluster By Terraform

## Overview

Amazon EKS, or Amazon Elastic Container Service for Kubernetes is a cloud solution for running Kubernetes on AWS.
It provides Kubernetes management infrastructure across multiple AWS availability zones.
By costing very few management efforts, you'll have a full-fledged Kubernetes cluster running in the cloud without headache.

In this chapter, we'll build a Kubernetes cluster that is ready for deploying our applications.

## Networking Concepts

### VPC

Amazon Virtual Private Cloud (Amazon VPC) is a virtual network for launching AWS resources dedicated to an AWS account.
Think of the VPC as a depot for storing all your cloud resources launched by AWS.

### Availability Zones

Availability zones are distinct locations that are engineered to be isolated from failures in other Availability Zones.

Think of the availability zones as each single room that is separated by concrete walls.

### Subnet

[Please donate this project. It takes time and efforts writing these articles.](/)

### Internet Gateway

### NAT Gateway

## Security Concepts

### AutoScaling Group

### Security Groups

### IAM Roles

### IAM Policies

## Kubernetes Concepts

### EKS Cluster

### Worker Nodes

## Big Picture

## Setup Network

## Setup EKS Master

## Setup Worker Nodes Fleet

## References

Getting Started with Amazon EKS, <https://aws.amazon.com/eks/getting-started/>

AWS EKS Introduction, <https://learn.hashicorp.com/terraform/aws/eks-intro>

What Is Amazon VPC, <https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html>

VPCs and Subnets, <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html>

Creating a Custom Cluster from Scratch, <https://kubernetes.io/docs/setup/scratch/>

eksctl, a CLI for Amazon EKS, <https://eksctl.io/>

