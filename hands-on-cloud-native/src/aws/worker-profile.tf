resource "aws_iam_instance_profile" "worker-node" {
  name = "${var.cluster-name}-worker-node"
  role = "${aws_iam_role.worker-node.name}"
}
