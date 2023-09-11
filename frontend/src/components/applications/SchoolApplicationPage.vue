<template>
  <span v-if="isLoading">
    <Loader :loading="isLoading" />
  </span>
  <v-container fluid class="full-height" v-else>
    <v-breadcrumbs :items="breadcrumbs"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <br />
    <SchoolApplicationForm
      :formData="applicationData"
      :isLoading="isLoading"
      @setIsLoading="setIsLoading"
      @updateData="updateData"
      @handleUploadDocuments="handleUploadDocuments"
    />
  </v-container>
</template>

<script>
import SchoolApplicationForm from './SchoolApplicationForm.vue';
import ApplicationService from '../../common/applicationService';
import ApiService from '../../common/apiService';
import alertMixin from './../../mixins/alertMixin';
import { mapState, mapActions } from 'pinia';
import { applicationsStore } from '../../store/modules/applications';
import { authStore } from '../../store/modules/auth';
import { formatArrayToString } from '../../utils/format';
import Loader from './../util/Loader.vue';

export default {
  name: 'SchoolApplicationPage',
  mixins: [alertMixin],
  components: {
    SchoolApplicationForm,
    Loader,
  },
  data: () => ({
    isLoading: false,
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
  async created() {
    await this.fetchAppData();
  },
  methods: {
    formatArrayToString,
    ...mapActions(applicationsStore, ['getApplicationById']),
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
      await this.setIsLoading(true);
      this.getApplicationById(this.$route.params.id)
        .then(async () => {
          let contactResponse;
          this.applicationData = this.getSchoolApplication;

          contactResponse = await ApplicationService.getContactById(
            this.applicationData._iosas_designatedcontact_value
          );

          if (contactResponse.data) {
            this.applicationData = {
              ...this.applicationData,
              iosas_designatedcontactfirstname: contactResponse.data.firstname,
              iosas_schoolauthoritycontactname: contactResponse.data.lastname,
              iosas_schoolauthoritycontactemail:
                contactResponse.data.emailaddress1,
              iosas_schoolauthoritycontactphone:
                contactResponse.data.telephone1,
            };
          }
          await this.setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
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
        this.setIsLoading(true);
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
            this.setIsLoading(false);
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
        this.setIsLoading(false);
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
