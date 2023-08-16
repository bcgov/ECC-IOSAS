<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="items"
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

    <div v-else class="d-flex justify-space-between">
      <v-container fluid class="content-container d-flex">
        <v-row no-gutter>
          <v-col cols="12" sm="12" md="12" lg="9" xs="12">
            <div class="form-container">
              <div v-if="isViewOnly">
                <ExpressionOfInterestReadOnlyView
                  :eoi="eoi"
                  :draftStatusCode="draftStatusCode"
                />
              </div>
              <div v-else>
                <ExpressionOfInterestForm
                  :new="false"
                  :eoi="eoi"
                  :isLoading="isLoading"
                  :draftStatusCode="draftStatusCode"
                  @setIsLoading="setIsLoading"
                  @fetchEOIData="fetchEOIData"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="3" xs="12">
            <RelatedLinksCard :showExtraEOILink="!this.isViewOnly" />
            <ContactCard />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import ExpressionOfInterestForm from './ExpressionOfInterestForm.vue';
import ExpressionOfInterestReadOnlyView from './ExpressionOfInterestReadOnlyView.vue';
import ContactCard from '../common/ContactCard.vue';
import RelatedLinksCard from '../common/RelatedLinksCard.vue';
import { mapState } from 'pinia';
import { authStore } from '../../store/modules/auth';
import { documentStore } from '../../store/modules/document';
import { applicationsStore } from '../../store/modules/applications';
import { metaDataStore } from '../../store/modules/metaData';

export default {
  name: 'ExpressionOfInterestPage',
  components: {
    ContactCard,
    RelatedLinksCard,
    ExpressionOfInterestForm,
    ExpressionOfInterestReadOnlyView,
  },
  watch: {
    eoi: {
      handler(val, oldVal) {
        console.log('oldVal', oldVal);
        console.log('eoi val', val);
        if (val) {
          // NECESSARY??
          console.log('EOI, ', val);
          this.eoi = val;
          if (val.iosas_reviewstatus === this.draftStatusCode) {
            this.isViewOnly = false;
          }
        }
      },
    },
    isLoading: {
      handler(val, oldVAl) {
        console.log('ISLOADING OLD VAL', oldVAl);
        console.log('ISLOADING VAL', val);
      },
    },
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
    await applicationsStore().getEOIApplicationById(this.$route.params.id);
    this.eoi = this.getEOI;
    this.isViewOnly = this.eoi.iosas_reviewstatus !== this.draftStatusCode;
    this.isLoading = false;
  },
  methods: {
    authStore,
    metaDataStore,
    documentStore,
    setIsLoading(value) {
      console.log('SET IS LOADING');
      console.log('VALUE', value);
      return (this.isLoading = value);
    },
    fetchEOIData() {
      console.log('FETCHING DATA???');
      console.log('REFETCH????');
      this.isLoading = true;
      return applicationsStore()
        .getEOIApplicationById(this.$route.params.id)
        .then((res) => {
          console.log(res);
          this.eoi = this.getEOI;

          console.log(this.eoi);
          this.isViewOnly =
            this.eoi.iosas_reviewstatus !== this.draftStatusCode;
        })
        .finally((this.isLoading = false));
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
