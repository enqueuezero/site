---
title: Create Production Environment on Heroku
---

# Create Production Environment on Heroku

## Heroku Overview

Heroku is a cloud platform as a service supporting several programming languages, including Java, Node.js, Scala, Clojure, Python, PHP, and Go.

Heroku was initially for supporting a Ruby framework `Rack`. Later on,  a new platform was launched with more and more programming languages supported.

## Why use Heroku?

* Friendly APIs.
* A large number of community-driven buildpacks let you write no build script.

## How Heroku Works?

<mermaid>
graph TB
    router[HTTP Router]
    router-- route -->dynos;
    control_api-.control.->dynos
    dynos --> queueing
    dynos --> database
    dynos --> add-ons
    dynos --> health-check
</mermaid>

## Deploy to Heroku

Create `Procfile` in the root directory of the project.

```
web: bin/runsvdir-dyno
```

Create `Procfile.web` alongside with `Procfile`.

```
dash: node app.js
api: flask run --host=0.0.0.0 --port=5000
```

Add `deploy/heroku/main.tf`.

```
provider "heroku" {}
```

Append variables to the `main.tf`.

```
variable "app-name" {
  type = "string"
}

variable "app-version" {
  type = "string"
}

variable "database-plan" {
  type = "string"
  default = "hobby-dev"
}

variable "region" {
  type = "string"
  default = "us"
}

variable "github-client-id" {
  type = "string"
}

variable "github-client-secret" {
  type = "string"
}

variable "github-redirect-uri" {
  type = "string"
}

variable "secret-key" {
  type = "string"
}

variable "git-url" {
  type = "string"
  default = "git@github.com:soasme/tomato-coffee.git"
}
```

Create a heroku app.

```
resource "heroku_app" "app" {
    name = "${var.app-name}"
    region = "${var.region}"

    # PORT, DATABASE_URI are injected by heroku
    config_vars {
        SECRET_KEY = "${var.secret-key}"
        GITHUB_CLIENT_ID = "${var.github-client-id}"
        GITHUB_CLIENT_SECRET = "${var.github-client-secret}"
        GITHUB_REDIRECT_URI = "${var.github-redirect-uri}"
    }

    buildpacks = [
      "heroku/python",
      "heroku/nodejs",
      "https://github.com/dpiddy/heroku-buildpack-runit.git",
    ]
}
```

Set the build for the app.

```
resource "heroku_build" "app" {
  app        = "${heroku_app.app.id}"

  source = {
    # This app uses a community buildpack, set it in `buildpacks` above.
    url     = "https://github.com/soasme/tomato-coffee/archive/${var.app-version}.tar.gz"
    version = "${var.app-version}"
  }
}
```


Attach a database as an addon.

```
resource "heroku_addon" "database" {
  app  = "${heroku_app.app.name}"
  plan = "heroku-postgresql:${var.database-plan}"
}
```

Set tag.

```
$ git tag v0.1.0
$ git push origin v0.1.0
```

Prepare a configuration file `deploy/heroku/terraform.tfvars`.

```
app-name = "tomato-coffee"
app-version = "v0.1.0"
secret-key = "amguztlmqbxmgjgoqhdwiufwflobvkip"
region = "us"
github-client-id = "rvxsjzkyhvmjjklq"
github-client-secret = "yqvprfofssgealeeqlafqkwghlxacxva"
github-redirect-uri = "https://tomato-coffee.herokuapp.com/auth/github/callback"
```

Apply these changes.

```
$ terraform apply
```

## References

Heroku, www.heroku.com, <https://www.heroku.com/>

Heroku DevCenter, devcenter.heroku.com, <https://devcenter.heroku.com/>

Building Docker Images with heroku.yml, devcenter.heroku.com, <https://devcenter.heroku.com/articles/build-docker-images-heroku-yml>
