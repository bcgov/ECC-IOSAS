<template>
  <span v-if="isLoading">
    <Loader :loading="isLoading" />
  </span>
  <v-container fluid class="full-height" v-else>
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
                  :isLoading="isLoading"
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
    isLoading: false,
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
  methods: {
    setIsLoading(value) {
      this.isLoading = value;
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
