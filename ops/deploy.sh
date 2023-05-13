#!/usr/bin/env bash

# Define environment variables.
export LAB_SECRET_PATH="${HOME}/Services/lab-secret"
export LAB_DATA_PATH=/data/IMPORTANT/lab-files
export LAB_NETWORK_NAME=lab-net

# Define local variables.
CODE_NAME=vue2-template
IMAGE_NAME="lab-${CODE_NAME}:latest"
CONTAINER_NAME="lab-${CODE_NAME}"
PUBLISH_PORT=10202

# Make directories.
mkdir -p "${LAB_DATA_PATH}"

# Delete container & image.
docker container rm -f "${CONTAINER_NAME}"
docker image tag "${IMAGE_NAME}" "lab-${CODE_NAME}:backup"
docker image rm "${IMAGE_NAME}"

# Build image.
docker image build \
  --tag   "${IMAGE_NAME}" \
  --file  "${PWD}/ops/Dockerfile" \
  "${PWD}"

# Run container.
docker container run \
  --user     "$(id -u):$(id -g)" \
  --name     "${CONTAINER_NAME}" \
  --network  "${LAB_NETWORK_NAME}" \
  --publish  "${PUBLISH_PORT}:8888" \
  --volume   "${PWD}/logs/:/workspace/logs/" \
  --restart  unless-stopped \
  --interactive \
  --detach \
  "${IMAGE_NAME}"

# View logs.
sleep 3s && docker container logs "${CONTAINER_NAME}"
