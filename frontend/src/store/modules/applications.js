import ApiService from '../../common/apiService';
import { defineStore } from 'pinia';
import { SCHOOL_APPLICATION_MOCK } from '../../utils/constants/mocks';

export const applicationsStore = defineStore('applications', {
  namespaced: true,
  state: () => ({
    EOIApplications: null,
    schoolApplicationsMap: new Map(),
    eoi: null,
    confirmationMessage: null,
  }),
  getters: {
    getConfirmationMessage: (state) => state.confirmationMessage,
    getSchoolApplicationsFormatted: (state) =>
      // format the data for table view - keys are turned into table headers
      Object.values(Object.fromEntries(state.schoolApplicationsMap)).map(
        (v) => ({
          // TODO: update with id when connected to API
          application_number:
            v.iosas_applicationnumber + ' ' + v.iosas_applicationnumber,
          status:
            v['iosas_reviewstatus@OData.Community.Display.V1.FormattedValue'],
          school_name: v.iosas_proposedschoolname,
          school_year:
            v[
              '_iosas_edu_year_value@OData.Community.Display.V1.FormattedValue'
            ],
          group_classification:
            v[
              'iosas_groupclassification@OData.Community.Display.V1.FormattedValue'
            ],
        })
      ),
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
    getSchoolApplicationById: (state) => {
      return (appId) => state.schoolApplicationsMap.get(appId);
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
      this.schoolApplicationsMap = new Map();
      applicationsResponse.forEach((element) => {
        this.schoolApplicationsMap.set(
          element.iosas_applicationnumber,
          element
        );
      });
    },
    async getApplicationData() {
      if (localStorage.getItem('jwtToken')) {
        if (this.schoolApplicationsMap.size === 0) {
          // API doesn't exist yet, using mock data for now
          // const response = await ApiService.getSchoolApplications();
          await this.setSchoolApplications(SCHOOL_APPLICATION_MOCK);
        }
      }
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
          ? documentResponse.data.value.map((doc) => ({
              fileName: doc.iosas_file_name,
              documentType: doc.iosas_eoidocumenttype,
              id: doc.iosas_documentid,
              ...doc,
            }))
          : [],
      };
      await this.setEOIApplication(eoi);
    },
  },
});
