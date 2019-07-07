---
title: Protocol Upgrade
---

# Protocol Upgrade

> ```
> For good reasons, wise people avoid switching tools without very good reasons. [1]
> - Salvatore Sanfilippo
> ```

We have seen several significant protocol upgrades in the technical world, such as the evolution of HTTP 1.0, HTTP 1.1, and HTTP 2.0. While some upgrades have been through decades but with relatively less adoptions, such as IPv6. Protocol upgrade happens when the old design is no longer easy for supporting new requirements and hence new design is as a replacement of the old design. Protocol upgrade means the existing implementations of the protocol is to be discarded, which is a heavy lifting change to the related software.

**WebSockets Over HTTP.** Websocket [2] protocol is a solution that does not enforce too much change to the current protocol. 

An `Upgrade` header field is used by clients to request the server to switch the current connection from HTTP to Websocket. If the server accepts the upgrade, it sends back a `101 Switching Protocols` response status with an Upgrade header; otherwise it ignores the `Upgrade` header and sends back a regular response, such as a `200 OK` as a rejection. The server can then serve the request in WebSocket, a new protocol that keeps connections a a two-way pipe.

In short, we can request for a protocol switching by negotiating the next protocol to use through an existing protocol.

[1]: http://antirez.com/news/130
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism