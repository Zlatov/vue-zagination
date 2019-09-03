#!/usr/bin/env bash

set -eu

cd "$(dirname "${0}")"

cd ..

yarn

mkdir -p dist

find ./dist -type f -delete
find ./dist -type d -not -path . | xargs -I {} rm -rf ./dist/{}

# ./node_modules/uglify-es/bin/uglifyjs ./src/vue-zagination.js -o ./dist/vue-zagination.min.js
# ./node_modules/uglify-es/bin/uglifyjs -b quote_style ./src/vue-zagination.js -o ./dist/vue-zagination.min.js
npm run compile
