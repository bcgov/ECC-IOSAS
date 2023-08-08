<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="items" v-if="authStore().isAuthenticated"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <ExpressionOfInterestForm
      :eoi="getEOIApplicationById(this.$route.params.id)"
      :isLoading="isLoading"
      @setIsLoading="setIsLoading"
      :schoolYearOptions="schoolYearOptions"
      :pickListOptions="pickListOptions"
      :documentTypeOptions="documentTypeOptions"
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
    documentTypeOptions: [],
    schoolYearOptions: [],
    pickListOptions: null,
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
    ]),
    ...mapState(metaDataStore, [
      'getActiveSchoolYearSelect',
      'getActiveSchoolYear',
      'getEOIPickLists',
      'getEOIPickListOptions',
      'getSchoolAuthority',
      'getDocumentPickLists',
      'getDocumentPickListOptions',
      'getSchoolAuthority',
    ]),
    // ...mapState(documentStore, [
    //   'getEOIDocumentOptionsSelect',
    //   'getEOIDocumentTypeCodes',
    // ]),
  },
  async created() {
    // await metaDataStore().getActiveSchoolYear();
    // await applicationsStore().getApplicationData();
    // await metaDataStore().getSchoolAuthority();

    // Wrap in Promise.all - silently fail and try again
    // ERROR after 3rd attempt?
    // await metaDataStore().getEOIPickLists();
    // await metaDataStore().getDocumentPickLists();
    // await metaDataStore().getSchoolAuthority();
    // await documentStore().getEOIDocumentTypeCodes();

    this.schoolYearOptions = this.getActiveSchoolYearSelect;
    this.documentTypeOptions =
      this.getDocumentPickListOptions?.['iosas_eoidocumenttype'];
    // console.log(this.documentTypeOptions);
    this.pickListOptions = this.getEOIPickListOptions;
    console.log(this.documentTypeOptions);
    // console.log(this.schoolYearOptions);
    this.isLoading = false;
  },
  methods: {
    authStore,
    metaDataStore,
    documentStore,
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
</style>
