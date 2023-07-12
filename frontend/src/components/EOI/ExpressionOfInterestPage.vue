<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="items" v-if="authStore().isAuthenticated"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <ExpressionOfInterestForm
      :eoi="getEOIApplicationById(this.$route.params.id)"
      :isLoading="isLoading"
    />
  </v-container>
</template>

<script>
import ExpressionOfInterestForm from './ExpressionOfInterestForm.vue';
import { mapState } from 'pinia';
import { authStore } from '../../store/modules/auth';
import { applicationsStore } from '../../store/modules/applications';

export default {
  name: 'ExpressionOfInterestPage',
  components: {
    ExpressionOfInterestForm,
  },
  data: () => ({
    isLoading: true,
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
  mounted() {},
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'isLoading']),
    ...mapState(applicationsStore, ['getEOIApplicationById']),
  },
  created() {
    applicationsStore()
      .getApplicationData()
      .then(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  },
  methods: {
    authStore,
    getEOI() {},
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
