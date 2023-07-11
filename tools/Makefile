-include ../.env
export $(shell sed 's/=.*//' ../.env)

.DEFAULT_GOAL := default
export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)
export NAMESPACE := $(or $(NAMESPACE), d1273d-dev)
export APP_NAME := $(or $(PROJECT_NAME), ecc-iosas)
export BUILD_ID := $(or $(BUILD_ID), 1)
export TEMPLATE_FILE_NAME := $(or $(TEMPLATE_FILE_NAME), $$FILE)
export BUILD_REF := $(or $(BUILD_REF), $(GIT_LOCAL_BRANCH))
export BUILD_NAMESPACE := $(or $(BUILD_NAMESPACE), d1273d-tools)
export DOMAIN := $(or $(DOMAIN), apps.silver.devops.gov.bc.ca)
export HOST_PREFIX := $(or $(HOST_PREFIX), dev)
export NEW_DB := $(or $(NEW_DB), $$NEW_DB)
export JOB_NAME := $(or $(JOB_NAME), $$JN)
export SITE_MINDER_LOGOUT_URL := $(or $(SITE_MINDER_LOGOUT_URL), https://logontest.gov.bc.ca/clp-cgi/logoff.cgi)
export UI_PRIVATE_KEY := $(or $(UI_PRIVATE_KEY), None)
export UI_PUBLIC_KEY := $(or $(UI_PUBLIC_KEY), None)
export LAST_COMMIT := $(shell git log -1 --oneline --decorate=full --no-color --format="%h, %cn, %f, %D" | sed 's/->/:/')
export COMMIT_SHA:=$(shell git rev-parse --short=7 HEAD)

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
	@echo " | PROJECT:      			$(APP_NAME)"
	@echo " | BRANCH:       			$(BUILD_REF)"
	@echo " | NAMESPACE:    			$(NAMESPACE)"
	@echo " | BUILD_NAMESPACE:    $(BUILD_NAMESPACE)"
	@echo " +---------------------------------------------------------+ "
	@echo " | BUILD_ID: 	$(COMMIT_SHA) "
	@echo " | BUILD_TAG: 	$(BUILD_TAG) "
	@echo " | HOST NAME: 	$(HOST) "
	@echo " +---------------------------------------------------------+ "

init-project:
	@echo "Run initial set-up for the project, including network security\n" 
	@oc -n $(NAMESPACE) process -f openshift/networkpolicy.yml -p NAMESPACE=$(NAMESPACE) | oc -n $(NAMESPACE) apply -f -
	@oc -n $(BUILD_NAMESPACE) policy add-role-to-group system:image-puller system:serviceaccounts:$(NAMESPACE)

build-patroni:
	@oc -n $(BUILD_NAMESPACE) process -f $(BUILD_TEMPLATE_PATH)  -p NAME=patroni -p TAG="12-latest" -p BASE_IMAGE_NAME=postgres -p BASE_IMAGE_TAG="12" -p SOURCE_REPOSITORY_URL="https://github.com/BCDevOps/platform-services.git" -p SOURCE_REPOSITORY_REF="master" -p SOURCE_CONTEXT_DIR="apps/pgsql/patroni/docker" | oc -n $(BUILD_NAMESPACE) apply -f -
	@oc -n $(BUILD_NAMESPACE) start-build bc/patroni --wait

init-api:
	@echo "++\n Init Api in $(NAMESPACE) \n++"
	test -n $(SOAM_DISCOVERY)
	test -n $(SOAM_CLIENT_ID)
	test -n $(SOAM_CLIENT_SECRET)
	@oc -n $(NAMESPACE) process -f openshift/api-pre-req.yml \
		-p SOAM_DISCOVERY=$(SOAM_DISCOVERY) \
		-p SOAM_CLIENT_ID=$(SOAM_CLIENT_ID) \
		-p SOAM_CLIENT_SECRET=$(SOAM_CLIENT_SECRET) | oc -n $(NAMESPACE) apply -f -

init-api-sec:
	@echo "++\n Init Api in $(NAMESPACE) \n++"
	@oc -n $(NAMESPACE) create secret generic iosas-ui-sec  --from-file=private-key=certificates/tempPenBackendkey \
		--from-file=certificate=certificates/tempPenBackendKey.pub.key

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
		-p BUILD_NAMESPACE=$(BUILD_NAMESPACE) \
		-p IMAGE_STREAM_TAG="$(API):$(HOST_PREFIX)" \
		-p VERSION=$(LAST_COMMIT) \
		-p BUILD_ID=$(BUILD_TAG) | oc -n $(NAMESPACE) apply -f -

deploy-api: update-dc-api
	$(call rollout_and_wait,dc/$(API))

promote-api:
	test -n "$(NAMESPACE)"
	test -n "$(BUILD_NAMESPACE)"
	@echo "+\n++ API: Deploying latest tag $(BUILD_TAG) API with ENV $(HOST_PREFIX) $\n+"
	@oc tag $(API):$(BUILD_TAG) $(API):$(HOST_PREFIX)

update-dc-web:
	test -n "$(NAMESPACE)"
	test -n "$(BUILD_NAMESPACE)"
	@echo "+\n++ Updating Web-dc with tag: $(BUILD_TAG)\n+"
	@oc -n $(NAMESPACE) process -f openshift/web-deploy.yml \
		-p NAME=$(Web) \
		-p HOST_NAME=$(HOST) \
		-p BUILD_NAMESPACE=$(BUILD_NAMESPACE) \
		-p IMAGE_STREAM_TAG="$(Web):$(HOST_PREFIX)" \
		-p BUILD_ID=$(BUILD_TAG) | oc -n $(NAMESPACE) apply -f -

deploy-web: update-dc-web
	$(call rollout_and_wait,dc/$(Web))

promote-web:
	test -n "$(NAMESPACE)"
	test -n "$(BUILD_NAMESPACE)"
	@echo "+\n++ Web: Deploying latest tag $(BUILD_TAG) API with ENV $(HOST_PREFIX) $\n+"
	@oc tag $(Web):$(BUILD_TAG) $(Web):$(HOST_PREFIX)

