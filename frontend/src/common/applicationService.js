import { ApiRoutes } from '../utils/constants';
import APIService from './apiService';

export default {
  async getApplicationDocuments(id) {
    try {
      return await APIService.apiAxios.get(
        ApiRoutes.documents.APPLICATION_DOCUMENTS(id)
      );
    } catch (e) {
      console.log(
        `Failed to get from Nodejs getApplicationDocuments API - ${e}`
      );
      throw e;
    }
  },
  async getAllApplicationsByUser() {
    try {
      return await APIService.apiAxios.get(ApiRoutes.app.APPLICATIONS);
    } catch (e) {
      console.log(
        `Failed to get from Nodejs getAllApplicationsByUser API - ${e}`
      );
      throw e;
    }
  },
  async getApplicationById(id) {
    try {
      return await APIService.apiAxios.get(ApiRoutes.app.APPLICATION(id));
    } catch (e) {
      console.log(`Failed to get from Nodejs getApplicationById API - ${e}`);
      throw e;
    }
  },
  async updateSchoolApplication(appId, payload, submitted = null) {
    try {
      return await APIService.apiAxios.patch(
        ApiRoutes.app.UPDATE_APPLICATION(appId, submitted),
        payload
      );
    } catch (e) {
      console.log(
        `Failed to patch to Nodejs updateSchoolApplication API - ${e}`
      );
      throw e;
    }
  },
  async cancelSchoolApplication(id) {
    try {
      return await APIService.apiAxios.patch(
        ApiRoutes.app.CANCEL_APPLICATION(id)
      );
    } catch (e) {
      console.log(`Failed to patch to Nodejs cancelEOI API - ${e}`);
      throw e;
    }
  },
  async getContactById(id) {
    console.log('CALLED>>>');
    try {
      return await APIService.apiAxios.get(ApiRoutes.app.CONTACT(id));
    } catch (e) {
      console.log(`Failed to get from Nodejs getContactById API - ${e}`);
      throw e;
    }
  },
};
