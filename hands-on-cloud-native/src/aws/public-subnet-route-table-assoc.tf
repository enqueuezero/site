resource "aws_route_table_association" "public-subnet-route-table-assoc" {
  count = 2

  subnet_id      = "${aws_subnet.public-subnet.*.id[count.index]}"
  route_table_id = "${aws_route_table.public-subnet-route-table.id}"
}
