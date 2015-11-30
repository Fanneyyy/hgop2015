#!/bin/bash

echo Turning on the Development Environment
cd ./vagrant
vagrant up

echo Connecting to Development Environment
echo Starting docker and pushing newest docker image
vagrant ssh -c '(sudo service docker start && 
				docker login --username=fanneyyy --password=$DOCKER_PASS --email=$DOCKER_EMAIL && 
				docker push fanneyyy/tictactoe)'

echo Turn on the Test Environment
cd ../testEnv
vagrant up

echo Connecting to Test Environment
echo Pulling newest docker image
vagrant ssh -c '(STR=$(docker ps -q)
				if [ ! -z "$STR" ]
				then
				docker kill $STR
				fi && 
				docker pull fanneyyy/tictactoe && 
				docker run -p 8080:8080 -d -e "NODE_ENV=production" fanneyyy/tictactoe)'