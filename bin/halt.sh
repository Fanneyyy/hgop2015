#!/bin/bash

echo Turning off all Environments

echo Turning off Development Environment
cd ./vagrant
vagrant halt

echo Turning off Test Environment
cd ../testEnv
vagrant halt