all: au.json.gz au.json.br

clean:
	rm au.*

au.zip:
	wget http://download.geonames.org/export/zip/AU.zip -O au.zip

au.json: au.zip
	yarn process

au.json.gz: au.json
	gzip -9 < au.json > au.json.gz

au.json.br: au.json
	brotli au.json