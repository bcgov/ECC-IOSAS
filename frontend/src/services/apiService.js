import axios from 'axios';
import { ApiRoutes } from '../utils/constants';
import AuthService from './authService';

// Buffer concurrent requests while refresh token is being acquired
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
}

// Create new non-global axios instance and intercept strategy
const apiAxios = axios.create();
const intercept = apiAxios.interceptors.response.use(
  (config) => config,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    axios.interceptors.response.eject(intercept);
    return new Promise((resolve, reject) => {
      AuthService.refreshAuthToken(localStorage.getItem('jwtToken'))
        .then((response) => {
          if (response.jwtFrontend) {
            localStorage.setItem('jwtToken', response.jwtFrontend);
            apiAxios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${response.jwtFrontend}`;
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${response.jwtFrontend}`;
          }
          processQueue(null, response.jwtFrontend);
          resolve(axios(originalRequest));
        })
        .catch((e) => {
          processQueue(e, null);
          localStorage.removeItem('jwtToken');
          window.location = '/token-expired';
          reject(e);
        });
    });
  }
);

export default {
  apiAxios: apiAxios,
  intercept: intercept,
  processQueue,
  failedQueue,

  //Adds required headers to the Auth request
  setAuthHeader(token) {
    if (token) {
      apiAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiAxios.defaults.headers.common['Authorization'];
    }
  },

  /**
   * Health Check Dynamic
   * @returns
   */
  async dynamicHealthCheck() {
    try {
      return apiAxios.get(ApiRoutes.dynamic.HEALTH);
    } catch (err) {
      console.log(`Failed to get from Nodejs dynamicHealthCheck API - ${e}`);
      throw e;
    }
  },

  /**
   * Get Environment variables
   * @returns environment variables to display on the UI
   */
  async getEnvironment() {
    try {
      return apiAxios.get(ApiRoutes.ENV);
    } catch (err) {
      console.log(`Failed to get from Nodejs getEnvironment API - ${e}`);
      throw e;
    }
  },

  // Documents
  async uploadFile(fileData) {
    try {
      return await apiAxios.post(ApiRoutes.documents.UPLOAD_DOCUMENT, fileData);
    } catch (e) {
      console.log(`Failed to post to Nodejs uploadFile API - ${e}`);
      throw e;
    }
  },
  async deleteDocument(documentID) {
    try {
      return await apiAxios.delete(
        ApiRoutes.documents.DELETE_DOCUMENT(documentID)
      );
    } catch (e) {
      console.log(`Failed to delete to Nodejs deleteDocument API -- ${e}`);
      throw e;
    }
  },

  // Contact
  async getUserInfo() {
    try {
      return await apiAxios.get(ApiRoutes.USER);
    } catch (e) {
      console.log(`Failed to get from Nodejs getUserInfo API - ${e}`);
      throw e;
    }
  },

  async getContactByExternalId(id) {
    try {
      return await apiAxios.get(ApiRoutes.contact.CONTACT(id));
    } catch (e) {
      console.log(
        `Failed to get from Nodejs getContactByExternalId API - ${e}`
      );
      throw e;
    }
  },

  // MetaData
  async getActiveSchoolYears() {
    try {
      return await apiAxios.get(ApiRoutes.meta.ACTIVE_SCHOOL_YEARS);
    } catch (e) {
      console.log(`Failed to get from Nodejs getActiveSchoolYears API - ${e}`);
      throw e;
    }
  },
  async getSchoolAuthority() {
    try {
      return await apiAxios.get(ApiRoutes.meta.SCHOOL_AUTHORITY);
    } catch (e) {
      console.log(`Failed to get from Nodejs getSchoolAuthority API -${e}`);
      throw e;
    }
  },
  async getSchoolAuthorityHead(id) {
    try {
      return await apiAxios.get(ApiRoutes.meta.CONTACT_BY_SCHOOL_AUTHORITY(id));
    } catch (e) {
      console.log(
        `Failed to get from Nodejs getSchoolAuthorityHead API - ${e}`
      );
      throw e;
    }
  },
  async getPickLists(tableName) {
    try {
      return await apiAxios.get(ApiRoutes.meta.PICK_LISTS(tableName));
    } catch (e) {
      console.log(`Failed to get from Nodejs getPickLists API - ${e}`);
      throw e;
    }
  },
  async getMultiPickLists(tableName) {
    try {
      return await apiAxios.get(ApiRoutes.meta.MULTI_PICK_LISTS(tableName));
    } catch (e) {
      console.log(`Failed to get from Nodejs getPickLists API - ${e}`);
      throw e;
    }
  },

  // Expression of Interest
  async getEOIDocuments(id) {
    try {
      return await apiAxios.get(ApiRoutes.documents.EOI_DOCUMENTS(id));
    } catch (e) {
      console.log(`Failed to get from Nodejs getEOIDocuments API -${e}`);
      throw e;
    }
  },
  async getAllEOIByUser() {
    try {
      return await apiAxios.get(ApiRoutes.eoi.EOI_APPLICATIONS);
    } catch (e) {
      console.log(`Failed to get from Nodejs getAllEOIByUser API - ${e}`);
      throw e;
    }
  },
  async getEOIById(id) {
    try {
      return await apiAxios.get(ApiRoutes.eoi.EOI_APPLICATION(id));
    } catch (e) {
      console.log(`Failed to get from Nodejs getEOIById API - ${e}`);
      throw e;
    }
  },
  async createEOI(payload, submitted) {
    try {
      return await apiAxios.post(ApiRoutes.eoi.CREATE_EOI(submitted), payload);
    } catch (e) {
      console.log(`Failed to post to Nodejs createEOI API - ${e}`);
      throw e;
    }
  },
  async updateEOI(eoiId, payload, submitted) {
    try {
      return await apiAxios.patch(
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
      return await apiAxios.patch(ApiRoutes.eoi.CANCEL_EOI(id));
    } catch (e) {
      console.log(`Failed to patch to Nodejs cancelEOI API - ${e}`);
      throw e;
    }
  },
};
