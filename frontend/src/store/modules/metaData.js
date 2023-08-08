import ApiService from '../../common/apiService';
import { defineStore } from 'pinia';

export const metaDataStore = defineStore('metaData', {
  namespaced: true,
  state: () => ({
    activeSchoolYears: new Map(),
    EOIPickListOptions: null,
    documentPickListOptions: null,
    schoolAuthorityOptions: null,
    applicationPickListOptions: null,
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
    getEOIPickListOptions: (state) => state.EOIPickListOptions,
    getDocumentPickListOptions: (state) => state.documentPickListOptions,
    getApplicationPickListOptions: (state) => state.applicationPickListOptions,
  },
  actions: {
    // TODO: fix this logic
    async formatPickLists(response) {
      const list = response
        .map((list) => {
          const options = list?.GlobalOptionSet.Options.map((option) => {
            return {
              label: option.Label?.UserLocalizedLabel?.Label,
              value: option.Value,
            };
          });
          return { [list.LogicalName]: options };
        })
        .reduce((result, obj) => {
          const key = Object.keys(obj)[0];
          result[key] = obj[key];
          return result;
        });

      return list;
    },
    async setActiveSchoolYears(response) {
      this.activeSchoolYears = new Map();
      response.forEach((element) => {
        this.activeSchoolYears.set(element.edu_yearid, element);
      });
    },
    async setEOIPickListOptions(response) {
      this.EOIPickListOptions = await this.formatPickLists(response);

      console.log(this.EOIPickListOptions);
    },
    async setDocumentPickListOptions(response) {
      this.activeSchoolYears = new Map();
      this.documentPickListOptions = await this.formatPickLists(response);
      console.log(this.documentPickListOptions);
    },
    async setApplicationPickListOptions(response) {
      this.applicationPickListOptions = await this.formatPickLists(response);
    },
    async setSchoolAuthorityOptions(response) {
      this.schoolAuthorityOptions = response;
    },
    async getActiveSchoolYear() {
      if (localStorage.getItem('activeSchoolYears')) {
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
        await this.setEOIPickListOptions(response.data.value);
      }
    },
    async getApplicationPickLists() {
      // TODO: check for picklists in localStorage
      if (localStorage.getItem('jwtToken')) {
        // DONT Call api if there is not token.
        const response = await ApiService.getPickLists('iosas_application');

        await this.setApplicationPickListOptions(response.data.value);
      }
    },
    async getDocumentPickLists() {
      // TODO: check for picklists in localStorage
      if (localStorage.getItem('jwtToken')) {
        // DONT Call api if there is not token.
        const response = await ApiService.getPickLists('iosas_document');
        await this.setDocumentPickListOptions(response.data.value);
      }
    },
    async getSchoolAuthority() {
      // TODO: check for picklists in localStorage
      if (localStorage.getItem('jwtToken')) {
        // DONT Call api if there is not token.
        const response = await ApiService.getSchoolAuthority();
        await this.setSchoolAuthorityOptions(response.data.value);
      }
    },
  },
});
