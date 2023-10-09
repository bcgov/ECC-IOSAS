<template>
  <span v-if="loading && isLoading">
    <Loader :loading="loading" />
  </span>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="items"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <div class="d-flex justify-space-between">
      <v-container fluid class="content-container d-flex">
        <v-row no-gutter>
          <v-col cols="12" sm="12" md="12" lg="9" xs="12">
            <div class="form-container">
              <div>
                <ExpressionOfInterestForm
                  :isNew="true"
                  :isLoading="loading"
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
import { mapState } from 'pinia';
import RelatedLinksCard from '../common/RelatedLinksCard.vue';
import { authStore } from '../../store/modules/auth';
import Loader from './../util/Loader.vue';

export default {
  name: 'NewExpressionOfInterestPage',
  components: {
    ContactCard,
    RelatedLinksCard,
    ExpressionOfInterestForm,
    Loader,
  },
  data: () => ({
    loading: false,
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
    ...mapState(authStore, ['isLoading']),
  },
  methods: {
    setIsLoading(value) {
      this.loading = value;
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
