#!/usr/bin/env bash

docker container rm -f lab-vue2-demo

docker image rm lab-vue2-demo:latest

docker image build --tag=lab-vue2-demo:latest .

docker container run \
  --user=$(id -u) \
  --name=lab-vue2-demo \
  --publish=10202:8888 \
  --volume=$(pwd)/logs:/app/logs \
  --volume=$(pwd)/nginx.conf:/etc/nginx/nginx.conf \
  --restart=unless-stopped \
  --interactive \
  --detach \
  lab-vue2-demo:latest

docker container logs lab-vue2-demo
