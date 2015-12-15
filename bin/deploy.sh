#!/bin/bash

echo Connecting to Test Environment
echo Pulling newest docker image
echo Running on port 8081
ssh vagrant@192.168.50.4 '
	(docker kill tictactoe8080 &&
	docker rm  tictactoe8080 &&
	docker pull fanneyyy/tictactoe &&
	docker run -p 8080:8080 -d --name -e tictactoe8080 "NODE_ENV=production" fanneyyy/tictactoe)'
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then exit $EXITCODE; fi
