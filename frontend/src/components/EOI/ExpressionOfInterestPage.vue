<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="items" v-if="authStore().isAuthenticated"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <ExpressionOfInterestForm />
  </v-container>
</template>

<script>
import ExpressionOfInterestForm from './ExpressionOfInterestForm.vue';
import { mapState } from 'pinia';
import { authStore } from '../../store/modules/auth';

export default {
  name: 'ExpressionOfInterestPage',
  components: {
    ExpressionOfInterestForm,
  },
  data: () => ({
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
  },
  methods: {
    authStore,
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
