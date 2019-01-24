resource "aws_eks_cluster" "cluster" {
  name = "${var.cluster-name}"
  role_arn = "${aws_iam_role.cluster.arn}"

  vpc_config {
    security_group_ids = ["${aws_security_group.cluster.id}"]
    subnet_ids = [
      "${aws_subnet.public-subnet.*.id}",
      "${aws_subnet.private-subnet.*.id}",
    ]
  }

  depends_on = [
    "aws_iam_role_policy_attachment.demo-cluster-AmazonEKSClusterPolicy",
    "aws_iam_role_policy_attachment.demo-cluster-AmazonEKSServicePolicy",
  ]
}
