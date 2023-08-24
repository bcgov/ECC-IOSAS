import ApiService from '../../common/apiService';
import ApplicationService from '../../common/applicationService';
import { formatStringToNumericArray } from '../../utils/format';
import { defineStore } from 'pinia';

const updateStatusName = (status) => {
  const newStatus = {
    'New (Submitted)': 'New',
    'In Progress (Send Confirmation of Receipt Email)': 'In Progress',
    '2 - Draft App': 'Draft',
    '3 - App Submitted': 'Submitted',
  };
  return newStatus[status] ? newStatus[status] : status;
};

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
      // Sort applications by last 4 digits of the applicationnumber
      state.schoolApplications
        ?.sort(
          (appA, appB) =>
            appA.iosas_applicationnumber.split('-').pop() -
            appB.iosas_applicationnumber.split('-').pop()
        )
        .map((app) => ({
          application_number:
            app.iosas_applicationnumber + ' ' + app.iosas_applicationid,
          status: updateStatusName(
            app['statuscode@OData.Community.Display.V1.FormattedValue']
          ),
          school_name: app.iosas_proposedschoolname,
          school_year:
            app[
              '_iosas_edu_year_value@OData.Community.Display.V1.FormattedValue'
            ],
          group_classification:
            app[
              'iosas_groupclassification@OData.Community.Display.V1.FormattedValue'
            ],
        })),
    getEOIApplicationsFormatted: (state) =>
      // Sort EOIs by last 4 digits of the eoinumber
      state.EOIApplications?.sort(
        (appA, appB) =>
          appA.iosas_eoinumber.split('-').pop() -
          appB.iosas_eoinumber.split('-').pop()
      ).map((app) => ({
        EOI_number:
          app.iosas_eoinumber + ' ' + app.iosas_expressionofinterestid,
        status: updateStatusName(
          app['iosas_reviewstatus@OData.Community.Display.V1.FormattedValue']
        ),
        proposed_school_name: app.iosas_proposedschoolname,
        school_year:
          app[
            '_iosas_edu_year_value@OData.Community.Display.V1.FormattedValue'
          ],
        group_classification:
          app[
            'iosas_groupclassification@OData.Community.Display.V1.FormattedValue'
          ],
      })),
    getEOI: (state) => {
      const formattedData = {
        ...state.eoi,
        'iosas_reviewstatus@OData.Community.Display.V1.FormattedValue':
          updateStatusName(
            state.eoi[
              'iosas_reviewstatus@OData.Community.Display.V1.FormattedValue'
            ]
          ),
      };
      return formattedData;
    },
    getSchoolApplication: (state) => {
      const formattedData = {
        ...state.application,
        'statuscode@OData.Community.Display.V1.FormattedValue':
          updateStatusName(
            state.application[
              'statuscode@OData.Community.Display.V1.FormattedValue'
            ]
          ),
      };
      return formattedData;
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
    async getAllSchoolApplications() {
      const response = await ApplicationService.getAllApplicationsByUser();
      await this.setSchoolApplications(response.data.value);
    },
    async getApplicationById(appId) {
      const response = await ApplicationService.getApplicationById(appId);

      const documentResponse = await ApplicationService.getApplicationDocuments(
        appId
      );
      const data = response.data.value[0];
      const app = {
        ...data,
        // format comma seperated lists into arrays and convert values to numbers
        iosas_schoolaffiliation: formatStringToNumericArray(
          data.iosas_schoolaffiliation
        ),
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
