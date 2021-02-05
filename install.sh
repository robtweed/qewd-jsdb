#!/bin/bash

# Quick Installer for QEWD-JSDb
# 5 February 2021

# This starts the Node-Runner Container with the correct environment settings and parameters

echo ""
echo "******* QEWD-DBjs Installer *******"
echo ""

VOLUME=${1-$PWD}
PLATFORM=$(uname -m)

# Is Docker installed?

if [ -x "$(command -v docker)" ]; then
    echo "Docker is already installed"
    # command
else

    sudo apt-get update
    sudo apt-get -y upgrade
    sudo apt-get install -y curl

    echo "Installing docker..."

    curl -sSL https://get.docker.com | sh
    sudo usermod -aG docker ${USER}

    echo "Please log out and log in again, then rerun this install script"
    exit 1
fi

# Create a Docker network unless it already exists

echo "Creating a Docker bridged network if necessary..."

docker network ls|grep qewd-jsdb > /dev/null || docker network create qewd-jsdb

echo "Making sure you have the latest versions of the Docker Containers..."

if [[ "$PLATFORM" != "armv"* ]]

then

  docker pull rtweed/node-runner
  docker pull rtweed/qewd-server

  echo "running node-runner for Linux"

  docker run -it --name installer --rm -v $VOLUME:/node -e "node_script=install" -e "PLATFORM=linux" -e "DOCKER_HOST=$(ip -4 addr | grep -Po 'inet \K[\d.]+')" -e "HOST_VOLUME=$VOLUME" rtweed/node-runner

else

  docker pull rtweed/qewd-server-rpi
  docker pull rtweed/node-runner-rpi

  echo "running node-runner for Raspberry Pi"

  docker run -it --name installer --rm -v $VOLUME:/node -e "node_script=install" -e "PLATFORM=arm" -e "DOCKER_HOST=$(ip -4 addr | grep -Po 'inet \K[\d.]+')" -e "HOST_VOLUME=$VOLUME" rtweed/node-runner-rpi

fi
