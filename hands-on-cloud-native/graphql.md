---
title: Play around with GraphQL
---

# Play around with GraphQL

## What is GraphQL?

GraphQL is an open-source data query language for APIs, and a runtime for executing queries for existing data. It provides an efficient, powerful and flexible approach to developing web APIs, and is not tied to any specific database technology. Just like any other API styles defining how client load data from a server, GraphQL enables the client explicitly declare what type and fields it needs from a server.

### GraphQL v/s RESTful

Both GraphQL and RESTful are API design architectures for develop data-driven applications. They are two ways of sending data over HTTP. RESTful API is the standard way for designing APIs and has gained a very wide popularity in many applications. GraphQL is often seen as a revolutionary of RESTful to overcome the shortages of RESTful. 

A RESTful API uses GET, POST, PUT and DELETE as operations over a basic concept "Resource". A typical RESTful API has below form:

* Create a post, `POST /api/v1/posts`.
* Get a post list, `GET /api/v1/posts`.
* Get a post, `GET /api/v1/posts/:id`.
* Update a post, `PUT /api/v1/posts/:id`.
* Delete a post, `DELETE /api/v1/posts/:id`.
* Add a post comment, `POST /api/v1/posts/:id/comment`.
* Like a post, `POST /api/v1/posts/:id/like`.

RESTful API often causes over fetching or under fetching. Each resource has relatively limit set of data as defined in schema. You need to call another API to get other data, which requires more network calls. The most important difference between RESTful API and GraphQL is GraphQL deal with data as a graph and therefore every piece of data can be connected. As a result, there is no over fetching or under fetching.  By using GraphQL, it'll yield to less round trips between clients and servers. We'll explain this advantage in later chapter.

### GraphQL Architecture

## Why use GraphQL?

### No Over-Fetching

One of the most common downside of RESTful API is over-fetching and under-fetching.

In RESTful API, an endpoint usually returns a fixed data structure of a resource. For example, after you send a request `GET /posts/:id`, it would return data like below:

```js
{
    "id": "1000001",
    "title": "Hands-On Cloud Native Application",
    "content": "--To be continue--",
    "created_at": 1551432089
}
```

Though you don't necessarily need every fields every time, you still need to fetch data. It's not an easy ting to design a RESTful API that can provide clients with the exact data they need.

With GraphQL, you can specify just enough data as needed. For example,

```
query {
    Post(id: "1000001") {
        title
    }
}
```

### No Under-Fetching

As mentioned earlier, With a REST API, typically you need to gather enough data by accessing various endpoints. For example, in order to build a user profile page, you would possibly need to call below endpoints:

* Get user basic information, `GET /users/:id`.
* Get user latest liked posts, `GET /users/:id/likes`.
* Get user latest followers, `GET /users/:id/followers`.
* Get user latest followees, `GET /users/:id/followees`.

It needs at least four network calls! In GraphQL, you'd simply send one single query to GraphQL server, in which you specifies all the data you need. The GraphQL server aggregates all data needed and then responds with a JSON object where the requirements are fulfilled.

```
query {
    User(id: "1000001") {
        name
        likes {
            id
            title
        }
        followers(last: 3) {
            name
        }
        followees(last: 3) {
            name
        }
    }
}
```

### Strongly Typed Schema

GraphQL enables writing schema with a strong type system called GraphQL Schema Definition Language (SDL).

### Friendly Tracing on the Backend

## Essential Knowledge

### Use SDL

The syntax for defining GraphQL schemas is called Schema Definition Language (SDL). The schema is a contract of how the data structure should be.

Below is an example of how we can use the SDL to define a data structure called `Link`.

```
type Link {
    url: String!
    tags: [String!]
}
```

The type has two fields; they are `url` and `tags` with type `String` and `[String]`. The `!` indicates that the field is required. The `[]` indicates the field is an array of values, for example, `[String]` means a list of `String` values.

### Fetch Data

GraphQL server exposes only one endpoint to clients. All data will be fetched through this endpoint. What makes the endpoint send different data out is called a *query*.

Below is an example of how we can use a query to fetch data

```
{
    myLinks {
        url
        tags
    }
}
```

The `myLinks` field in this query is a *root field*, in which includes the *payload* of the query. In this example, the payload has `url` and `tags` fields. The query would return a list of user's links in the database. For example,

```js
{
    "myLinks": [
        {"url": "https://enqueuezero.com", "tags": ["ez"]},
        {"url": "https://enqueuezero.com/hands-on-cloud-native", "tags": ["ez"]}
    ]
}
```

### Query Arguments

In GraphQL, each *field* can have zero to more query arguments. For example,

```
{
    myLinks(last: 5) {
        url
        tags
    }
}
```

In this example, the GraphQL server would only return my last five links.

### Apply Mutations

Mutations are for making changes. There are generally three kinds of mutations:

* Create data
* Update data
* Delete data

The query for applying mutations are similar, except they start with keyword `mutation`. Below is an example of how we create a new `Link`:

```
mutation {
    createLink(url: "https://enqueuezero.com", tags: ["ez"]) {
        id
        created_at
    }
}
```

As you can see, the mutation also has a *root field*, `createLink` in this example. We also ask for data `id` and `created_at` from GraphQL server after the `Link` is created. The GraphQL server might respond below data:

```js
"createLink": {
    "id": 1000001,
    "created_at": "2019-03-01T09:21:29+00:00"
}
```

### Define Schema

The schema is a contract that specifies what data clients can request. Generally, a schema is a set of GraphQL types. Every GraphQL type has a *root* type, for example `Query`, `Mutation`, etc.

To support handling queries, we need to define a `Query` type.

```
type Query {
    myLinks: [Link!]!
}
```

To support query arguments, we need to add argument to the field.

```
type Query {
    myLinks(last: Int): [Link!]!
}
```

Similarly, to support creating Links, we'll need to define a `Mutation` type.

```
type Mutation {
    createLink(url: String!, tags: [String!]): Link!
}
```

And of course, we need to put `Link` type as well. Below is the full definition putting everything together.

```
type Query {
    myLinks(last: Int): [Link!]!
}

type Mutation {
    createLink(url: String!, tags: [String!]): Link!
}

type Link {
    id: String!
    url: String!
    tags: [String!]!
    created_at: String!
}
```

### Resolvers
### Mutation
### Subscription
### Network Layer
## Play around with GraphQL
## Summary
## References

REST vs. GraphQL, <https://medium.com/codingthesmartway-com-blog/rest-vs-graphql-418eac2e3083>