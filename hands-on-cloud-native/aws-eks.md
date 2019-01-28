---
title: Create AWS EKS Cluster By Terraform
sidebar: auto
---

# Create Amazon EKS Cluster By Terraform

In this chapter, we'll build a Kubernetes cluster that is ready for deploying our applications.

## Networking Concepts

Below diagram provides a simplified pictures on networking concepts

<mermaid>
graph LR
    subgraph VPC
        subgraph private_subnet
            subgraph AZ1
                ec2_1-->nat_gateway1
                ec2_2-->nat_gateway1
            end
            subgraph AZ2
                ec2_3-->nat_gateway2
                ec2_4-->nat_gateway2
            end
        end
        subgraph public_subnet
            load_balancer
            internet_gateway
        end
    end
</mermaid>

### VPC

Amazon Virtual Private Cloud (Amazon VPC) is a virtual network for launching AWS resources dedicated to an AWS account.
Think of the VPC as a depot for storing all your cloud resources launched by AWS.

### Availability Zones

AZ, or Availability zones are distinct locations that are engineered to be isolated from failures in other Availability Zones.

Think of the availability zones as sections in the depot.

### Subnet

A subnetwork or subnet is a logical subdivision of an IP Network.

In general, we create two subnets, public subnet and private subnet.
The load balancer, and Internet gateway are deployed to the public subnet.
The worker nodes, and NAT gateway are deployed to the private subnet.

### Internet Gateway

An Internet gateway is the node where data sending in from the Internet and sending out to the Internet.
It connects the Internet and the subnets in the VPC.

### NAT Gateway

A NAT Gateway, or network address translation network is the node in a private subnet that connects other AWS resources or Internet, but prevent the Internet from sending data in.

## Computation Concepts

Below diagram provides a simplified pictures on computation concepts.

<mermaid>
graph TB
    traffic --> elb
    elb --> ec2_1
    elb --> ec2_2
    more_traffic -.-> elb
    elb -.-> ec2_3
    auto_scaling_group -- create --> ec2_3
</mermaid>

* ELB serves user requests and load balance to backend EC2 instances.
* Auto scaling group create or terminate EC2 instances based on their loads.
* EC2 instances are the actual virtual server node.

### ELB

Elastic Load Balancing automatically distributes incoming application traffic across multiple targets, such as Amazon EC2 instances.

### EC2

Amazon Elastic Compute Cloud (EC2) is the Amazon cloud-computing platform that provide virtual servers to run computer applications.
Each virtual server is so-called an instance.
An user can boot an Amazon Machine Image (AMI) to configure a virtual machine, create, launch, and terminate the instance as needed.

### Auto Scaling Group

An auto scaling group contains a collection of Amazon EC2 instances that share similar characteristics and are treated as a logical grouping for the purposes of instance scaling and management.

When the traffic is high, the auto scaling group can scale up, meaning creating more EC2 instances to serve the traffic, and vice versa for when the traffic is low.

## Security Concepts

### Security Groups

A security group is a virtual firewall that controls the traffic for one or more instances.
You can configure what IP packets can be send in and send out.
The rules are specified in a simple form of source ip, target ip, target port.

### IAM Users / IAM Roles

The AWS IAM, or AWS Identity and Access Management is for securely control individual and group access to your AWS resources.
It provides the authentication for managing AWS resources.


## Kubernetes Concepts

Below diagram shows the relationship of Kubernetes concepts.

<mermaid>
graph TB
    worker_node_1 -- connect --> eks_cluster
    worker_node_2 -- connect --> eks_cluster
    worker_node_3 -- connect --> eks_cluster
</mermaid>

### EKS Cluster

Amazon EKS, or Amazon Elastic Container Service for Kubernetes is a cloud solution for running Kubernetes on AWS.
It provides Kubernetes management infrastructure across multiple AWS availability zones.
By costing very few management efforts, you'll have a full-fledged Kubernetes cluster running in the cloud without headache.

### Worker Nodes

Amazon EKS only provides the Kubernetes management infrastructure, not the actual computing nodes.
Worker nodes are EC2 instances that connects to the master of EKS Cluster.
These worker nodes will be where the application resides in.

### Create Kubernetes Cluster on AWS

## Preparation

Install `terraform`. For macOS users, you can install terraform via Homebrew.

```bash
$ brew install terraform
```

Create IAM user or group to obtain credentials. // TODO

## Setup Network

Before moving forward, let's give the cluster a name. For reusable, we define a variable. Anytime we want to get the variable in the rest of the chapter, we can use `${var.cluster-name}` in the terraform script.

<<< @/hands-on-cloud-native/src/aws/cluster-name.tf

We want all our AWS resources within the scope of VPC. In particular, we need to add a tag "kubernetes.io/cluster/${var.cluster-name}=shared" for the VPC. Only in this way can the EKS cluster joining the VPC. The cidr_block `10.0.0.0/16` defines the total number we can allocate IP addresses and IP routing.

<<< @/hands-on-cloud-native/src/aws/vpc.tf

Before creating subnets, the first thing we need to do is to get the availability zones, since both the private subnet and public subnet needs to deploy their resources to at least two availability zones for high availability. We don't need to create AZ but simply fetch a list of AZs as they are AWS concerns. Therefore, we simply use terraform data source for this kind of purpose. Eventually, it'll be an array like `["us-west-2a", "us-west-2b", "us-west-2c"]`.

<<< @/hands-on-cloud-native/src/aws/azs.tf

Now, we're good to go for the subnets.

We set the `count` to 2 for creating the subnet twice, one in the first AZ, and the other in the second AZ. The maximum value of `count` depends on how many availability zones provided in designated region. We get the availability zone name by `${data.aws_availability_zones.azs.names[count.index]}`. It will be strings like "us-west-2a". Then we get the vpc id by`${aws_vpc.vpc.id}`. The terraform syntax of `${terraform_resource.resource_name.resource_attribute}` provides you the reference to a dynamically fetched cloud resource value. We also define the cidr block to `10.0.${count.index}.0/24` similarly to what we have done to the vpc except it's much smaller. The tag `kubernetes.io/cluster/${var.cluster-name}=shared` is also required.

<<< @/hands-on-cloud-native/src/aws/private-subnet.tf

The public subnet is very similar to the private. We only change the `cidr_block` to another namespace. In public subnet, it's `10.0.X.0/24`, while in subnet, it's `10.1.X.0/24`. The two CIDR blocks do not necessarily need to be the exact two given example. It depends on your network topology.

<<< @/hands-on-cloud-native/src/aws/public-subnet.tf

Next, we're going to create an Internet gateway for the public subnet. The internet gateway has to be within the created VPC.

<<< @/hands-on-cloud-native/src/aws/igtw.tf

We still need to create a route table for passing traffic through the internet gateway. The only route we add to the table is to allow all traffic (`0.0.0.0/0`) going through the created internet gateway.

<<< @/hands-on-cloud-native/src/aws/public-subnet-route-table.tf

The last thing for the route table is to attach it to the public subnet. In this way, the subnet will have a route table that allow traffic going through the internet gateway with blocking. Note that we need to associate the route table to the public subnet across all of the availability zones.

<<< @/hands-on-cloud-native/src/aws/public-subnet-route-table-assoc.tf

## Setup Security Policies for EKS Master

To allow EKS service managing or retrieving data from other AWS resources,  we need to put some policies on the IAM role. The IAM role will be used by the EKS Master.

<<< @/hands-on-cloud-native/src/aws/cluster-role.tf

Other than IAM role policies, we also need to create a security group for restricting network access.

<<< @/hands-on-cloud-native/src/aws/cluster-sg.tf

## Setup EKS Master

With above AWS resources allocated, now we're ready to bring up an EKS Master. The role for performing cluster admin work is `aws_iam_role.cluster` we created above. The security group for the cluster is `aws_security_group.cluster`. We let the subnets for the cluster to be both the public subnet and private subnet.

<<< @/hands-on-cloud-native/src/aws/cluster.tf

## Setup Security Policies for Worker Nodes

The cluster is setup for now although it can schedule any work, as no node is available. Next, we're going to launch EC2 as the worker nodes for the EKS cluster.

We start from defining IAM role and policies for worker nodes.

<<< @/hands-on-cloud-native/src/aws/worker-role.tf

Next, we need to create the IAM instance profile, which must be used to tag the IAM role to the EC2 instance.

<<< @/hands-on-cloud-native/src/aws/worker-profile.tf

Then, we create the security group for the worker node.

<<< @/hands-on-cloud-native/src/aws/worker-sg.tf

The first rule we set to the worker node security group is to allow worker node communicating with each other. In this case, both the source and the target should point to worker node security group itself.

<<< @/hands-on-cloud-native/src/aws/worker-node-self-sgrule.tf

The second rule we set to the worker node security group is to allow kubelets and kube-proxy communicating with the Kubernetes control plane. In this case, the source is the worker node security group, and the target is the cluster security group.

<<< @/hands-on-cloud-native/src/aws/worker-node-ingress-cluster.tf

The third rule we set to the worker node security group is to allow worker node communicating with the EKS master cluster.

<<< @/hands-on-cloud-native/src/aws/worker-node-apimaster-sgrule.tf

## Setup Worker Nodes Fleet

With the security resources allocated, we're ready to bring EC2 instances up and join the EKS cluster.

First, let's select a latest Amazon Machine Image (AMI) as the image for the EC2 instances. It's good to lock the version to a stable one.

<<< @/hands-on-cloud-native/src/aws/ami.tf

Next, we create a launch configuration for the EC2 instance.


## References

Getting Started with Amazon EKS, <https://aws.amazon.com/eks/getting-started/>

AWS EKS Introduction, <https://learn.hashicorp.com/terraform/aws/eks-intro>

What Is Amazon VPC, <https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html>

VPCs and Subnets, <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html>

Subnetwork, <https://en.wikipedia.org/wiki/Subnetwork>

Auto Scaling Groups <https://docs.aws.amazon.com/autoscaling/ec2/userguide/AutoScalingGroup.html>

AWS IAM Basic, <https://aws.amazon.com/iam/faqs/>

Amazon EC2 Security Groups for Linux Instances, <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html>

Creating a Custom Cluster from Scratch, <https://kubernetes.io/docs/setup/scratch/>

eksctl, a CLI for Amazon EKS, <https://eksctl.io/>

[Please donate this project. It takes time and efforts writing these articles.](/)
