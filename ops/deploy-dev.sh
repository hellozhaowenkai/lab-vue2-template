#!/usr/bin/env bash

# Delete container & image
docker container rm -f lab-vue2-template_dev
docker image rm lab-vue2-template:dev

# Build image
docker image build \
  --tag   lab-vue2-template:dev \
  --file  $PWD/ops/Dockerfile \
  $PWD

# Run container
docker container run \
  --user     $(id -u) \
  --name     lab-vue2-template_dev \
  --network  lab-net \
  --publish  10299:8888 \
  --volume   $PWD/logs:/app/logs \
  --volume   $HOME/Services/lab-secret/settings.private.toml:/app/config/settings.private.toml \
  --restart  unless-stopped \
  --interactive \
  --detach \
  lab-vue2-template:dev

# View logs
sleep 3s && docker container logs lab-vue2-template_dev
