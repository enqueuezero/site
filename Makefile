start:
	docker run -d --rm -p 9000:8080 -v `pwd`/wiki:/data soasme/tiddlywiki
	#./node_modules/.bin/tiddlywiki wiki --server 9000

clean:
	rm -rf ./wiki/output

build: clean
	docker run --rm -v `pwd`/wiki:/data soasme/tiddlywiki tiddlywiki /data --build static
	#./node_modules/.bin/tiddlywiki wiki --build static
	cp ./wiki/tiddlers/favicon.ico wiki/output/static


publish: build build-topic
	pipenv run ghp-import -c enqueuezero.com -m 'Sync Enqueue Zero Articles.' -b gh-pages ./wiki/output/static
	git push -f origin gh-pages

preview:
	open wiki/output/static/index.html

remove-space:
	./bin/remove-spaces

run-topic:
	pipenv run lektor --project ./wiki/zines server

build-topic:
	pipenv run lektor --project ./wiki/zines build --output-path `pwd`/wiki/output/static/zines --verbose
