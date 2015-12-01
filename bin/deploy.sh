#!/bin/bash

echo Starting docker and pushing newest docker image
sudo service docker start && 
docker login --username=fanneyyy --password=$DOCKER_PASS --email=$DOCKER_EMAIL && 
docker push fanneyyy/tictactoe

echo Connecting to Test Environment
echo Pulling newest docker image
ssh vagrant@192.168.50.4 '
	(CONTAINER_ID=$(docker ps -q)
	if [ ! -z "$CONTAINER_ID" ]
	then
	docker kill $CONTAINER_ID
	fi && 
	docker pull fanneyyy/tictactoe && 
	docker run -p 8080:8080 -d -e "NODE_ENV=production" fanneyyy/tictactoe)'