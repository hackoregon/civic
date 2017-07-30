#! /bin/bash

# PURPOSE: this script is used to test that the app is successfully responding to the configured test cases

usage() { echo "Usage: $0 [-l] for a local test or [-t] for a travis test " 1>&2; exit 1; }

if [ $# == 0 ]; then usage; fi

echo  Running test_proj.sh...

# Run all configured unit tests inside the Docker container
while getopts ":lt" opt; do
    case "$opt" in
        l)
          docker-compose -f /code/bin/local-docker-compose.yml build
          docker-compose -f /code/bin/local-docker-compose.yml run \
          --entrypoint /code/bin/test-entrypoint.sh $DOCKER_IMAGE
          ;;
        t)
          docker-compose -f /code/bin/travis-docker-compose.yml build
          docker-compose -f /code/bin/travis-docker-compose.yml run \
          --entrypoint /code/bin/test-entrypoint.sh $DOCKER_IMAGE
          ;;
        *)
          usage
          ;;
    esac
done

