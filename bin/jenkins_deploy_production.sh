#!/bin/bash

echo 'Jenkins deployment production stage script'
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

#!/bin/bash

echo Connecting to Test Environment
echo Pulling newest docker image
echo Running on port
ssh vagrant@192.168.50.4 '
	(docker kill tictactoe8081 &&
	docker rm  tictactoe8081 &&
	docker pull fanneyyy/tictactoe &&
	docker run -p 8081:8080 -d --name -e tictactoe8081 "NODE_ENV=production" fanneyyy/tictactoe)'
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi
