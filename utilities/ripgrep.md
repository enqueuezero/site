---
title: ripgrep
---

# ripgrep

ripgrep is a line-oriented search tool that recursively searches your current directory for a regex pattern while respecting your gitignore rules. It's a replacement of searching tools like [The Silver Searcher](https://geoff.greer.fm/ag/), [ack](https://beyondgrep.com/), [grep](http://linuxcommand.org/lc3_man_pages/grep1.html).

[[toc]]

## Basic Usage

Searching by a literal term. Command: `rg <term> <file>`. For example, `rg ripgrep ./utilities/ripgrep.md`.

Searching by a regex expression. Command `rg '<regex>' <file>`. For example, `rg '\w+grep' utilities/ripgrep.md`.

Searching by an regex expression with escaped characters. For example, `rg 'def iterate\(.*\):'`.

Searching recursively from an entire directory of files. Command `rg '<regex>'`. For example, `rg '\w+grep'`.

Ignoring hidden files, or binary files, or symlink files, or files defined in `.gitignore` by default, though you can turn it on by adding more `u` options: `-u/-uu/-uuu/-uuuu`.

Filtering when term appearing in certain files. Command `rg <term> -g '*.<prefix>'`. For example, `rg ripgrep -g '*.md'` only matches ripgrep in a markdown document.

Filtering when term not appearing in certain files. Command `rg <term> -g '!*.<prefix>'`. For example, `rg ripgrep -g '!*.md'` matches ripgrep in any document except markdown.

Filtering by file type. Command `rg <term> -t<type>`. For example, `rg ripgrep -tmd`.

Replacing term1 to term2 in output. Command `rg <term1> -r/--replace <term2>`. For example, `rg ripgrep --replace rg`.

Replacing by regex grouping in output. Command `rg '<re1>' -r/--replace '<re2>'`. For example, `rg 'title: (?P<title>ripgrep)' --replace 'Title: $title'`.

## Advanced Usage

Q: How to search `-foo`?\
A: You can use the -e/--regexp flag like `rg -e -foo`. Or, you can use `rg -- -foo` as the special '--' delimiter indicates that no more flags will be provided.

Q: How to show N lines after or before matching lines?\
A: You can use `-A` / `-B`. For example, `rg term -A 1 -B 1` outputs 1 line (A)fter and 1 line (B)efore the matching line.

Q: How to search in ZIP?\
A: You can use `-z/--search-zip`.

## Read the source code

The source code of Ripgrep program reveals it runs below steps for each searching command execution:

* Entrypoint. [src/main.rs](https://github.com/BurntSushi/ripgrep/blob/master/src/main.rs)
* Parse options and arguments. [src/app.rs](https://github.com/BurntSushi/ripgrep/blob/master/src/app.rs).
* Gather files to search. [src/args.rs:`walker_builder`](https://github.com/BurntSushi/ripgrep/blob/master/src/args.rs).
* Apply each line of content in these files to the Regex engine. [src/args.rs:`search_worker`](https://github.com/BurntSushi/ripgrep/blob/master/src/args.rs).
* Print those matching lines. [src/args.rs:`printer_standard`](https://github.com/BurntSushi/ripgrep/blob/master/src/args.rs).

Simplified Rust code:

```rust

let args = Args::parse();
let mut searcher = args.search_worker(args.stdout())?;
for result in args.walker()? {
    let subject = subject_builder.build_from_result(result);
    searcher.search(&subject);
}
```

ripgrep uses builder pattern to simplify the complex argument and parameter construction.


## References

* [BurntSushi/ripgrep](https://github.com/BurntSushi/ripgrep)
* [ripgrep is faster than {grep, ag, git grep, ucg, pt, sift}](https://blog.burntsushi.net/ripgrep/) explains why you should use ripgrep over any other search tool?

