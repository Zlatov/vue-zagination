#!/usr/bin/env bash

set -eu

cd "$(dirname "${0}")"

cd ..

yarn

mkdir -p dist

./node_modules/uglify-es/bin/uglifyjs ./src/vue-zagination.js -o ./dist/vue-zagination.min.js
