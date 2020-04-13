---
title: Language Grammar
permalink: /language-grammar.html
category: Programming
date: 2018-07-03
---

# Language Grammar

[[toc]]

## Context

There are growing number of programming languages. Each specific domain of problem might eventually derive a dedicated optimized programming language. We have below nontrivial languages that has been well adopted in programming world.

* Assembly Languages.
* System Programming Languages, such as C, C++, Rust, Go, Pony, etc.
* Scripting Languages, such as Bash, Python, Ruby, Perl, PHP, etc.
* Browser Scripting Languages, such as Javascript, Typescript, Coffescript, etc.
* Markup Languages, such as HTML, XML, Markdown, reStructuredText, etc.
* Query Languages, such as SQL, GraghQL.

Not to mention there are hundreds of LISP dialects. 

One thing we should aware of is that it's the syntax that shapes programming languages. It leads to different code when expressing same algorithm.

## Patterns

Grammar defines a language. Most programming languages are defined in context-free grammar.

### Context-free Grammar

Grammar is basically a set of RULES.

A RULE has two parts:

* Name.
* Expansion.

For example:

```
IDENTIFIER: "[a-zA-Z_][a-zA-Z0-9_]*"
```

This rule defines its name as IDENTIFIER, and expansion should match the given regex. Code `tmp`, `array1`, `_private_field`, `Resolver` are valid IDENTIFIER, while `1f`, `for-loop` are not valid.

### BNF

Backus-Naur form, or BNF, is a notation of language grammar.

Below snippet is interesting. It describes BNF in BNF:

```
 <syntax>         ::= <rule> | <rule> <syntax>
 <rule>           ::= <opt-whitespace> "<" <rule-name> ">" <opt-whitespace> "::=" <opt-whitespace> <expression> <line-end>
 <opt-whitespace> ::= " " <opt-whitespace> | ""
 <expression>     ::= <list> | <list> <opt-whitespace> "|" <opt-whitespace> <expression>
 <line-end>       ::= <opt-whitespace> <EOL> | <line-end> <line-end>
 <list>           ::= <term> | <term> <opt-whitespace> <list>
 <term>           ::= <literal> | "<" <rule-name> ">"
 <literal>        ::= '"' <text1> '"' | "'" <text2> "'"
 <text1>          ::= "" | <character1> <text1>
 <text2>          ::= "" | <character2> <text2>
 <character>      ::= <letter> | <digit> | <symbol>
 <letter>         ::= "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
 <digit>          ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
 <symbol>         ::=  "|" | " " | "!" | "#" | "$" | "%" | "&" | "(" | ")" | "*" | "+" | "," | "-" | "." | "/" | ":" | ";" | ">" | "=" | "<" | "?" | "@" | "[" | "\" | "]" | "^" | "_" | "`" | "{" | "}" | "~"
 <character1>     ::= <character> | "'"
 <character2>     ::= <character> | '"'
 <rule-name>      ::= <letter> | <rule-name> <rule-char>
 <rule-char>      ::= <letter> | <digit> | "-"
```

### EBNF

Extended Backus-Naur form, or EBNF, has more advancing features than BNF. 

EBNF has below features that BNF doesn't have (based on ISO/IEC 14977):

* Repeat: `{ ... }`.
* Optional: `[ ... ]`.
* Grouping `( ... )`.

Let's see EBNF describing in EBNF:

```
letter = "A" | "B" | "C" | "D" | "E" | "F" | "G"
       | "H" | "I" | "J" | "K" | "L" | "M" | "N"
       | "O" | "P" | "Q" | "R" | "S" | "T" | "U"
       | "V" | "W" | "X" | "Y" | "Z" | "a" | "b"
       | "c" | "d" | "e" | "f" | "g" | "h" | "i"
       | "j" | "k" | "l" | "m" | "n" | "o" | "p"
       | "q" | "r" | "s" | "t" | "u" | "v" | "w"
       | "x" | "y" | "z" ;
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
symbol = "[" | "]" | "{" | "}" | "(" | ")" | "<" | ">"
       | "'" | '"' | "=" | "|" | "." | "," | ";" ;
character = letter | digit | symbol | "_" ;
 
identifier = letter , { letter | digit | "_" } ;
terminal = "'" , character , { character } , "'" 
         | '"' , character , { character } , '"' ;
 
lhs = identifier ;
rhs = identifier
     | terminal
     | "[" , rhs , "]"
     | "{" , rhs , "}"
     | "(" , rhs , ")"
     | rhs , "|" , rhs
     | rhs , "," , rhs ;

rule = lhs , "=" , rhs , ";" ;
grammar = { rule } ;
```

### ABNF

Augmented Backus-Naur Form, or ABNF, is very similar to EBNF except the notation is different. It's being described in RFC 5234 specification.

Comparison:

* BNF: Simple rules.
* EBNF: BNF + a few additional rules.
* ABNF: BNF + a few additional rules.

### Combinators

Functional programming languages provide combinators for implementing parser easier.

The definition of the new language is as the same form of the implementation languages. Such languages have strong type inference, such as Haskell, F#.

## Solutions

### EBNF Specification Examples

* [Python Full Grammar specification](https://docs.python.org/3/reference/grammar.html) in EBNF.
* [Go Programming Language Specification](https://golang.org/ref/spec) in EBNF.
* [rPython EBNF Module](https://rpython.readthedocs.io/en/latest/rlib.html#ebnf). Note that rPython provides a modified EBNF notations. In particular, a JSON format can be described as below:

```
STRING: "\\"[^\\\\"]*\\"";
NUMBER: "\-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][\+\-]?[0-9]+)?";
IGNORE: " |\n";
value: <STRING> | <NUMBER> | <object> | <array> | <"null"> |
       <"true"> | <"false">;
object: ["{"] (entry [","])* entry ["}"];
array: ["["] (value [","])* value ["]"];
entry: STRING [":"] value;
```

### ABNF Specification Examples

* [Internet Message Format](https://tools.ietf.org/html/rfc5322#section-1.2)

### Tools

* Go package `ebnf` is ready to use. Go check [package ebnf](https://godoc.org/golang.org/x/exp/ebnf).
* rPython is a good library to start implementing your own language.
* `instaparse` has well designed API. Go check [Engelberg/instaparse](https://github.com/Engelberg/instaparse)

### Tutorial

Let's starting implementing something in rPython! In this demo, we will create a simple syntax that can print values in the form like `print 1 + 1;`, etc.

Step 1, we need to define a number.

```
NUMBER: "\-?(0|[1-9][0-9]*)(\.[0-9]+)?";
```

Step 2, we expand operators:

```
expr : NUMBER >(arith_op NUMBER)+< | <NUMBER>;
arith_op: <"+"> | <"-">;
```

Step 3, we define print statement as entry:

```
IGNORE: " |\n";
main: <expr> [EOF];
```

Now we have all syntax defined. We only need to write an interpreter to turn the tokens into values.

```python
def eval(ast):
    if ast.symbol == 'main':
        expr = ast.children[0]
        return eval(expr);
    elif ast.symbol == 'expr':
        term = eval(ast.children[0])
        for i in range(1, len(ast.children[1:]), 2):
            op, term_i = ast.children[i], eval(ast.children[i+1])
            if op.additional_info == '+':
                term = term + term_i
            elif op.additional_info == '-':
                term = term - term_i
        return term
    elif ast.symbol == 'NUMBER':
        if ast.additional_info.startswith('-'):
            return -1 * float(ast.additional_info[1:])
        else:
            return float(ast.additional_info)
    else:
        print(ast)
        raise ValueError('unknown ast.')
```

Full source code is hosted in [gist](https://gist.github.com/soasme/9cf367101f5fe34494b1a3b388f3edf4).

```python
$ pip install rpython
$ python ebnf-demo.py
> 1 + 1 + 2
4.0
> -1 + -1 + -2
-4.0
> -1+-1+-1
-3.0
> ^C
```

## Combinator Examples

Check out this awesome tutorial series: [1](https://fsharpforfunandprofit.com/posts/understanding-parser-combinators/) | [2](https://fsharpforfunandprofit.com/posts/understanding-parser-combinators-2/) | [3](https://fsharpforfunandprofit.com/posts/understanding-parser-combinators-3/) | [4](https://fsharpforfunandprofit.com/posts/understanding-parser-combinators-4/) written in F#.

## Conclusions

Implement your own language might sound crazy but it's very doable. With these mature libraries, you don't necessarily need to understand complicated parser theory but still can create something! If you're interested in create a grammar syntax of specification and protocols, learn these libraries and try to build a tiny prototype to demonstrate your ideas.

Go check [ao](https://github.com/soasme/ao) language I wrote. It's a minimal interpreter language with its runtime implemented in only 500+ lines of code. :)
