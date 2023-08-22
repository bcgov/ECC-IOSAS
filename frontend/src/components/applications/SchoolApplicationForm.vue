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

    <v-navigation-drawer temporary class="mobile-tabs" v-model="drawer">
      <v-tabs v-model="tab" bg-color="transparent" direction="vertical">
        <v-tab
          v-for="item in items"
          :disabled="disabledTabs.includes(item)"
          :key="item"
          :value="item"
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
          <v-tab v-for="item in items" :key="item" :value="item">
            <!-- :disabled="disabledTabs.includes(item)" -->
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
                      @validateAndPopulate="validateAndPopulateRadioButtons"
                    />
                  </keep-alive>
                </v-window-item>
              </v-window>

              <v-container v-if="isEditing">
                <v-row v-if="isLastPage()">
                  <v-col cols="12" sm="12" md="12" xs="12">
                    <v-checkbox
                      v-model="applicationConfirmation"
                      label="I confirm this application is complete and ready to be submitted for review."
                    ></v-checkbox>
                  </v-col>
                </v-row>

                <v-row justify="center" align="center" v-if="showError">
                  <v-col>
                    <v-alert type="error" title="Error" variant="outlined">
                      Ensure all required fields are filled out before
                      proceeding to the next step
                    </v-alert>
                  </v-col>
                </v-row>
                <br />
                <v-row align="end">
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
import { mapState } from 'pinia';
import ApiService from '../../common/apiService';
import { applicationsStore } from './../../store/modules/applications';
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
import { DISABLED_TABS } from '../../utils/constants';

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
  },
  emits: ['setIsLoading', 'updateData'],
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
      DISABLED_TABS,
      drawer: false,
      disabledTabs: [],
      isEditing: false,
      isFormValid: true,
      showError: false,
      defaultStatus: 'Submitted',
      applicationConfirmation: false,
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
        { tab: 'Document', component: null },
        { tab: 'Submission', component: 'SubmissionTab' },
      ],
      tab: 'General',
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
      ],
    };
  },
  watch: {
    // If next button is clicked && form is valid
    //remove current tab from disabled tab list
    tab: {
      handler() {
        if (this.disabledTabs.length) {
          this.disabledTabs = this.disabledTabs.filter(
            (tab) => tab !== this.tab
          );
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
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
    // ...mapState(applicationsStore, ['setConfirmationMessage']),
  },
  created() {
    console.log('school application', this.formData);
    const isDraft =
      this.formData && this.formData?.statuscode === this.draftCode;
    this.isEditing = isDraft;
    // TODO: Do not disable tab if application has been updated/submitted but still in progress
    this.disabledTabs = isDraft ? DISABLED_TABS : [];
  },
  methods: {
    applicationsStore,
    isLastPage() {
      return this.tab === 'Submission';
    },
    isFirstPage() {
      return this.tab === 'General';
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
        ApiService.cancelSchoolApplication(this.formData.iosas_applicationid)
          .then(async () => {
            await applicationsStore().setConfirmationMessage(
              `School application ${this.formData.iosas_applicationnumber} has been successfully removed from your records.`
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
      this.$emit(
        'updateData',
        this.formData.iosas_applicationid,
        this.formData,
        false
      );
    },
    async handleSubmit() {
      const valid = await this.$refs.schoolApplicationForm.validate();

      this.isFormValid = valid.valid;
      if (this.isFormValid) {
        await applicationsStore().setConfirmationMessage(
          `School application ${this.formData.iosas_applicationnumber} has been successfully submitted.`
        );
        this.$emit(
          'updateData',
          this.formData.iosas_applicationid,
          this.formData,
          true
        );
      }
    },
    prevTab() {
      const currentTabIndex = this.items.indexOf(this.tab);
      return (this.tab = this.items[currentTabIndex - 1]);
    },
    async nextTab() {
      const currentTabIndex = this.items.indexOf(this.tab);
      const nextTab = this.items[currentTabIndex + 1];
      const nextTabUnlocked = !this.disabledTabs.includes(nextTab);

      if (nextTabUnlocked) {
        // Allow users to navigate through tabs without
        // triggering validation errors until they try to access a locked tab.
        return (this.tab = nextTab);
      } else {
        const valid = await this.$refs.schoolApplicationForm.validate();
        this.showError = !valid.valid;
        if (this.isFormValid) {
          return (this.tab = nextTab);
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
</style>
