#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Ju Lin'
SITENAME = 'Enqueue Zero'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'UTC'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Fund me', 'https://www.patreon.com/enqueuezero'),
         ('Twitter', 'https://twitter.com/enqueuezero'),
         ('Facebook', 'https://facebook.com/enqueuezero'),
         ('GitHub', 'https://github.com/soasme/enqueuezero/issues'),
         )

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 100

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

THEME = 'themes/medius'

DISQUS_SITENAME = 'enqueuezero'

STATIC_PATHS = ['static']
EXTRA_PATH_METADATA = {
    'static/favicon.ico': {'path': 'favicon.ico'}
}
