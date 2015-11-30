#!/bin/bash

echo Turning on all Environments

echo Turning on Development Environment
cd ./vagrant
vagrant up

echo Turning on Test Environment
cd ../testEnv
vagrant up