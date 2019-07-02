---
title: Message Queue Use Case
---

Imagine you are developing a website that allows user to register. After submiting user's email and password hash to database, the user will need to verify his account by clicking a link that is sent to his email inbox.

Initially, you might wrote below code.

```python
# app.py
from flask import Flask, g, render_template
from flask_mail import Mail, Message

app = Flask(__name__)
mail = Mail(app)

def send_account_verification_mail(user)
    msg = Message(
        "Congratulations, you are a member of %s now." % (
            app.config.get('SITE_NAME')
        ),
        body='Please click the link: %s' % get_verification_link(user),
        sender="noreply@example.com",
        recipients=[user.email]
    )
    mail.send(msg)

@app.route('/users/register/success')
def register_account_success():
    send_account_verification_mail(g.user)
    return render_template('users/register/success.html')
```

The code looks about to be right, except it will take several seconds until the page is loaded. If the email vendor is experiencing some performance issue or, even worse, disrupted, the page could seem to load forever.

Message queue to resue! You decided to deploy a RabbitMQ instance and some workers that run in the background.

```bash
$ service rabbitmq-server start # assume rabbitmq has installed.
$ celery -A app.celery worker
```

```python
# app.py
from flask import Flask, g, render_template
from flask_mail import Mail, Message
from celery import Celery

app = Flask(__name__)
mail = Mail(app)
celery = Celery(
    app.import_name,
    broker=app.config['CELERY_BROKER_URL']
)

@celery.task()
def send_account_verification_mail(user)
    msg = Message(
        "Congratulations, you are a member of %s now." % (
            app.config.get('SITE_NAME')
        ),
        body='Please click the link: %s' % get_verification_link(user),
        sender="noreply@example.com",
        recipients=[user.email]
    )
    mail.send(msg)

@app.route('/users/register/success')
def register_account_success():
    send_account_verification_mail.delay(g.user)
    return render_template('users/register/success.html')
```

The code has changed not much:

* A new library is added for managing tasks. Celery (<http://www.celeryproject.org/>) is an asynchronous queue library.
* The function `send_account_verification_mail` is wrapped by a decorator `@celery.task()`.
* The call of the function becomes `send_account_verification_mail.delay(g.user)`.

In short, there is not much change in the source code. 

On the operation side, two significant components are added:

* A message queue.
* Worker.

After the change, the web process that handles users' requests can respond immediately. The worker process will send emails if a new task is detected. The long-running tasks is then moved to the worker process. Message queue with a live worker makes sure that the task is executed shortly and won't block the user request.

If you have a lot of user registrations, the worker can process all of email sending tasks one by one, though some delay might be expected.

There are more use cases for using message queue, such as image cropping, video encoding, publishing notifications to many subscribers, etc. 

