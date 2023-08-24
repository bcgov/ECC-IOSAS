import ApiService from '../../common/apiService';
import { defineStore } from 'pinia';

const setLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
const getLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

export const metaDataStore = defineStore('metaData', {
  namespaced: true,
  state: () => ({
    activeSchoolYears: null,
    EOIPickListOptions: null,
    documentPickListOptions: null,
    schoolAuthorityOptions: null,
    applicationPickListOptions: null,
    applicationMultiPickListOptions: null,
  }),
  getters: {
    getActiveSchoolYearSelect: (state) => {
      return state.activeSchoolYears;
    },
    getEOIPickListOptions: (state) => state.EOIPickListOptions,
    getDocumentPickListOptions: (state) => state.documentPickListOptions,
    getApplicationPickListOptions: (state) => state.applicationPickListOptions,
    getApplicationMultiPickListOptions: (state) =>
      state.applicationMultiPickListOptions,
    getSchoolAuthorityListOptions: (state) => state.schoolAuthorityOptions,
  },
  actions: {
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
      this.activeSchoolYears = response
        .filter(
          (code) =>
            code['statuscode@OData.Community.Display.V1.FormattedValue'] ===
            'Current'
        )
        .map((element) => ({
          value: element.edu_yearid,
          label: element.edu_name,
          year: element,
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
    async setApplicationMultiPickListOptions(response) {
      this.applicationMultiPickListOptions = await this.formatPickLists(
        response
      );
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
      if (!localStorage.getItem('activeSchoolYears')) {
        const response = await ApiService.getActiveSchoolYears();
        setLocalStorage('activeSchoolYears', response.data.value);
        await this.setActiveSchoolYears(response.data.value);
      } else {
        await this.setActiveSchoolYears(getLocalStorage('activeSchoolYears'));
      }
    },
    async getEOIPickLists() {
      if (!localStorage.getItem('EOIPickLists')) {
        const response = await ApiService.getPickLists(
          'iosas_expressionofinterest'
        );
        setLocalStorage('EOIPickLists', response.data.value);
        await this.setEOIPickListOptions(response.data.value);
      } else {
        await this.setEOIPickListOptions(getLocalStorage('EOIPickLists'));
      }
    },
    async getApplicationPickLists() {
      if (!localStorage.getItem('applicationPickLists')) {
        const response = await ApiService.getPickLists('iosas_application');
        setLocalStorage('applicationPickLists', response.data.value);
        await this.setApplicationPickListOptions(response.data.value);
      } else {
        await this.setApplicationPickListOptions(
          getLocalStorage('applicationPickLists')
        );
      }
    },
    async getApplicationMultiPickLists() {
      if (!localStorage.getItem('applicationMultiPickLists')) {
        const response = await ApiService.getMultiPickLists(
          'iosas_application'
        );
        setLocalStorage('applicationMultiPickLists', response.data.value);
        await this.setApplicationMultiPickListOptions(response.data.value);
      } else {
        await this.setApplicationMultiPickListOptions(
          getLocalStorage('applicationMultiPickLists')
        );
      }
    },
    async getDocumentPickLists() {
      if (!localStorage.getItem('documentPickLists')) {
        const response = await ApiService.getPickLists('iosas_document');
        setLocalStorage('documentPickLists', response.data.value);
        await this.setDocumentPickListOptions(response.data.value);
      } else {
        await this.setDocumentPickListOptions(
          getLocalStorage('documentPickLists')
        );
      }
    },
    async getSchoolAuthority() {
      if (!localStorage.getItem('schoolAuthority')) {
        const response = await ApiService.getSchoolAuthority();
        setLocalStorage('schoolAuthority', response.data.value);
        await this.setSchoolAuthorityOptions(response.data.value);
      } else {
        await this.setSchoolAuthorityOptions(
          getLocalStorage('schoolAuthority')
        );
      }
    },
    async getAuthorityHead(schoolAuthorityId) {
      const response = await ApiService.getSchoolAuthorityHead(
        schoolAuthorityId
      );
      return response.data;
    },
  },
});
