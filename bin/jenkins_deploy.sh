#!/bin/bash

echo 'Jenkins deployment stage script'
# problems with finding grunt
export PATH=/usr/local/bin:$PATH;

npm install
bower install

# because of problems with graphic cards
export DISPLAY=:0
./bin/deploy.sh