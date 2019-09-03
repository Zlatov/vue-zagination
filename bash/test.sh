#!/usr/bin/env bash

set -eu

cd "$(dirname "${0}")"

cd ..

yarn

rm -rf ./test/public

npm run test
