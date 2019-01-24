resource "aws_security_group_rule" "worker-node-ingress-self" {
  description              = "Allow node to communicate with each other"
  from_port                = 0
  protocol                 = "-1"
  security_group_id        = "${aws_security_group.worker-node.id}"
  source_security_group_id = "${aws_security_group.worker-node.id}"
  to_port                  = 65535
  type                     = "ingress"
}
