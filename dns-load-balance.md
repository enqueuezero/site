---
title: DNS Load Balancing
---

# DNS Load Balance

## Context

DNS, or Domain Name System, is the yellow page of the Internet. When people access to the website through domain name `enqueuezero.com`, the web browser interacts with DNS server first to get the IP addresses for dialing.

[Load Balance](/load-balance.html) is essential for distributing traffic across multiple hosts in the server farm.

DNS Load Balancing provides the simplest load balancing strategy through DNS servers.

## Overview

DNS load balancing is an implementation of configuring the IP addresses of the domain name as multiple A records. As a result, the requests from the client are distributed across a group of server machines.

For example, [enqueuezero.com](https://enqueuezero.com) has 4 IP addresses that can serve requests - `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. We can configure multiple A records for `enqueuezero.com` in the domain name provider. In this case, it's Google Domains.  Below screenshot shows how to configure A records in Google Domains:

![Google Domains](/static/images/dns-load-balancing-setting.png)

Below command shows the DNS interrogation gets 4 IP addresses.

```
% dig enqueuezero.com

; <<>> DiG 9.10.6 <<>> enqueuezero.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 61900
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;enqueuezero.com.		IN	A

;; ANSWER SECTION:
enqueuezero.com.	599	IN	A	185.199.108.153
enqueuezero.com.	599	IN	A	185.199.109.153
enqueuezero.com.	599	IN	A	185.199.110.153
enqueuezero.com.	599	IN	A	185.199.111.153

;; Query time: 260 msec
;; SERVER: 8.8.4.4#53(8.8.4.4)
;; WHEN: Tue Dec 25 07:55:24 NZDT 2018
;; MSG SIZE  rcvd: 108
```

To prove such configuration can really distribute traffics, let's ping the domain in different servers. As you can see, the ping command talks to servers in different IP addresses.

```
# From Auckland, NZ
$ ping -c 1 enqueuezero.com
PING enqueuezero.com (185.199.108.153): 56 data bytes
64 bytes from 185.199.108.153: icmp_seq=0 ttl=60 time=43.267 ms
```

```
# From CA, US
$ ping -c 1 enqueuezero.com
PING enqueuezero.com (185.199.111.153): 56 data bytes
64 bytes from 185.199.111.153: icmp_seq=0 ttl=60 time=52.162 ms
```

Short conclusion: By configuring multiple A records for the domain, DNS load balancing can distribute traffic across multiple server hosts.

## Solutions

### Terraform

[Terraform DNS provider](https://www.terraform.io/docs/providers/dns/index.html) supports any DNS provider that supports DNS updates (RFC 2136).

You can apply multiple IP addresses to the resource `dns_a_record_set` like below.

```
resource "dns_a_record_set" "@" {
  zone = "enqueuezero.com."
  name = "@"
  addresses = [
    "185.199.108.153",
    "185.199.109.153",
    "185.199.110.153",
    "185.199.111.153",
  ]
  ttl = 300
}
```

You can also use [Terraform AWS route53](https://www.terraform.io/docs/providers/aws/r/route53_record.html) if you're using AWS Route53 for load balancing, or [Terraform Azure DNS resources](https://www.terraform.io/docs/providers/azurerm/r/dns_a_record.html) if you're using Azure service. Below code shows how to utilize aws route53 for dns load balancing.

```
resource "aws_route53_record" "www" {
  zone_id = "${aws_route53_zone.primary.zone_id}"
  name    = "enqueuezero.com"
  type    = "A"
  ttl     = "300"
  records = ["${aws_eip.lb.public_ip}"]
}
```

### ExternalDNS

[github.com](https://github.com/kubernetes-incubator/external-dns)

ExternalDNS makes Kubernetes resources discoverable via public DNS servers.

After setting IAM policies and a hosted zone, you can apply below resource to the Kubernetes cluster.

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: external-dns
spec:
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: external-dns
    spec:
      containers:
      - name: external-dns
        image: registry.opensource.zalan.do/teapot/external-dns:latest
        args:
        - --source=service
        - --source=ingress
        - --domain-filter=external-dns-test.my-org.com # will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones
        - --provider=aws
        - --policy=upsert-only # would prevent ExternalDNS from deleting any records, omit to enable full synchronization
        - --aws-zone-type=public # only look at public hosted zones (valid values are public, private or no value for both)
        - --registry=txt
        - --txt-owner-id=my-identifier
```

When the `external-dns` pod is up, it will add the Ingress service IP addresses to the DNS in the hosted zone. Check the full tutorial of setting external-dns up: [github.com/kubernetes-incubator/external-dns](https://github.com/kubernetes-incubator/external-dns/blob/master/docs/tutorials/aws.md)

The reason we can't see IP addresses in this example is the external-dns exposes dynamic public IP addresses of the ingress service assigned by the overlay network IP manager.

## Patterns

### Round Robin

### Scalability

### Fail Over

### Fake Load Balancing

### DNS Cache

## Conclusions

## References

* [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System)
* [What Is DNS Load Balancing?](https://www.nginx.com/resources/glossary/dns-load-balancing/)
