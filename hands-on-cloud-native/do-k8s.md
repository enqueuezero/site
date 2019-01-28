---
title: Create a Kubernetes Cluster on DigitalOcean
---

# Create a Kubernetes Cluster on DigitalOcean

In this chapter, we'll build a Kubernetes cluster on DigitalOcean.

## Why Use DigitalOcean

Pricing for DigitalOcean Kubernetes is based only on the underlying resources that you use (Droplets, Block Storage, and Load Balancers). Each Kubernetes cluster now starts with two Droplets of your choice, with the same simple pricing available today for Droplets.

## Create Cluster

### Preparation

Install `terraform`. For macOS users, you can install terraform via Homebrew.

```bash
$ brew install terraform
```

### Setup Provider

Create a file `deploy/digitalocean/main.tf`

```
variable "do_token" {}

provider "digitalocean" {
  token = "${var.do_token}"
}
```

Go to DigitalOcean dashboard and check "API". <https://cloud.digitalocean.com/account/api/tokens>
If you haven't created a personal access token before, generate a new token.

Copy the new generated token and save it to `deploy/digitalocean/terraform.tfvars`.

```
do_token = "logxywonfrzplzygbnbvxaxgxsuxltfncfxkhsgzqmwlhicnif"
```

:::warning
Don't commit `deploy/digitalocean/terraform.tfvars` to git repository.
:::

### Create a Kubernetes Cluster

Append a `digitalocean_kubernetes_cluster` resource to `deploy/digitalocean/main.tf`.
```
variable "cluster-name" {}
variable "cluster-region" {}
variable "cluster-version" {}
variable "cluster-node-pool-name" {}
variable "cluster-node-pool-size" {}
variable "cluster-node-pool-node-count" {}

resource "digitalocean_kubernetes_cluster" "cluster" {
  name    = "${var.cluster-name}"
  region  = "${var.cluster-region}"
  version = "${var.cluster-version}"
  tags = ["${var.cluster-name}"]

  node_pool {
    name       = "${var.cluster-node-pool-name}"
    size       = "${var.cluster-node-pool-size}"
    node_count = "${var.cluster-node-pool-node-count}"
  }
}
```

Append parameters to `deploy/digitalocean/terraform.tfvars`.

```
cluster-name = "tomato-coffee"
cluster-region = "sfo2"
cluster-version = "1.13.1-do.2"
cluster-node-pool-name = "tomato-coffee-worker-pool"
cluster-node-pool-size = "s-1vcpu-2gb"
cluster-node-pool-node-count = 3
```

Apply the change.

```
$ terraform apply -auto-approve
digitalocean_kubernetes_cluster.cluster: Creating...
  cluster_subnet:         "" => "<computed>"
  created_at:             "" => "<computed>"
  endpoint:               "" => "<computed>"
  ipv4_address:           "" => "<computed>"
  kube_config.#:          "" => "<computed>"
  name:                   "" => "tomato-coffee"

... (truncated)

  digitalocean_kubernetes_cluster.cluster: Creation complete after 5m23s (ID: 922b3b36-7083-4619-af0c-04a6c16d6219)

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Note that such config will add $15 to your bill per month.

### Setup Kubernetes Provider

Append the kubernetes provider to `deploy/digitalocean/main.tf` by using the certs generated from previous step.

```
provider "kubernetes" {
  host = "${digitalocean_kubernetes_cluster.cluster.endpoint}"

  client_certificate = "${base64decode(digitalocean_kubernetes_cluster.cluster.kube_config.0.client_certificate)}"
  client_key = "${base64decode(digitalocean_kubernetes_cluster.cluster.kube_config.0.client_key)}"
  cluster_ca_certificate = "${base64decode(digitalocean_kubernetes_cluster.cluster.kube_config.0.cluster_ca_certificate)}"
```

### Create a Namespace

```
resource "kubernetes_namespace" "prod" {
  metadata {
    name = "${var.cluster-name}"
    labels {
      env = "prod"
    }
  }
}
```

```
$ terraform apply -auto-approve
digitalocean_kubernetes_cluster.cluster: Refreshing state... (ID: 922b3b36-7083-4619-af0c-04a6c16d6219)
kubernetes_namespace.prod: Creating...
  metadata.#:                  "" => "1"
  metadata.0.generation:       "" => "<computed>"
  metadata.0.labels.%:         "" => "1"
  metadata.0.labels.env:       "" => "prod"
  metadata.0.name:             "" => "tomato-coffee"
  metadata.0.resource_version: "" => "<computed>"
  metadata.0.self_link:        "" => "<computed>"
  metadata.0.uid:              "" => "<computed>"
kubernetes_namespace.prod: Creation complete after 1s (ID: tomato-coffee)

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

## References

Managing Kubernetes Just Got a Lot Simpler, blog.digitalocean.com, <https://blog.digitalocean.com/digitalocean-releases-k8s-as-a-service/>

How to Create a Personal Access Token, digitalocean.com, <https://www.digitalocean.com/docs/api/create-personal-access-token/>
