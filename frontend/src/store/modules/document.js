import { defineStore } from 'pinia';
import ApiService from '../../common/apiService';

export const documentStore = defineStore('document', {
  state: () => ({}),
  getters: {},
  actions: {
    async setUnsubmittedDocuments(unsubmittedDocuments) {
      this.unsubmittedDocumentsState = unsubmittedDocuments || [];
    },
  },
});
