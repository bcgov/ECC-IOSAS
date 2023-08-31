<template>
  <v-container>
    <h4>Pre-Certification Documents</h4>
    <br />
    <v-dialog v-model="preCertDocumentUpload" width="auto">
      <DocumentUpload
        ref="preCertDocumentUpload"
        @upload="upload"
        @close="closeDocumentDialog"
        :options="
          getDocumentPickListOptions?.['iosas_newschoolapplicationdocumenttype']
        "
        :selectedOption="selectedDocumentOption"
      />
    </v-dialog>
    <div v-if="isPreCertEditable">
      <v-row v-if="isDocumentsLoading" class="document-loader">
        <v-col class="d-flex justify-center">
          <v-progress-circular
            class="mt-16"
            :size="70"
            :width="7"
            color="primary"
            indeterminate
            :active="isDocumentsLoading"
          />
        </v-col>
      </v-row>
      <div v-else>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Proof of lease/purchase of facility</v-label>
            <div v-if="proofOfPurchaseDoc" class="d-flex justify-space-between">
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ formatLongName(proofOfPurchaseDoc.fileName) }}
              </div>
              <v-btn
                secondary
                class="ml-15"
                variant="flat"
                size="sm"
                @click.stop="this.$emit('removeDocument', proofOfPurchaseDoc)"
                ><v-icon aria-hidden="false" color="#b00020" size="20">
                  mdi-delete-forever-outline
                </v-icon></v-btn
              >
            </div>
            <v-btn
              v-else
              secondary
              class="mt-2 block"
              variant="outlined"
              @click="toggleUpload(SCHOOL_APP_CODE_CODES.proofOfPurchaseCode)"
              >Upload</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Municipal compliance letter</v-label>

            <div
              v-if="mulicipalComplianceDoc"
              class="d-flex justify-space-between"
            >
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ formatLongName(mulicipalComplianceDoc.fileName) }}
              </div>
              <v-btn
                secondary
                class="ml-15"
                variant="flat"
                size="sm"
                @click.stop="
                  this.$emit('removeDocument', mulicipalComplianceDoc)
                "
                ><v-icon aria-hidden="false" color="#b00020" size="20">
                  mdi-delete-forever-outline
                </v-icon></v-btn
              >
            </div>
            <v-btn
              v-else
              secondary
              class="mt-2 block"
              variant="outlined"
              @click="
                toggleUpload(SCHOOL_APP_CODE_CODES.mulicipalComplianceCode)
              "
              >Upload</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label class="no-mb">Confirmation of water testing</v-label>
            <div
              v-if="confimationWaterTestingDoc"
              class="d-flex justify-space-between"
            >
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ formatLongName(confimationWaterTestingDoc.fileName) }}
              </div>
              <v-btn
                secondary
                class="ml-15"
                variant="flat"
                size="sm"
                @click.stop="
                  this.$emit('removeDocument', confimationWaterTestingDoc)
                "
                ><v-icon aria-hidden="false" color="#b00020" size="20">
                  mdi-delete-forever-outline
                </v-icon></v-btn
              >
            </div>
            <v-btn
              v-else
              secondary
              class="mt-2 block"
              variant="outlined"
              @click="
                toggleUpload(SCHOOL_APP_CODE_CODES.confimationWaterTestingCode)
              "
              >Upload</v-btn
            >
          </v-col>
        </v-row>
        <br />
        <v-divider></v-divider>
        <br />
        <h4>Additional Documents</h4>
        <br />
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Other</v-label>
            <div
              v-for="document in getApplicationDocuments.filter(
                ({ documentType }) =>
                  documentType === SCHOOL_APP_CODE_CODES.preCertOther
              )"
              :key="document.id"
            >
              <div class="d-flex justify-space-between">
                <div>
                  <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                    mdi-file-document-check-outline
                  </v-icon>
                  {{ formatLongName(document.fileName) }}
                </div>
                <v-btn
                  secondary
                  class="ml-15"
                  variant="flat"
                  size="sm"
                  @click.stop="this.$emit('removeDocument', document)"
                  ><v-icon aria-hidden="false" color="#b00020" size="20">
                    mdi-delete-forever-outline
                  </v-icon></v-btn
                >
              </div>
            </div>
            <v-btn
              secondary
              class="mt-2 block"
              variant="outlined"
              @click="toggleUpload(SCHOOL_APP_CODE_CODES.preCertOther)"
              >Upload</v-btn
            >
          </v-col>
        </v-row>
        <br />
        <div v-if="isGroupFour()">
          <br />
          <v-divider></v-divider>
          <br />
          <h4>Group 4 Documents</h4>
          <v-label class="sm">Schools seeking Group 4 only</v-label>
          <br />
          <br />
          <v-row>
            <v-col cols="12" sm="12" md="8" xs="12">
              <v-label class="no-mb"
                >Irrevocable letter of credit or surety bond</v-label
              >
              <div
                v-if="creditOrSurityBondDoc"
                class="d-flex justify-space-between"
              >
                <div>
                  <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                    mdi-file-document-check-outline
                  </v-icon>
                  {{ formatLongName(creditOrSurityBondDoc.fileName) }}
                </div>
                <v-btn
                  secondary
                  class="ml-15"
                  variant="flat"
                  size="sm"
                  @click.stop="
                    this.$emit('removeDocument', creditOrSurityBondDoc)
                  "
                  ><v-icon aria-hidden="false" color="#b00020" size="20">
                    mdi-delete-forever-outline
                  </v-icon></v-btn
                >
              </div>
              <v-btn
                v-else
                secondary
                class="mt-2 block"
                variant="outlined"
                @click="
                  toggleUpload(SCHOOL_APP_CODE_CODES.creditOrSurityBondCode)
                "
                >Upload</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-label>Proof of lease/purchase of facility</v-label>
          <div v-if="proofOfPurchaseDoc">
            <v-icon aria-hidden="false" color="rgb(0, 51, 102)" size="20">
              mdi-file-document-check-outline
            </v-icon>
            {{ formatLongName(proofOfPurchaseDoc.fileName) }}
          </div>
          <div v-else>{{ NULL_STRING }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Municipal compliance letter</v-label>
          <div
            v-if="mulicipalComplianceDoc"
            class="d-flex justify-space-between"
          >
            <div>
              <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                mdi-file-document-check-outline
              </v-icon>
              {{ formatLongName(mulicipalComplianceDoc.fileName) }}
            </div>
          </div>
          <div v-else>{{ NULL_STRING }}</div>
        </v-col>
      </v-row>
      <br />
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Confirmation of water testing</v-label>
          <div
            v-if="confimationWaterTestingDoc"
            class="d-flex justify-space-between"
          >
            <div>
              <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                mdi-file-document-check-outline
              </v-icon>
              {{ formatLongName(confimationWaterTestingDoc.fileName) }}
            </div>
          </div>
          <div v-else>{{ NULL_STRING }}</div>
        </v-col>
      </v-row>
      <br />
      <v-divider></v-divider>
      <br />
      <h4>Additional Documents</h4>
      <br />
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Other</v-label>
          <div
            v-for="document in getApplicationDocuments.filter(
              ({ documentType }) =>
                documentType === SCHOOL_APP_CODE_CODES.preCertOther
            )"
            :key="document.id"
            v-if="
              getApplicationDocuments.filter(
                ({ documentType }) =>
                  documentType === SCHOOL_APP_CODE_CODES.preCertOther
              ).length > 0
            "
          >
            <div class="d-flex justify-space-between">
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ formatLongName(document.fileName) }}
              </div>
            </div>
          </div>
          <div v-else>{{ NULL_STRING }}</div>
        </v-col>
      </v-row>
      <br />
      <div v-if="isGroupFour()">
        <v-divider></v-divider>
        <br />
        <h4>Group 4 Documents</h4>
        <v-label class="sm">Schools seeking Group 4 only</v-label>
        <br />
        <br />
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Irrevocable letter of credit or surety bond</v-label>
            <div
              v-if="creditOrSurityBondDoc"
              class="d-flex justify-space-between"
            >
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ formatLongName(creditOrSurityBondDoc.fileName) }}
              </div>
            </div>
            <div v-else>{{ NULL_STRING }}</div>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { mapState, mapActions } from 'pinia';
import { metaDataStore } from '../../../store/modules/metaData';
import { documentStore } from '../../../store/modules/document';
import alertMixin from '../../../mixins/alertMixin';
import DocumentUpload from '../../common/DocumentUpload.vue';
import {
  formatBooleanToYesNoString,
  formatLongName,
} from '../../../utils/format';
import {
  GOV_URL,
  SCHOOL_APP_CODE_CODES,
  NULL_STRING,
} from '../../../utils/constants';

export default {
  name: 'PreCertificationTab',
  emit: ['validateAndPopulate', 'removeDocument'],
  mixins: [alertMixin],
  components: {
    DocumentUpload,
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    isPreCertEditable: {
      type: Boolean,
      required: true,
    },
    isDocumentsLoading: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    getApplicationDocuments: {
      handler(val) {
        this.proofOfPurchaseDoc = val.find(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_CODE_CODES.proofOfPurchaseCode
        );
        this.mulicipalComplianceDoc = val.find(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_CODE_CODES.mulicipalComplianceCode
        );
        this.confimationWaterTestingDoc = val.find(
          ({ documentType }) =>
            documentType ===
            this.SCHOOL_APP_CODE_CODES.confimationWaterTestingCode
        );
        this.creditOrSurityBondDoc = val.find(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_CODE_CODES.creditOrSurityBondCode
        );
      },
    },
  },
  data: () => ({
    GOV_URL,
    NULL_STRING,
    rules: Rules,
    SCHOOL_APP_CODE_CODES,
    groupFourCode: 100000002,
    preCertDocumentUpload: false,
    selectedDocumentOption: null,

    // categorized documents
    proofOfPurchaseDoc: null,
    mulicipalComplianceDoc: null,
    confimationWaterTestingDoc: null,
    creditOrSurityBondDoc: null,
  }),
  computed: {
    ...mapState(metaDataStore, ['getDocumentPickListOptions']),
    ...mapState(documentStore, ['getApplicationDocuments']),
  },
  mounted() {},
  created() {
    this.proofOfPurchaseDoc = this.getApplicationDocuments?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.proofOfPurchaseCode
    );
    this.mulicipalComplianceDoc = this.getApplicationDocuments?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.mulicipalComplianceCode
    );
    this.confimationWaterTestingDoc = this.getApplicationDocuments?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.confimationWaterTestingCode
    );
    this.creditOrSurityBondDoc = this.getApplicationDocuments?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.creditOrSurityBondCode
    );
  },
  methods: {
    formatBooleanToYesNoString,
    formatLongName,
    ...mapActions(documentStore, ['addApplicationDocument']),
    closeDocumentDialog() {
      this.preCertDocumentUpload = false;
    },
    toggleUpload(documentCode = null) {
      this.selectedDocumentOption = documentCode;
      this.preCertDocumentUpload = true;
    },
    async upload(document) {
      this.addApplicationDocument(document);
    },
    isGroupFour() {
      return this.formData.iosas_groupclassification === this.groupFourCode;
    },
  },
};
</script>

<style scoped>
.v-label {
  display: inline;
}
</style>
