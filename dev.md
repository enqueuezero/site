# Dev


Create environment

```bash
# Python 3.7 required
$ brew install python

$ pip install pipenv

$ pipenv install
```

Run devserver

```bash
$ pipenv shell

(env) $ make devserver

```

Stop devserver

```bash
(env) $ ./develop_server.sh stop
```

Publish

```bash
(env) $ make github
```
