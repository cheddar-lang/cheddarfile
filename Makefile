MODULE_PATH=./node_modules/.bin

LIB=./lib/
DIST=./dist/

JSC=$(MODULE_PATH)/babel
JSFLAGS=$(LIB) -d $(DIST)

PRODUCTION_FLAGS=--minified
DEVELOPMENT_FLAGS=--source-maps

default: $(JSC) $(LIB)
	$(JSC) $(JSFLAGS) $(PRODUCTION_FLAGS)

build: $(JSC)
	$(JSC) $(JSFLAGS) $(DEVELOPMENT_FLAGS)

clean: $(DIST)
	rm -rf $^

.PHONY: clean
