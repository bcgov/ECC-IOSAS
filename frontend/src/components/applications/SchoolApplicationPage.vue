<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="breadcrumbs"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <br />
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
    <div v-else>
      <SchoolApplicationForm
        :formData="applicationData"
        :isLoading="isLoading"
        @setIsLoading="setIsLoading"
        @updateData="updateData"
        @handleUploadDocuments="handleUploadDocuments"
      />
    </div>
  </v-container>
</template>

<script>
import SchoolApplicationForm from './SchoolApplicationForm.vue';
import ApplicationService from '../../common/applicationService';
import ApiService from '../../common/ApiService';
import alertMixin from './../../mixins/alertMixin';
import { mapState } from 'pinia';
import { applicationsStore } from '../../store/modules/applications';
import { formatArrayToString } from '../../utils/format';

export default {
  name: 'SchoolApplicationPage',
  mixins: [alertMixin],
  components: {
    SchoolApplicationForm,
  },
  data: () => ({
    isLoading: true,
    applicationData: {},
    breadcrumbs: [
      {
        title: 'Dashboard',
        disabled: false,
        href: '/',
      },
      {
        title: `Application`,
        disabled: true,
        href: 'school-application',
      },
    ],
  }),
  computed: {
    ...mapState(applicationsStore, ['getSchoolApplication']),
  },
  created() {
    this.fetchAppData();
  },
  methods: {
    formatArrayToString,
    setIsLoading(value) {
      this.isLoading = value;
    },
    formatPayload(payload) {
      // Convert array to comma seperated string
      return {
        ...payload,
        iosas_schoolaffiliation: this.formatArrayToString(
          payload.iosas_schoolaffiliation
        ),
        iosas_semestertype: this.formatArrayToString(
          payload.iosas_semestertype
        ),
        iosas_additionalprograms: this.formatArrayToString(
          payload.iosas_additionalprograms
        ),
      };
    },
    async fetchAppData() {
      this.isLoading = true;
      return applicationsStore()
        .getApplicationById(this.$route.params.id)
        .then(() => {
          this.applicationData = this.getSchoolApplication;

          this.isLoading = false;
        });
    },
    async handleUploadDocuments(appID, documents) {
      const documentsNotUploaded = documents.filter((doc) => doc.content);
      Promise.all(
        documentsNotUploaded.map(async (document) => {
          const payload = {
            ...document,
            regardingId: appID,
            regardingType: 'iosas_application',
          };
          await ApiService.uploadFile(payload)
            .then((response) => {
              return response;
            })
            .catch((error) => {
              this.setFailureAlert(
                error?.response?.data?.message
                  ? error?.response?.data?.message
                  : 'An error occurred while saving the expression of Interest. Please try again later.'
              );
            });
        })
      );
    },
    async updateData(id, payload, documents, isSubmitted = null) {
      try {
        this.isLoading = true;
        const updateResponse = await ApplicationService.updateSchoolApplication(
          id,
          this.formatPayload(payload),
          isSubmitted
        );
        if (updateResponse.data) {
          if (documents.length) {
            await this.handleUploadDocuments(
              payload.iosas_applicationid,
              documents
            );
          }
          if (
            isSubmitted ||
            (isSubmitted === null && payload.iosas_precertdocumentssubmitted)
          ) {
            this.$router.push({
              name: 'applicationConfirmation',
            });
          } else {
            this.isLoading = false;
            this.$router.replace({
              name: 'schoolApplicationPage',
              params: {
                id: this.$route.params.id,
                tab: payload.iosas_portalapplicationstep,
              },
            });

            await this.fetchAppData();

            this.setSuccessAlert(
              `Success! School Application ${payload.iosas_applicationnumber} has been updated.`
            );
          }
        }
      } catch (error) {
        this.isLoading = false;
        this.setFailureAlert(
          `An error occurred while trying to update the school application ${payload.iosas_applicationnumber}. Please try again later.`
        );
        throw error;
      }
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}

.v-timeline--horizontal.v-timeline.v-timeline--side-end,
.v-timeline-item,
.v-timeline-item__body {
  padding: none !important;
  padding-block-end: 0 !important;
  padding-block-start: 0 !important;
}

.step-title {
  font-size: 12px;
  line-height: 0;
}
</style>
