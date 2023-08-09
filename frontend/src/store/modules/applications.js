import ApiService from '../../common/apiService';
import { defineStore } from 'pinia';
import { EOI_MOCK, SCHOOL_APPLICATION_MOCK } from '../../utils/constants/mocks';

export const applicationsStore = defineStore('applications', {
  namespaced: true,
  state: () => ({
    EOIApplicationsMap: new Map(),
    schoolApplicationsMap: new Map(),
    eoi: null,
  }),
  getters: {
    getSchoolApplicationsFormatted: (state) =>
      // format the data for table view - keys are turned into table headers
      Object.values(Object.fromEntries(state.schoolApplicationsMap)).map(
        (v) => ({
          application_number: v.iosas_applicationnumber,
          status: v.statuscode,
          school_name: v.iosas_proposedschoolname,
          school_year: v._iosas_edu_year_value,
          group_classification: v.iosas_groupclassification,
        })
      ),
    getEOIApplicationsFormatted: (state) =>
      Object.values(Object.fromEntries(state.EOIApplicationsMap)).map((v) => ({
        // EOI_number: '4d187380-df36-ee11-bdf4-000d3af4f417',

        EOI_number: '5880d5a4-e936-ee11-bdf4-000d3af4f58e',
        status: v.iosas_reviewstatus,
        proposed_school_name: v.iosas_proposedschoolname,
        school_year: v._iosas_edu_year_value,
        group_classification: v.iosas_groupclassification,
      })),
    getEOI: (state) => {
      console.log('state.eoi', state.eoi);

      return state.eoi;
    },
    getSchoolApplicationById: (state) => {
      return (appId) => state.schoolApplicationsMap.get(appId);
    },
  },
  actions: {
    async setEOIApplications(applicationsResponse) {
      // if (!applicationsStore) return [];
      this.EOIApplicationsMap = new Map();
      applicationsResponse.forEach((element) => {
        this.EOIApplicationsMap.set(
          '5880d5a4-e936-ee11-bdf4-000d3af4f58e',
          element
        );
      });
    },
    async setEOIApplication(response) {
      console.log('response,', response);
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
        // DONT Call api if there is no token.
        if (this.EOIApplicationsMap.size === 0) {
          // API doesn't exist yet, using mock data for now, saving form data to localStorage to mock db interations
          // const response = await ApiService.getEOIApplications()
          const applications = JSON.parse(localStorage.getItem('applications'));
          if (applications) {
            await this.setEOIApplications([...EOI_MOCK, ...applications]);
          } else {
            await this.setEOIApplications(EOI_MOCK);
          }
        }
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
        documents: documentResponse.data.value,
      };
      await this.setEOIApplication(eoi);
    },
    // async createEOI(payload) {
    //   const response = await ApiService.createEOI(payload);
    //   return response;
    // },
  },

  //   async getAllApplications() {
  //     const response = await ApiService.getAllEOIByUser();
  //     await this.setEOIApplications(response.data);
  //   },
  // },
});
