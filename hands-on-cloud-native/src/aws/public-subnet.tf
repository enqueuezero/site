resource "aws_subnet" "public-subnet" {
  count = 2

  vpc_id            = "${aws_vpc.vpc.id}"
  cidr_block        = "10.1.${count.index}.0/24"
  availability_zone = "${data.aws_availability_zones.azs.names[count.index]}"

  tags = "${
    map(
     "Name", "${var.cluster-name}-public-subnet-${data.aws_availability_zones.azs.names[count.index]}",
     "kubernetes.io/cluster/${var.cluster-name}", "shared",
    )
  }"
}

