#!/usr/bin/env bash

# Delete container & image
docker container rm -f lab-vue2-template
docker image rm lab-vue2-template:latest

# Build image
docker image build \
  --tag   lab-vue2-template:latest \
  --file  $PWD/ops/Dockerfile \
  $PWD

# Run container
docker container run \
  --user     $(id -u) \
  --name     lab-vue2-template \
  --network  lab-net \
  --publish  10202:8888 \
  --volume   $PWD/logs:/app/logs \
  --volume   $HOME/Services/lab-secret/settings.private.toml:/app/config/settings.private.toml \
  --restart  unless-stopped \
  --interactive \
  --detach \
  lab-vue2-template:latest

# View logs
sleep 3s && docker container logs lab-vue2-template
