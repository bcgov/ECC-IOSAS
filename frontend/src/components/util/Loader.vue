<template>
  <v-row v-if="isLoading" class="mt-10">
    <v-col class="d-flex justify-center" align-self="center">
      <v-progress-circular
        class="mt-10"
        :size="70"
        :width="7"
        color="deep-orange-lighten-2"
        indeterminate
        :active="isLoading"
      />
      <!-- color="primary" -->
    </v-col>
  </v-row>
</template>

<script>
import { authStore } from '../../store/modules/auth';
import { mapState } from 'pinia';

export default {
  name: 'Loader',
  data() {
    return {
      colour: '',
      polling: null,
      timeout: 5000,
      pause: false,
    };
  },
  computed: {
    ...mapState(authStore, ['isLoading']),
  },
};
</script>
