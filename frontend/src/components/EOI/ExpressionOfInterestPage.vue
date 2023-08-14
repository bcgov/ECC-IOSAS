<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="items" v-if="authStore().isAuthenticated"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <v-row v-if="isLoading">
      <v-col class="d-flex justify-center">
        <v-progress-circular
          class="mt-16"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
          :active="isLoading"
        />
      </v-col>
    </v-row>
    <div v-else>
      <div v-if="isViewOnly">
        <ExpressionOfInterestReadOnlyView
          :eoi="eoi"
          :draftStatusCode="draftStatusCode"
        />
      </div>
      <div v-else>
        <ExpressionOfInterestForm
          :eoi="eoi"
          :isLoading="isLoading"
          :draftStatusCode="draftStatusCode"
          @setIsLoading="setIsLoading"
          @fetchEOIData="fetchEOIData"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import ExpressionOfInterestForm from './ExpressionOfInterestForm.vue';
import ExpressionOfInterestReadOnlyView from './ExpressionOfInterestReadOnlyView.vue';
import { mapState } from 'pinia';
import { authStore } from '../../store/modules/auth';
import { documentStore } from '../../store/modules/document';
import { applicationsStore } from '../../store/modules/applications';
import { metaDataStore } from '../../store/modules/metaData';

export default {
  name: 'ExpressionOfInterestPage',
  components: {
    ExpressionOfInterestForm,
    ExpressionOfInterestReadOnlyView,
  },
  data: () => ({
    isViewOnly: false,
    isLoading: true,
    draftStatusCode: 100000006,
    eoi: null,
    items: [
      {
        title: 'Dashboard',
        disabled: false,
        href: '/',
      },
      {
        title: 'EOI',
        disabled: true,
        href: '/expression-of-interest',
      },
    ],
  }),
  mounted() {},
  computed: {
    ...mapState(authStore, ['isAuthenticated']),
    ...mapState(applicationsStore, ['getEOIApplicationById', 'getEOI']),
  },
  async created() {
    if (this.$route.params.id) {
      await applicationsStore().getEOIApplicationById(this.$route.params.id);
      this.eoi = this.getEOI;

      this.isViewOnly = this.eoi.iosas_reviewstatus !== this.draftStatusCode;
    }
    this.isLoading = false;
  },
  methods: {
    authStore,
    metaDataStore,
    documentStore,
    setIsLoading() {
      this.isLoading = !this.isLoading;
    },
    async fetchEOIData() {
      this.isLoading = true;
      if (this.$route.params.id) {
        await applicationsStore().getEOIApplicationById(this.$route.params.id);
        this.eoi = this.getEOI;
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
