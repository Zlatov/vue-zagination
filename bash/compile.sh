#!/usr/bin/env bash

set -eu

cd "$(dirname "${0}")"

cd ..

yarn

mkdir -p dist

# ./node_modules/uglify-es/bin/uglifyjs ./src/vue-zagination.js -o ./dist/vue-zagination.min.js
# NODE_ENV=compile npm run build

rm -rf ./dist/public

find ./dist -type f -delete
find ./dist -type d -not -path . | xargs -I {} rm -rf ./dist/{}

npm run compile
