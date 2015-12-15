#!/bin/bash

echo Connecting to Test Environment
echo Running $1 on port $2 on $3

ssh vagrant@$3 '
	(echo Removing currently running images &&
	if [ ! -z "tictactoe$2" ]
	then
	docker kill tictactoe$2 &&
	docker rm  tictactoe$2
	fi &&
	echo Pulling newest docker image &&
	docker pull fanneyyy/tictactoe &&
	echo Running newest docker image &&
	docker run -p $2:8080 -d --name tictactoe$2 -e "NODE_ENV=production" fanneyyy/tictactoe:$1)'
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi

echo "Done"
