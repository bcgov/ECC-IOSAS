<template>
  <v-app id="app" @mousemove="resetTimer" @keypress="resetTimer">
    <MsieBanner v-if="isIE" />
    <Header />
    <SnackBar />
    <Loader />
    <v-main fluid class="align-start" v-if="!isLoading">
      <ModalIdle
        v-if="isAuthenticated"
        :timer="timer"
        :countdown="countdown"
        @resetTimerAndCountdown="resetTimerAndCountdown"
      />
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { authStore } from './store/modules/auth';
import { metaDataStore } from './store/modules/metaData';
import { mapState, mapActions } from 'pinia';
import HttpStatus from 'http-status-codes';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ModalIdle from './components/ModalIdle.vue';
import MsieBanner from './components/MsieBanner.vue';
import StaticConfig from './services/staticConfig';
import SnackBar from './components/util/SnackBar.vue';
import Loader from './components/util/Loader.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ModalIdle,
    MsieBanner,
    SnackBar,
    Loader,
  },
  metaInfo: {
    meta: StaticConfig.VUE_APP_META_DATA,
  },
  watch: {
    isAuthenticated: {
      handler(val) {
        if (val && !this.inactivityWoker) {
          this.createInactivityWoker();
        }
      },
    },
  },
  data() {
    return {
      timer: 0,
      countdown: 0,
      inactivityWoker: null,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'loginError', 'isLoading']),
    isIE() {
      return /Trident\/|MSIE/.test(window.navigator.userAgent);
    },
  },
  async created() {
    await this.getEnvironment();

    this.setLoading(true);
    await this.getJwtToken()
      .then(() => {
        Promise.all([
          this.getUserInfo(),
          this.getActiveSchoolYear(),
          this.getEOIPickLists(),
          this.getDocumentPickLists(),
          this.getSchoolAuthority(),
          this.getApplicationPickLists(),
          this.getApplicationMultiPickLists(),
        ]).then(() => {
          this.getExternalContact();
        });
      })
      .catch((e) => {
        if (!e.response || e.response.status !== HttpStatus.UNAUTHORIZED) {
          this.logout();
          this.$router.replace({
            name: 'error',
            query: { message: `500_${e.data || 'ServerError'}` },
          });
        }
      })
      .finally(() => {
        this.setLoading(false);
      });
  },
  methods: {
    authStore,
    ...mapActions(authStore, [
      'getEnvironment',
      'setLoading',
      'getJwtToken',
      'getUserInfo',
      'logout',
      'getExternalContact',
    ]),
    ...mapActions(metaDataStore, [
      'getActiveSchoolYear',
      'getEOIPickLists',
      'getDocumentPickLists',
      'getSchoolAuthority',
      'getApplicationMultiPickLists',
      'getApplicationPickLists',
    ]),
    createInactivityWoker() {
      this.inactivityWoker = new Worker('/inactivityWorker.js');

      this.inactivityWoker.addEventListener('message', (event) => {
        const { type, timer, countdown } = event.data;
        if (type === 'TICK') {
          this.countdown = countdown;
          this.timer = timer;
        }
      });
    },
    resetTimer() {
      if (this.inactivityWoker) {
        this.inactivityWoker.postMessage('RESET');
      }
    },
    resetTimerAndCountdown() {
      if (this.inactivityWoker) {
        this.inactivityWoker.postMessage('RESET_ALL');
      }
    },
  },
  beforeUnmount() {
    this.inactivityWoker.terminate();
  },
};
</script>

<style lang="scss">
a {
  color: #1976d2;
}

a:hover {
  cursor: pointer;
}

.v-application {
  font-family: 'BCSans', Verdana, Arial, sans-serif !important;
}
.v-card--flat {
  background-color: transparent !important;
}
.theme--light.application {
  background: #f1f1f1;
}
h1 {
  font-size: 1.25rem;
}
.v-toolbar__title {
  font-size: 1rem;
}

.v-btn {
  text-transform: none !important;
}

.v-alert .v-icon {
  padding-left: 0;
}

.v-alert.bootstrap-success {
  color: #234720;
  background-color: #d9e7d8 !important;
  border-color: #accbaa !important;
}

.v-alert.bootstrap-info {
  color: #4e6478;
  background-color: #eaf2fa !important;
  border-color: #b8d4ee !important;
}

.v-alert.bootstrap-warning {
  color: #81692c;
  background-color: #fef4dd !important;
  border-color: #fbdb8b !important;
}

.v-alert.bootstrap-error {
  color: #712024;
  background-color: #f7d8da !important;
  border-color: #eeaaad !important;
}

@media screen and (max-width: 370px) {
  .v-toolbar__title {
    font-size: 0.9rem;
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h1 {
    font-size: 0.9rem;
  }

  .v-application {
    line-height: 1.3;
  }
}

@media screen and (min-width: 371px) and (max-width: 600px) {
  .v-toolbar__title {
    font-size: 0.9rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h1 {
    font-size: 1rem;
  }

  .v-application {
    line-height: 1.3;
  }
}

@media screen and (min-width: 601px) and (max-width: 700px) {
  .v-toolbar__title {
    font-size: 1rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h1 {
    font-size: 1.2rem;
  }
}

.theme--light.v-btn.v-btn--disabled:not(.v-btn--text):not(.v-btn--outlined) {
  background-color: rgba(0, 0, 0, 0.12) !important;
}

.form-container {
  min-height: 60vh;
  position: relative;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -webkit-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -moz-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
}

// School application and EOI containers
.content-container {
  padding-right: 15em !important;
  padding-left: 15em !important;
}

@media screen and (max-width: 1900px) {
  .content-container {
    padding-right: 15em !important;
    padding-left: 15em !important;
  }
}

@media screen and (max-width: 1500px) {
  .content-container {
    padding-right: 4em !important;
    padding-left: 4em !important;
  }
}

@media screen and (max-width: 600px) {
  .content-container {
    padding-right: 0.5em !important;
    padding-left: 0.5em !important;
  }
}
.v-divider {
  padding: 15px;
}

.v-label {
  white-space: break-spaces !important;
  margin-bottom: 10px;
}

.v-field-label {
  font-size: 14px !important;
}

.v-input--disabled {
  color: black !important;
}
.v-selection-control--inline .v-label {
  margin-bottom: 0 !important;
}

.reference-cards {
  margin-bottom: 20px;
  border-radius: 0 !important;
  background-color: #385a8a !important;
  color: white !important;
  a {
    text-decoration: underline;
  }

  li::marker {
    color: lightgray;
  }
  .content {
    color: black;
    padding: 0.625rem 1rem;
    font-size: 14px;
    background: #f1f1f2 !important;
  }
}

// unauthenticated and authenticated homepage containers
.dashboard-container {
  margin-top: 50px;
  padding-bottom: 50px;
  padding-right: 15em !important;
  padding-left: 15em !important;
}
@media screen and (max-width: 1900px) {
  .dashboard-container {
    padding-right: 10em !important;
    padding-left: 10em !important;
  }
}
@media screen and (max-width: 1500px) {
  .dashboard-container {
    padding-right: 4em !important;
    padding-left: 4em !important;
  }
}
@media screen and (max-width: 600px) {
  .dashboard-container {
    padding-right: 0.5em !important;
    padding-left: 0.5em !important;
  }
}

.link-button {
  text-decoration: underline !important;
  color: #1976d2 !important;
  opacity: 100% !important;
}

.v-checkbox {
  height: 30px !important;
}

.no-mb {
  margin-bottom: 0px !important;
}

.sm {
  font-size: 14px !important;
}

.block {
  display: block !important;
}
</style>
