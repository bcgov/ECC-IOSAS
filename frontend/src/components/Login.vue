<template>
  <div class="content-container">
    <div class="header">
      <h1>Welcome to the Independent School BC Portal</h1>
      <p>
        Apply online to open a new school in BC. Login to access your existing
        applications or start a new EXpression of Interest application.
      </p>
    </div>
    <div class="d-flex justify-space-between">
      <div class="flex-4">
        <div class="d-flex justify-center">
          <v-row justify="center">
            <v-col cols="12" sm="12" md="6" xs="12">
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
            <v-col cols="12" sm="12" md="6" xs="12">
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
      </div>
      <div class="flex-1">
        <v-card title="Related Links" variant="tonal" class="reference-cards">
          <div class="card-content">
            <ul class="pl-5">
              <li class="pt-2">
                <a
                  href="https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/program-management/independent-schools"
                  target="_blank"
                >
                  Independent School Information for Administrators
                </a>
              </li>
              <li class="pt-2">
                <a
                  href="http://www.bced.gov.bc.ca/apps/imcl/imclWeb/IndSchool.do?school_category=Independent%20School"
                  target="_blank"
                >
                  Independent School Contacts
                </a>
              </li>
              <li class="pt-2">
                <a
                  href="http://www.bced.gov.bc.ca/apps/imcl/imclWeb/SchoolUpdateForm.do"
                  target="_blank"
                >
                  Update your school information
                </a>
              </li>
              <li class="pt-2">
                <a
                  href="https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/teacher-certification?keyword=teacher&keyword=certification"
                  target="_blank"
                >
                  Teacher certification
                </a>
              </li>
              <li class="pt-2">
                <a href="https://fisabc.ca/" target="_blank">
                  Federation of Independent School Associations (FISA)
                </a>
              </li>
            </ul>
          </div></v-card
        >
        <v-card
          title="Contact Information"
          variant="tonal"
          class="reference-cards"
        >
          <div class="card-content">
            <p>Independent Schools Branch</p>
            <div class="pt-3">
              <h4>Office:</h4>
              <a href="tel:250 387-3711">250 387-3711</a>
            </div>
            <div class="pt-3">
              <h4>Fax:</h4>
              <p>250 953-4908</p>
            </div>
            <div class="pt-3">
              <h4>Email:</h4>
              <a href="mailto:EDUC.IndependentSchoolsOffice@gov.bc.ca"
                >EDUC.IndependentSchoolsOffice@gov.bc.ca</a
              >
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { authStore } from '../store/modules/auth';
import { mapState } from 'pinia';
import { AuthRoutes } from '../utils/constants';

export default {
  name: 'Login',
  components: {},
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

<style lang="scss" scoped>
.content-container {
  margin-top: 50px;
}

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

.reference-cards {
  margin: 20px;
  border-radius: 0 !important;
  ::v-deep .v-card-item {
    background: #385a8a;
    color: white;
  }

  ::v-deep .v-card-text {
    padding: 10px;
    background: #f1f1f2;
    padding: 15px;
  }
  a {
    text-decoration: underline;
  }

  li::marker {
    color: lightgray;
  }
}

.flex-1 {
  flex: 1;
}
.flex-4 {
  flex: 4;
}

.header {
  height: 100px;
}
</style>
