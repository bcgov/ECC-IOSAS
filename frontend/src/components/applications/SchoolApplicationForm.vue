<template>
  <div>
    <v-row v-if="isLoading">
      <v-col class="d-flex justify-center">
        <v-progress-circular
          class="mt-16"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
          :active="isLoading"
        />
      </v-col>
    </v-row>

    <v-navigation-drawer temporary class="mobile-tabs" v-model="drawer">
      <v-tabs v-model="tab" bg-color="transparent" direction="vertical">
        <v-tab
          v-for="item in items"
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
            {{ item }}
          </v-tab>
        </v-tabs>
      </div>
      <div class="flex-4">
        <v-form
          ref="schoolApplicationForm"
          v-model="isFormValid"
          @submit.prevent="submit"
        >
          <v-container class="content-container">
            <div class="form-container">
              <div class="d-flex justify-space-between">
                <h1>Application for Independent School Certification</h1>
                <PrimaryButton
                  v-if="!isEditing"
                  secondary
                  text="Edit"
                  class="mr-2"
                  :click-action="toggleEditMode"
                />
              </div>
              <br />
              <v-divider></v-divider>
              <v-window v-model="tab">
                <v-window-item key="General" value="General">
                  <SchoolGeneralTab :formData="data" :isEditing="isEditing" />
                </v-window-item>
                <v-window-item
                  key="School Information"
                  value="School Information"
                >
                  <SchoolInformationTab
                    :formData="data"
                    :isEditing="isEditing"
                  />
                </v-window-item>
                <v-window-item key="School Authority" value="School Authority">
                  <SchoolAuthorityInformationTab
                    :formData="data"
                    :isEditing="isEditing"
                  />
                </v-window-item>
                <v-window-item
                  key="Student Enrolment"
                  value="Student Enrolment"
                >
                  <StudentEnrolmentTab
                    :formData="data"
                    :isEditing="isEditing"
                  />
                </v-window-item>
                <v-window-item key="School Semester" value="School Semester">
                  <SchoolSemesterTab :formData="data" :isEditing="isEditing" />
                </v-window-item>
                <v-window-item
                  key="Group Certification"
                  value="Group Certification"
                >
                  <GroupCertificationTab
                    :formData="data"
                    :isEditing="isEditing"
                  />
                </v-window-item>
                <v-window-item key="School Facility" value="School Facility">
                  <SchoolFacilityTab :formData="data" :isEditing="isEditing" />
                </v-window-item>
                <v-window-item key="School Policies" value="School Policies">
                  <SchoolPoliciesTab :formData="data" :isEditing="isEditing" />
                </v-window-item>
                <v-window-item
                  key="Educational Program"
                  value="Educational Program"
                >
                  <EducationalProgramTab
                    :formData="data"
                    :isEditing="isEditing"
                  />
                </v-window-item>
                <v-window-item
                  key="Teacher Certification"
                  value="Teacher Certification"
                >
                  <TeacherCertificationTab
                    :formData="data"
                    :isEditing="isEditing"
                  />
                </v-window-item>
                <v-window-item key="Submissions" value="Submissions">
                  <SubmissionTab :formData="data" :isEditing="isEditing" />
                </v-window-item>
              </v-window>

              <br />
              <v-container v-if="isEditing">
                <v-row align="end">
                  <v-spacer />
                  <PrimaryButton
                    type="submit"
                    primary
                    text="Submit"
                    class="mr-2"
                    click-action="buttonAction"
                  />
                  <PrimaryButton
                    id=""
                    secondary
                    text="Clear"
                    class="mr-2"
                    @click="handleReset"
                  />
                </v-row>
              </v-container>
            </div>
            <br />
            <v-container>
              <v-row class="d-flex justify-space-between">
                <PrimaryButton
                  :disabled="tab === 'General'"
                  type="submit"
                  secondary
                  text="Previous"
                  class="mr-2"
                  :click-action="prevTab"
                />
                <PrimaryButton
                  :disabled="tab === 'Submissions'"
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
import alertMixin from './../../mixins/alertMixin';
import * as Rules from './../../utils/institute/formRules';

import DocumentUpload from '../common/DocumentUpload.vue';
import ConfirmationDialog from '../../components/util/ConfirmationDialog.vue';
import { GRADE_OPTIONS } from '../../utils/constants';

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
  mixins: [alertMixin],
  props: {
    data: {
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
      GRADE_OPTIONS,
      drawer: false,
      isEditing: false,
      isValidForm: false,
      requiredRules: [(v) => !!v || 'Required'],
      rules: Rules,
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
        'Submissions',
      ],
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
  },
  mounted() {},
  created() {},
  methods: {
    async validateForm() {
      const valid = await this.$refs.schoolApplicationForm.validate();
      this.isFormValid = valid.valid;
    },
    toggleEditMode() {
      return (this.isEditing = true);
    },
    getData() {
      return [
        {
          application_number: 'APP-1048',
          status: 'Draft',
        },
      ];
    },
    prevTab() {
      const currentTabIndex = this.items.indexOf(this.tab);
      return (this.tab = this.items[currentTabIndex - 1]);
    },
    nextTab() {
      const currentTabIndex = this.items.indexOf(this.tab);
      return (this.tab = this.items[currentTabIndex + 1]);
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

.v-label {
  white-space: break-spaces;
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
