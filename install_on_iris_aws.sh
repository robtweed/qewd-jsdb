#!/bin/bash

# Quick Installer for QEWD-JSDb for AWS IRIS Container

# This copies the IRIS AWS-specific files ready for starting qewd-jsdb

echo ""
echo "******* QEWD-DBjs Installer for IRIS AWS Community Edition *******"
echo ""

cp iris-aws/config.json configuration
cp iris-aws/jsdb_shell.js .
cp iris-aws/package.json .

echo "*** QEWD-DBjs is ready for use ***"
echo " "
echo "Shell into the IRIS Container as root:"
echo " "
echo "   sudo docker exec --user="root" -it qewd-iris bash"
echo " "
echo "Then, from within the container:"
echo " "
echo "   cd /ISC/qewd-jsdb"
echo "   npm install"
echo " "
echo " Then start / restart qewd-jsdb using:"
echo " "
echo "   npm start"
echo " "

