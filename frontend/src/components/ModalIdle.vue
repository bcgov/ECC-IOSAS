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
  watch: {
    timer: {
      handler(val) {
        console.log('countdown', val);
        if (val === 0) {
          this.handleIdleDialog();
        }
      },
    },
    countdown: {
      handler(val) {
        if (val === 0) {
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
  },
  data() {
    return {
      userIdleDialog: false,
      countdown: 0,
      routes: AuthRoutes,
      countdownWorker: null,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated']),
  },
  methods: {
    ...mapActions(authStore, ['refreshJWT']),
    async handleIdleDialog() {
      this.handleCountdown();
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
          showReject: false,
        }
      );

      if (!confirmation) {
        return;
      } else {
        this.resetCountDown();
        this.refreshJWT();
      }
    },
    handleCountdown() {
      this.countdownWorker = new Worker('../countdownWorker.js');

      this.countdownWorker.addEventListener('message', (event) => {
        const { type, countdown } = event.data;
        if (type === 'TICK') {
          this.countdown = countdown;
        }
      });
    },
    resetCountDown() {
      if (this.countdownWorker) {
        this.countdownWorker.postMessage('RESET');
      }
    },
    redirectToLogout() {
      return (window.location = document.getElementById('logout_href').href);
    },
  },
  beforeUnmount() {
    this.countdownWorker.terminate();
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
