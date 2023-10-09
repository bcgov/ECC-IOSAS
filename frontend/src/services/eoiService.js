import { ApiRoutes } from '../utils/constants';
import APIService from './apiService';

export default {
  async getEOIDocuments(id) {
    try {
      return await APIService.apiAxios.get(
        ApiRoutes.documents.EOI_DOCUMENTS(id)
      );
    } catch (e) {
      console.log(`Failed to get from Nodejs getEOIDocuments API -${e}`);
      throw e;
    }
  },
  async getAllEOIByUser() {
    try {
      return await APIService.apiAxios.get(ApiRoutes.eoi.EOI_APPLICATIONS);
    } catch (e) {
      console.log(`Failed to get from Nodejs getAllEOIByUser API - ${e}`);
      throw e;
    }
  },
  async getEOIById(id) {
    try {
      return await APIService.apiAxios.get(ApiRoutes.eoi.EOI_APPLICATION(id));
    } catch (e) {
      console.log(`Failed to get from Nodejs getEOIById API - ${e}`);
      throw e;
    }
  },
  async createEOI(payload, submitted) {
    try {
      return await APIService.apiAxios.post(
        ApiRoutes.eoi.CREATE_EOI(submitted),
        payload
      );
    } catch (e) {
      console.log(`Failed to post to Nodejs createEOI API - ${e}`);
      throw e;
    }
  },
  async updateEOI(eoiId, payload, submitted) {
    try {
      return await APIService.apiAxios.patch(
        ApiRoutes.eoi.UPDATE_EOI(submitted, eoiId),
        payload
      );
    } catch (e) {
      console.log(`Failed to patch to Nodejs updateEOI API - ${e}`);
      throw e;
    }
  },
  async cancelEOI(id) {
    try {
      return await APIService.apiAxios.patch(ApiRoutes.eoi.CANCEL_EOI(id));
    } catch (e) {
      console.log(`Failed to patch to Nodejs cancelEOI API - ${e}`);
      throw e;
    }
  },
};
