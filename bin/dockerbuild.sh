#!/bin/bash

echo Cleaning...
rm -rf ./dist

# because of problems with graphic cards
export DISPLAY=:0

echo Building app
grunt
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

cp ./Dockerfile ./dist/
mv 'TESTS-Firefox_38.0.0_(Linux_0.0.0).xml' ./dist/
mv 'server-tests' ./dist/
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

cd dist
npm install --production
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

echo Building docker image
docker build -t fanneyyy/tictactoe .
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

echo "Done"