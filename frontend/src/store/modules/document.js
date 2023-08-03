import { defineStore } from 'pinia';
import ApiService from '../../common/apiService';

export const documentStore = defineStore('document', {
  state: () => ({
    applicationDocumentTypeCodes: null,
    EOIDocumentTypeCodes: null,
  }),
  getters: {
    getEOIDocumentOptionsSelect: (state) => state.EOIDocumentTypeCodes,
    getApplicationDocumentOptionsSelect: (state) =>
      state.applicationDocumentTypeCodes,
  },
  actions: {
    // async setDocumentTypeCodes(response) {
    //   this.EOIDocumentTypeCodes = response;
    // },
    async setUnsubmittedDocuments(unsubmittedDocuments) {
      this.unsubmittedDocumentsState = unsubmittedDocuments || [];
    },
    // these should be get DocumentById not type codes
    async getEOIDocumentTypeCodes() {
      console.log('CALLED??');
      if (!this.EOIDocumentTypeCodes) {
        const response = await ApiService.getEOIDocumentTypeCodes();
        console.log(response);
        this.EOIDocumentTypeCodes = response.data;
      }
    },
    async getApplicationDocumentTypeCodes() {
      if (!this.applicationDocumentTypeCodes) {
        const response = await ApiService.getApplicationDocumentTypeCodes();
        this.applicationDocumentTypeCodes = response.data;
      }
    },
    async getDocumentTypeCodes() {
      if (!this.applicationDocumentTypeCodes) {
        const response = await ApiService.getDocumentTypeCodes();
        this.applicationDocumentTypeCodes = response.data;
      }
    },
  },
});
