#!/usr/bin/env bash

# Delete container & image
docker container rm -f lab-vue2-demo_dev
docker image rm lab-vue2-demo:dev

# Build image
docker image build --tag=lab-vue2-demo:dev .

# Run container
docker container run \
  --user     $(id -u) \
  --name     lab-vue2-demo_dev \
  --publish  10299:8888 \
  --volume   $PWD/logs:/app/logs \
  --volume   $PWD/nginx.conf:/etc/nginx/nginx.conf \
  --volume   $HOME/app/lab-secret/settings.private.toml:/app/config/settings.private.toml \
  --restart  unless-stopped \
  --interactive \
  --detach \
  lab-vue2-demo:dev

# View logs
docker container logs lab-vue2-demo_dev
