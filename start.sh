#!/usr/bin/env bash

printf 'Rebuild Pivotal UI library code? [y/N]: '
read input

if [[ "$input" == "y" || "$input" == "Y" ]]; then
  rm -rf pui-dist
  pushd ../pivotal-ui
    yarn install --no-progress
    gulp build
    mv dist ../pui-styleguide/pui-dist
  popd
fi

rm -rf node_modules
npm cache clean --force
npm i

rm -rf dist
./node_modules/.bin/webpack --config ./backend_webpack.config.babel.js --progress -p
./node_modules/.bin/webpack --config ./frontend_webpack.config.babel.js --progress -p

npm run watch