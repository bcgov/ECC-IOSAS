import ApiService from '../../common/apiService';
import AuthService from '../../common/authService';
import StaticConfig from '../../common/staticConfig';
import { defineStore } from 'pinia';

const TWENTY_FIVE_MINUTES = 1500;

function isFollowUpVisit(jwtToken) {
  return !!jwtToken;
}

function isExpiredToken(jwtToken) {
  const now = Date.now().valueOf() / 1000;
  const jwtPayload = jwtToken.split('.')[1];
  const payload = JSON.parse(window.atob(jwtPayload));
  return payload.exp <= now;
}

function clearLocalStorage() {
  localStorage.removeItem('activeSchoolYears');
  localStorage.removeItem('EOIPickLists');
  localStorage.removeItem('documentPickLists');
  localStorage.removeItem('applicationPickLists');
  localStorage.removeItem('schoolAuthority');
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('applicationMultiPickLists');
}

export const authStore = defineStore('auth', {
  namespaced: true,
  state: () => ({
    env: null,
    isAuthenticated: false,
    userInfo: null,
    contactInfo: null,
    error: false,
    isLoading: true,
    loginError: false,
    jwtToken: localStorage.getItem('jwtToken'),
    inactivityTimer: TWENTY_FIVE_MINUTES,
  }),
  actions: {
    //sets Json web token and determines whether user is authenticated
    async setJwtToken(token = null) {
      if (token) {
        this.isAuthenticated = true;
        this.jwtToken = token;
        localStorage.setItem('jwtToken', token);
      } else {
        this.isAuthenticated = false;
        this.jwtToken = null;
        clearLocalStorage();
      }
    },
    async setUserInfo(userInfo) {
      if (userInfo) {
        this.userInfo = userInfo;
      } else {
        this.userInfo = null;
      }
    },
    async setEnv(env) {
      this.env = env;
    },
    async setLoginError() {
      this.loginError = true;
    },
    async setError(error) {
      this.error = error;
    },
    async setLoading(isLoading) {
      this.isLoading = isLoading;
    },
    async loginErrorRedirect() {
      this.loginError = true;
    },
    async logout() {
      await this.setJwtToken();
      await this.setUserInfo();
    },
    async getUserInfo() {
      const userInfoRes = await ApiService.getUserInfo();
      if (userInfoRes?.data.userId) {
        const dynamicsContact = await ApiService.getContactByExternalId(
          userInfoRes.data.userId
        );
        this.contactInfo = dynamicsContact.data.value[0];
      }
      this.userInfo = userInfoRes.data;
    },
    async getEnvironment() {
      const envRes = await ApiService.getEnvironment();
      if (envRes?.data) {
        await this.setEnv(envRes?.data);
      } else {
        await this.setEnv({
          env: StaticConfig.BANNER_ENVIRONMENT,
          bannerColor: StaticConfig.BANNER_COLOR,
          beceidRegURL: StaticConfig.VUE_APP_BCEID_REG_URL,
        });
      }
    },
    async refreshJWT() {
      const response = await AuthService.refreshAuthToken(this.jwtToken);
      if (response.jwtFrontend) {
        await this.setJwtToken(response.jwtFrontend);
        ApiService.setAuthHeader(response.jwtFrontend);
      } else {
        throw 'No jwtFrontend';
      }
    },
    //retrieves the json web token from local storage. If not in local storage, retrieves it from API
    async getJwtToken() {
      await this.setError(false);
      if (isFollowUpVisit(this.jwtToken) && this.jwtToken) {
        if (isExpiredToken(this.jwtToken)) {
          await this.logout();
          return;
        }
        await this.refreshJWT();
      } else {
        const response = await AuthService.getAuthToken();

        if (response.jwtFrontend) {
          await this.setJwtToken(response.jwtFrontend);
          ApiService.setAuthHeader(response.jwtFrontend);
        } else {
          throw 'No jwtFrontend';
        }
      }
    },
    startTimer() {
      setTimeout(() => {
        this.inactivityTimer--;
        this.startTimer();
      }, 1000);
    },
    resetTimer() {
      this.inactivityTimer = TWENTY_FIVE_MINUTES;
    },
  },
});
