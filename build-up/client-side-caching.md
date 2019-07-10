---
title: Client Side Caching
---

# Client Side Caching

Retrieving data over the network is slow and expensive. If delays appear, it might incurs more roundtrips between the client and server for the packet re-transmitions. If the client caches the data, then it doesn't need to send out a remote retrieving command.

Such a strategy enables serving data with smaller delays and at a larger scale. Many software have already implemented client-side caching somehow to survie from the load.

**Cache data from a web server.** When serving static files, web applications often enables HTTP Cache-Control to keep them on the browser side. Almost every browser has shipped HTTP Caching by default; it's the server's responsibility to provide some HTTP header directives, such as ETags and Cache-Control, to instruct the browser on how long it can cache and when to invalidate the assets. [1]

**Cache data from an In-Memory database.** Although not much in-memory database provides mechanism to assist the client caching locally, the client-side caching is still possible. We can use some basic tools that Redis provides. If you happen to have a Redis Cluster, divide keys into many groups, such as 16k groups. Use Pub/Sub notifying the clients about when keys has changed on which slots. On the client side, remember the timestamp when the key was cached, and remember the invalidation time for each slot when receiving the invalidation messages. When getting the value of a cached key, evict the key if the cached timestamp is older than the invalidation time. [2]

**Cache data retrived from a database.** Embedding the caching functionality into the SQL execution is a very traditional and effective approach. For example, by combining library `dogpile.cache`  with `sqlalchemy`, we can have full cache control as well as the ability to load data lazily from memory. When configuring the caching backend as in memory, such as `dogpile.cache.memory`, the cached data are stored locally in memory. [3]

[1]: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
[2]: http://antirez.com/news/130
[3]: https://docs.sqlalchemy.org/en/13/orm/examples.html#module-examples.dogpile_caching