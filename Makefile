start:
	./node_modules/.bin/tiddlywiki wiki --server 9000

clean:
	rm -rf ./wiki/output

build: clean
	./node_modules/.bin/tiddlywiki wiki --build static
