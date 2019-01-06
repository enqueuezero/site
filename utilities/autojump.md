---
title: autojump
---

# autojump

## Overview

Autojump is a faster way to navigate your filesystem. It extends the idea of `cd` command but enables you to jump to any directory from anywhere.

## Basic Usage

Jump To A Directory That Contains "foo". For example: `j foo`.

Jump To A Child Directory (sub-directory of the current directory). For example, `j bar`.

Open a file explorer window instead of jumping to the directory. For example, `jo music`.

Jump to A Directory using multiple arguments. For example, `j gh ez` jumps to `/Users/soasme/github/enqueuezero`, while `j n ez` jumps to `/Users/soasme/notes/enqueuezero`.

## Installation

It's very easy to install autojump depending on your platform.

```
# Debian, Ubuntu
$ apt-get install autojump

# CentOS, RedHat, Fedora
$ yum install autojump

# macOS
$ brew install autojump
```

## Read the source code

The entry point of the app is a shell script that executes a Python script, [autojump](https://github.com/wting/autojump/blob/master/bin/autojump) and then `cd` to the printed path.

Autojump is as a mixed shell and Python app without library dependencies, instead of a standard Python module. As a result, all utility modules are in an absolute-importing style.

``` python
import os, sys # and other libraries from Python standard libraries.

from autojump_argparse import ...
from autojump_data import ...
from autojump_match import ...
from autojump_utils import ...
```

The main function reads from arguments parsing from the command-line. Below is a simplified Python code of how autojump works.

```python
def parse_arguments():
    parser = ArgumentParser()
    parser.add_argument('directory', nargs='*', default='', help='directory to jump to')
    # ...
    return parser.parse_args()

def main(args):
    haystack = load(config)
    needles = args.directory
    print(find_matches(needles, haystack))

if __name__ == '__main__':
    sys.exit(main(parse_arguments()))
```

The matching algorithms are implemented in [autojump_match.py](https://github.com/wting/autojump/blob/master/bin/autojump_match.py) module. All matching functions accept parameters `needles` and `haystack`, former of which is the keyword to match and latter of which includes the weighted paths to be matched. For example, Below variables show how the fuzzy searching generates the result for needles in the haystack.

```
needles = ['foo', 'bar']
haystack = [
    (path='/foo/bar/baz', weight=11),
    (path='/foo/baz/moo', weight=10),
    (path='/moo/foo/baz', weight=10),
    (path='/foo/baz', weight=10),
    (path='/foo/bar', weight=10),
]
result = [
    (path='/foo/bar/baz', weight=11),
    (path='/moo/foo/baz', weight=10),
    (path='/foo/baz', weight=10),
    (path='/foo/bar', weight=10),
]
```

## Conclusions

The autojump is a useful utility for switching directory faster. It's based on a traditional finding-needles-in-haystack problem but is far from it, which makes it a gorgeous software.

