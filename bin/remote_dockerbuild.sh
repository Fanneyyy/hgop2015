#!/bin/bash

echo 'Building Docker image from Development Environment:'
echo Turning on the Development Environment
cd ./vagrant
vagrant up

echo Starting docker
vagrant ssh -c 'sudo service docker start'

echo 'Running docker builder'
vagrant ssh -c 'cd src/tictactoe && export DISPLAY=:0 && ./bin/dockerbuild.sh'