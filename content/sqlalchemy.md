---
title: The Architecture of SQLAlchemy
status: Draft
date: 2018-10-01
category: Architecture
tags: database, architecture
---

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

## Concepts

### Core v/s ORM

SQLAlchemy has three layers above database.

* ORM, the top layer.
* Core, the middle layer.
* DBAPI, the lowest layer.

### DBAPI

DBAPI is a Python Database API, which defines some standardize functions and errors to communicate with databases.

It's not part of SQLAlchemy but is essential for SQLAlchemy to connect to different databases.

Check [PEP 249 -- Python Database API Specification v2.0](https://www.python.org/dev/peps/pep-0249/).

### Engine

The engine maintains the `Connection` to the databases. It also manages `Dialect`, which reflect the differences among databases.

### Compiler

The compiler compiles Python expressions into SQL strings. For example, code `User.query.filter(username='enqueuezero')` would eventually be compiled to `SELECT * FROM user WHERE username = 'enqueuezero'`.

### ResultProxy

### Dialect

### Schema

### SQL Expressions

### ORM Mapper

### Session
