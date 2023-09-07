#!/bin/bash
NAMESPACE=$1
NAME=$2
PUBLIC_HOST=$3
CERTIFICATE=$4
CA_CERT=$5
PRIVATE_KEY=$6
echo Building public route for $NAME in $NAMESPACE
echo The Host URL is $PUBLIC_HOST || true
echo Certifcate $CERTIFICATE || true
echo CA_CERT $CA_CERT || true
echo PK $PRIVATE_KEY || true
pwd
oc --namespace=$NAMESPACE process -f ./openshift/public-route.yml \
 -p NAME=$NAME \
 -p PUBLIC_HOST=$PUBLIC_HOST \
 -p CERTIFICATE="$CERTIFICATE" \
 -p PRIVATE_KEY="$PRIVATE_KEY" | oc --namespace=$NAMESPACE apply -f -


