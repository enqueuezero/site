title: The Architecture of SQLAlchemy
status: Draft
date: 2018-10-01
category: Architecture
tags: database, architecture

## Context

Interacting with the databases involves the executions of SQL expressions. In early days, people manipulates through raw SQL strings. However, it has several disadvantages.

* It needs various different database drivers.
* There are various sql dialects, that is, there sql expressions might look different in different databases.
* String manipulation increase security risk, for example, sql injection.
* SQL operations are low-level operations.

Therefore, SQLAlchemy as a database toolkit and object-relational mapping (ORM) for Python emerged.

## Overview

SQLAlchemy as a database toolkit means it exposes a consistent API through out various databases, so that you now don't need to care database drivers, sql dialects, sql injection, etc.

SQLAlchemy as an ORM means it exposes a model-based API atop database tables, so that you don't need to think about database at all most of the times but to focus on your business logic.
