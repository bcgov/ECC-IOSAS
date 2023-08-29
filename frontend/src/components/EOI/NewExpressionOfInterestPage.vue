<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="items" v-if="authStore().isAuthenticated"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-row v-if="isLoading">
      <v-col class="d-flex justify-center">
        <v-progress-circular
          class="mt-16"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
          :active="isLoading"
        />
      </v-col>
    </v-row>

    <div v-else class="d-flex justify-space-between">
      <v-container fluid class="content-container d-flex">
        <v-row no-gutter>
          <v-col cols="12" sm="12" md="12" lg="9" xs="12">
            <div class="form-container">
              <div>
                <ExpressionOfInterestForm
                  :isNew="true"
                  :isLoading="isLoading"
                  :draftStatusCode="draftStatusCode"
                  @setIsLoading="setIsLoading"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="3" xs="12">
            <RelatedLinksCard :showExtraEOILink="true" />
            <ContactCard />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import ExpressionOfInterestForm from './ExpressionOfInterestForm.vue';
import ContactCard from '../common/ContactCard.vue';
import RelatedLinksCard from '../common/RelatedLinksCard.vue';
import { mapState } from 'pinia';
import { authStore } from '../../store/modules/auth';

export default {
  name: 'NewExpressionOfInterestPage',
  components: {
    ContactCard,
    RelatedLinksCard,
    ExpressionOfInterestForm,
  },
  data: () => ({
    isLoading: false,
    draftStatusCode: 100000006,
    items: [
      {
        title: 'Dashboard',
        disabled: false,
        href: '/',
      },
      {
        title: 'EOI',
        disabled: true,
        href: '/expression-of-interest',
      },
    ],
  }),
  computed: {
    ...mapState(authStore, ['isAuthenticated']),
  },
  async created() {},
  methods: {
    authStore,
    setIsLoading() {
      this.isLoading = !this.isLoading;
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
