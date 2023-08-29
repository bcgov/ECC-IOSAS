<template>
  <div class="dashboard-container no-margin">
    <div class="header">
      <img
        tabindex="-1"
        src="../assets/images/IOSAS-Banner.png"
        alt="Independent School Logo"
      />
      <h1>Welcome to the Independent School BC Portal</h1>
      <IndependentSchoolDisclaimer />
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
                    :href="envGet?.beceidRegURL"
                    target="_blank"
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
import IndependentSchoolDisclaimer from './IndependentSchoolDisclaimer.vue';
import RelatedLinksCard from './common/RelatedLinksCard.vue';

export default {
  name: 'Login',
  components: { ContactCard, RelatedLinksCard, IndependentSchoolDisclaimer },
  data() {
    return {
      appTitle: 'Independent School BC',
      authRoutes: AuthRoutes,
      GOV_URL,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'envGet']),
  },
  methods: {
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
