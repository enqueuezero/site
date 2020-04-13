---
title: Access Token
---

# Access Token

## What is Access Token?

Access Token is a unique string that represents who is using an account browsing the internet.

:::tip
Access Token is not a password. A password is a piece of credential information that nobody else knows what it is, including the DBA of the website. Access Token is just a badge and is no credential. Every time you sign into a website, you'll be assigned with either a session or an access token.
:::

## How to use Access Token?

Access Token is used when the application needs to know who is accessing.

On client-side, there are two popular ways.

* Use a dedicated client to handle the OAuth2 flow. Once finished, you'll get an access token internally.
* Or, save access token as environment variables. For example, add `export GITHUB_TOKEN=KhXDkRJWyihcAmFNgtNydMrGPkpzoVde` in your `.bashrc`.

On server-side, one of the common use of access token is within an API Gateway.

* The API Gateway authenticates the user based on either cookie session or access token.
* The API Gateway passes the ID token to other microservices.
* The microservice recursively includes the ID token in requests made to other microservices.

## What is the difference between ID Token and Access Token?

The ID Token is meant for the application only. An application needs to know some basic information of the user, and luckily ID Token encapsulates this information in the payload. ID Token is usually a JSON Web Token (JWT).

The Access Token is meant for API. Its purpose is to inform the API that the **bearer** of the token is trying to access the API.

OpenID Connect issues an identity token, known as an ID Token. OAuth2.0 issues an Access Token. In short, the ID token is for authentication, and the Access Token is used to gain access to API.

### What is JSON Web Token?

JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties. In short, it allows you to decode, verify and generate tokens. The most common scenario of JWT is for authorization. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. 

Below is a typical encoded JWT token.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

As separated by `.`,

* The first part is header, `{"alg": "HS256", "typ": "JWT"}`. There are some other `alg` can be used, for example `HS384`, `HS512`, etc.
* The second part is payload,`{"sub": "1234567890","name": "John Doe", "iat": 1516239022 }`.
* The third part is a signature of the above information that indicates no one modifies the token.

See more information on [jwt.io](https://jwt.io/introduction/).

## How does Access Token work?

Once logged into the application, it returns you an access token.

Next time, your client will add an `Authorization` header in the request. For example,

```bash
$ curl -H"Authorization: Bearer KhXDkRJWyihcAmFNgtNydMrGPkpzoVde" \
  https://example.com/api/v1/me
```

Bearer Tokens are part of the OAuth V2 standard and widely adopted by many APIs.

## References

* [jwt.io](https://jwt.io).
* [what is the oauth 2.0 bear token exactly](https://stackoverflow.com/questions/25838183/what-is-the-oauth-2-0-bearer-token-exactly/25843058).
