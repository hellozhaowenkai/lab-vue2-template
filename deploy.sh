#!/usr/bin/env bash

# Delete container & image
docker container rm -f lab-vue2-template
docker image rm lab-vue2-template:latest

# Build image
docker image build --tag=lab-vue2-template:latest .

# Run container
docker container run \
  --user     $(id -u) \
  --name     lab-vue2-template \
  --publish  10202:8888 \
  --volume   $PWD/logs:/app/logs \
  --volume   $PWD/nginx.conf:/etc/nginx/nginx.conf \
  --volume   $HOME/app/lab-secret/settings.private.toml:/app/config/settings.private.toml \
  --restart  unless-stopped \
  --interactive \
  --detach \
  lab-vue2-template:latest

# View logs
docker container logs lab-vue2-template
