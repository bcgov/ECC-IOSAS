<template>
  <v-container v-if="!isAuthenticated" fluid>
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
  <span v-if="isLoading">
    <Loader :loading="isLoading" />
  </span>
  <v-container v-else fluid class="dashboard-container">
    <v-row
      align="center"
      justify="center"
      style="margin-right: 0; margin-left: 0"
    >
      <v-col>
        <v-card class="action-card" variant="tonal">
          After 25 minutes of inactivity, you will be logged out. Please save
          your progress as you go.
        </v-card>
      </v-col>
    </v-row>
    <br />
    <br />
    <v-row no-gutter>
      <v-col cols="12" sm="12" md="8" xs="12">
        <v-container>
          <DataTable
            :data="eoiApplications"
            title="Expressions of Interest (EOI)"
            :buttonAction="redirectToEOIForm"
            buttonTitle="Create new EOI"
            :routeName="routes.EOI"
          />
          <br />
          <br />
          <DataTable
            :data="schoolApplications"
            title="New School Application"
            :routeName="routes.APP"
          />
        </v-container>
      </v-col>

      <v-col cols="12" sm="12" md="4" xs="12">
        <v-card title="Tips" variant="tonal" class="reference-cards">
          <div class="content">
            <p>
              Submit an Expression of Interest to start the New School
              Application process. Once your EOI is approved, you will receive
              an invitation to submit an application.
            </p>
            <br />
            <p>
              New school proponents are solely responsible for being aware of,
              and meeting, all the submission dates, and other requirements set
              out in the
              <a :href="GOV_URL.establishingSchoolURL" target="_blank"
                >procedures</a
              >.
            </p>
          </div>
        </v-card>
        <RelatedLinksCard />
        <ContactCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from './auth/Login.vue';
import { authStore } from '../store/modules/auth';
import { applicationsStore } from '../store/modules/applications';
import { AuthRoutes } from '../utils/constants';
import { mapActions, mapState } from 'pinia';
import { GOV_URL } from '../utils/constants';
import PrimaryButton from './util/PrimaryButton.vue';
import DataTable from './common/DataTable.vue';
import ContactCard from './common/ContactCard.vue';
import RelatedLinksCard from './common/RelatedLinksCard.vue';
import Loader from './util/Loader.vue';

export default {
  name: 'Home',
  components: {
    Login,
    PrimaryButton,
    DataTable,
    ContactCard,
    RelatedLinksCard,
    Loader,
  },
  data() {
    return {
      AuthRoutes,
      GOV_URL,
      isLoading: true,
      schoolApplications: [],
      eoiApplications: [],
      routes: {
        EOI: 'expressionOfInterestPage',
        APP: 'schoolApplicationPage',
      },
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated']),
    ...mapState(applicationsStore, [
      'getEOIApplicationsFormatted',
      'getSchoolApplicationsFormatted',
    ]),
  },
  async created() {
    await this.getAllEOI();
    this.eoiApplications = this.getEOIApplicationsFormatted;
    await this.getAllSchoolApplications();
    this.schoolApplications = this.getSchoolApplicationsFormatted;
    this.isLoading = false;
  },
  methods: {
    ...mapActions(applicationsStore, ['getAllEOI', 'getAllSchoolApplications']),
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
