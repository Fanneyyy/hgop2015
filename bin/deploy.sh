#!/bin/bash

echo Turn on the Test Environment
cd ../testEnv
vagrant up

echo Connecting to Test Environment
vagrant ssh -c 'pwd'