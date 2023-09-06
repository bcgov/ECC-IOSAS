import ApiService from '../../common/apiService';
import { defineStore } from 'pinia';

export const appStore = defineStore('app', {
  namespaced: true,
  state: () => ({
    alertNotificationText: '',
    alertNotificationQueue: [],
    alertNotification: false,
  }),
  getters: {},
  actions: {
    async setAlertNotificationText(alertNotificationText) {
      this.alertNotificationText = alertNotificationText;
    },
    async setAlertNotification(alertNotification) {
      this.alertNotification = alertNotification;
    },
    async addAlertNotification(text) {
      this.alertNotificationQueue.push(text);
      if (!this.alertNotification) {
        this.alertNotification = true;
      }
    },
  },
});
