---
title: Coroutine
permalink: /coroutine.html
date: 2018-07-15
category: Computer Science
tags: coroutine
---

# Coroutine

[[toc]]

## Context

Although thread is much more lightweight than process, people still think it's too heavy. In Linux kernel,  creating a thread still need to assign same amount of memory like process. Therefore, a more lightweight solution needs to reduce memory usage.

Micro-threads, or usually named as coroutine, is such kind of technology.

## Overview

Coroutines, or cooperative routines, are routines running in non-preemptive multitasking system. In human word, coroutines are just special functions. We can temporarily suspend running a coroutine function. And when we resume the function, it continues running.

Basically the code can be paused and resumed, pretty much like threads, except that it's not VM or OS scheduling coroutines. Programmer needs to make sure a coroutine must never preempted.

Coroutines can be used to implement cooperative tasks, event loop, generators, lazy evaluation.

Check below code and running sequence in Lua:

```
co = coroutine.create(function () 
  for i = 1, 10 do
    print(i)
    coroutine.yield()
  end
end)

coroutine.resume(co) # --> 1
coroutine.resume(co) # --> 2
coroutine.resume(co) # --> 3
coroutine.resume(co) # --> 4
coroutine.resume(co) # --> 5
coroutine.resume(co) # --> 6
coroutine.resume(co) # --> 7
coroutine.resume(co) # --> 8
coroutine.resume(co) # --> 9
coroutine.resume(co) # --> 10
```

* `coroutine.create` create a new coroutine.
* `coroutine.yield` suspend coroutine from running.
* `coroutine.resume` resume running coroutine.

In this example, the first time we call `coroutine.resume(co)` starts its execution and runs until the first yield. For the rest of calls they basically do the same thing until the final one.

## Patterns

### Non-preemptive multi-tasking system

Preemptive means we don't care how to schedule when to run which thread or process. In non-preemptive multi-tasking system, it's programmers' responsibility to tell VM when to suspend coroutine and when to resume.

### Yield / Resume

Yield is very intuitive - a coroutine tells to the system "hey I'm gonna yield for now" and the system simply suspend it.

Resume is similar - when someone calls resume, the system rerun the coroutine until it's completed or another yielding.

In previous example, lua has `coroutine.yield()` and `coroutine_object.resume()` for the two interfaces.

### Symmetric Coroutines v/s Asymmetric Coroutines

* Asymmetric coroutines
    * Needs a function to suspend itself.
    * Needs a function to resume coroutine.
* Symmetric coroutines
    * Needs a function to transfer control to other coroutines.

Symmetric coroutines introduce less code. It can build on top of asymmetric coroutines: each transfer is equal to a yield followed by a resume.

## Solutions

### Lua

Lua has builtin coroutine support. 

You can create coroutine like this:

```
co = coroutine.create(function()
    print("hi")
end
```

Any coroutine is in one of three states: suspended, running, and dead. You can check status by `coroutine.status(co)`.

To start or restart the execution of a coroutine, run `coroutine.resume(co)`.

### Python

Coroutines in Python are mainly used in async. You can create a coroutine like this:

```
async def co():
    print("hi")
```

Python uses symmetric coroutine, so you don't need to worry about resume, just need to TRANSFER control to another coroutine:

```
async def compute(x, y):
    return x + y

async def co():
    result = await compute(0, 42)
    print("%d + %d = %d", (0, 42, result))

import asyncio
asyncio.get_event_loop().run_until_complte(co())
```

### Ruby

Fibers are coroutine equivalent in Ruby. You can create Fiber like below code:

```
fiber = Fiber.new do
  Fiber.yield 1
end

puts fiber.resume
```

Fiber also support transferring control. The API allows you resume another fiber from where it last stopped or start it if it was not resumed before:

```
f1 = Fiber.new do
  puts "f1"
  Fiber.yield
end

f2 = Fiber.new do
  puts "start"
  f1.transfer
end

f2.resume
```

## Conclusions

Coroutines implement multi-tasking by consuming less resource. The downside is that it introduces yield / resume into your code. If thread or process cannot meet your multi-tasking requirements, try coroutine, although it also means rewrite you application very likely.

## References

* [Lua - Coroutine Basics](https://www.lua.org/pil/9.1.html)
* [Python - Tasks and coroutines](https://docs.python.org/3/library/asyncio-task.html)
* [Ruby - Fiber](https://ruby-doc.org/core-2.1.1/Fiber.html)
