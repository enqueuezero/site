start:
	./node_modules/.bin/tiddlywiki wiki --server 9000

build:
	./node_modules/.bin/tiddlywiki wiki --rendertiddlers '[!is[system]]' $:/core/templates/static.tiddler.html static text/plain
	./node_modules/.bin/tiddlywiki wiki --rendertiddler $:/core/templates/static.template.html static.html text/plain
	./node_modules/.bin/tiddlywiki wiki --rendertiddler $:/core/templates/static.template.css static/static.css text/plain

