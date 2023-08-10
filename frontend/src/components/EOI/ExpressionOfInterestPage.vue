<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="items" v-if="authStore().isAuthenticated"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <ExpressionOfInterestForm
      :eoi="eoi"
      :isLoading="isLoading"
      @setIsLoading="setIsLoading"
      :schoolYearOptions="schoolYearOptions"
      :pickListOptions="pickListOptions"
      :documentTypeOptions="documentTypeOptions"
      :schoolAuthorityOptions="schoolAuthorityOptions"
    />
  </v-container>
</template>

<script>
import ExpressionOfInterestForm from './ExpressionOfInterestForm.vue';
import { mapState } from 'pinia';
import { authStore } from '../../store/modules/auth';
import { documentStore } from '../../store/modules/document';
import { applicationsStore } from '../../store/modules/applications';
import { metaDataStore } from '../../store/modules/metaData';

export default {
  name: 'ExpressionOfInterestPage',
  components: {
    ExpressionOfInterestForm,
  },
  data: () => ({
    isLoading: true,
    eoi: null,
    documentTypeOptions: [],
    schoolYearOptions: [],
    pickListOptions: null,
    schoolAuthorityOptions: null,
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
    ...mapState(applicationsStore, [
      'getApplicationData',
      'getEOIApplicationById',
      'getEOI',
    ]),
    ...mapState(metaDataStore, [
      'getActiveSchoolYearSelect',
      'getActiveSchoolYear',
      'getEOIPickLists',
      'getEOIPickListOptions',
      'getSchoolAuthority',
      'getDocumentPickLists',
      'getDocumentPickListOptions',
      'getSchoolAuthorityListOptions',
    ]),
  },
  async created() {
    // PickLists - move to App.vue?
    // Wrap in Promise.all - silently fail and try again
    // ERROR after 3rd attempt?
    await metaDataStore().getActiveSchoolYear();
    await metaDataStore().getEOIPickLists();
    await metaDataStore().getDocumentPickLists();
    await metaDataStore().getSchoolAuthority();

    this.schoolAuthorityOptions = this.getSchoolAuthorityListOptions;
    this.schoolYearOptions = this.getActiveSchoolYearSelect;
    this.documentTypeOptions =
      this.getDocumentPickListOptions?.['iosas_eoidocumenttype'];
    this.pickListOptions = this.getEOIPickListOptions;
    if (this.$route.params.id) {
      await applicationsStore().getEOIApplicationById(this.$route.params.id);

      this.eoi = this.getEOI;
      console.log('THIS EOI on PAGE', this.eoi);
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
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
