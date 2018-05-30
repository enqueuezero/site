start:
	./node_modules/.bin/tiddlywiki wiki --server 9000

clean:
	rm -rf ./wiki/output

build: clean
	./node_modules/.bin/tiddlywiki wiki --build static

publish: build
	pipenv run ghp-import -c enqueuezero.com -m 'Sync Enqueue Zero Articles.' -b gh-pages ./wiki/output/static
	git push origin gh-pages
