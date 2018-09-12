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

DEFAULT_PAGINATION = 20

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

THEME = 'themes/medius'

STATIC_PATHS = ['static', 'extra/CNAME']

EXTRA_PATH_METADATA = {
    'static/favicon.ico': {'path': 'favicon.ico'},
    'extra/CNAME': {'path': 'CNAME'},
}

DEFAULT_MEDIUS_AUTHORS = ['Enqueue Zero', 'Ju Lin']
MEDIUS_AUTHORS = {
    'Ju Lin': {
        'image': 'http://www.gravatar.com/avatar/bffb5fd030d679a313376b4eff07775b',
        'description': "Ju Lin is the author behind Enqueue Zero. He likes web programming, system programming, algorithms, and architecture."
    },
    'Enqueue Zero': {
        'image': '/static/images/ezlogo60x60.png',
        'description': "Enqueue Zero is creating fun arts on Computer Science and Programming. It's operated by a single man team since 2018."
    }
}
MEDIUS_CATEGORIES = { }

PATREON_ID = '11258749'
