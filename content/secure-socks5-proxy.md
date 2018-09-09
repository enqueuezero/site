---
title: Secure Socks5 Proxy
category: Computer Science
tags: proxy
date: 2018-06-12
---

## Context

In HTTP / HTTPS world, the source and  destination of a TCP/IP packet is in public. A malicious party can interfere the network connection and send the source with a poisoned packet to deter or abort the connection.

Known attack techniques include:

* IP blocking. Malicious party blocks any connection attempts to designated IP addresses.
* DNS spoofing. Malicious party returns incorrect IP addresses instead.
* Packet filtering. Malicious party drops or terminates the packet whenever it detects designated words in the URL or data packet.
* TCP RST. Any future request to the destination blacklisted will be sent with TCP RST. The request will lost TCP connection immediately.
* Deep Learning. By applying deep learning cluster, malicious party can find suspicious IP addresses quickly.

[img[secure-socks5-proxy-attackers.png]]

Under such blockade, whoever wants to take a fresh air in the free Internet might sounds like dreaming. But geeks are apparently reluctant to lose even one single data packet for this cause. 

The solution is to leverage SOCKS5 protocol by strong cipher algorithms.

## Use

* Secretly penetrate firewall blockade.
* Hide all packet data including source, destination, payload.

## Common Patterns

Below lists some common seen techniques on developing a secure SOCKS5 proxy.

### LocalProxy-RemoteProxy Model

###! Free Client-Server

Trivial Client-Server model can serve pretty well in the case of no malicious attackers. It can against no malicious attacks.

[img[secure-socks5-proxy-free-connection.gif]]

###! Blocking

Malicious attackers can deploy firewall-alike system in between client and server so that no request will reach to server. Therefore, end user cannot get any data from server.

[img[secure-socks5-proxy-firewall.gif]]

###! Proxying

A reasonable way is setup a proxy server outside of firewall. All traffic will need to go through proxy server first, and relayed by proxy server.
Potential proxy technologies include HTTP proxies, Socks services, VPN services, SSH Tunneling, etc. SOCKS5 becomes de facto proxy protocol.

[img[secure-socks5-proxy-proxy.gif]]

For example, when requests are transmitting through SSH tunnel, firewall cannot recognize the traffic since the data are encrypted. The problem is that when doing the SSH handshake on creating tunnel, it's very likely to be recognized that the proxy server is being used as a proxy. So the firewall can deter the connection on SSH tunnel creation step.

###! Secure Proxying

A secure socks proxy should not expose below information to firewall:

* any characteristic of connection that shows it's being used as proxy.
* any real transmitted data.

To fix previous proxy model, a secure socks proxy will need to make an improvement on SOCKS5. We can split the SOCKS5 into two part, socks5-local, and socks5-remote.

[img[secure-socks5-proxy-ss.gif]]

Below steps is a simple explanation of above diagram.

* Client sends request to Local Proxy Server via SOCKS5.
* Local Proxy Server sends encrypted request data via plain HTTP request.
* Since the HTTP request has no obvious characteristics and the target Remote Proxy Server hasn't being identified as proxy, so it's safe to pass through firewall.
* Remote Proxy Server decrypts request data and relays to Real Server .
* Real Server makes response back to Remote Proxy Server and propagate back to Client via the same path.

### Socks5 as LocalProxy Protocol

Socks5 has wide support on client side. So we could share the benefit of transmitting data via SOCKS5 from client to Local Proxy Server. Socks5 performs data transmission on Layer 5.

Below curl command demonstrates that a smart client is capable of using SOCKS5 to connect to a SOCKS5 Proxy Server:

```
$ curl --socks5 127.0.0.1:1080 https://google.com
```

### HTTP as Transmission Protocol

HTTP is probably the most common traffic type across the entire Internet. Choosing HTTP as transmission protocol to break through firewall makes the packet and the server less likely to be recognized for proxy usage.

HTTPS is not suitable for firewall breakthrough. The purpose of HTTPS is listed below:

* to avoid content altering by malicious party.
* to avoid malicious party pretend itself as target server.
* to encrypt data.

While the purpose of a proxy software should meet below demands:

* to avoid which server is the target server.
* to avoid the proxy server being detected for proxy usage.
* to encrypt data.

Based on above reason, HTTP is a better choice for breaking through firewall than HTTPS or any other protocols.

### Cipher Algorithms

The cipher algorithms encrypts and decrypts data so that nobody can read data from encrypted stream except LocalProxy and RemoteProxy. Since AEAD ciphers simultaneously provide confidentiality, integrity, and authenticity, we tend to choose one of the listed AEAS family below as the cipher algorithm using in both Local Proxy and Remote Proxy.

* chacha20-ietf-poly1305
* aes-256-gcm
* aes-128-gcm

## Solutions

Shadowsocks is an excellent secure socks5 proxy solution. Check its [official site](https://shadowsocks.org/en/index.html) for more information.

## Challenges and Risks

### Untrusted Client

* Malicious party could install interference software in the client side to deter the connection in between local softwares and LocalProxy.
    * This can be achieved by forcing installation.
    * It can also be achieved by embed into widely installed softwares.
* Malicious party could force the person uninstalling LocalProxy.

### Untrusted Server

The server side must be  deployed into an environment without firewall blockade.

* Malicious party could force cloud provider or sneak into the cloud servers doing below things:
    * Steal server logging files.
    * Kill the ServerProxy process.
* Malicious party can also be the cloud provider.

### Insecure Cipher Algorithms

It's up to the end user's choice to choose which cipher algorithms to be used. If end user chooses insecure cipher algorithms, he/she might leak the fact or increase the suspicious degree that the server is being used as a Proxy server. When being detected, the server used as proxy server will be blocked.

### IP Whitelist

If end user can only connect to a selected range of IP lists, aka, IP whitelist, then there is no chance for the end user to use the SOCKS5 server, for SOCKS5 server IP will very unlikely to be included in the IP whitelist.

### Forward Security

When end users leaks both the cipher key and the traffic history, malicious party could decrypts all traffics in the past.

### Law Enforcement

Be aware of leaking no personal information even when using the secured SOCKS5 proxy. End user also might want to uninstall any untrusted certificates and softwares.

It's said that the inventor of Shadowsocks was invited to "have a cup of tea" with law enforcement, for he was chatting with friends via QQ, a widely installed Tencent software. Since that, he quitted developing the software.

## Conclusion

By secretly deploying a secure SOCKS5 proxy server and choosing a strong cipher algorithm, people can break through severe network blockade. Shadowsocks could be your first choice.
