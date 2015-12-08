#!/bin/bash

echo 'Jenkins deployment stage script'
# problems with finding grunt
export PATH=/usr/local/bin:$PATH;

npm install
bower install
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

# because of problems with graphic cards
export DISPLAY=:0
export ACCEPTANCE_URL=http://192.168.50.4:8080
./bin/deploy.sh
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

grunt mochaTest:acceptance
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi
mv 'acceptance-tests' ./dist/