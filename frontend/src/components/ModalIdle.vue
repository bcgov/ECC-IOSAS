<template>
  <ConfirmationDialog ref="userIdleDialog">
    <template #message>
      <p>
        Due to inactivity, you will be logged out of your current session in:
      </p>
      <br />
      <v-row justify="center">
        <span class="countdown">{{ countdown }} seconds</span>
      </v-row>
      <br />
      <p>
        Please click on the "Stay logged in" button to continue with this
        session.
      </p>
    </template>
  </ConfirmationDialog>
  <div style="display: none">
    <a id="logout_href" :href="routes.SESSION_EXPIRED" />
  </div>
</template>

<script>
import { AuthRoutes } from '../utils/constants';
import ConfirmationDialog from '../components/util/ConfirmationDialog.vue';
import { authStore } from '../store/modules/auth';
import { mapState, mapActions } from 'pinia';

export default {
  components: { ConfirmationDialog },
  emits: ['resetTimerAndCountdown'],
  watch: {
    timer: {
      handler(val) {
        console.log('idle countdown', val);
        if (val <= 120 && val > 0 && !this.userIdleDialog) {
          this.handleIdleDialog();
        }
      },
    },
    countdown: {
      handler(val) {
        if (val <= 0) {
          this.redirectToLogout();
        }
      },
    },
  },
  props: {
    timer: {
      type: Number,
      required: true,
    },
    countdown: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      userIdleDialog: false,
      routes: AuthRoutes,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated']),
  },
  methods: {
    ...mapActions(authStore, ['refreshJWT']),
    async handleIdleDialog() {
      const confirmation = await this.$refs.userIdleDialog.open(
        'Session Time-out for your protection: 25-minute time-out',
        null,
        {
          color: '#fff',
          width: 580,
          closeIcon: false,
          subtitle: false,
          dark: false,
          resolveText: 'Stay Logged In',
          rejectText: 'Logout',
          showReject: false,
        }
      );

      if (!confirmation) {
        return;
      } else {
        this.$emit('resetTimerAndCountdown');
        this.refreshJWT();
      }
    },
    redirectToLogout() {
      return (window.location = document.getElementById('logout_href').href);
    },
  },
};
</script>

<style scoped>
.countdown {
  color: #003366;
  font-size: 20px;
  align-self: center;
}
</style>
