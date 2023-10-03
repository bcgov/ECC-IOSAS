<template>
  <div>
    <ConfirmationDialog ref="confirmDelete">
      <template #message>
        <p>
          The Application for Independent School Certification will be removed
          from your records. A new EOI can be submitted in the future to restart
          the school application process.
        </p>
      </template>
    </ConfirmationDialog>
    <ConfirmationDialog ref="confirmDeleteDocument">
      <template #message>
        <p>This document will be removed from your records.</p>
      </template>
    </ConfirmationDialog>

    <v-navigation-drawer temporary class="mobile-tabs" v-model="drawer">
      <v-tabs v-model="tab" bg-color="transparent" direction="vertical">
        <v-tab
          v-for="item in this.getApplicationPickListOptions?.[
            'iosas_portalapplicationstep'
          ]"
          :key="item.value"
          :value="item.value"
          @click.stop="drawer = !drawer"
          :disabled="isTabDisabled(item.value)"
        >
          {{ item.label }}
        </v-tab>
      </v-tabs>
    </v-navigation-drawer>

    <div class="d-flex justify-space-between fixed-container">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mobile-tabs"
      ></v-app-bar-nav-icon>
      <div class="flex-1 no-mobile-tabs">
        <v-tabs v-model="tab" bg-color="transparent" direction="vertical">
          <v-tab
            v-for="item in this.getApplicationPickListOptions?.[
              'iosas_portalapplicationstep'
            ]"
            :key="item.value"
            :value="item.value"
            :disabled="isTabDisabled(item.value)"
          >
            {{ item.label }}
          </v-tab>
        </v-tabs>
      </div>

      <div class="flex-4 scroll">
        <v-form
          ref="schoolApplicationForm"
          @submit.prevent="handleSubmit"
          id="schoolApplicationForm"
          validate-on="blur"
          v-model="isFormValid"
        >
          <v-container class="content-container">
            <div class="form-container">
              <div class="d-flex justify-space-between">
                <h1>Application for Independent School Certification</h1>
              </div>
              <br />
              <v-divider></v-divider>
              <v-window v-model="tab">
                <v-window-item
                  v-for="t in TAB_CONTENT"
                  :key="t.tab"
                  :value="t.tab"
                  :transition="false"
                >
                  <keep-alive>
                    <component
                      :is="t.component"
                      :formData="formData"
                      :isEditing="isEditing"
                      :isDocumentsLoading="isDocumentsLoading"
                      @validateAndPopulate="validateAndPopulateRadioButtons"
                      @removeDocument="removeDocument"
                      :isPreCertEditable="isPreCertEditable"
                      :isFormValid="isFormValid"
                      @validateForm="validateForm"
                    />
                  </keep-alive>
                </v-window-item>

                <v-row v-if="isTab(TAB_CODES.submission)">
                  <v-col cols="12" sm="12" md="12" xs="12">
                    <v-checkbox
                      v-model="applicationConfirmation"
                      :disabled="!isEditing"
                      label="I confirm this application is complete and ready to be submitted for review."
                    ></v-checkbox>
                  </v-col>
                </v-row>

                <v-row v-if="isTab(TAB_CODES.preCertSubmission)">
                  <v-col cols="12" sm="12" md="12" xs="12">
                    <v-checkbox
                      v-model="formData.iosas_precertdocumentssubmitted"
                      :disabled="!isPreCertEditable"
                      label="I confirm that all pre-certification documents are ready to be submitted."
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-window>

              <v-container
                v-if="
                  isEditing ||
                  (isPreCertEditable && isTab(TAB_CODES.preCertSubmission))
                "
              >
                <v-row justify="center" align="center" v-if="showError">
                  <v-col>
                    <v-alert type="error" title="Error" variant="outlined">
                      Ensure all required fields are filled out before
                      proceeding to the next step
                    </v-alert>
                  </v-col>
                </v-row>
                <br />
                <v-row align="end" align-self="end">
                  <v-spacer />
                  <PrimaryButton
                    secondary
                    text="Save Draft"
                    class="mr-2"
                    :disabled="
                      isPreCertEditable &&
                      formData.iosas_precertdocumentssubmitted
                    "
                    :click-action="handleDraftSubmit"
                  />

                  <v-btn
                    v-if="isTab(TAB_CODES.submission)"
                    type="submit"
                    primary
                    class="mt-2 submit-button"
                    variant="elevated"
                    :disabled="!applicationConfirmation"
                    >Submit</v-btn
                  >
                  <v-btn
                    v-if="isTab(TAB_CODES.preCertSubmission)"
                    type="submit"
                    primary
                    class="mt-2 submit-button"
                    variant="elevated"
                    :disabled="!formData.iosas_precertdocumentssubmitted"
                    >Submit</v-btn
                  >
                </v-row>
                <v-row align="end">
                  <v-spacer />
                  <v-btn
                    variant="plain"
                    @click="handleDelete"
                    class="link-button"
                  >
                    Cancel Application
                  </v-btn>
                </v-row>
              </v-container>
            </div>
            <br />
            <v-container>
              <v-row class="d-flex justify-space-between">
                <PrimaryButton
                  :disabled="isTab(TAB_CODES.general)"
                  type="submit"
                  secondary
                  text="Previous"
                  class="mr-2"
                  :click-action="prevTab"
                />
                <PrimaryButton
                  :disabled="isNextDisabled"
                  id=""
                  secondary
                  :text="isEditing ? 'Save & Next' : 'Next'"
                  class="mr-2"
                  :click-action="isEditing ? nextAndSaveTab : nextTab"
                />
              </v-row>
            </v-container>
          </v-container>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { authStore } from './../../store/modules/auth';
import { mapState, mapActions } from 'pinia';
import ApplicationService from '../../common/applicationService';
import ApiService from '../../common/apiService';
import { metaDataStore } from './../../store/modules/metaData';
import { applicationsStore } from './../../store/modules/applications';
import { documentStore } from './../../store/modules/document';
import alertMixin from './../../mixins/alertMixin';
import * as Rules from './../../utils/formRules';
import {
  TAB_CODES,
  APP_STATUS_CODES,
  TAB_CONTENT,
} from '../../utils/application';

import DocumentUpload from '../common/DocumentUpload.vue';
import ConfirmationDialog from '../../components/util/ConfirmationDialog.vue';

import PrimaryButton from './../util/PrimaryButton.vue';
import SchoolPoliciesTab from './tabs/SchoolPoliciesTab.vue';
import SchoolFacilityTab from './tabs/SchoolFacilityTab.vue';
import SchoolGeneralTab from './tabs/SchoolGeneralTab.vue';
import SchoolInformationTab from './tabs/SchoolInformationTab.vue';
import SchoolAuthorityInformationTab from './tabs/SchoolAuthorityInformationTab.vue';
import StudentEnrolmentTab from './tabs/StudentEnrolmentTab.vue';
import SchoolSemesterTab from './tabs/SchoolSemesterTab.vue';
import GroupCertificationTab from './tabs/GroupCertificationTab.vue';
import EducationalProgramTab from './tabs/EducationalProgramTab.vue';
import TeacherCertificationTab from './tabs/TeacherCertificationTab.vue';
import SubmissionTab from './tabs/SubmissionTab.vue';
import DocumentTab from './tabs/DocumentTab.vue';
import PreCertificationTab from './tabs/PreCertificationTab.vue';

export default {
  name: 'SchoolApplicationForm',
  components: {
    PrimaryButton,
    ConfirmationDialog,
    DocumentUpload,
    SchoolGeneralTab,
    SchoolInformationTab,
    SchoolAuthorityInformationTab,
    StudentEnrolmentTab,
    SchoolSemesterTab,
    GroupCertificationTab,
    SchoolPoliciesTab,
    SchoolFacilityTab,
    EducationalProgramTab,
    TeacherCertificationTab,
    SubmissionTab,
    DocumentTab,
    PreCertificationTab,
  },
  emits: ['setIsLoading', 'updateData', 'handleUploadDocuments'],
  mixins: [alertMixin],
  props: {
    formData: {
      type: Object,
      required: false,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      TAB_CODES,
      APP_STATUS_CODES,
      TAB_CONTENT,
      isPreCertDisabled: true,
      isPreCertEditable: false,
      drawer: false,
      isEditing: false,
      isFormValid: true,
      showError: false,
      applicationConfirmation: false,
      confirmDeleteDocument: false,
      rules: Rules,
      tab: null,
      isNextDisabled: false,
      isDocumentsLoading: false,
      schoolYearLabel: null,
    };
  },
  watch: {
    $route(to, from) {
      if (to.params.tab !== from.params.tab) {
        this.tab = Number(to.params.tab);
        if (
          (Number(to.params.tab) === this.TAB_CODES.submission &&
            this.isPreCertDisabled) ||
          (this.isTab(this.TAB_CODES.submission) && this.isPreCertDisabled) ||
          this.isTab(this.TAB_CODES.preCertSubmission)
        ) {
          this.isNextDisabled = true;
        } else {
          this.isNextDisabled = false;
        }
      }
    },
    tab: {
      handler(val, prevVal) {
        if (val !== prevVal) {
          return this.$router.replace({
            name: 'schoolApplicationPage',
            params: { id: this.formData.iosas_applicationid, tab: val },
          });
        }
      },
    },
    isFormValid: {
      handler(val) {
        if (val || val === null) {
          this.showError = false;
        } else if (val === false) {
          this.showError = true;
        }
      },
    },
    'formData.iosas_addressline1': {
      handler(val) {
        if (val) {
          this.formData.iosas_province = 'British Columbia';
          this.formData.iosas_country = 'Canada';
        } else {
          this.formData.iosas_province = null;
          this.formData.iosas_country = null;
        }
      },
    },
    'formData.iosas_mailingaddress1': {
      handler(val) {
        if (val) {
          this.formData.iosas_mailingaddressprovince = 'British Columbia';
          this.formData.iosas_mailingaddresscountry = 'Canada';
        } else {
          this.formData.iosas_mailingaddressprovince = null;
          this.formData.iosas_mailingaddresscountry = null;
        }
      },
    },
    'formData._iosas_edu_year_value': {
      handler(val) {
        if (val) {
          this.setSchoolYearLabel(val);
        }
        return;
      },
    },
    sumA(val) {
      this.formData.iosas_primaryschooltotal = val;
    },
    sumB(val) {
      this.formData.iosas_highschooltotal = val;
    },
    sumAB(val) {
      this.formData.iosas_totalenrolment = val;
    },
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
    ...mapState(metaDataStore, [
      'getApplicationPickListOptions',
      'getSchoolYears',
    ]),
    ...mapState(applicationsStore, ['getSchoolApplication']),
    ...mapState(documentStore, ['applicationDocuments']),
    // Student Enrolment values are calculated on the BE, the FE will enforce that enrolment is > 10
    sumA() {
      return (
        Number(this.formData.iosas_numberofstudentsg7) +
        Number(this.formData.iosas_numberofstudentsg6) +
        Number(this.formData.iosas_numberofstudentsg4) +
        Number(this.formData.iosas_numberofstudentsg5) +
        Number(this.formData.iosas_numberofstudentsg3) +
        Number(this.formData.iosas_numberofstudentsg2) +
        Number(this.formData.iosas_numberofstudentsg1) +
        Number(this.formData.iosas_numberofstudentskindergarten)
      );
    },
    sumB() {
      return (
        Number(this.formData.iosas_numberofstudentsg8) +
        Number(this.formData.iosas_numberofstudentsg9) +
        Number(this.formData.iosas_numberofstudentsg10) +
        Number(this.formData.iosas_numberofstudentsg11) +
        Number(this.formData.iosas_numberofstudentsg12)
      );
    },
    sumAB() {
      return (
        Number(this.formData.iosas_primaryschooltotal) +
        Number(this.formData.iosas_highschooltotal)
      );
    },
  },
  created() {
    this.isEditing =
      this.formData &&
      this.formData?.statuscode === this.APP_STATUS_CODES.draft;

    this.isPreCertDisabled =
      this.formData &&
      this.formData?.statuscode !== this.APP_STATUS_CODES.preCert &&
      !this.formData.iosas_precertdocumentssubmitted;

    this.isPreCertEditable =
      this.formData &&
      this.formData?.statuscode === this.APP_STATUS_CODES.preCert &&
      !this.formData?.iosas_precertdocumentssubmitted;
    // Display confirmation message as disabled/populated in viewOnly mode
    this.applicationConfirmation = !this.isEditing;
    if (this.formData._iosas_edu_year_value) {
      this.setSchoolYearLabel(this.formData._iosas_edu_year_value);
    }

    this.setTabValue();
  },
  methods: {
    ...mapActions(applicationsStore, ['setConfirmationMessage']),
    ...mapActions(documentStore, [
      'addApplicationDocument',
      'setApplicationDocuments',
    ]),
    async validateForm() {
      await this.$refs.schoolApplicationForm.validate();
    },
    isTabDisabled(tab) {
      if (Number(tab) === this.TAB_CODES.preCertSubmission) {
        if (
          this.isPreCertEditable ||
          this.formData.iosas_precertdocumentssubmitted
        ) {
          return false;
        } else {
          return true;
        }
      }

      if (this.isEditing) {
        if (
          !this.formData.iosas_portalapplicationstep &&
          Number(tab) !== this.TAB_CODES.general
        ) {
          return true;
        } else {
          return (
            Number(tab) > Number(this.formData.iosas_portalapplicationstep)
          );
        }
      } else {
        return false;
      }
    },
    setSchoolYearLabel(yearValue) {
      const matchedSchoolYear = this.getSchoolYears.find(
        ({ value }) => value === yearValue
      );
      this.schoolYearLabel = matchedSchoolYear?.year?.iosas_label;
    },
    setTabValue() {
      const routeTabValue = Number(this.$route.params.tab);
      if (this.isEditing) {
        if (!this.formData?.iosas_portalapplicationstep && !routeTabValue) {
          this.tab = this.TAB_CODES.general;
        } else if (routeTabValue && !this.isTabDisabled(routeTabValue)) {
          this.tab = routeTabValue;
        } else {
          this.tab = this.formData?.iosas_portalapplicationstep;
        }
      } else {
        if (
          this.isPreCertDisabled &&
          routeTabValue === this.TAB_CODES.preCertSubmission
        ) {
          this.tab = this.TAB_CODES.general;
        } else if (this.isPreCertEditable) {
          this.tab = this.TAB_CODES.preCertSubmission;
        } else {
          this.tab = routeTabValue;
        }
      }
    },
    isTab(tabValue) {
      return this.tab === tabValue;
    },
    async removeDocument(document) {
      const confirmation = await this.$refs.confirmDeleteDocument.open(
        `Remove Document - ${document.fileName}?`,
        null,
        {
          color: '#fff',
          width: 580,
          closeIcon: false,
          subtitle: false,
          dark: false,
          resolveText: 'Confirm',
          rejectText: 'Cancel',
        }
      );
      if (!confirmation) {
        return;
      } else {
        this.isDocumentsLoading = true;
        const filteredDocuments = this.applicationDocuments.filter(({ id }) => {
          return id !== document.id;
        });
        if (document.iosas_documentid) {
          await ApiService.deleteDocument(document.iosas_documentid)
            .then(async () => {
              await this.setApplicationDocuments(filteredDocuments);
              this.isDocumentsLoading = false;
              this.setSuccessAlert(
                `Success! The Document ${document.iosas_file_name} has been removed from your records`
              );
            })
            .catch((error) => {
              console.error(error);
              this.setFailureAlert(
                error?.response?.data?.message
                  ? error?.response?.data?.message
                  : 'An error occurred while saving the school application. Please try again later.'
              );
            });
        } else {
          await this.setApplicationDocuments(filteredDocuments);
          this.isDocumentsLoading = false;
        }
      }
    },
    async handleDelete() {
      const confirmation = await this.$refs.confirmDelete.open(
        'Cancel Application - Independent School Certification?',
        null,
        {
          color: '#fff',
          width: 580,
          closeIcon: false,
          subtitle: false,
          dark: false,
          resolveText: 'Confirm',
          rejectText: 'Cancel',
        }
      );
      if (!confirmation) {
        return;
      } else {
        this.$emit('setIsLoading', true);
        ApplicationService.cancelSchoolApplication(
          this.formData.iosas_applicationid
        )
          .then(async () => {
            await this.setConfirmationMessage(
              `School Application ${this.formData.iosas_applicationnumber} has been successfully removed from your records.`
            );
            this.$router.push({
              name: 'applicationConfirmation',
            });
          })
          .catch((error) => {
            console.error(error);
            this.setFailureAlert(
              error?.response?.data?.message
                ? error?.response?.data?.message
                : 'An error occurred while cancelling the school application. Please try again later.'
            );
          });
      }
    },
    handleDraftSubmit() {
      const isSubmitted = this.isPreCertEditable ? null : false;
      const portalStep =
        Number(this.formData.iosas_portalapplicationstep) >
        Number(this.$route.params.tab)
          ? this.formData.iosas_portalapplicationstep
          : this.$route.params.tab;
      const payload = {
        ...this.formData,
        iosas_portalapplicationstep: Number(portalStep),
      };
      this.$emit(
        'updateData',
        this.formData.iosas_applicationid,
        payload,
        this.applicationDocuments,
        isSubmitted
      );
    },
    async handleSubmit() {
      const valid = await this.$refs.schoolApplicationForm.validate();

      this.isFormValid = valid.valid;
      const isSubmitted = this.isPreCertEditable ? null : true;
      // Do this after initial Submission
      if (this.isFormValid) {
        if (isSubmitted) {
          await this.setConfirmationMessage(
            `Thank you for submitting your school application and supporting documentations to open ${this.formData.iosas_proposedschoolname} in September ${this.schoolYearLabel}, you will be contacted once your submission has been reviewed.`
          );
        } else {
          await this.setConfirmationMessage(
            `Thank you for submitting your pre-certification documents for ${this.formData.iosas_proposedschoolname}. You will be contacted once your pre-certification submission has been reviewed.`
          );
        }
        const portalStep =
          Number(this.formData.iosas_portalapplicationstep) >
          Number(this.$route.params.tab)
            ? this.formData.iosas_portalapplicationstep
            : this.$route.params.tab;
        const payload = {
          ...this.formData,
          iosas_portalapplicationstep: Number(portalStep),
        };
        await this.$emit(
          'updateData',
          this.formData.iosas_applicationid,
          payload,
          this.applicationDocuments,
          isSubmitted
        );
      }
    },
    prevTab() {
      const prevTab = Number(this.$route.params.tab) - 1;
      return this.$router.replace({
        name: 'schoolApplicationPage',
        params: { id: this.formData.iosas_applicationid, tab: prevTab },
      });
    },
    async nextTab() {
      const nextTab = Number(this.$route.params.tab) + 1;
      return this.$router.replace({
        name: 'schoolApplicationPage',
        params: { id: this.formData.iosas_applicationid, tab: nextTab },
      });
    },
    async nextAndSaveTab() {
      const nextTab = Number(this.$route.params.tab) + 1;
      const portalStep =
        Number(this.formData.iosas_portalapplicationstep) > nextTab
          ? this.formData.iosas_portalapplicationstep
          : nextTab;
      const valid = await this.$refs.schoolApplicationForm.validate();
      this.showError = !valid.valid;

      if (this.isFormValid) {
        const payload = {
          ...this.formData,
          iosas_portalapplicationstep: portalStep,
        };
        await this.$emit(
          'updateData',
          this.formData.iosas_applicationid,
          payload,
          this.applicationDocuments,
          false
        );
      }
    },
    validateAndPopulateRadioButtons(e) {
      // RadioGroup does not update the form to trigger validation refresh if the error is already being displayed on the UI,
      // must attach a change event, and set the field programatically.
      // RadioGroup appears to work following the happy path, This is only needed for RadioGroups with 'Required' validation
      this.formData[e.target.attributes?.name?.value] = JSON.parse(
        e.target.value
      );

      // if the form is already !valid, trigger the validation to clear the error on the updated radioGroup
      if (this.isFormValid === false) {
        this.$refs.schoolApplicationForm.validate();
      }
    },
  },
};
</script>

<style scoped>
li {
  display: list-item;
  list-style-position: inside;
}

.block {
  display: block;
}

.submit-button {
  background-color: #003366 !important;
  color: white !important;
}
.v-window {
  margin-top: 20px;
}
/* Override the default settings for content-container as this view has side navigation */
.content-container {
  padding-top: 0;
  padding-right: 15em !important;
  padding-left: 2em !important;
}

@media screen and (max-width: 1900px) {
  .content-container {
    padding-right: 5em !important;
    padding-left: 1em !important;
  }
}

@media screen and (max-width: 1500px) {
  .content-container {
    padding-right: 4em !important;
    padding-left: 1em !important;
  }
}

@media screen and (max-width: 600px) {
  .content-container {
    padding-right: 0.5em !important;
    padding-left: 0.5em !important;
  }
}

@media screen and (max-width: 900px) {
  .no-mobile-tabs {
    display: none;
  }
  .mobile-tabs {
    display: block !important;
  }
}

.mobile-tabs {
  display: none;
}

.flex-1 {
  flex: 1;
}

.flex-4 {
  flex: 4;
}

.v-window-item {
  min-height: 400px;
}

.fixed-container {
  height: 80vh;
}

.scroll {
  overflow: scroll;
}

.v-window {
  padding-bottom: 25px;
}
</style>
