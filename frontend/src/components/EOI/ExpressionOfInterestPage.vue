<template>
  <div v-if="isLoading" />
  <v-container fluid class="full-height" v-else>
    <v-breadcrumbs :items="items"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <div class="d-flex justify-space-between">
      <v-container fluid class="content-container d-flex">
        <v-row no-gutter>
          <v-col cols="12" sm="12" md="12" lg="9" xs="12">
            <div class="form-container">
              <div v-if="isViewOnly">
                <ExpressionOfInterestReadOnlyView :eoi="eoi" />
              </div>
              <div v-else>
                <ExpressionOfInterestForm
                  :isNew="false"
                  :eoi="eoi"
                  @updateEOIData="updateEOIData"
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
import ApiService from '../../common/apiService';
import alertMixin from './../../mixins/alertMixin';
import { EOI_STATUS_CODES } from '../../utils/application';
import { mapState, mapActions } from 'pinia';
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
  mixins: [alertMixin],
  watch: {
    eoi: {
      handler(val) {
        if (val) {
          this.eoi = val;
          if (val.iosas_reviewstatus === this.EOI_STATUS_CODES.draft) {
            this.isViewOnly = false;
          }
        }
      },
    },
  },
  data: () => ({
    isViewOnly: false,
    EOI_STATUS_CODES,
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
    ...mapState(authStore, ['isLoading']),
    ...mapState(applicationsStore, ['getEOI']),
  },
  async created() {
    await this.fetchEOIData();
    // await this.setLoading(true);
    // await this.getEOIApplicationById(this.$route.params.id);
    // this.eoi = this.getEOI;
    // this.isViewOnly =
    //   this.eoi.iosas_reviewstatus !== this.EOI_STATUS_CODES.draft;
    // await this.setLoading(false);
  },
  methods: {
    authStore,
    metaDataStore,
    documentStore,
    ...mapActions(authStore, ['setLoading']),
    ...mapActions(applicationsStore, ['getEOIApplicationById']),
    async fetchEOIData() {
      this.setLoading(true);

      return this.getEOIApplicationById(this.$route.params.id).then(() => {
        this.eoi = this.getEOI;
        this.isViewOnly =
          this.eoi.iosas_reviewstatus !== this.EOI_STATUS_CODES.draft;
        this.setLoading(false);
        return this.eoi;
      });
    },
    async handleUpladDocuments(eoiID, documents) {
      const documentsNotUploaded = documents.filter((doc) => doc.content);
      Promise.all(
        documentsNotUploaded.map(async (document) => {
          const payload = {
            ...document,
            regardingId: eoiID,
            regardingType: 'iosas_expressionofinterest',
          };
          await ApiService.uploadFile(payload)
            .then((response) => {
              return response;
            })
            .catch((error) => {
              this.setFailureAlert(
                error?.response?.data?.message
                  ? error?.response?.data?.message
                  : 'An error occurred while saving the expression of Interest. Please try again later.'
              );
            });
        })
      );
    },
    async updateEOIData(id, payload, isSubmitted, documents) {
      try {
        this.setLoading(true);
        const updateResponse = await ApiService.updateEOI(
          id,
          payload,
          isSubmitted
        );
        if (updateResponse.data) {
          let eoi;
          if (documents.length > 0) {
            await this.handleUpladDocuments(id, documents);
            eoi = await this.fetchEOIData();
          } else {
            eoi = await this.fetchEOIData();
          }

          if (isSubmitted && eoi) {
            this.$router.push({
              name: 'applicationConfirmation',
              params: { type: 'EOI' },
            });
            this.setLoading(false);
          } else {
            this.setLoading(false);
            this.setSuccessAlert(
              `Success! Expression of Interest ${payload.iosas_eoinumber} has been updated.`
            );
          }
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
