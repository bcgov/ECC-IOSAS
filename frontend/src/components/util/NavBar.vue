<template>
  <div class="mb-1">
    <v-app-bar
      v-if="bannerColor !== ''"
      style="color: white; z-index: 1000"
      :color="bannerColor"
      absolute
      density="compact"
    >
      <div>
        <h3 class="envBanner pl-5">{{ bannerEnvironment }} Environment</h3>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import StaticConfig from '../../common/staticConfig';
export default {
  name: 'NavBar',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      bannerEnvironment: StaticConfig.BANNER_ENVIRONMENT,
      bannerColor: StaticConfig.BANNER_COLOR,
    };
  },
  computed: {
    navWidth() {
      switch (this.$vuetify.display.name) {
        case 'xs':
          return '50%';
        case 'sm':
          return '50%';
        default:
          return '15%';
      }
    },
  },
};
</script>
<style scoped>
.router {
  width: 100%;
}

.nav-title {
  font-size: 1.4rem;
  color: white;
}

@media screen and (max-width: 801px) {
  .nav-title {
    font-size: 1.1rem;
  }
}
</style>
