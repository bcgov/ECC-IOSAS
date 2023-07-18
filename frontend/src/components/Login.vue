<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>Welcome to the Independent School BC Portal</h1>
      <p>
        Apply online to open a new school in BC. Login to access your existing
        applications or start a new Expression of Interest application.
      </p>
    </div>

    <v-row>
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
                    href="https://www.bceid.ca/register/"
                    class="ma-2"
                  >
                    Register for a BCeID <v-icon>mdi-login</v-icon>
                  </v-btn>
                </v-card-actions></v-card
              >
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card title="Submit an Expression of Interest as a Guest">
              <div class="card-content">
                <p>
                  As a guest user, you can submit an EOI and register for BCeID
                  after the EOI approval
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
import { AuthRoutes } from '../utils/constants';
import ContactCard from './common/ContactCard.vue';
import RelatedLinksCard from './common/RelatedLinksCard.vue';

export default {
  name: 'Login',
  components: { ContactCard, RelatedLinksCard },
  data() {
    return {
      appTitle: 'Independent School BC',
      authRoutes: AuthRoutes,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated']),
  },
  methods: {
    clearStorage() {
      authStore().setJwtToken();
    },
  },
};
</script>

<style scoped>
.v-divider {
  margin-top: 50px !important;
  margin: 30px;
}

.card-content {
  min-height: 130px;
  height: fit-content;
  padding: 0.625rem 1rem;
  font-size: 14px;
}

.v-btn {
  color: white !important;
  background-color: #003366;
}

.header {
  height: 100px;
}
</style>
