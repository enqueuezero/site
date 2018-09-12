---
title: Pseudo-Random Numbers
category: Computer Science
tags: random
date: 2018-09-11
---

## Overview

PRNG or Pseudo-random number generators are used for generating numbers distributed randomly.

The reason of being pseudo-random is that the PRNG algorithm doesn't generate true-random information actually.

## Terms

* RNG: Random Number Generators. It's a general classification regardless of generating psuedo-random or true-random numbers.
* PRNG: Pseudo-Random Number Generators. The `pseudo` here means the generator would eventually repeating a same sequence of numbers over a certain period.
* TRNG: True-Random Number Generators. The `true` here means we have no way to truly detect the next number being generated at any given time.

We will cover PRNG in this post.

## Use

In Python, `random.random()` returns the next random floating point number in the range `[0.0, 1.0)`. It's an example of Mersenne Twister algorithm we'll cover later.

```bash
$ python -c "import random; print(random.random())"
0.9997071591954676

$ python -c "import random; print(random.random())"
0.7442605999548604
```

In Bash, you can use the environ variable `$RANDOM` for a random integer between 0 and 32767 (2^15-1). It's an example of Linear Congruential Generator algorithm we'll cover later as well.

```bash
$ echo $RANDOM
16857

$ echo $RANDOM
12485
```

Note: for security reason, please don't use the above method for getting pseudo-random numbers, for example, for cryptography usage. You don't to be hacked, right?

## Patterns

### Pseudo means recurring

The PRNGs have a period of number recurring.

For example, in sequence `1 4 3 2 5 1 4 3 2 5 1 4 3 2 5`, the `1 4 3 2 5` recurs every 5 numbers.
For a PRNG based on such sequence, whenever you see `1` as random number, `4` will always be the next number.
The recurring numbers determine that the order of numbers is fixed rather than randomized.

The big picture behind the PRNG is like a fixed table of such similar sequence.

### Large period is safer

You might be wondering why do people still want pseudo-random numbers anyway?

The answer is as long as the period is large enough and you start from different positions in the sequence, you're almost unable to get a same set of random numbers during the life cycle of your application. If it happens, oh poor man, please restart your computer periodically and issue resolved.

From the engineering perspective, we don't need things absolutely correct but good enough. As a side quote, below is from the bash.git repo [1]:

> This one isn't very good, but a more complicated one is overkill.

### Seed determines the rest

When using the PRNG libraries, you need to set the initial state as a seed.

If you didn't set the seed for the random call, it's up to language or library designer on how to assign one for you.
The current system time will probably be used.

Once you call a random function, the PRNG libraries will update their internal state for the generator so that you won't get a same number next time.

### Reproduce by resetting an known seed

As long as you provide the same seed again, the PRNG libraries will reproduce the same random results for you.

### Insecure

Usually, you do not want to use the standard `random` module for cryptographic operations, since the PRNG algorithms are cryptographically insecure.

It's recommended to read [Myths about /dev/urandom](https://www.2uo.de/myths-about-urandom). TL;DR, just use `/dev/urandom` on UNIX platform or `CryptGenRandom` on Windows.

### Extend APIs

There are several variants of random APIs:

* Get a sequence of random bits.
* Get a random character.
* Get a random string.
* Get a random integer.
* Get a random floating number.
* Choose an element from an array.
* Shuffle the array.
* Get a sample from an array.
* Get a random number in designated distribution, for example, Beta distribution, Exponential distribution, Gamma Distribution, etc.

## Solutions

### Mersenne Twister

Mersenne Twister algorithm is a PRNG that produces 53-bit precision floats in a period of 2^19937-1. It's one of the most extensively tested RNGs.

People like it because it's fast, thread-safe, and efficient. The extensive period reduces the probability of causing issues.

The disadvantage of Mersenne Twister is that it uses relatively larger buffer than other PRNG algorithms.

The Mersenne Twister is used in below systems or libraries: Python, Ruby, R, PHP, Common Lisp, C++ Boost, Julia, Octave, Excel, Mathematica, etc.

### Linear Congruential Generator

The LCG or linear congruential generator is yet another pseudo-random number generator calculated with a discontinuous piecewise linear equation. It's one of the oldest and best-known RNGs. People like it because it's easy to understand and easily implemented.

The period of LCG depends on the parameter. If the parameters are too small, it tends to be problematic. Otherwise, it creates known and long periods. For performance consideration, the periods of LCG are usually between 2^32 to 2^64.

The advantage of LCG is that it uses minimal RAM. The disadvantage of LCG is its relatively small period.

The LCG is used in below systems or libraries: ANSI C, C99, C11, POSIX, glibc, muslc, bash,  Java(modified version of LCG).

## Mix

A typical implementation of PRNG comprised of the two PRNG algorithm introduced above:

* Use LCG for seed data.
* Use Mersenne Twister for generating a pseudo-random number.

## What else?

Please read "The Art of Computer Programming, Volume 2". In this book, Knuth has in-depth research on generating random numbers.

## Thoughts

Oh, did I just forgot to mention what is TRNG? With the help of some magic device, you might be able to get random numbers. For example, since the weather system is a chaos system, meaning no one can accurately predict it, you can generate random numbers based on the history of temperature, humidity, wind speed or things like that. You can find many more good indicators in natural world or in the universe.

Since the start of the Big Bang, everything seems just move in their own way. It's still a mystery whether everything is deterministic or not. If so, then all TRNG turns into PRNG! However, no one can prove that.

## Conclusion

* The PRNG generates "random" numbers which would recur eventually over a period.
* The Mersenne Twister and LCG are the two popular PRNG algorithms.
* Don't use PRNG for cryptographic operations.

## Credit

* [/u/whetu](http://reddit.com/u/whetu): Thanks for providing so much corrections.

## References

* [Random number generation](https://en.wikipedia.org/wiki/Random_number_generation)
* [How do random number generators work](https://softwareengineering.stackexchange.com/questions/109724/how-do-random-number-generators-work)
* [Linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator)
* [Python random](https://docs.python.org/3/library/random.html)
* [Cryptography](https://cryptography.io/en/latest/random-numbers/)
* [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister)
* [Reddit Discussion](https://www.reddit.com/r/bash/comments/9ewljx/pseudorandom_numbers/e5s75iz/)

[1]: http://git.savannah.gnu.org/cgit/bash.git/tree/variables.c#n1304
[bash]: http://git.savannah.gnu.org/cgit/bash.git/tree/variables.c#n1303
