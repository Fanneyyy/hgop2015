#!/bin/bash

echo 'Running application in browser:'
echo Turning on the Development Environment
cd ./vagrant
vagrant up

echo 'Running application on local host'
vagrant ssh -c 'cd src/tictactoe && grunt serve'