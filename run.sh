#!/bin/bash

#
# Simply helper script to run jekyll in development environment
#

environment="$1"

if [[ "$environment" != "dev"  &&  "$environment" != "prod" ]]
then
  echo "Error!!! A parameter is required."
  echo "Usage: "
  echo "   > $0 [dev|prod]"
fi

case $environment in
  "dev")  echo "Running un dev mode..."
          jekyll serve --config=_config.yml,_config-dev.yml
          ;;
  "prod") echo "Running in prod mode... (You should not use this in localshot !!!)"
          jekyll serve
          ;;
esac
