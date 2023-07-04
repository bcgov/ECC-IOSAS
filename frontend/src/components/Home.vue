<!--suppress ALL -->
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

  <v-container v-else-if="authStore().isLoading" fluid class="full-height">
    <article id="progress-display-container" class="top-banner full-height">
      <v-row align="center" justify="center">
        <v-progress-circular
          :size="60"
          :width="7"
          color="primary"
          indeterminate
        />
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
        :data="EOI"
        title="Expressions of Interest (EOI)"
        :buttonAction="redirectToEOIForm"
        buttonTitle="Create new EOI"
        :url="AuthRoutes.EOI"
      />
      <br />
      <br />
      <DataTable
        :data="Application"
        title="New School Applications"
        :url="AuthRoutes.APPLICATION"
      />
    </v-container>
  </v-container>
</template>

<script>
import Login from "./Login.vue";
import { authStore } from "../store/modules/auth";
import { AuthRoutes } from "../utils/constants";
import { mapState } from "pinia";
import { PAGE_TITLES } from "../utils/constants";
import PrimaryButton from "./util/PrimaryButton.vue";
import DataTable from "./util/DataTable.vue";
export default {
  name: "Home",
  components: {
    Login,
    PrimaryButton,
    DataTable,
  },
  data() {
    return {
      tab: "option-1",
      AuthRoutes,
      PAGE_TITLES: PAGE_TITLES,
      EOI: [
        {
          EOI_number: "EOI-01020",
          status: "Draft",
          proposed_school_name: "Victoria South Elementary",
          school_year: "2025/26 SY",
          group_classification: "Group 4",
        },
        {
          EOI_number: "EOI-01016",
          status: "Approved",
          proposed_school_name: "Victoria South High",
          school_year: "2024/25 SY",
          group_classification: "Group 3",
        },
        {
          EOI_number: "EOI-01003",
          status: "Approved",
          proposed_school_name: "Victoria South Middle School",
          school_year: "2023/24 SY",
          group_classification: "Group 2",
        },
      ],
      Application: [
        {
          application_number: "APP-1048",
          status: "Draft",
          school_name: "Victoria South High",
          school_year: "2024/25 SY",
          group_classification: "Group 3",
        },
        {
          application_number: "APP-1011",
          status: "Interim Certification",
          school_name: "Victoria South Middle School",
          school_year: "2023/24 SY",
          group_classification: "Group 2",
        },
      ],
    };
  },
  computed: {
    ...mapState(authStore, ["isAuthenticated", "isLoading"]),
  },
  mounted() {},
  methods: {
    authStore,
    redirectToEOIForm() {
      this.$router.push({ name: "New Expression of Interest" });
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
</style>
