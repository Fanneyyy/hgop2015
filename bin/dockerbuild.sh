#!/bin/bash

echo Cleaning...
rm -rf ./dist

# because of problems with graphic cards
export DISPLAY=:0

# grunt build
echo Building app
grunt
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then
	echo "Failure in grunt build, exit code: " $EXITCODE
	exit $EXITCODE;
fi


if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

cat > ./dist/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

# View for deploying old releases
cat > ./dist/public/version.html << _EOF_
<!doctype html>
<head>
   <title>TicTacToe version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GIT_URL</span>
   <span>Revision:</span> <span>$GIT_COMMIT</span>
   <p>
   <div><a href="$GIT_URL/commit/$GIT_COMMIT">History of current version</a></div>
</body>
_EOF_

# moving files
cp ./Dockerfile ./dist/
mv 'TESTS-Firefox_38.0.0_(Linux_0.0.0).xml' ./dist/

# install npm
cd dist
npm install --production
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then
	echo "Failure in npm install, exit code: " $EXITCODE
	exit $EXITCODE;
fi

# building docker
echo Building docker image
docker build -t fanneyyy/tictactoe:$GIT_COMMIT .
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then
	echo "Failure in docker build, exit code: " $EXITCODE
	exit $EXITCODE;
fi

# pushing to docker
echo Pushing docker image
docker push fanneyyy/tictactoe:$GIT_COMMIT
EXITCODE=$?; if [[ $EXITCODE != 0 ]]; then
	echo "Failure in pushing docker image, exit code: " $EXITCODE
	exit $EXITCODE;
fi

echo "Done"
