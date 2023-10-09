import ApplicationService from '../../services/applicationService';
import EOIService from '../../services/eoiService';
import { documentStore } from './document';
import { formatStringToNumericArray } from '../../utils/format';
import { setChoiceFieldsToNull } from '../../utils/application';
import { defineStore } from 'pinia';
import { STATUS_MAP } from '../../utils/application';

const updateStatusName = (status) => {
  return STATUS_MAP[status] ? STATUS_MAP[status] : status;
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
      const response = await EOIService.getAllEOIByUser();
      await this.setEOIApplications(response.data.value);
    },
    async getEOIApplicationById(eoiId) {
      const response = await EOIService.getEOIById(eoiId);

      const documentResponse = await ApiService.getEOIDocuments(eoiId);
      const documents = documentResponse.data.value
        ? documentResponse.data.value.map((doc) => ({
            fileName: doc.iosas_file_name || doc.iosas_name,
            documentType: doc.iosas_eoidocumenttype,
            id: doc.iosas_documentid,
            ...doc,
          }))
        : [];
      await documentStore().setEOIDocuments(documents);
      await this.setEOIApplication(response.data.value[0]);
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

      const documents = documentResponse.data.value
        ? documentResponse.data.value.map((doc) => ({
            fileName: doc.iosas_file_name || doc.iosas_name,
            documentType: doc.iosas_newschoolapplicationdocumenttype,
            id: doc.iosas_documentid,
            ...doc,
          }))
        : [];
      await documentStore().setApplicationDocuments(documents);

      const data = response.data.value[0].iosas_portalapplicationstep
        ? response.data.value[0]
        : await setChoiceFieldsToNull(response.data.value[0]);
      const application = {
        ...data,
        // format comma seperated lists into arrays and convert values to numbers
        iosas_schoolaffiliation: formatStringToNumericArray(
          data.iosas_schoolaffiliation
        ),
        iosas_additionalprograms: formatStringToNumericArray(
          data.iosas_additionalprograms
        ),
        iosas_semestertype: formatStringToNumericArray(data.iosas_semestertype),
      };
      await this.setSchoolApplication(application);
    },
  },
});
