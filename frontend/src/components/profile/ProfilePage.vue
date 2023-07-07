<template>
  <div v-if="authStore().isAuthenticated && dataReady">
    <v-container fluid class="full-height">
      <v-icon aria-hidden="false" color="rgb(0,51,102)" size="50"
        >mdi-account</v-icon
      >
      <span class="display-name pl-1">{{ getName() }}</span>
    </v-container>
  </div>
</template>

<script>
import { authStore } from '../../store/modules/auth';
import { mapState } from 'pinia';
export default {
  name: 'Profile Page',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
    dataReady: function () {
      return this.userInfo;
    },
  },
  methods: {
    getName() {
      return this.userInfo?.displayName;
    },
    authStore,
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}

.display-name {
  color: #003366;
}
</style>
