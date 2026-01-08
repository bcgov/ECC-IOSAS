set -euo pipefail

ENV_VAL=$1
APP_NAME=$2
NAMESPACE_PREFIX=$3
COMMON_NAMESPACE=$4
SOAM_CLIENT_ID_DEV=$5
SOAM_CLIENT_SECRET_DEV=$6
#REDIS_PASSWORD=$7
#D365_API_PREFIX=$8
APP_NAME_UPPER=${APP_NAME^^}
TZVALUE="America/Vancouver"
SOAM_KC_REALM_ID="iosas"
SOAM_KC=soam-$ENV_VAL.apps.silver.devops.gov.bc.ca
D365_API_ENDPOINT="http://$D365_API_PREFIX-$ENV_VAL:5091"
NODE_ENV='openshift'

NAMESPACE_SUFFIX="$ENV_VAL"
if [ "$ENV_VAL" = "dev" ]; then
  NAMESPACE_SUFFIX="dev"
elif [ "$ENV_VAL" = "test" ]; then
  NAMESPACE_SUFFIX="test"
elif [ "$ENV_VAL" = "prod" ]; then
  NAMESPACE_SUFFIX="prod"
fi
readonly NAMESPACE_SUFFIX

SITE_MINDER_LOGOUT_URL=""
if [ "$ENV_VAL" != "prod" ]
then
  SITE_MINDER_LOGOUT_URL="https://logontest7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl="
else
  #SERVER_FRONTEND="https://educationdataexchange.gov.bc.ca"
  #HOST_ROUTE="educationdataexchange.gov.bc.ca"
  SITE_MINDER_LOGOUT_URL="https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl="
fi
readonly SITE_MINDER_LOGOUT_URL

#SOAM_KC_LOAD_USER_ADMIN=$(oc -n $COMMON_NAMESPACE-$ENV_VAL -o json get secret sso-admin-${envValue} | sed -n 's/.*"username": "\(.*\)"/\1/p' | base64 --decode)
#SOAM_KC_LOAD_USER_PASS=$(oc -n $COMMON_NAMESPACE-$ENV_VAL -o json get secret sso-admin-${envValue} | sed -n 's/.*"password": "\(.*\)",/\1/p' | base64 --decode)

SOAM_KC="https://soam-$ENV_VAL.apps.silver.devops.gov.bc.ca/auth/"
if [ "$ENV_VAL" != "prod" ]; then
  SERVER_FRONTEND="https://$ENV_VAL.independentschoolservices.gov.bc.ca"
else
  SERVER_FRONTEND='https://independentschoolservices.gov.bc.ca'
fi
readonly SOAM_KC
readonly SERVER_FRONTEND

LOG_LEVEL="verbose"
if [ "$ENV_VAL" = "prod" ]; then
  LOG_LEVEL="info"
fi
readonly LOG_LEVEL

OPENSHIFT_NAMESPACE="$NAMESPACE_PREFIX-$NAMESPACE_SUFFIX"

echo Fetching one-liner public key from SOAM
SOAM_ONE_LINE_KEY=$(curl -sX GET "https://$SOAM_KC/auth/realms/$SOAM_KC_REALM_ID" \
  | jq -r .public_key)
readonly SOAM_ONE_LINE_KEY

echo Formatting public key from SOAM
FORMATTED_SOAM_PUBLIC_KEY=$(cat << PUBKEY
-----BEGIN PUBLIC KEY-----
$(echo "$SOAM_ONE_LINE_KEY" | fold -w64)
-----END PUBLIC KEY-----
PUBKEY
)
readonly FORMATTED_SOAM_PUBLIC_KEY
echo "$FORMATTED_SOAM_PUBLIC_KEY"

echo Generating private and public keys
ssh-keygen -b 4096 -t rsa -f tempPenBackendkey -m pem -q -N ""
UI_PRIVATE_KEY_VAL="$(cat tempPenBackendkey)"
UI_PUBLIC_KEY_VAL="$(ssh-keygen -f tempPenBackendkey -e -m pem)"
readonly UI_PRIVATE_KEY_VAL
readonly UI_PUBLIC_KEY_VAL

echo Removing key files
rm tempPenBackendkey
rm tempPenBackendkey.pub


echo Creating config map "$APP_NAME-backend-config-map"
oc create -n "$OPENSHIFT_NAMESPACE" configmap \
  "$APP_NAME-backend-$ENV_VAL-config-map" \
  --from-literal="D365_API_ENDPOINT=$D365_API_ENDPOINT" \
  --from-literal="D365_API_KEY_HEADER=$D365_API_KEY_HEADER" \
  --from-literal="D365_API_KEY_VALUE=$D365_API_KEY_VALUE" \
  --from-literal="LOG_LEVEL=$LOG_LEVEL" \
  --from-literal="TZ=$TIMEZONE" \
  --from-literal="NODE_ENV=$NODE_ENV" \
  --from-literal="USE_REDIS=true" \
  --from-literal="REDIS_USE_CLUSTERED=true" \
  --from-literal="REDIS_HOST=redis" \
  --from-literal="REDIS_PORT=6379" \
  --from-literal="REDIS_FACILITY_TTL=600" \
  #--from-literal="REDIS_PASSWORD=$REDIS_PASSWORD" \
  --from-literal="SERVER_FRONTEND=$SERVER_FRONTEND" \
  --from-literal="SERVER_PORT=8080" \
  --from-literal="SITEMINDER_LOGOUT_ENDPOINT=$SITE_MINDER_LOGOUT_URL" \
  --from-literal="SOAM_DISCOVERY=https://$SOAM_KC/auth/realms/$SOAM_KC_REALM_ID/.well-known/openid-configuration" \
  --from-literal="SOAM_CLIENT_ID_DEV=$SOAM_CLIENT_ID_DEV" \
  --from-literal="SOAM_CLIENT_SECRET_DEV=$SOAM_CLIENT_SECRET_DEV" \
 --from-literal="SOAM_PUBLIC_KEY=$FORMATTED_SOAM_PUBLIC_KEY" \
  --from-literal="SOAM_URL=https://$SOAM_KC/auth/realms/$SOAM_KC_REALM_ID/protocol/openid-connect/logout" \
  --from-literal="UI_PRIVATE_KEY=$UI_PRIVATE_KEY_VAL" \
  --from-literal="UI_PUBLIC_KEY=$UI_PUBLIC_KEY_VAL" \
  --dry-run=client -o yaml | oc apply -f -

echo
echo Setting environment variables for "$APP_NAME-backend-$ENV_VAL" application
oc -n "$OPENSHIFT_NAMESPACE" set env \
  --from="configmap/$APP_NAME-backend-$ENV_VAL-config-map" \
  "deployment/$APP_NAME-backend-$ENV_VAL"
