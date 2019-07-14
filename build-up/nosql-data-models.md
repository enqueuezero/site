---
title: NoSQL Data Models
---

# NoSQL Data Models

We've already learned that a table in SQL databases has rows and columns, the former of which refer to records, the latter of which refer to attributes of records.  Unlike tables in SQL databases, NoSQL databases have a different data model, which is called *aggregate*.

An aggregate is a single data unit that includes all related objects. Each data unit is the entity that is used for perceiving, manipulating, sharding, etc. For example, in your application, when describing an order, it has shipping details, payment information, billing addresses, etc; we then aggregate all of them into a single JSON object and save it to a NoSQL database.