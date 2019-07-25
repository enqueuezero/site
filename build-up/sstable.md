---
title: SSTable
---

# SSTable

SSTable stands for Sorted Strings Table; it's a file of key-value pairs sorted by keys. Keys and values are artitrary byte strings. By design, the keys and values are immutable. Several database engines are built on top of SSTable, such as LevelDB, RocksDB, Cassandra, Lucene, InfluxDB, etc.

An SSTable-based database consists of a sequence of SSTable files. Each unique key only appears once in an SSTable file. If the key appears in several SSTable files, the value in the last seen file is used. Several SSTable files can be merged and compacted into one single SSTable file periodically. Old key-value pairs are discarded on the merging operation.

Finding a particular key in an SSTable file is simply to perform a binary search since all keys are ordered. Each SSTable file has typically a few kilotytes and thus searching is pretty fast.

Because of immutable, any update will need to append the new key-value pair to the SSTable file. What if there are two updates on the same key in a short period? We already know that each key can only appear once in a file. The solution is by maintaining an in-memory balanced tree data structure; such a tree is called *memtable*. When the size of the memtable is over the threshold, all sorted keys are then dumped to an SSTable file. Meanwhile, such a file becomes the latest segment of the database. Finding a particular key then becomes a two-steps: find in-memory first; if not found, find on-disk. As time passed by, old SSTable files are somehow aggregated by a merging process.

Yet such a solution leaves one problem to us, what if the database crashes before dumping the latest key-value pairs to the disk? One commonly used solution is by introducing binlog. The keys in the binlog file are not sorted, but it doesn't matter; they're only used to recover from a crash. The binlog file can be discarded when all data have been written to the disk.

---

**Case Study: RocksDB.** Let's see how RocksDB builds up from this simple data structure. [1]

There are three basic constructs in RocksDB, *memtable*, *sstfile*, and *logfile*. The *memtable* tracks the recent updates in memory. Each update is sequentially written to a *logfile* on storage. When the size of *memtable* is over a threshold, it's flushed to a *sstfile* on storage, and the *logfile* is discarded correspondingly. 

On top of these constructs, RocksDB provides some simple operators: `Get(key)`, `MultiGet(keys)`, `Put(key, value)`, `Delete(key)`, `NewIterator()`, etc.  

In-between the APIs and the underlying files, there are several aspects being introduced, such as data compression, checksuming, snapshot, replication, read-only mode, transactions, and multi-threading, etc.

[1]: https://github.com/facebook/rocksdb/wiki/RocksDB-Basics