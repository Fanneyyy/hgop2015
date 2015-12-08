cd testEnv
vagrant ssh -c '
	(CONTAINER_ID=$(docker ps -q)
	if [ ! -z "$CONTAINER_ID" ]
	then
	docker restart $CONTAINER_ID
	fi)'
export ACCEPTANCE_URL=http://192.168.50.4:8080
grunt mochaTest:acceptance
cd ..
mv 'acceptance-tests' ./dist/