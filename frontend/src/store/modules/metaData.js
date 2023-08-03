import ApiService from '../../common/apiService';
import { defineStore } from 'pinia';

const formatPickLists = (list) => {
  console.log(list);

  return list;
};

export const metaDataStore = defineStore('metaData', {
  namespaced: true,
  state: () => ({
    activeSchoolYears: new Map(),
    startGradeOptions: null,
    endGradeOptions: null,
    statusOptions: null,
    groupClassification: null,
    eoiDocumentTypeOptions: null,
    applicationDocumentTypeOptions: null,
  }),
  getters: {
    getActiveSchoolYearSelect: (state) => {
      return Object.values(Object.fromEntries(state.activeSchoolYears)).map(
        (v) => ({
          value: v.edu_yearid,
          label: v.edu_name,
        })
      );
    },
    getSchoolYearHashMap: (state) => {
      console.log(state);
    },
  },
  actions: {
    async setActiveSchoolYears(response) {
      this.activeSchoolYears = new Map();
      response.forEach((element) => {
        this.activeSchoolYears.set(element.edu_yearid, element);
      });
    },
    async startGradeOptions(response) {
      console.log(response);
    },
    async getActiveSchoolYear() {
      if (localStorage.getItem('jwtToken')) {
        // DONT Call api if there is not token.
        if (this.setActiveSchoolYears.length === 0) {
          const response = await ApiService.getActiveSchoolYears();
          await this.setActiveSchoolYears(response.data.value);
        }
      }
    },
    async getEOIPickLists() {
      // TODO: check for picklists in localStorage
      if (localStorage.getItem('jwtToken')) {
        // DONT Call api if there is not token.
        const response = await ApiService.getPickLists(
          'iosas_expressionofinterest'
        );
        await this.startGradeOptions(response.data.value);
      }
    },
    async getApplicationPickLists() {
      // TODO: check for picklists in localStorage
      if (localStorage.getItem('jwtToken')) {
        // DONT Call api if there is not token.
        const response = await ApiService.getPickLists('iosas_application');
        await this.startGradeOptions(response.data.value);
      }
    },
    async getDocumentPickLists() {
      // TODO: check for picklists in localStorage
      if (localStorage.getItem('jwtToken')) {
        // DONT Call api if there is not token.
        const response = await ApiService.getPickLists('iosas_document');
        await this.startGradeOptions(response.data.value);
      }
    },
  },
});
