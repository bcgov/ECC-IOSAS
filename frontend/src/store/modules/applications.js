import ApiService from '../../common/apiService';
import { formatStringToNumericArray } from '../../utils/format';
import { defineStore } from 'pinia';

export const applicationsStore = defineStore('applications', {
  namespaced: true,
  state: () => ({
    EOIApplications: null,
    schoolApplications: null,
    application: null,
    eoi: null,
    confirmationMessage: null,
  }),
  getters: {
    getConfirmationMessage: (state) => state.confirmationMessage,
    getSchoolApplicationsFormatted: (state) =>
      state.schoolApplications
        .sort(
          (a, b) =>
            a.iosas_applicationnumber.split('-').pop() -
            b.iosas_applicationnumber.split('-').pop()
        )
        .map((v) => ({
          // TODO: update with id when connected to API
          application_number:
            v.iosas_applicationnumber + ' ' + v.iosas_applicationid,
          status: v['statuscode@OData.Community.Display.V1.FormattedValue'],
          school_name: v.iosas_proposedschoolname,
          school_year:
            v[
              '_iosas_edu_year_value@OData.Community.Display.V1.FormattedValue'
            ],
          group_classification:
            v[
              'iosas_groupclassification@OData.Community.Display.V1.FormattedValue'
            ],
        })),
    getEOIApplicationsFormatted: (state) =>
      // Sort EOIs by last 4 digits of the eoinumber
      state.EOIApplications?.sort(
        (a, b) =>
          a.iosas_eoinumber.split('-').pop() -
          b.iosas_eoinumber.split('-').pop()
      ).map((v) => ({
        EOI_number: v.iosas_eoinumber + ' ' + v.iosas_expressionofinterestid,
        status:
          v['iosas_reviewstatus@OData.Community.Display.V1.FormattedValue'],
        proposed_school_name: v.iosas_proposedschoolname,
        school_year:
          v['_iosas_edu_year_value@OData.Community.Display.V1.FormattedValue'],
        group_classification:
          v[
            'iosas_groupclassification@OData.Community.Display.V1.FormattedValue'
          ],
      })),
    getEOI: (state) => {
      return state.eoi;
    },
    getSchoolApplication: (state) => {
      return state.application;
    },
  },
  actions: {
    async setConfirmationMessage(message) {
      this.confirmationMessage = message;
    },
    async setEOIApplications(applicationsResponse) {
      this.EOIApplications = applicationsResponse;
    },
    async setEOIApplication(response) {
      this.eoi = response;
    },
    async setSchoolApplications(applicationsResponse) {
      this.schoolApplications = applicationsResponse;
    },
    async setSchoolApplication(applicationResponse) {
      this.application = applicationResponse;
    },
    async getAllEOI() {
      const response = await ApiService.getAllEOIByUser();
      await this.setEOIApplications(response.data.value);
    },
    async getEOIApplicationById(eoiId) {
      const response = await ApiService.getEOIById(eoiId);

      const documentResponse = await ApiService.getEOIDocuments(eoiId);
      const eoi = {
        ...response.data.value[0],
        documents: documentResponse.data.value
          ? documentResponse.data.value
          : [],
      };
      await this.setEOIApplication(eoi);
    },
    async getAllSchoolApplications() {
      const response = await ApiService.getAllApplicationsByUser();
      await this.setSchoolApplications(response.data.value);
    },
    async getApplicationById(appId) {
      const response = await ApiService.getApplicationById(appId);

      const documentResponse = await ApiService.getApplicationDocuments(appId);
      const data = response.data.value[0];
      const app = {
        ...data,
        // format comma seperated lists into arrays and convert values to numbers
        iosas_additionalprograms: formatStringToNumericArray(
          data.iosas_additionalprograms
        ),
        iosas_semestertype: formatStringToNumericArray(data.iosas_semestertype),
        documents: documentResponse.data.value
          ? documentResponse.data.value
          : [],
      };
      await this.setSchoolApplication(app);
    },
  },
});
