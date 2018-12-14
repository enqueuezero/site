---
title: ripgrep
---

# ripgrep

ripgrep is a line-oriented search tool that recursively searches your current directory for a regex pattern while respecting your `.gitignore` rules. It's a replacement of searching tools like [The Silver Searcher](https://geoff.greer.fm/ag/), [ack](https://beyondgrep.com/), [grep](http://linuxcommand.org/lc3_man_pages/grep1.html).

[[toc]]

## Basic Usage

Search by a literal term. Command: `rg <term> <file>`. For example, `rg ripgrep ./utilities/ripgrep.md`.

Search by a regex expression. Command `rg '<regex>' <file>`. For example, `rg '\w+grep' utilities/ripgrep.md`.

Search by a regex expression with escaped characters. For example, `rg 'def iterate\(.*\):'`.

Search recursively from an entire directory of files. Command `rg '<regex>'`. For example, `rg '\w+grep'`.

Ignore hidden files, or binary files, or symlink files, or files defined in `.gitignore` by default, though you can turn it on by adding more `u` options: `-u/-uu/-uuu/-uuuu`.

Filter when term appearing in certain files. Command `rg <term> -g '*.<prefix>'`. For example, `rg ripgrep -g '*.md'` only matches ripgrep in a markdown document.

Filter when the term is not appearing in certain files. Command `rg <term> -g '!*.<prefix>'`. For example, `rg ripgrep -g '!*.md'` matches ripgrep in any document except markdown.

Filter by file type. Command `rg <term> -t<type>`. For example, `rg ripgrep -tmd`.

Replace term1 to term2 in output. Command `rg <term1> -r/--replace <term2>`. For example, `rg ripgrep --replace rg`.

Replace by regex grouping in output. Command `rg '<re1>' -r/--replace '<re2>'`. For example, `rg 'title: (?P<title>ripgrep)' --replace 'Title: $title'`.

## Advanced Usage

Q: How to search `-foo`?\
A: You can use the -e/--regexp flag like `rg -e -foo`. Or, you can use `rg -- -foo` as the special '--' delimiter indicates that no more flags will be provided.

Q: How to show N lines after or before matching lines?\
A: You can use `-A` / `-B`. For example, `rg term -A 1 -B 1` outputs 1 line (A)fter and 1 line (B)efore the matched line.

Q: How to search in ZIP?\
A: You can use `-z/--search-zip`.

## Read the source code

The source code of Ripgrep program reveals it runs below steps for each searching command execution:

* Entry point. [src/main.rs](https://github.com/BurntSushi/ripgrep/blob/master/src/main.rs)
* Parse options and arguments. [src/app.rs](https://github.com/BurntSushi/ripgrep/blob/master/src/app.rs).
* Gather files to search. [src/args.rs:`walker_builder`](https://github.com/BurntSushi/ripgrep/blob/master/src/args.rs).
* Apply each line of content in these files to the Regex engine. [src/args.rs:`search_worker`](https://github.com/BurntSushi/ripgrep/blob/master/src/args.rs).
* Print those matched lines. [src/args.rs:`printer_standard`](https://github.com/BurntSushi/ripgrep/blob/master/src/args.rs).

Simplified Rust code:

```rust

let args = Args::parse();
let mut searcher = args.search_worker(args.stdout())?;
for result in args.walker()? {
    let subject = subject_builder.build_from_result(result);
    searcher.search(&subject);
}
```

ripgrep simplifies the construction of arguments and parameters by the builder design pattern.

## Discussions

There are two major grepping utility-family: grep and ack. The former is for plain searching, and the latter does smart searching. ripgrep is a hybrid solution.

Scanning all files in current working directory seems easy but a challenge to be fast. It involves using a set of tricks to do system call as less as possible. ripgrep uses a Rust library [walkdir](https://docs.rs/walkdir/2.2.7/walkdir/) for the best performance.

Distributing work to a set of workers makes grepping faster, though mutex synchronization makes it slower. ripgrep avoids the mutex lock by using a lock-free solution - [Chase-Lev work-stealing queue](https://github.com/kinghajj/deque).

Searching via regex can be slow sometimes, for example, `'(a*)*c'` takes a long time to terminate if using a backtracing engine. ripgrep uses Rust default regex engine, which uses finite automata instead of backtracking.

ripgrep loads a large chunk of data from a file, instead of line by line, which reduces the I/O overhead.

## References

> skim + ripgrep + bat makes for an amazing combination for fuzzy search opening files with preview. Added "skvi" for fuzzy search open vim and "rgvi" for combining ripgrep search + vim opening. Aliases are here: <https://t.co/2gJLJKm1OY> - [@mitsuhiko](https://twitter.com/mitsuhiko/status/1070784353360318464)

* [BurntSushi/ripgrep](https://github.com/BurntSushi/ripgrep)
* [ripgrep is faster than {grep, ag, git grep, ucg, pt, sift}](https://blog.burntsushi.net/ripgrep/) explains why you should use ripgrep over any other search tool?
