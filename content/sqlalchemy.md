---
title: The Architecture of SQLAlchemy
date: 2018-10-01
category: Architecture
tags: database, architecture
---

## Context

Interacting with the databases involves the executions of SQL expressions. In early days, people manipulate through raw SQL strings. However, it has several disadvantages.

* It needs different database drivers.
* There are various SQL dialects, that is, these SQL expressions might look different in different databases.
* String manipulation increases security risk, for example, SQL injection.
* SQL operations are low-level operations.

Therefore, SQLAlchemy as a database toolkit and object-relational mapping (ORM) for Python emerged.

## Overview

SQLAlchemy as a database toolkit means it exposes a consistent API throughout various databases so that you now don't need to care database drivers, SQL dialects, SQL injection, etc.

SQLAlchemy as an ORM means it exposes a model-based API atop database tables so that you don't need to think about the database at all most of the times but to focus on your business logic.

## Concepts

### Core v/s ORM

SQLAlchemy has three layers above the database.

* ORM, the top layer.
* Core, the middle layer.
* DBAPI, the lowest layer.

### DBAPI

DBAPI is the Python Database API, which standardizes the functions and errors to communicate with databases.

It's not part of SQLAlchemy but is essential for SQLAlchemy to connect to different databases.

Check [PEP 249 -- Python Database API Specification v2.0](https://www.python.org/dev/peps/pep-0249/).

### Engine

The engine maintains the `Connection` to the databases. It also manages `Dialect`, which reflect the differences among databases.

### Compiler

The compiler compiles Python expressions into SQL strings. For example, the compiler compiles code `User.query.filter(username='enqueuezero')` to SQL string `SELECT * FROM user WHERE username = 'enqueuezero'`.

### Dialect

SQL has dialects. For example, you can query `SELECT json_each (info) FROM orders;` from a PostgreSQL but will get a syntax error from MySQL.

SQLAlchemy compiler has in-built dialect system letting you write queries in a consistency Pythonic way.

### Schema

The schemas define tables and columns in the database. In SQLAlchemy, you can define the table as a `Table` object, within which you can define `Column` fields. In addition, you can define `Index` for SQL index, `UniqueConstraint` for SQL unique constraint.

### SQL Expressions

SQLAlchemy gets an Abstract Syntax Tree (AST) by analyzing the Python expressions for the queries. 

### ORM Mapper

In SQLAlchemy, the table definition and the object model are separate. Therefore, after we define the table, and the model class, we need to combine them via a `mapper` function.

### Session

The `Session` maintains all model objects in memory. When they get dirty, meaning we have CRUD operations, the `Session` either flush them into the database or retrieve new data loading into memory. In another word, the `Session` is the place where you perform ORM database operations.

## Architecture

### Overview

![Overview of SQLAlchemy Architecture](/static/images/sqlalchemy-overview.png)

* SQLAlchemy Core provides a toolkit of connection pooling, SQL construction, and execution.
* SQLAlchemy ORM provides a comprehensive way to transform between raw data and object.

You can certainly choose not to use SQLAlchemy ORM piece if you don't like it. Even only using SQLAlchemy Core can ease your development.

## Codebase

The official codebase of SQLAlchemy is at [Bitbuccket](https://bitbucket.org/zzzeek/sqlalchemy) and [GitHub](https://github.com/zzzeek/sqlalchemy).

* SQLAlchemy exposes `create_engine` as the entry point for the library. All functionality begins by creating an Engine.
* To support various databases, `create_engine` identity the database driver by a string [DSN](https://en.wikipedia.org/wiki/Data_source_name) parameter. For example, to support MySQL, you can use `create_engien("mysql://user:pass@host/name")`. The configurations of SQLAlchemy are sending as keyword arguments.
* The `Engine` maintains a pool of `Connection`, in each one of which you can execute transactions, set isolation levels, etc. Especially, the `execute` method is where `Compiler` working.
* The `Compiler` constructs raw SQL query strings.
* The `Engine` also has an important field `dialect` which delegate many `Engine` functions to the designated database you passing in, for example, `create_engine("sqlite://")` will load module `sqlalchemy.dialects.sqlite`. Each dialect module implements subtle differences across various databases.
* It's unfair not to mention `ResultProxy` -- the return value of `execute`. For better performance, it's implemented in C module `sqlalchemy/cextention/resultproxy.c`. It makes a massive amount of object allocations and deallocations faster and more efficient.

## Conclusion

SQLAlchemy might be the best ORM software in the Python world regardless of your taste. Though you need to learn several fundamental concepts, it's still easy to use. If you're writing a Web application and needs to manipulate data with databases, SQLAlchemy is always a strong candidate.
