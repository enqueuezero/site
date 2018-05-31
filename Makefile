start:
	docker run -d --rm -p 9000:8080 -v `pwd`/wiki:/data soasme/tiddlywiki

clean:
	rm -rf ./wiki/output

build: clean
	docker run --rm -v `pwd`/wiki:/data soasme/tiddlywiki tiddlywiki /data --build static

publish: build
	pipenv run ghp-import -c enqueuezero.com -m 'Sync Enqueue Zero Articles.' -b gh-pages ./wiki/output/static
	git push origin gh-pages

remove-space:
	./bin/remove-spaces
