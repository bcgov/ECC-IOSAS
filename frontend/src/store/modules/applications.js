import ApiService from '../../common/apiService';
import { defineStore } from 'pinia';
import { EOI_MOCK, SCHOOL_APPLICATION_MOCK } from '../../utils/constants/mocks';

export const applicationsStore = defineStore('applications', {
  namespaced: true,
  state: () => ({
    EOIApplicationsMap: new Map(),
    schoolApplicationsMap: new Map(),
  }),
  getters: {
    getSchoolApplicationsFormatted: (state) =>
      // format the data for table view - keys are turned into table headers
      Object.values(Object.fromEntries(state.schoolApplicationsMap)).map(
        (v) => ({
          application_number: v.application_number,
          status: v.status,
          school_name: v.school_name,
          school_year: v.school_year,
          group_classification: v.group_classification,
        })
      ),
    getEOIApplicationsFormatted: (state) =>
      Object.values(Object.fromEntries(state.EOIApplicationsMap)).map((v) => ({
        EOI_number: v.iosas_eionumber,
        status: v.status,
        proposed_school_name: v.iosas_proposedschoolname,
        school_year: v._iosas_edu_year_value,
        group_classification: v.iosas_groupclassification,
      })),
    getEOIApplicationById: (state) => {
      return (appId) => state.EOIApplicationsMap.get(appId);
    },
    getSchoolApplicationById: (state) => {
      return (appId) => state.schoolApplicationsMap.get(appId);
    },
  },
  actions: {
    async setEOIApplications(applicationsResponse) {
      this.EOIApplicationsMap = new Map();
      applicationsResponse.forEach((element) => {
        this.EOIApplicationsMap.set(element.iosas_eionumber, element);
      });
    },
    async setSchoolApplications(applicationsResponse) {
      this.schoolApplicationsMap = new Map();
      applicationsResponse.forEach((element) => {
        this.schoolApplicationsMap.set(element.application_number, element);
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
  },
});
