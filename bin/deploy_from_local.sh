#!/bin/bash

echo Turning on the Environments
./bin/start.sh

echo Starting docker and pushing newest docker image
cd vagrant
vagrant ssh -c 'cd src/tictactoe && ./bin/deploy.sh'