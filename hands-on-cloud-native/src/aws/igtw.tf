resource "aws_internet_gateway" "igtw" {
  vpc_id = "${aws_vpc.vpc.id}"

  tags {
    Name = "${var.cluster-name}-internet-gateway"
  }
}
