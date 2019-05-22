---
title: ZeroMQ Message
---

# ZeroMQ Message

The implementation of ZeroMQ message is an artifact of engineering solutions. It takes trade-offs between *high performance*.and various *use cases*.

It's never easy to get high performance considering that premature optimization is the root of all evil. We should find a right timing and a right spot optimizing the software. Yet ZeroMQ made it well.  Based on the size of the content, ZeroMQ allocates small messages (vsm) and large messages (lmsg). Small messages encode the content in itself, while large messages reference the content to an user allocated memory. When the size is large, ZeroMQ needs user provide an `ffn` function to deallocate the content, as it's user's responsibility to do clean up work for the memory of large contents. Such design is efficient enough for almost all use cases and yields to relatively small code set. Below code shows how ZeroMQ initialize a message:

```cpp
if (size_ <= max_vsm_size) {
    u.vsm.type = type_vsm;
    u.vsm.size = (unsigned char) size_;
    // ... (other fields).
} else {
    u.lmsg.type = type_lmsg;
    u.lmsg.content = (content_t*) malloc (sizeof (content_t) + size_);
    u.lmsg.content->data = u.lmsg.content + 1;
    u.lmsg.content->size = size_;
    u.lmsg.content->ffn = NULL;
    // ... (other fields)
}
```

In order to support various message types, such as storing the content in the message itself, storing the content in user allocated memory, pointing the content to the constant data, etc, ZeroMQ designs slightly different structs to represent them, and tightly packs all structs into a union. It makes sure one message can have only one type and one interpretation of its meaning. For example, to get the content from a message, a simple switch-case solves the problem:

```cpp
switch (u.base.type) {          // u is the union, and all common fields can be accessed by `base`.
case type_vsm:                  // typ_vsm indicates a small message.
    return u.vsm.data;          // for small message, we access data from field `data`.
case type_lmsg:                 // type_lmsg indicates a large message.
    return u.lmsg.content->data;// for large message, we use pointer.
// ... (other types) 
}
```

If you're interested in how ZeroMQ is implemented, check [msg.hpp](https://github.com/zeromq/libzmq/blob/master/src/msg.hpp) and [msg.cpp](https://github.com/zeromq/libzmq/blob/master/src/msg.cpp).
