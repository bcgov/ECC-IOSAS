<template>
  <!-- <div class="hover" @mousemove="mouseMove">
  </div> -->
  <ConfirmationDialog ref="userIdle">
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
import ApiService from '../common/apiService';
import ConfirmationDialog from '../components/util/ConfirmationDialog.vue';
import { authStore } from '../store/modules/auth';
import { mapState } from 'pinia';

export default {
  components: { ConfirmationDialog },
  data() {
    return {
      userIdle: false,
      countdown: 120,
      // mouseMove:
      routes: AuthRoutes,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'tokenLife']),
  },
  async mounted() {
    // this.$el.addEventListener('mousemove', this.mouseMove, false);
    await this.handleIdleDialog();
    await this.checkAndLogoutUserOnSessionExpiry();
  },
  methods: {
    async handleIdleDialog() {
      this.handleCountdown();
      console.log('CALLED!?!!?');
      const confirmation = await this.$refs.userIdle.open(
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
        console.log('CALL REFRESH API WITH TOKEN');
        console.log('CALL RERESH AND KEEP USER LOGGED IN');
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
      // return (window.location = document.getElementById('logout_href').href);
    },

    async checkAndLogoutUserOnSessionExpiry() {
      console.log('this.isAuthenticated', this.isAuthenticated);
      //   if (this.isAuthenticated) {
      //     try {
      //       // const response = await ApiService.apiAxios.get(
      //       //   AuthRoutes.SESSION_REMAINING_TIME
      //       // );
      //       if (response.data > 0) {
      //         const timeOutValue = parseInt(response.data) + 200; // add 200 ms
      //         setTimeout(() => {
      //           this.checkAndLogoutUserOnSessionExpiry();
      //         }, timeOutValue);
      //       } else {
      //         window.location = document.getElementById('logout_href').href;
      //       }
      //     } catch (e) {
      //       window.location = document.getElementById('logout_href').href;
      //     }
      //   }
    },
    // mouseEnter(event) {
    //   console.log('mouseneter');
    //   // this.popup = true;
    //   this.$el.addEventListener('mousemove', this.mouseMove(), false);
    // },
    // mouseLeave(event) {
    //   // this.popup = false;
    //   this.$el.removeEventListener('mousemove', this.mouseMove());
    // },
    mouseMove(event) {
      console.log('MOUSE MOVING???', event);
      console.log(event.clientX, event.clientY);
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
