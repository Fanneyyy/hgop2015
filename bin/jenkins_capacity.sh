#!/bin/bash

PORT=8080
IP=192.168.50.4

echo 'Jenkins load/capacity test script'
# problems with finding grunt
export PATH=/usr/local/bin:$PATH;

npm install
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then
	echo "Failure in npm install, exit code: " $EXITCODE
	exit $EXITCODE;
fi

bower install
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then
	echo "Failure in bower install, exit code: " $EXITCODE
	exit $EXITCODE;
fi

# because of problems with graphic cards
export DISPLAY=:0
export ACCEPTANCE_URL=http://$IP:$PORT

grunt mochaTest:load

echo "Done"
