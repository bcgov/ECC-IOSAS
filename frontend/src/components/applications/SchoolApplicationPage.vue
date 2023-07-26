<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="breadcrumbs"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <br />
    <SchoolApplicationForm
      :data="getSchoolApplicationById(this.$route.params.id)"
      :isLoading="isLoading"
      @setIsLoading="setIsLoading"
    />
  </v-container>
</template>

<script>
import SchoolApplicationForm from './SchoolApplicationForm.vue';
import { mapState } from 'pinia';
import { applicationsStore } from '../../store/modules/applications';

export default {
  name: 'SchoolApplicationPage',
  components: {
    SchoolApplicationForm,
  },
  data: () => ({
    isLoading: true,
    breadcrumbs: [
      {
        title: 'Dashboard',
        disabled: false,
        href: '/',
      },
      {
        title: `Application`,
        disabled: true,
        href: 'school-application',
      },
    ],
  }),
  computed: {
    ...mapState(applicationsStore, ['getSchoolApplicationById']),
  },
  mounted() {},
  created() {
    applicationsStore()
      .getApplicationData()
      .then(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  },
  methods: {
    setIsLoading() {
      this.isLoading = true;
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}

.v-timeline--horizontal.v-timeline.v-timeline--side-end,
.v-timeline-item,
.v-timeline-item__body {
  padding: none !important;
  padding-block-end: 0 !important;
  padding-block-start: 0 !important;
}

.step-title {
  font-size: 12px;
  line-height: 0;
}
</style>
