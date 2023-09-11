<template>
  <v-container fluid class="full-height" v-if="!isLoading">
    <v-breadcrumbs :items="items"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container fluid class="content-container">
      <div class="confirmation-container">
        <p>{{ getConfirmationMessage }}</p>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { authStore } from '../../store/modules/auth';
import { applicationsStore } from '../../store/modules/applications';
export default {
  name: 'ConfirmationPage',
  computed: {
    ...mapState(applicationsStore, ['getConfirmationMessage']),
    ...mapState(authStore, ['isLoading']),
  },
  mounted() {
    this.setLoading(false);
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
    ...mapActions(authStore, ['setLoading']),
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}

.confirmation-container {
  position: relative;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -webkit-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -moz-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
}
</style>
