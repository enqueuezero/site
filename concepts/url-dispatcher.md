---
title: URL Dispatcher
permalink: /concepts/url-dispatcher.html
category: Computer Science
date: 2018-06-28
---

## Context

URI links live everywhere outside the website itself, so we tend to change URIs as less as possible. Check more on [Hypertext Style: Cool URIs don't change](https://www.w3.org/Provider/Style/URI).

Most modern web frameworks provide a component called `Router` or `URLDispatcher` to resolve a function or method to handle requests to URLs.

## Patterns

### Request Process

A typical request processing routine is as below:

* Web framework loads URL resolution map. Each rule is bound to a handling class, or function, or method.
* When request comes, web framework iterates through each route in defining order sequence and stops at the first matching route.
* Once the URL rule matches, web framework construct request information and pass it to the handling class, or function, or method.
* A 404 exception is raised when no rule matches.

### Resolution

There are many means to determine which function to execute for an URL.

* Regex Resolution
* Template Resolution
* Directory Resolution
* Function Resolution

Among them, Regex Resolution and Template Resolution are the most popular.

#### Regex Resolution

Regex is a string pattern matching technique. We define URL regex first, and web framework will apply URLs to regex one by one until matching.

For example, in Django, you can define rules like below code:

```
from django.urls import re_path
from . import view

urlpatterns = [
    re_path(r'posts/(?P<id>\d+/$', view.get_post),
    re_path(r'posts/(?P<id>\d+/comments/$', view.get_post_comment),
]
```

Above code can resolute `/posts/42` to `view.get_post` to execute; resolute `/posts/42/comments` to `view.get_post_comment` to execute.

Regex is very fast because the expressions are generally pre-compiled when web application loaded.

#### Template Resolution

Regex is hard to read, so people invent template string to make it more readable.

[RFC 6570: URI Template](https://tools.ietf.org/html/rfc6570) is among one of the most popular solutions. It defines expressions by `{` and `}`. For example,

* `/posts{/id}` matches `/posts/42`.
* `/posts{/id*}` matches `/posts/42/comments`, `/posts/42/likes`, etc.

Another popular solution is to use angle bracket `<` and `>`. For example,

* `/posts/<int:id>` matches `/posts/42`.
* `/posts/<int:id>/comments` matches `/posts/42/comments`.

Some web frameworks also use `:`  to define variables. For example,

* `/posts/:id` matches `/posts/42`.
* `/posts/:id/comments` matches `/posts/42/comments`.

Some web frameworks even support the glob pattern. For example,

* `/posts/*` matches `/posts/42`.
* `/posts/*.*` matches `/posts/42.html` or `/posts/42.json`.

#### Function-based Resolution

To make the resolution more generic, a function-based solution is often used as a supplement solution. For example, in [Sinatra](https://sinatrarb.com/intro.html), you can add an extra function to the url resolution:

```
set(:probability) { |value| condition { rand <= value } }

get '/win_a_car', :probability => 0.1 do
  "You won!"
end

get '/win_a_car' do
  "Sorry, you lost."
end
```

We can even use data in the headers or domain. For example, in [Google App Engine](https://cloud.google.com/appengine/docs/standard/java/how-requests-are-routed), you can dispatch requests to `https://simple-sample.appspot.com/mobile/` and `https://simple-sample.appspot.com/work/` by rules defined in below code.

```
dispatch:
  # Send all mobile traffic to the mobile frontend.
  - url: "*/mobile/*"
    service: mobile-frontend

  # Send all work to the one static backend.
  - url: "*/work/*"
    service: static-backend
```

#### Directory-based Resolution

Based on the similarity of the `/` to file path in the file system, some frameworks map URL to script files in the same structure as they are in the filesystem. For example:

* URL `/posts/comments/` is handled by script `./posts/comments.php`.
* URL `/posts/42` is handled by function `_q_lookup` in script `./posts.py` (Quixote framework).

### Nested Definition

Duplicate patterns often appear in urls. For example: `/posts/*/comments` and `/posts/*/likes` share same fragment `/posts/*`.

We can define patterns in a nested way. For example, in Django, you can define as below:

```
post_urls = [
    path('comments', view.show_comments),
    path('likes', view.show_likes),
]
urls = path('/posts/*' , post_urls)
```

### Generating URLs

We have a demand to get URLs from a given routing URL and parameters. We call such use case reverse.

For example, in Flask, you can use `url_for` in view function to generate a URL for redirection:

```
from flask import url_for, redirect

return redirect(url_for('add-post-comment'))
```

In template, we also can use similar functions:

```
# post_comment.html
<a href="{% url 'add-post-comment' %}">Add Comment</a>
```
## Solutions

### Sinatra

Sinatra framework is simple and elegant.

```
get '/posts/:id' do
    # do something
end
```

### Flask

Flask is more tedious but still very short.

```
@app.route('/posts/<int:id>')
def get_post(id):
    # do something
```

### Sprint

Sprint has similar syntax but with much boilerplate code.

```
@RestController
@SpringBootApplication
public class PostApplication {

  @RequestMapping(value = "/posts/{id}")
  public String comment(@RequestParam String id) {
    return "Spring in Action";
  }
}
```

### Django

In Django, registering is defined in a `urls.py` file.

```
# in views.py
def get_post(request, id):
    # do something

# in urls.py
urlpatterns = [
    path('/posts/<int:id>', get_post
]
```

### Skipper

[Skipper](https://opensource.zalando.com/skipper/) can route requests via an [`eskip` file](https://opensource.zalando.com/skipper/data-clients/eskip-file/) like below.

```
hello: Path("/hello") -> "https://www.example.org"'
googleWildcardMatch:
        *
        -> setPath("/search")
        -> setQuery("q", "godoc skipper")
        -> "https://www.google.com";
```

## Conclusions

Web framework routes URLs to functions based on a pre-registered URL rules. It's one of the very core features in any web framework.

## References

* https://www.w3.org/Provider/Style/URI
* https://t-code.pl/blog/2016/11/Towards-server-side-routing-with-URI-Templates/
* https://tools.ietf.org/html/rfc6570
* https://docs.djangoproject.com/en/2.0/topics/http/urls/
* https://sinatrarb.com/intro.html
* https://flask.pocoo.org/docs/0.12/api/#url-route-registrations
* https://opensource.zalando.com/skipper/reference/architecture/
