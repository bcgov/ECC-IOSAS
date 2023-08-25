#!/bin/bash
NAMESPACE=$1
echo Generating private and public keys in $NAMESPACE
ssh-keygen -b 4096 -t rsa -f tempPenBackendkey -m pem -q -N ""
PVT_KEY="$(cat tempPenBackendkey)"
PUB_KEY="$(ssh-keygen -f tempPenBackendkey -e -m pem)"
oc --namespace=$NAMESPACE create secret generic iosas-ui-sec \
 --from-literal=private-key="$PVT_KEY" \
 --from-literal=certificate="$PUB_KEY"
echo "\n Remving keys "
echo Removing key files
rm tempPenBackendkey
rm tempPenBackendkey.pub
