<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="items" v-if="authStore().isAuthenticated"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container fluid class="content-container">
      <div class="form-container">
        <p>{{ getMessage() }}</p>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from 'pinia';
import { authStore } from '../../store/modules/auth';
export default {
  name: 'ConfirmationPage',
  components: {},
  computed: {
    ...mapState(authStore, ['isAuthenticated']),
  },
  data: () => ({
    items: [
      {
        title: 'Dashboard',
        disabled: false,
        href: '/',
      },
      {
        title: 'Confirmation',
        disabled: true,
        href: '/expression-of-interest/confirmation',
      },
    ],
  }),
  methods: {
    authStore,
    getMessage() {
      return this.$route.params.type === 'EOI'
        ? 'Thank you for submitting your Expression of Interest (EOI), you will be contacted once your submission has been reviewed.'
        : 'Thank you for submitting your Application for an Independent School Certification, you will be contacted once your application has been reviewed.';
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
