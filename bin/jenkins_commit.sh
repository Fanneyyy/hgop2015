#!/bin/bash

echo 'Jenkins script'

# problems with finding grunt
export PATH=/usr/local/bin:/path/to/node:/path/to/node_bin:/path/to/phantomjs:/path/to/jscoverage:$PATH;

npm install
bower install

# because of problems with graphic cards
#export DISPLAY=:0

./bin/dockerbuild.sh