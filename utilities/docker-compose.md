---
title: Docker Compose
---


# Docker Compose

[Docker Compose](https://docs.docker.com/compose/), or docker-compose, Compose, is a tool for defining and running multi-container Docker applications.

[[toc]]

## Install

For macOS users,

```bash
$ brew install docker-compose
```

## Commands

Below commands covers 95% cases.

```bash
$ docker-compose up
$ docker-compose up -d # run as daemons
$ docker-compose up -d some-service

$ docker-compose stop
$ docker-compose down

$ docker-compose restart some-service

$ docker-compose ps # check all running processes in container

$ docker-compose rm some-service
$ docker-compose build some-service

$ docker-compose logs
$ docker-compose logs -f # like `tail -f`
$ docker-compose logs -f --tail=100 # only concern latest logs

$ docker-compose exec -it some-service bash
```

Any further usage can refer to [Overview of docker-compose CLI](https://docs.docker.com/compose/reference/overview/).

## Composefile

Place a `docker-compose.yaml` in project root as a normal convention.

The content of minimal `docker-compose.yaml` example:

```yaml
version: "3"

services:
  redis:
    image: redis

  web:
    build: .
    dockerfile: Dockerfile
    ports:
    - "8000:8000"
    volumes:
    - ".:/app"
    - "./data:/data"
    environment:
    - DEBUG=false
    command: /app/bin/entrypoint.sh
    links:
    - redis
    depends_on:
    - redis

```

## Caveats

It's probably the top#1 choice for local application development.

In general, you need both `Dockerfile` and `docker-compose.yaml` files simultaneously. [^caveat-1]

It's okay to have `runit` / `supervisor` installed in Docker image when doing local development, in which you can have multiple processes running.

It's recommended mounting `volumes` for data persistence, especially like MySQL, etc. The data is preserved even you type `docker-compose stop`.

Depending on the case, it can be used in production only when you have one server and have no SLA requirement. [Use Compose in production](https://docs.docker.com/compose/production/)

People mix Compose with Kubernetes, so there comes [Kompose](http://kompose.io/).

[^caveat-1]: https://stackoverflow.com/questions/29480099/docker-compose-vs-dockerfile-which-is-better
