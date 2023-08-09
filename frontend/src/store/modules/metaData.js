import ApiService from '../../common/apiService';
import { defineStore } from 'pinia';

export const metaDataStore = defineStore('metaData', {
  namespaced: true,
  state: () => ({
    activeSchoolYears: null,
    EOIPickListOptions: null,
    documentPickListOptions: null,
    schoolAuthorityOptions: null,
    applicationPickListOptions: null,
  }),
  getters: {
    getActiveSchoolYearSelect: (state) => {
      // FILTER BY STATUS CODE
      return state.activeSchoolYears;
    },
    getSchoolYearHashMap: (state) => {
      console.log(state);
      return state.activeSchoolYears.reduce(function (map, obj) {
        map[obj.value] = obj.label;
        return map;
      }, {});
    },
    getEOIPicklistHashMap: (state) => {},
    getEOIPickListOptions: (state) => state.EOIPickListOptions,
    getDocumentPickListOptions: (state) => state.documentPickListOptions,
    getApplicationPickListOptions: (state) => state.applicationPickListOptions,
    getSchoolAuthorityListOptions: (state) => state.schoolAuthorityOptions,
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
      this.activeSchoolYears = response.map((element) => ({
        value: element.edu_yearid,
        label: element.edu_name,
      }));
    },
    async setEOIPickListOptions(response) {
      this.EOIPickListOptions = await this.formatPickLists(response);
    },
    async setDocumentPickListOptions(response) {
      this.documentPickListOptions = await this.formatPickLists(response);
    },
    async setApplicationPickListOptions(response) {
      this.applicationPickListOptions = await this.formatPickLists(response);
    },
    async setSchoolAuthorityOptions(response) {
      const formattedResponse = response.map((authority) => {
        return {
          value: authority.edu_schoolauthorityid,
          label: authority.edu_name,
          authority,
        };
      });
      this.schoolAuthorityOptions = formattedResponse;
    },
    async getActiveSchoolYear() {
      //   if (localStorage.getItem('activeSchoolYears')) {
      // DONT Call api if there is not token.
      //   if (this.setActiveSchoolYears.length === 0) {
      const response = await ApiService.getActiveSchoolYears();
      await this.setActiveSchoolYears(response.data.value);
      //   }
      //   }
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
    async getAuthorityHead(schoolAuthorityId) {
      const response = await ApiService.getSchoolAuthorityHead(
        schoolAuthorityId
      );

      console.log('school authority head contact', response);
      //   await this.setSchoolAuthorityOptions(response.data.value);
    },
  },
});
