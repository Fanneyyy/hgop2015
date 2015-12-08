#!/bin/bash

echo Connecting to Test Environment
echo Pulling newest docker image
ssh vagrant@192.168.50.4 '
	(CONTAINER_ID=$(docker ps -q)
	if [ ! -z "$CONTAINER_ID" ]
	then
	docker kill $CONTAINER_ID
	fi && 
	docker pull fanneyyy/tictactoe && 
	docker run -p 8080:8080 -d -e "NODE_ENV=production" fanneyyy/tictactoe)
	export ACCEPTANCE_URL=http://192.168.50.4:8080
	grunt mochaTest:acceptance'