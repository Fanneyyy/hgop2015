#!/bin/bash

echo Turning on the Development Environment
cd ./vagrant
vagrant up

echo Connecting to Development Environment
echo Starting docker
vagrant ssh -c 'sudo service docker start'

echo Login to docker
vagrant ssh -c 'docker login --username=fanneyyy --password=$DOCKER_PASS --email=$DOCKER_EMAIL'

echo Pushing newest docker image
vagrant ssh -c 'docker push fanneyyy/tictactoe'

echo Turn on the Test Environment
cd ../testEnv
vagrant up

echo Connecting to Test Environment
echo Pulling newest docker image
vagrant ssh -c 'docker pull fanneyyy/tictactoe'