import { defineStore } from 'pinia';

export const documentStore = defineStore('document', {
  state: () => ({
    applicationDocuments: [],
    eoiDocuments: [],
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
    async addEOIDocument(document) {
      this.eoiDocuments = [...this.eoiDocuments, document];
    },
    async setEOIDocuments(documents) {
      this.eoiDocuments = documents;
    },
  },
});
