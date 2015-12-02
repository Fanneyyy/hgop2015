#!/bin/bash

echo 'Jenkins commit stage script'

# problems with finding grunt
export PATH=/usr/local/bin:$PATH;

npm install
bower install

# because of problems with graphic cards
export DISPLAY=:0

./bin/dockerbuild.sh
EXITCODE=$?
if [[ $EXITCODE == 0 ]]
then docker push fanneyyy/tictactoe
echo 'Finished pushing to docker'
else exit $EXITCODE
fi