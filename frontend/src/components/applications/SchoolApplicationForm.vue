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
          v-for="item in items"
          :key="item"
          :value="item"
          :disabled="disabledTabs.includes(item) && this.isEditing"
          @click.stop="drawer = !drawer"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-navigation-drawer>

    <div class="d-flex justify-space-between" v-if="!isLoading">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mobile-tabs"
      ></v-app-bar-nav-icon>
      <div class="flex-1 no-mobile-tabs">
        <v-tabs v-model="tab" bg-color="transparent" direction="vertical">
          <v-tab
            v-for="item in items"
            :key="item"
            :value="item"
            :disabled="disabledTabs.includes(item) && this.isEditing"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </div>

      <div class="flex-4">
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
                  v-for="t in tabContent"
                  :key="t.tab"
                  :value="t.tab"
                >
                  <keep-alive>
                    <component
                      :is="t.component"
                      :formData="formData"
                      :draftCode="draftCode"
                      :isEditing="isEditing"
                      :isDocumentsLoading="isDocumentsLoading"
                      @validateAndPopulate="validateAndPopulateRadioButtons"
                      @removeDocument="removeDocument"
                      :isPreCertEditable="isPreCertEditable"
                    />
                  </keep-alive>
                </v-window-item>
              </v-window>

              <v-row v-if="isLastPage()">
                <v-col cols="12" sm="12" md="12" xs="12">
                  <v-checkbox
                    v-model="applicationConfirmation"
                    :disabled="!isEditing"
                    label="I confirm this application is complete and ready to be submitted for review."
                  ></v-checkbox>
                </v-col>
              </v-row>

              <v-container v-if="isPreCertEditable && isPreCertTab()">
                <v-row align="end" align-self="end">
                  <PrimaryButton
                    primary
                    text="Save Documents"
                    class="mr-2"
                    :click-action="handleUploadPreCertDocuments"
                  />
                </v-row>
              </v-container>

              <v-container v-if="isEditing">
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
                    :click-action="handleDraftSubmit"
                  />

                  <v-btn
                    v-if="isLastPage()"
                    type="submit"
                    primary
                    class="mt-2 submit-button"
                    variant="elevated"
                    :disabled="!applicationConfirmation"
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
                  :disabled="isFirstPage()"
                  type="submit"
                  secondary
                  text="Previous"
                  class="mr-2"
                  :click-action="prevTab"
                />
                <PrimaryButton
                  :disabled="isLastPage()"
                  id=""
                  secondary
                  text="Next"
                  class="mr-2"
                  :click-action="nextTab"
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
import ApiService from '../../common/ApiService';
import { metaDataStore } from './../../store/modules/metaData';
import { applicationsStore } from './../../store/modules/applications';
import { documentStore } from './../../store/modules/document';
import alertMixin from './../../mixins/alertMixin';
import * as Rules from './../../utils/institute/formRules';

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
      draftCode: 100000001,
      preCertCode: 100000009,
      isPreCertEditable: false,
      drawer: false,
      disabledTabs: [],
      isEditing: false,
      isFormValid: true,
      showError: false,
      defaultStatus: 'Submitted',
      applicationConfirmation: false,
      confirmDeleteDocument: false,
      rules: Rules,
      tabContent: [
        {
          tab: 'General',
          component: 'SchoolGeneralTab',
        },
        {
          tab: 'School Information',
          component: 'SchoolInformationTab',
        },
        {
          tab: 'School Authority',
          component: 'SchoolAuthorityInformationTab',
        },
        {
          tab: 'Student Enrolment',
          component: 'StudentEnrolmentTab',
        },
        {
          tab: 'School Semester',
          component: 'SchoolSemesterTab',
        },
        {
          tab: 'Group Certification',
          component: 'GroupCertificationTab',
        },
        { tab: 'School Facility', component: 'SchoolFacilityTab' },
        { tab: 'School Policies', component: 'SchoolPoliciesTab' },
        { tab: 'Educational Program', component: 'EducationalProgramTab' },
        { tab: 'Teacher Certification', component: 'TeacherCertificationTab' },
        { tab: 'Documents', component: 'DocumentTab' },
        { tab: 'Submission', component: 'SubmissionTab' },
        {
          tab: 'Pre-Certification Submission',
          component: 'PreCertificationTab',
        },
      ],
      tab: 'General',
      currentTab: 100000000,
      generalTabValue: 100000000,
      items: [
        'General',
        'School Information',
        'School Authority',
        'Student Enrolment',
        'School Semester',
        'Group Certification',
        'School Facility',
        'School Policies',
        'Educational Program',
        'Teacher Certification',
        'Documents',
        'Submission',
        'Pre-Certification Submission',
      ],
      // documents: [],
      isDocumentsLoading: false,
      schoolYearLabel: null,
    };
  },
  watch: {
    $route(to, from) {
      if (to.params.tab !== from.params.tab) {
        this.setTabLabel(to.params.tab);
      }
    },
    // If tab is changed, change route to match
    tab: {
      handler(val, prevVal) {
        if (val !== prevVal) {
          const nextTab = this.getApplicationPickListOptions?.[
            'iosas_portalapplicationstep'
          ].find((t) => t.label === val).value;

          return this.$router.replace({
            name: 'schoolApplicationPage',
            params: { id: this.formData.iosas_applicationid, tab: nextTab },
          });
        }
      },
    },
    isFormValid: {
      handler(val) {
        if (val) {
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
    ...mapState(documentStore, ['getApplicationDocuments']),
    // Student Enrolment values are calculated on the BE, the FE will enforce that enrolment is > 10
    sumA() {
      return (
        Number(this.formData.iosas_numberofstudentsg7) +
        Number(this.formData.iosas_numberofstudentsg6) +
        Number(this.formData.iosas_numberofstudentsg5) +
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
    const isDraft =
      this.formData && this.formData?.statuscode === this.draftCode;
    this.isEditing = isDraft;
    this.isPreCertEditable =
      this.formData && this.formData?.statuscode === this.preCertCode;
    // Display confirmation message as disabled/populated in viewOnly mode
    this.applicationConfirmation = !isDraft;
    if (this.formData?.iosas_portalapplicationstep && this.isEditing) {
      this.setTabLabel(this.formData?.iosas_portalapplicationstep);
      this.currentTab = this.formData?.iosas_portalapplicationstep;
    } else if (
      !this.formData?.iosas_portalapplicationstep &&
      this.$route.params.tab
    ) {
      this.currentTab = this.$route.params.tab;
      this.setTabLabel(this.$route.params.tab);
    } else {
      this.setTabLabel(this.generalTabValue);
    }
    if (this.formData._iosas_edu_year_value) {
      this.setSchoolYearLabel(this.formData._iosas_edu_year_value);
    }
  },
  methods: {
    ...mapActions(applicationsStore, ['setConfirmationMessage']),
    ...mapActions(documentStore, [
      'addApplicationDocument',
      'setApplicationDocuments',
    ]),
    isPreCertTab() {
      return this.tab === 'Pre-Certification Submission';
    },
    setSchoolYearLabel(yearValue) {
      const matchedSchoolYear = this.getSchoolYears.find(
        ({ value }) => value === yearValue
      );
      this.schoolYearLabel = matchedSchoolYear?.year?.iosas_label;
    },
    setDisabledTabs() {},
    setTabLabel(tabValue) {
      this.tab = this.getApplicationPickListOptions?.[
        'iosas_portalapplicationstep'
      ].find((t) => t.value === Number(tabValue)).label;
      const highestTab = Math.max(...[this.currentTab, Number(tabValue)]);
      let labels = [];
      const tabsNotTracked = this.getApplicationPickListOptions?.[
        'iosas_portalapplicationstep'
      ]
        .filter((t) => t.value > highestTab)
        .map(({ label }) => labels.push(label));
      this.disabledTabs = labels;
    },
    isLastPage() {
      return this.tab === 'Submission';
    },
    isFirstPage() {
      return this.tab === 'General';
    },
    async handleUploadPreCertDocuments() {
      // TODO: fix loading state
      this.isDocumentsLoading = true;
      const response = await this.$emit(
        'handleUploadDocuments',
        this.formData.iosas_applicationid,
        this.getApplicationDocuments
      );
    },
    async removeDocument(document) {
      const documentName = document.iosas_documentid
        ? document.iosas_file_name
        : document.fileName;
      const confirmation = await this.$refs.confirmDeleteDocument.open(
        `Remove Document - ${documentName}?`,
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
        if (document.iosas_documentid) {
          // Remove all saved documents, refetch
          const unUploadedDocuments = this.getApplicationDocuments.filter(
            ({ iosas_documentid }) => {
              return !iosas_documentid;
            }
          );
          await ApiService.deleteDocument(document.iosas_documentid)
            .then(async () => {
              const documentResponse =
                await ApplicationService.getApplicationDocuments(
                  this.formData.iosas_applicationid
                );
              if (documentResponse) {
                const formattedDocumentResponse = documentResponse?.data?.value
                  .length
                  ? documentResponse?.data?.value.map((doc) => ({
                      fileName: doc.iosas_file_name,
                      documentType: doc.iosas_newschoolapplicationdocumenttype,
                      id: doc.iosas_documentid,
                      ...doc,
                    }))
                  : [];
                await this.setApplicationDocuments(
                  unUploadedDocuments.concat(formattedDocumentResponse)
                );
              }
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
                  : 'An error occurred while saving the expression of Interest. Please try again later.'
              );
            });
        } else {
          // Remove only the deleted/unUploaded state document
          const filteredDocuments = this.getApplicationDocuments.filter(
            ({ id }) => {
              return id !== document.id;
            }
          );
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
              params: { type: 'Delete#APP' },
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
      // Only update portalStep if its less than the currently saved step
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
        this.getApplicationDocuments,
        false
      );
    },
    async handleSubmit() {
      const valid = await this.$refs.schoolApplicationForm.validate();

      this.isFormValid = valid.valid;
      if (this.isFormValid) {
        await this.setConfirmationMessage(
          `Thank you for submitting your school application and supporting documentations to open ${this.formData.iosas_proposedschoolname} in September ${this.schoolYearLabel}, you will be contacted once your submission has been reviewed.`
        );
        // Only update portalStep if its less than the currently saved step
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
          this.getApplicationDocuments,
          true
        );
      }
    },
    prevTab() {
      const currentTabIndex = this.items.indexOf(this.tab);
      const prevTab = this.items[currentTabIndex - 1];
      const prevTabValue = this.getApplicationPickListOptions[
        'iosas_portalapplicationstep'
      ].find((t) => t.label === prevTab).value;

      return this.$router.replace({
        name: 'schoolApplicationPage',
        params: { id: this.formData.iosas_applicationid, tab: prevTabValue },
      });
    },
    async nextTab() {
      const currentTabIndex = this.items.indexOf(this.tab);
      const nextTab = this.items[currentTabIndex + 1];

      const nextTabUnlocked = !this.disabledTabs.filter(
        (t) => t.value === nextTab
      );
      const nextTabValue = this.getApplicationPickListOptions[
        'iosas_portalapplicationstep'
      ].find((t) => t.label === nextTab).value;

      if (nextTabValue > this.currentTab) {
        this.currentTab = nextTabValue;
      }
      if (nextTabUnlocked) {
        // Allow users to navigate through tabs without
        // triggering validation errors until they try to access a locked tab.
        return this.$router.replace({
          name: 'schoolApplicationPage',
          params: { id: this.formData.iosas_applicationid, tab: nextTabValue },
        });
      } else {
        const valid = await this.$refs.schoolApplicationForm.validate();
        this.showError = !valid.valid;
        if (this.isFormValid) {
          return this.$router.replace({
            name: 'schoolApplicationPage',
            params: {
              id: this.formData.iosas_applicationid,
              tab: nextTabValue,
            },
          });
        }
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
  min-height: 330px;
  margin-bottom: 10px;
}
</style>
