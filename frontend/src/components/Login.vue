<template>
  <div class="dashboard-container no-margin">
    <div class="header">
      <img
        tabindex="-1"
        src="../assets/images/IOSAS-Banner.png"
        alt="Independent School Logo"
      />
      <h1>Welcome to the Independent School BC Portal</h1>
      <p class="mt-3">
        Independent schools are regulated by the
        <a :href="GOV_URL.independentActUrl" target="_blank"
          >Independent School Act (PDF).</a
        >
        The Independent Schools Branch administers the Act as well as any
        <a :href="GOV_URL.schoolManualLawURL" target="_blank"
          >regulations, Minister’s orders and inspector’s</a
        >
        made under the Act.
      </p>
      <p class="mt-3">
        This information is collected by the Ministry of Education and Child
        Care under Section 26 (c) of the
        <i>Freedom of Information and Protection of Privacy Act</i> (FOIPPA) and
        will be used to evaluate your application to establish an independent
        school. Information related to a prospective school's finances or market
        research are collected in confidence but may be subject to disclosure
        under FOIPPA.
      </p>
      <p class="mt-3">
        Please review the information at
        <a :href="GOV_URL.establishingSchoolURL" target="_blank"
          >Establishing an Independent School - Province of British Columbia
          (gov.bc.ca)</a
        >
        before submitting an Expression of Interest (EOI).
      </p>
      <p class="mt-3">
        If you have any questions about the collection of personal information,
        or the application process, please email:
        <a href="mailto:EDUC.IndependentSchoolsOffice@gov.bc.ca" target="_blank"
          >EDUC.IndependentSchoolsOffice@gov.bc.ca</a
        >
      </p>
    </div>

    <v-row class="mt-3">
      <v-col cols="12" sm="12" md="8" xs="12">
        <div class="d-flex justify-center">
          <v-row justify="center">
            <v-col cols="12" sm="12" md="12" lg="6" xs="12">
              <v-card title="Log in with your BCeID">
                <div class="card-content">
                  <p>Enter your user ID and password to continue</p>
                </div>
                <v-card-actions>
                  <v-btn
                    id="login-button"
                    :href="authRoutes.LOGIN_BCEID"
                    class="ma-2"
                    @click="clearStorage"
                  >
                    Log In <v-icon>mdi-login</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="6" xs="12">
              <v-card title="Don't have a BCeID?">
                <div class="card-content">
                  <p>
                    BCeID is a user ID and password. You can use it to log into
                    many participating government services
                  </p>
                  <p class="pt-5">
                    If you have logged into other B.C. government services
                    before, you may already have an account.
                  </p>
                </div>
                <v-card-actions>
                  <v-btn
                    id="register-button"
                    :href="
                      isDev() ? GOV_URL.devBceidRegister : GOV_URL.bceidRegister
                    "
                    class="ma-2"
                  >
                    Register for a BCeID <v-icon>mdi-login</v-icon>
                  </v-btn>
                </v-card-actions></v-card
              >
            </v-col>
          </v-row>
        </div>
        <v-row class="mt-5">
          <v-col cols="12">
            <v-card title="Submit an Expression of Interest as a Guest">
              <div class="card-content submission">
                <p>
                  As a guest user, you can submit an Expression of Interest and
                  register for BCeID after the EOI approval.
                </p>
                <br />
                <p>
                  New school proponents are solely responsible for being aware
                  of, and meeting, all the submission dates, and other
                  requirements set out in the
                  <a :href="GOV_URL.establishingSchoolURL" target="_blank"
                    >procedures</a
                  >
                </p>
              </div>
              <v-card-actions>
                <v-btn
                  id="new-eoi-button"
                  :href="authRoutes.NEW_EOI"
                  class="ma-2"
                >
                  Create new EOI
                </v-btn>
              </v-card-actions></v-card
            >
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="12" md="4" xs="12">
        <RelatedLinksCard />
        <ContactCard />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { authStore } from '../store/modules/auth';
import { mapState } from 'pinia';
import { AuthRoutes, GOV_URL } from '../utils/constants';
import ContactCard from './common/ContactCard.vue';
import RelatedLinksCard from './common/RelatedLinksCard.vue';
import StaticConfig from '../common/staticConfig';

export default {
  name: 'Login',
  components: { ContactCard, RelatedLinksCard },
  data() {
    return {
      appTitle: 'Independent School BC',
      authRoutes: AuthRoutes,
      GOV_URL,
      bannerEnvironment: StaticConfig.BANNER_ENVIRONMENT,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated']),
  },
  methods: {
    isDev() {
      return this.bannerEnvironment === 'DEV';
    },
    clearStorage() {
      authStore().setJwtToken();
    },
  },
};
</script>

<style lang="scss" scoped>
.card-content {
  min-height: 130px;
  height: fit-content;
  padding: 0.625rem 1rem;
  font-size: 14px;

  &.submission {
    min-height: inherit;
  }
}

.v-btn {
  color: white !important;
  background-color: #003366;
}

@media screen and (max-width: 1000px) {
  .header {
    position: relative;
    top: 0px !important;
  }
}

.header {
  width: 100%;
  top: -30px;
  position: relative;

  p {
    font-size: 14px;
  }

  img {
    width: inherit !important;
  }
}

.no-margin {
  margin-top: 0;
}
</style>
