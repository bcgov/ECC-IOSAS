import { defineStore } from 'pinia';

export const documentStore = defineStore('document', {
  state: () => ({
    applicationDocuments: [],
  }),
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
