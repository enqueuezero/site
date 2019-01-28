---
title: Continuous Integration
sidebar: auto
---

# Continuous Integration

## What is Continuous Integration

Continuous Integration (CI) is a development practice that requires developers to integrate code into a shared repository several times a day.

## Why CI is important?

* It's cheap.
* Fast integration.
* Catch issues early.
* Less code change to debug when having problem.
* Deploy the code more rapidly.

## Solutions

### Travis CI

### Jenkins

### CircleCI

### Appveyor

Appveyor is a Continuous Integration solution for Windows and Linux.

### Drone

Drone is a Continuous Delivery platform built on Docker, written in Go.

## Perform Tests by Travis CI

### Trigger the First Build

Enable the Travis job from the Travis CI website.

Add `.travis.yml` to the root directory of the project.

```yaml
language: node_js
node_js:
  - "10"
sudo: false
cache:
  yarn: true
  directories:
  - node_modules
script:
  - yarn install
  - yarn test
  - yarn run build
```

Add the file to the code base and push it to upstream.

```
$ git add .travis.yml
$ git commit -m'add .travis.yml'
$ git push origin master
```

### Introduce Matrix

Modify `.travis.yml`.

```yaml
matrix:
  include:
    - language: node_js
      node_js:
        - "10"
      sudo: false
      cache:
        yarn: true
        directories:
        - node_modules
      script:
        - yarn install
        - yarn test
        - yarn run build
    - language: python
      dist: xenial
      python:
        - "3.7"
      sudo: false
      script:
        - pip install -r requirements.txt
        - pip install -r dev-requirements.txt
        - py.test tests
```

Add the file to the code base and push it to upstream again.

```
$ git add .travis.yml
$ git commit -m'specify the stable release of Python 3.7 on travis Xenial for api test.'
$ git push origin master
```

You should see the repository on Travis CI getting triggered again and with a new environment added.

![api job added](/static/images/hands-on-cloud-native-ci-travis-job-python-api.png)

### Build Docker Image

Install `travis` CLI.

```bash
$ brew install travis
```

Login.

```bash
travis login --auto
We need your GitHub login to identify you.
This information will not be sent to Travis CI, only to api.github.com.
The password will not be displayed.

Try running with --github-token or --auto if you don't want to enter your password anyway.

Username: soasme
Password for soasme: ********************************
Two-factor authentication code for soasme: 306042
Successfully logged in as soasme!
```

Set build env.

```bash
$ travis env set DOCKER_USERNAME soasme
[+] setting environment variable $DOCKER_USERNAME

$ read -s DOCKER_PASSWORD # Input your password and type enter.

$ travis env set DOCKER_PASSWORD $DOCKER_PASSWORD
[+] setting environment variable $DOCKER_PASSWORD

$ travis env set DOCKER_IMAGE_NAME soasme/tomato-coffee
[+] setting environment variable $DOCKER_IMAGE_NAME
```

Modify `.travis.yml`.

```yaml
matrix:
  include:
    - language: node_js
      node_js:
        - "10"
      sudo: false
      cache:
        yarn: true
        directories:
        - node_modules
      script:
        - yarn install
        - yarn test
        - yarn run build
    - language: python
      dist: xenial
      python:
        - "3.7"
      sudo: false
      script:
        - pip install -r requirements.txt
        - pip install -r dev-requirements.txt
        - py.test tests
      services:
        - docker
      deploy:
        provider: script
        script: bash scripts/docker-push
        on:
          tags: true
```

Add file `scripts/docker-push`.

```bash
#!/bin/bash

set -e

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build -f ./dockerfiles/api.dockerfile -t $DOCKER_IMAGE_NAME:latest .;

if [ ! -z "$TRAVIS_TAG" ]; then
    docker tag $DOCKER_IMAGE_NAME:latest $DOCKER_IMAGE_NAME:$TRAVIS_TAG;
fi && docker push $DOCKER_IMAGE_NAME
```

Commit the file and push it again.

```bash
$ git add .travis.yml scripts/docker-push
$ git commit -m'build docker image on travis ci.'
$ git push origin master
```

You should now see the build log of latest build.

```
Skipping a deployment with the script provider because this is not a tagged commit

Done. Your build exited with 0.
```

Then, we perform a git tag to trigger a tagged build.

```
$ git tag v0.2.4
$ git push origin v0.2.4
```

The newly triggered build should run all tests and then push a docker image to the docker registry. After the build, the docker registry should create a page like <https://hub.docker.com/r/soasme/tomato-coffee>.

![docker hub](/static/images/hands-on-cloud-native-ci-docker-hub.png)

## Summary

Continuous Integration has two major tasks: run tests and build artifacts.

## References

Continuous Integration, www.thoughtworks.com, <https://www.thoughtworks.com/continuous-integration>

Building a Python Project, docs.travis-ci.com, <https://docs.travis-ci.com/user/languages/python/>

Using Docker in Builds, docs.travis-ci.com, <https://docs.travis-ci.com/user/docker/>

travis-ci/travis.rb, github.com, <https://github.com/travis-ci/travis.rb>
