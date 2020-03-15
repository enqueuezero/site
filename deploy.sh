#!/usr/bin/env bash

# abort on errors
set -e

# build
make build

# navigate into the build output directory
cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:enqueuezero/site.git master:gh-pages

cd -
