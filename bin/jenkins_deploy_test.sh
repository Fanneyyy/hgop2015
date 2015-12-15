#!/bin/bash

echo 'Jenkins deployment test stage script'
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
export ACCEPTANCE_URL=http://192.168.50.4:8080
export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
env
./bin/deploy.sh 8080
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then
	echo "The Deploy failed, exit code: " $EXITCODE
	exit $EXITCODE;
fi

grunt mochaTest:acceptance
