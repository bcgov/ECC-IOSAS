<template>
  <v-container
    v-if="!authStore().isAuthenticated && !authStore().isLoading"
    fluid
  >
    <!-- login article -->
    <article name="login-banner">
      <v-row
        align="center"
        justify="center"
        style="margin-right: 0; margin-left: 0"
      >
        <Login />
      </v-row>
    </article>
  </v-container>

  <v-container v-else-if="isLoading" fluid class="full-height">
    <article id="progress-display-container">
      <v-row align="center" justify="center">
        <v-col class="d-flex justify-center">
          <v-progress-circular
            class="mt-16"
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          />
        </v-col>
      </v-row>
    </article>
  </v-container>

  <v-container v-else fluid>
    <v-row
      align="center"
      justify="center"
      style="margin-right: 0; margin-left: 0"
    >
      <v-col>
        <v-card class="action-card" variant="tonal">
          Your Expression of Interest <b>EOI-1016</b> has been approved. You are
          now invited to fill out and submit a New School Application. We have
          created a draft for you. Click
          <router-link
            :to="{ path: '/school-application' }"
            :target="'_self'"
            class="router-link-exact-active"
          >
            here
          </router-link>
          to complete and submit your New School Application <b>APP-1048</b>.
        </v-card>
      </v-col>
    </v-row>
    <br />
    <br />
    <v-container fluid class="justify-center">
      <DataTable
        :data="eoiApplications"
        title="Expressions of Interest (EOI)"
        :buttonAction="redirectToEOIForm"
        buttonTitle="Create new EOI"
        routeName="expressionOfInterest"
      />
      <br />
      <br />
      <DataTable
        :data="schoolApplications"
        title="New School Applications"
        routeName="schoolApplicationPage"
      />
    </v-container>
  </v-container>
</template>

<script>
import Login from './Login.vue';
import { authStore } from '../store/modules/auth';
import { applicationsStore } from '../store/modules/applications';
import { AuthRoutes } from '../utils/constants';
import { mapState } from 'pinia';
import { PAGE_TITLES } from '../utils/constants';
import PrimaryButton from './util/PrimaryButton.vue';
import DataTable from './util/DataTable.vue';

export default {
  name: 'Home',
  components: {
    Login,
    PrimaryButton,
    DataTable,
  },
  data() {
    return {
      AuthRoutes,
      PAGE_TITLES: PAGE_TITLES,
      isLoading: true,
      schoolApplications: [],
      eioApplications: [],
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'isLoading']),
  },
  mounted() {},
  created() {
    applicationsStore()
      .getApplicationData()
      .then(() => {
        // mocking a loading state - will be replaced when API is connected.
        setTimeout(() => {
          this.isLoading = false;
          this.eoiApplications =
            applicationsStore().getEOIApplicationsFormatted;
          this.schoolApplications =
            applicationsStore().getSchoolApplicationsFormatted;
        }, 1000);
      });
  },
  methods: {
    authStore,
    redirectToEOIForm() {
      this.$router.push({ path: AuthRoutes.NEW_EOI });
    },
  },
};
</script>

<style scoped>
.action-card {
  padding: 25px;
  border-left: 10px solid #38598a;
  background-color: #f2f2f2;
}
.top-banner {
  background-size: cover;
  align-items: center;
  display: flex;
}

.full-height {
  height: 100%;
}
</style>
