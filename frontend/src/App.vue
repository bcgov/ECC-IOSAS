<template>
  <v-app id="app">
    <MsieBanner v-if="isIE" />
    <Header />
    <SnackBar />
    <NavBar v-if="pageTitle" :title="pageTitle" />
    <v-main fluid class="align-start">
      <ModalIdle v-if="authStore().isAuthenticated" />
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { authStore } from './store/modules/auth';
import { appStore } from './store/modules/app';
import { mapState, mapActions } from 'pinia';
import HttpStatus from 'http-status-codes';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ModalIdle from './components/ModalIdle.vue';
import MsieBanner from './components/MsieBanner.vue';
import StaticConfig from './common/staticConfig';
import SnackBar from './components/util/SnackBar.vue';
import NavBar from './components/util/NavBar.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ModalIdle,
    MsieBanner,
    SnackBar,
    NavBar,
  },
  metaInfo: {
    meta: StaticConfig.VUE_APP_META_DATA,
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'loginError', 'isLoading']),
    ...mapState(appStore, ['pageTitle']),
    isIE() {
      return /Trident\/|MSIE/.test(window.navigator.userAgent);
    },
  },
  async created() {
    await this.setLoading(true);
    this.getJwtToken()
      .then(() => Promise.all([this.getUserInfo()]))
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
      'setLoading',
      'getJwtToken',
      'getUserInfo',
      'logout',
    ]),
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

.envBanner {
  font-size: 0.8rem;
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
  border-radius: 5px;
  padding: 50px;
  box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -webkit-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -moz-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
}

.content-container {
  padding-right: 25em !important;
  padding-left: 25em !important;
}

@media screen and (max-width: 1900px) {
  .content-container {
    padding-right: 20em !important;
    padding-left: 20em !important;
  }
}

@media screen and (max-width: 1900px) {
  .content-container {
    padding-right: 20em !important;
    padding-left: 20em !important;
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
  white-space: break-spaces;
}

.reference-cards {
  margin: 20px;
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
</style>
