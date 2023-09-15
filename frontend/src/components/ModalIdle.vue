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
    inactivityTimer: {
      handler(val) {
        console.log(val);
        if (val === 0) {
          this.handleIdleDialog();
        }
      },
    },
  },
  data() {
    return {
      userIdleDialog: false,
      countdown: 120,
      routes: AuthRoutes,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'inactivityTimer']),
  },
  async mounted() {
    this.startTimer();
  },
  methods: {
    ...mapActions(authStore, ['resetTimer', 'startTimer']),
    async handleIdleDialog() {
      this.handleCountdown();
      const confirmation = await this.$refs.userIdleDialog.open(
        'Session Time-out for your protection: 30-minute time-out',
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

      setTimeout(async () => {}, 1000);

      if (!confirmation) {
        return;
      } else {
        this.resetTimer();
        this.countdown = 120;
      }
    },
    handleCountdown() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown--;
          this.handleCountdown();
        }, 1000);
      } else if (this.countdown === 0) {
        this.redirectToLogout();
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
