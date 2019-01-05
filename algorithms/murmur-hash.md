---
title: MurmurHash
---

# MurmurHash

## Overview

MurmurHash a non-cryptographic hash function suitable for general hash-based lookup. 

One of its implementation in C is as below:

```c
uint32_t murmur3_32(const uint8_t* key, size_t len, uint32_t seed) {
  uint32_t h = seed;
  if (len > 3) {
    const uint32_t* key_x4 = (const uint32_t*) key;
    size_t i = len >> 2;
    do {
      uint32_t k = *key_x4++;
      k *= 0xcc9e2d51;
      k = (k << 15) | (k >> 17);
      k *= 0x1b873593;
      h ^= k;
      h = (h << 13) | (h >> 19);
      h = (h * 5) + 0xe6546b64;
    } while (--i);
    key = (const uint8_t*) key_x4;
  }
  if (len & 3) {
    size_t i = len & 3;
    uint32_t k = 0;
    key = &key[i - 1];
    do {
      k <<= 8;
      k |= *key--;
    } while (--i);
    k *= 0xcc9e2d51;
    k = (k << 15) | (k >> 17);
    k *= 0x1b873593;
    h ^= k;
  }
  h ^= len;
  h ^= h >> 16;
  h *= 0x85ebca6b;
  h ^= h >> 13;
  h *= 0xc2b2ae35;
  h ^= h >> 16;
  return h;
}
```

## Chi-squared Test

MurmurHash passed the [Chi-squared test](https://en.wikipedia.org/wiki/Chi-squared_test) for all keysets and bucket sizes in used. It demonstrates that Murmurhash has good distribution.

## Avalanche effect

In cryptography, the avalanche effect is about how the outcome of the hashing function being impacted by the slightly changed input, for example,  half the output bits flip.

MurmurHash has a good avalanche behavior with max bias 0.5%.

## Collision resistance

A hash function is collision resistant if it is hard to find two inputs that hash to the same output.

MurmurHash has good collision resistance. No collisions possible for 4-byte keys, no small (1- to 7-bit) differentials.

## Performance

MurmurHash takes trade-off between hash quality and CPU consumption, which makes it super fast.

## Who uses it?

### MurmurHash Online

<http://murmurhash.shorelabs.com/>

### Pelikan

[github.com](https://github.com/twitter/pelikan) | [Pull Request #203](https://github.com/twitter/pelikan/pull/203)

The Pelikan is a framework of the cache server. It yields a replacement of Twemcache, a Memcached-like server with ultra-low memory overhead, etc.

The reason of twitter/pelikan using MurmurHash is the performance.

### Nginx

[maragonim.blogspot.com](http://marangonim.blogspot.com/2017/12/murmurhash-in-nginx-optimized.html)

The optimized MurmurHash implementation made Nginx just faster! Check out the source code [src/ngx_murmurhash.c](https://github.com/nginx/nginx/blob/master/src/core/ngx_murmurhash.c).

```c
uint32_t
ngx_murmur_hash2(u_char *data, size_t len)
{
    uint32_t  h, k;

    h = 0 ^ len;

    while (len >= 4) {
        k  = data[0];
        k |= data[1] << 8;
        k |= data[2] << 16;
        k |= data[3] << 24;

        k *= 0x5bd1e995;
        k ^= k >> 24;
        k *= 0x5bd1e995;

        h *= 0x5bd1e995;
        h ^= k;

        data += 4;
        len -= 4;
    }

    switch (len) {
    case 3:
        h ^= data[2] << 16;
        /* fall through */
    case 2:
        h ^= data[1] << 8;
        /* fall through */
    case 1:
        h ^= data[0];
        h *= 0x5bd1e995;
    }

    h ^= h >> 13;
    h *= 0x5bd1e995;
    h ^= h >> 15;

    return h;
}
```

## Conclusions

MurmurHash is in the family of general purpose hashing algorithms. In particular, it's only suitable for non-cryptographic usage.

## References

* [wikipedia.com](https://en.wikipedia.org/wiki/MurmurHash)
* [MurmurHash - what is it?](https://stackoverflow.com/questions/11899616/murmurhash-what-is-it)
