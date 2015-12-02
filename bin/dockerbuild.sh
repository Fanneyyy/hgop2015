#!/bin/bash

echo Cleaning...
rm -rf ./dist

jer
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

echo Building app
grunt
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

cp ./Dockerfile ./dist/

cd dist
npm install --production
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

echo Building docker image
sudo service docker start
docker build -t fanneyyy/tictactoe .
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

echo "Done"