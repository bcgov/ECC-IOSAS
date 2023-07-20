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
    messages: {
      EOI: 'Thank you for submitting your Expression of Interest (EOI), you will be contacted once your submission has been reviewed.',
      Delete: 'Application has been successfully removed from your records.',
      APP: 'Thank you for submitting your Application for an Independent School Certification, you will be contacted once your application has been reviewed.',
    },
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
      return this.messages[this.$route.params.type];
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
