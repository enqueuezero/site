resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"

  tags = "${
    map(
     "Name", "${var.cluster-name}-vpc",
     "kubernetes.io/cluster/${var.cluster-name}", "shared",
    )
  }"
}
