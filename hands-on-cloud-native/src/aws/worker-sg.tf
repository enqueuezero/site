resource "aws_security_group" "worker-node" {
  name        = "${var.cluster-name}-worker-node"
  description = "Security group for all nodes in the cluster"
  vpc_id      = "${aws_vpc.vpc.id}"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = "${
    map(
     "Name", "${var.cluster-name}-worker-node",
     "kubernetes.io/cluster/${var.cluster-name}", "owned",
    )
  }"
}
