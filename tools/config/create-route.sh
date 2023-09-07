#!/bin/bash
NAMESPACE=$1
NAME=$2
PUBLIC_HOST=$3
CERTIFICATE=$4
CA_CERT=$5
PRIVATE_KEY=$6
ROUTE_NAME=$NAME-public
echo Building public route for $NAME in $NAMESPACE
echo The Host URL is $PUBLIC_HOST
oc --namespace=$NAMESPACE delete route $ROUTE_NAME || true && "Route not exists"
oc --namespace=$NAMESPACE create route edge \
 --service=$NAME \
 --cert="$CERTIFICATE" \
 --key="$PRIVATE_KEY" \
 --ca-cert="$CA_CERT" \
 --hostname=PUBLIC_HOST \
 --insecure-policy=Redirect

