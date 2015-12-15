#!/bin/bash

echo 'Jenkins commit stage script'

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

./bin/dockerbuild.sh
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then
	echo "Docker build failed, exit code: " $EXITCODE
	exit $EXITCODE;
fi

echo "Done"
