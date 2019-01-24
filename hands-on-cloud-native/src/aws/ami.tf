locals {
  image = "amazon-eks-node-v21"
  owner = "602401143452" # Amazon EKS AMI Account ID
}

data "aws_ami" "eks-worker" {
  filter {
    name   = "name"
    values = ["${local.image}"]
  }

  most_recent = true
  owners      = ["${loca.owner}"]
}
