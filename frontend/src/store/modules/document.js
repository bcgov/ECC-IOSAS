import { defineStore } from 'pinia';
import ApiService from '../../common/apiService';

export const documentStore = defineStore('document', {
  state: () => ({
    applicationDocuments: [],
  }),
  // TODO: Set documents here vs data.documents ??
  getters: {
    getApplicationDocuments: (state) => state.applicationDocuments,
  },
  actions: {
    async addApplicationDocument(document) {
      this.applicationDocuments = [...this.applicationDocuments, document];
    },
    async setApplicationDocuments(documents) {
      this.applicationDocuments = documents;
    },
  },
});
