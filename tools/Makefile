-include ../.env
export $(shell sed 's/=.*//' ../.env)

.DEFAULT_GOAL := default
export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)
export NAMESPACE_DEV := $(or $(NAMESPACE_DEV), d1273d-dev)
export NAMESPACE_TEST := $(or $(NAMESPACE_TEST), d1273d-dev)
export NAMESPACE_PROD := $(or $(NAMESPACE_PROD), d1273d-dev)
export APP_NAME := $(or $(PROJECT_NAME), ecc-iosas)
export BUILD_ID := $(or $(BUILD_ID), 1)
export TEMPLATE_FILE_NAME := $(or $(TEMPLATE_FILE_NAME), $$FILE)
export BUILD_REF := $(or $(BUILD_REF), $(GIT_LOCAL_BRANCH))
export BUILD_NAMESPACE := $(or $(BUILD_NAMESPACE), d1273d-tools)
export DOMAIN := $(or $(DOMAIN), apps.silver.devops.gov.bc.ca)
export ENV_PREFIX := $(or $(ENV_PREFIX), dev)
export NEW_DB := $(or $(NEW_DB), $$NEW_DB)
export JOB_NAME := $(or $(JOB_NAME), $$JN)
export UI_PRIVATE_KEY := $(or $(UI_PRIVATE_KEY), None)
export UI_PUBLIC_KEY := $(or $(UI_PUBLIC_KEY), None)
export LAST_COMMIT := $(shell git log -1 --oneline --decorate=full --no-color --format="%h, %cn, %f, %D" | sed 's/->/:/')
export COMMIT_SHA:=$(shell git rev-parse --short=7 HEAD)

HOST_PREFIX= $(ENV_PREFIX)

# Seeting up Name space as per env prefix
ifeq ($(ENV_PREFIX), dev)
NAMESPACE=$(NAMESPACE_DEV)
SITE_MINDER_LOGOUT_URL="https://logontest7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl="
SOAM_CLIENT_ID=$(SOAM_CLIENT_ID_DEV)
SOAM_CLIENT_SECRET=$(SOAM_CLIENT_SECRET_DEV)
SOAM_DISCOVERY=https://soam-dev.apps.silver.devops.gov.bc.ca/auth/realms/IOSAS/.well-known/openid-configuration
SOAM_URL=https://soam-dev.apps.silver.devops.gov.bc.ca
bceid_reg_url=
endif

ifeq ($(ENV_PREFIX), test)
NAMESPACE=$(NAMESPACE_TEST)
SITE_MINDER_LOGOUT_URL="https://logontest7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl="
SOAM_CLIENT_ID=$(SOAM_CLIENT_ID_TEST)
SOAM_CLIENT_SECRET=$(SOAM_CLIENT_SECRET_TEST)
SOAM_DISCOVERY=https://soam-test.apps.silver.devops.gov.bc.ca/auth/realms/IOSAS/.well-known/openid-configuration
SOAM_URL=https://soam-test.apps.silver.devops.gov.bc.ca
bceid_reg_url=
endif

ifeq ($(ENV_PREFIX), prod)
NAMESPACE=$(NAMESPACE_PROD)
SITE_MINDER_LOGOUT_URL="https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl="
SOAM_CLIENT_ID=$(SOAM_CLIENT_ID_PROD)
SOAM_CLIENT_SECRET=$(SOAM_CLIENT_SECRET_PROD)
SOAM_DISCOVERY=
SOAM_URL=
bceid_reg_url=
endif

define BUILD_TAG
"$(BUILD_REF)-$(COMMIT_SHA)"
endef

define BUILD_TEMPLATE_PATH
"openshift/docker-build.yml"
endef

define API
"api-$(APP_NAME)"
endef

define Web
"web-$(APP_NAME)"
endef

define HOST
"$(HOST_PREFIX)-ecc-iosas.$(DOMAIN)"
endef


define SOURCE_REPOSITORY_REF
"main"
endef

define rollout_and_wait
@oc -n $(NAMESPACE) rollout status $1
endef




init-oc: | print-status init-project
oc-build-api: | print-status build-api
oc-deploy-api: | print-status deploy-api
oc-build-web: | print-status build-web
oc-deploy-web: | print-status deploy-web





print-status:
	@echo " +---------------------------------------------------------+ "
	@echo " | Current Settings                                        | "
	@echo " +---------------------------------------------------------+ "
	@echo " | PROJECT:      						$(APP_NAME)"
	@echo " | BRANCH:       						$(BUILD_REF)"
	@echo " | NAMESPACE:    						$(NAMESPACE)"
	@echo " | BUILD_NAMESPACE:    			$(BUILD_NAMESPACE)"
	@echo " | ENV PREFIX:    						$(ENV_PREFIX)"
	@echo " +---------------------------------------------------------+ "
	@echo " | BUILD_ID: 								$(COMMIT_SHA) "
	@echo " | BUILD_TAG: 								$(BUILD_TAG) "
	@echo " | HOST NAME: 								$(HOST) "
	@echo " | SITEMINDER URL:						$(SITE_MINDER_LOGOUT_URL)"
	@echo " | SOAM DISCOVERY: 					$(SOAM_DISCOVERY)"
	@echo " | SOAM URL: 								$(SOAM_URL)"
	@echo " | SOAM CLIENT ID: 					$(SOAM_CLIENT_ID)"
	@echo " +---------------------------------------------------------+ "

init-project: print-status
	@echo "Run initial set-up for the project, including network security\n" 
	@oc -n $(NAMESPACE) process -f openshift/networkpolicy.yml -p NAMESPACE=$(NAMESPACE) | oc -n $(NAMESPACE) apply -f -
	@oc -n $(BUILD_NAMESPACE) policy add-role-to-group system:image-puller system:serviceaccounts:$(NAMESPACE)

build-patroni:
	@oc -n $(BUILD_NAMESPACE) process -f $(BUILD_TEMPLATE_PATH)  -p NAME=patroni -p TAG="12-latest" -p BASE_IMAGE_NAME=postgres -p BASE_IMAGE_TAG="12" -p SOURCE_REPOSITORY_URL="https://github.com/BCDevOps/platform-services.git" -p SOURCE_REPOSITORY_REF="master" -p SOURCE_CONTEXT_DIR="apps/pgsql/patroni/docker" | oc -n $(BUILD_NAMESPACE) apply -f -
	@oc -n $(BUILD_NAMESPACE) start-build bc/patroni --wait

init-api-config:
	@echo "++\n Init API config in $(NAMESPACE) \n++"
	test -n $(SOAM_CLIENT_ID)
	test -n $(SOAM_CLIENT_SECRET)
	@oc -n $(NAMESPACE) delete configmap iosas-api-creds || true
	@oc -n $(NAMESPACE) create configmap iosas-api-creds \
	 --from-literal=oidc-clientId=$(SOAM_CLIENT_ID) \
	 --from-literal=oidc-clientSecrect=$(SOAM_CLIENT_SECRET)



init-api-sec:
	@echo "\n Generating keys for backend for namespace $(NAMESPACE) \n"
	@rm tempPenBackendkey tempPenBackendkey.pub tempPenBackendkey.key || true
	@echo "\n Creating OC Sec \n"
	@oc -n $(NAMESPACE) delete secret iosas-ui-sec || true
	@sh config/create-secret.sh $(NAMESPACE)

init-web:
	@echo "++\n Init Api in $(NAMESPACE) \n++"
	oc create -n $(NAMESPACE) configmap iosas-ui-config \
	--from-literal=TZ="America/Vancouver" \
	--from-literal=HOST_ROUTE="$(HOST)" \
	--from-literal=config.js="$regConfig" \
	--from-literal=snowplow.js="$snowplow" \
	--dry-run=client -o yaml | oc apply -f -


init-artifactory-secret-credential:
	test -n $(NAMESPACE)
	@oc create secret docker-registry artifactory-secret-credential -n $(NAMESPACE) \
    	--docker-server=artifacts.developer.gov.bc.ca \
    	--docker-username=$(USERNAME) \
    	--docker-password=$(PASSWORD) \
    	--docker-email=$(USERNAME)@$(NAMESPACE).local
	@oc secrets link default artifactory-secret-credential
	@oc secrets link builder artifactory-secret-credential

build-api:
	test -n "$(BUILD_REF)"
	test -n "$(BUILD_NAMESPACE)"
	test -n "${API}"
	@echo "+\n++ BUILDING API with tag: $(BUILD_TAG)\n+"
	@oc -n $(BUILD_NAMESPACE) process -f $(BUILD_TEMPLATE_PATH) \
		-p TAG=$(BUILD_TAG) \
		-p SOURCE_REPOSITORY_REF=$(BUILD_REF) \
		-p BASE_IMAGE_NAME="nodejs-18" \
		-p BASE_IMAGE_TAG="1" \
		-p BASE_IMAGE_REPO="registry.access.redhat.com/ubi8/" \
		-p SOURCE_CONTEXT_DIR=/backend -p NAME=$(API) | oc -n $(BUILD_NAMESPACE) apply -f -
	@oc -n $(BUILD_NAMESPACE) start-build bc/$(API) --wait --follow=true
	@oc -n $(BUILD_NAMESPACE) tag $(API):$(BUILD_TAG) $(API):latest

build-web:
	test -n "$(BUILD_REF)"
	test -n "$(BUILD_NAMESPACE)"
	test -n "${Web}"
	@echo "+\n++ BUILDING Web with tag: $(BUILD_TAG)\n+"
	@oc -n $(BUILD_NAMESPACE) process -f $(BUILD_TEMPLATE_PATH) \
		-p TAG=$(BUILD_TAG) \
		-p SOURCE_REPOSITORY_REF=$(BUILD_REF) \
		-p BASE_IMAGE_NAME="nodejs-18" \
		-p BASE_IMAGE_TAG="1" \
		-p BASE_IMAGE_REPO="registry.access.redhat.com/ubi8/" \
		-p SOURCE_CONTEXT_DIR=/frontend -p NAME=$(Web) | oc -n $(BUILD_NAMESPACE) apply -f -
	@oc -n $(BUILD_NAMESPACE) start-build bc/$(Web) --wait --follow=true
	@oc -n $(BUILD_NAMESPACE) tag $(Web):$(BUILD_TAG) $(Web):latest




update-dc-api:
	test -n "$(NAMESPACE)"
	test -n "$(BUILD_NAMESPACE)"
	@echo "+\n++ Updating API-dc with tag: $(BUILD_TAG)\n+"
	@oc -n $(NAMESPACE) process -f openshift/api-deploy.yml \
		-p NAME=$(API) \
		-p HOST_NAME=$(HOST) \
		-p SOAM_URL=$(SOAM_URL) \
		-p SOAM_DISCOVERY=$(SOAM_DISCOVERY) \
		-p SITEMINDER_LOGOUT_ENDPOINT=$(SITE_MINDER_LOGOUT_URL) \
		-p BUILD_NAMESPACE=$(BUILD_NAMESPACE) \
		-p IMAGE_STREAM_TAG="$(API):$(ENV_PREFIX)" \
		-p VERSION="$(LAST_COMMIT)" \
		-p BUILD_ID=$(BUILD_TAG) | oc -n $(NAMESPACE) apply -f -

deploy-api: update-dc-api
	$(call rollout_and_wait,dc/$(API))

promote-api:
	test -n "$(NAMESPACE)"
	test -n "$(BUILD_NAMESPACE)"
	@echo "+\n++ API: Deploying latest tag $(BUILD_TAG) API with ENV $(ENV_PREFIX) $\n+"
	@oc -n "$(BUILD_NAMESPACE)" tag $(API):$(BUILD_TAG) $(API):$(ENV_PREFIX)

update-dc-web:
	test -n "$(NAMESPACE)"
	test -n "$(BUILD_NAMESPACE)"
	@echo "+\n++ Updating Web-dc with tag: $(BUILD_TAG)\n+"
	@oc -n $(NAMESPACE) process -f openshift/web-deploy.yml \
		-p NAME=$(Web) \
		-p HOST_NAME=$(HOST) \
		-p BUILD_NAMESPACE=$(BUILD_NAMESPACE) \
		-p IMAGE_STREAM_TAG="$(Web):$(ENV_PREFIX)" \
		-p BUILD_ID=$(BUILD_TAG) | oc -n $(NAMESPACE) apply -f -

deploy-web: update-dc-web
	$(call rollout_and_wait,dc/$(Web))

promote-web:
	test -n "$(NAMESPACE)"
	test -n "$(BUILD_NAMESPACE)"
	@echo "+\n++ Web: Deploying latest tag $(BUILD_TAG) API with ENV $(ENV_PREFIX) $\n+"
	@oc -n "$(BUILD_NAMESPACE)" tag $(Web):$(BUILD_TAG) $(Web):$(ENV_PREFIX)

d365-api-tunnel:
	@echo "+\n++ Port Forwarding to D365 stack"
	@oc -n $(NAMESPACE) port-forward svc/$(API)-d365 5091

# Tagging env
tag-test:
ifdef ticket
	@git tag -fa test -m "Deploy $(ticket) to TEST Openshift env"
else
	@echo -e '\nTicket name missing - Example :: make tag-test ticket=HCAP-ABC \n'
	@echo -e 'Falling Back to using branch name\n'
	@git tag -fa test -m "Deploy $(git rev-parse --abbrev-ref HEAD) to TEST env"
endif
	@git push --force origin refs/tags/test:refs/tags/test

tag-prod:
ifdef ticket
	@git tag -fa prod -m "Deploy $(ticket) to PROD Openshift env"
else
	@echo -e '\nTicket name missing - Example :: make tag-test ticket=HCAP-ABC \n'
	@echo -e 'Falling Back to using branch name\n'
	@git tag -fa prod -m "Deploy $(git rev-parse --abbrev-ref HEAD) to PROD env"
endif
	@git push --force origin refs/tags/prod:refs/tags/prod