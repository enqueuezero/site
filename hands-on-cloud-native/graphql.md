---
title: Play around with GraphQL
---

# Play around with GraphQL

## What is GraphQL?

GraphQL is an open-source data query language for APIs, and a runtime for executing queries for existing data. It provides an efficient, powerful and flexible approach to developing web APIs, and is not tied to any specific database technology.

### GraphQL v/s RESTful

GraphQL and RESTful are two ways of sending data over HTTP. RESTful API is the traditional way and has gained a very wide popularity in many applications. GraphQL is often seen as a revolutionary of RESTful to overcome the shortages of RESTful. A RESTful API uses GET, POST, PUT and DELETE as operations over a basic concept "Resource". A typical RESTful API has below form:

* Create a post, `POST /api/v1/posts`.
* Get a post list, `GET /api/v1/posts`.
* Get a post, `GET /api/v1/posts/:id`.
* Update a post, `PUT /api/v1/posts/:id`.
* Delete a post, `DELETE /api/v1/posts/:id`.
* Add a post comment, `POST /api/v1/posts/:id/comment`.
* Like a post, `POST /api/v1/posts/:id/like`.

RESTful API often causes over fetching or under fetching. Each resource has relatively limit set of data as defined in schema. You need to call another API to get other data, which requires more network calls. The most important difference between RESTful API and GraphQL is GraphQL deal with data as a graph and therefore every piece of data can be connected. As a result, there is no over fetching or under fetching. Both GraphQL and RESTful are API design architectures for develop data-driven applications. By using GraphQL, it'll yield to less round trips between clients and servers. We'll explain this advantage in later chapter.

### GraphQL Architecture
### Client
### Server
## Why use GraphQL?
### Strongly Typed Schema
### Fetch Just Enough Data
### Composable APIs
### Friendly Tracing on the Backend
### Nice Community
## Essential Knowledge
### The Schema Definition Language (SDL)
### Schemas
### TypeDefs
### Resolvers
### Mutation
### Subscription
### Network Layer
## Play around with GraphQL
## Summary
## References

REST vs. GraphQL, <https://medium.com/codingthesmartway-com-blog/rest-vs-graphql-418eac2e3083>