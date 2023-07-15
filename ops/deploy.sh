#!/usr/bin/env bash

# Exit immediately if a simple command exits with a non-zero status.
# set -o errexit

# Define environment variables.
export LAB_SECRET_PATH="${HOME}/Services/lab-secret"
export LAB_DATA_PATH=/data/IMPORTANT/lab-files
export LAB_NETWORK_NAME=lab-net

# Define local variables.
CODE_NAME=vue2-template
PUBLISH_PORT=10202
IMAGE_NAME="lab-${CODE_NAME}:latest"
BACKUP_IMAGE_NAME="lab-${CODE_NAME}:backup"
PRODUCTION_IMAGE_NAME="lab-${CODE_NAME}:production"
CONTAINER_NAME="lab-${CODE_NAME}"

# Make directories.
mkdir -p "${LAB_DATA_PATH}"

# Build image.
docker image rm "${IMAGE_NAME}"
docker image build \
  --tag   "${IMAGE_NAME}" \
  --file  "${PWD}/ops/Dockerfile" \
  "${PWD}" \
|| { echo "ERROR: image build failed." >&2 ; exit 1 ; }

# Delete container.
docker container rm -f "${CONTAINER_NAME}"

# Organize images.
docker image rm "${BACKUP_IMAGE_NAME}"
docker image tag "${PRODUCTION_IMAGE_NAME}" "${BACKUP_IMAGE_NAME}"
docker image rm "${PRODUCTION_IMAGE_NAME}"
docker image tag "${IMAGE_NAME}" "${PRODUCTION_IMAGE_NAME}"

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
  "${PRODUCTION_IMAGE_NAME}"

# View logs.
sleep 3s && docker container logs "${CONTAINER_NAME}"
