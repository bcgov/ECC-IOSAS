<template>
  <v-container>
    <h4>Pre-Certification Documents</h4>
    <v-label class="sm"
      >Please see Step 4 of
      <a target="_blank" :href="GOV_URL.establishingSchoolURL"
        >Establishing an Independent School</a
      >
      for more information.</v-label
    >
    <br />
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
        :documentCategory="SCHOOL_APP_DOC_CATEGORY_CODE.preCert"
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
            <div
              v-if="proofOfPurchaseDoc.length !== 0"
              v-for="document in proofOfPurchaseDoc"
              :key="document.id"
              class="d-flex justify-space-between"
            >
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ document.fileName }}
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
            <v-btn
              v-else
              secondary
              class="mt-2 block"
              variant="outlined"
              @click="toggleUpload(SCHOOL_APP_DOC_CODES.proofOfPurchaseCode)"
              >Upload</v-btn
            >
          </v-col>
        </v-row>
        <RequiredMessage :condition="proofOfPurchaseDoc.length === 0" />
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Municipal compliance letter</v-label>
            <br />
            <v-label class="sm"
              >Please see
              <a target="_blank" :href="GOV_URL.munLetterDocx"
                >Local Government/Municipal Compliance Letter (DOCX)</a
              >
            </v-label>
            <div
              v-if="mulicipalComplianceDoc.length !== 0"
              v-for="document in mulicipalComplianceDoc"
              :key="document.id"
              class="d-flex justify-space-between"
            >
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ document.fileName }}
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
            <v-btn
              v-else
              secondary
              class="mt-2 block"
              variant="outlined"
              @click="
                toggleUpload(SCHOOL_APP_DOC_CODES.mulicipalComplianceCode)
              "
              >Upload</v-btn
            >
          </v-col>
        </v-row>
        <RequiredMessage :condition="mulicipalComplianceDoc.length === 0" />

        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label class="no-mb">Confirmation of water testing</v-label>
            <br />
            <v-label class="sm"
              >Please see
              <a target="_blank" :href="GOV_URL.leadTestingUrl"
                >Testing Lead Content in Drinking Water of Independent
                Schools.</a
              >
            </v-label>
            <br />
            <div
              v-if="confimationWaterTestingDoc.length !== 0"
              v-for="document in confimationWaterTestingDoc"
              :key="document.id"
              class="d-flex justify-space-between"
            >
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ document.fileName }}
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
            <v-btn
              v-else
              secondary
              class="mt-2 block"
              variant="outlined"
              @click="
                toggleUpload(SCHOOL_APP_DOC_CODES.confimationWaterTestingCode)
              "
              >Upload</v-btn
            >
          </v-col>
        </v-row>
        <RequiredMessage :condition="confimationWaterTestingDoc.length === 0" />
        <br />
        <v-divider></v-divider>
        <br />
        <h4>Additional Documents</h4>
        <br />
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Other</v-label>
            <div
              v-for="document in applicationDocuments.filter(
                ({ documentType }) =>
                  documentType === SCHOOL_APP_DOC_CODES.preCertOther
              )"
              :key="document.id"
            >
              <div class="d-flex justify-space-between">
                <div>
                  <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                    mdi-file-document-check-outline
                  </v-icon>
                  {{ document.fileName }}
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
              @click="toggleUpload(SCHOOL_APP_DOC_CODES.preCertOther)"
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
          <br />
          <v-row>
            <v-col cols="12" sm="12" md="8" xs="12">
              <v-label class="no-mb"
                >Irrevocable letter of credit or surety bond</v-label
              >
              <div
                v-if="creditOrSurityBondDoc.length !== 0"
                v-for="document in creditOrSurityBondDoc"
                :key="document.id"
                class="d-flex justify-space-between"
              >
                <div>
                  <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                    mdi-file-document-check-outline
                  </v-icon>
                  {{ document.fileName }}
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
              <v-btn
                v-else
                secondary
                class="mt-2 block"
                variant="outlined"
                @click="
                  toggleUpload(SCHOOL_APP_DOC_CODES.creditOrSurityBondCode)
                "
                >Upload</v-btn
              >
            </v-col>
          </v-row>
          <RequiredMessage :condition="creditOrSurityBondDoc.length === 0" />
        </div>
      </div>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-label>Proof of lease/purchase of facility</v-label>
          <div
            v-if="proofOfPurchaseDoc.length !== 0"
            v-for="document in proofOfPurchaseDoc"
            :key="document.id"
            class="d-flex justify-space-between"
          >
            <div>
              <v-icon aria-hidden="false" color="rgb(0, 51, 102)" size="20">
                mdi-file-document-check-outline
              </v-icon>
              {{ document.fileName }}
            </div>
          </div>
          <div v-else>{{ NULL_STRING }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Municipal compliance letter</v-label>
          <br />
          <v-label class="sm"
            >Please see
            <a target="_blank" :href="GOV_URL.munLetterDocx"
              >Local Government/Municipal Compliance Letter (DOCX)</a
            >
          </v-label>
          <br />
          <div
            v-if="mulicipalComplianceDoc.length !== 0"
            v-for="document in mulicipalComplianceDoc"
            :key="document.id"
            class="d-flex justify-space-between"
          >
            <div>
              <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                mdi-file-document-check-outline
              </v-icon>
              {{ document.fileName }}
            </div>
          </div>
          <div v-else>{{ NULL_STRING }}</div>
        </v-col>
      </v-row>
      <br />
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Confirmation of water testing</v-label>
          <br />
          <v-label class="sm"
            >Please see
            <a target="_blank" :href="GOV_URL.leadTestingUrl"
              >Testing Lead Content in Drinking Water of Independent Schools.</a
            >
          </v-label>
          <br />
          <div
            v-if="confimationWaterTestingDoc.length !== 0"
            v-for="document in confimationWaterTestingDoc"
            :key="document.id"
            class="d-flex justify-space-between"
          >
            <div>
              <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                mdi-file-document-check-outline
              </v-icon>
              {{ document.fileName }}
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
            v-for="document in applicationDocuments.filter(
              ({ documentType }) =>
                documentType === SCHOOL_APP_DOC_CODES.preCertOther
            )"
            :key="document.id"
            v-if="
              applicationDocuments.filter(
                ({ documentType }) =>
                  documentType === SCHOOL_APP_DOC_CODES.preCertOther
              ).length > 0
            "
          >
            <div class="d-flex justify-space-between">
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ document.fileName }}
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
        <br />
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Irrevocable letter of credit or surety bond</v-label>
            <div
              v-if="creditOrSurityBondDoc.length !== 0"
              v-for="document in creditOrSurityBondDoc"
              :key="document.id"
              class="d-flex justify-space-between"
            >
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ document.fileName }}
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
import * as Rules from '../../../utils/formRules';
import { mapState, mapActions } from 'pinia';
import { metaDataStore } from '../../../store/modules/metaData';
import { documentStore } from '../../../store/modules/document';
import alertMixin from '../../../mixins/alertMixin';
import DocumentUpload from '../../common/DocumentUpload.vue';
import RequiredMessage from '../../RequiredMessage.vue';
import { GOV_URL, NULL_STRING } from '../../../utils/constants';
import {
  SCHOOL_APP_DOC_CODES,
  GROUP_CLASSIFICATION_CODES,
  SCHOOL_APP_DOC_CATEGORY_CODE,
} from '../../../utils/application';

export default {
  name: 'PreCertificationTab',
  emit: ['validateForm', 'removeDocument'],
  mixins: [alertMixin],
  components: {
    DocumentUpload,
    RequiredMessage,
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
    isFormValid: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    applicationDocuments: {
      handler(val) {
        this.proofOfPurchaseDoc = val.filter(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_DOC_CODES.proofOfPurchaseCode
        );
        this.mulicipalComplianceDoc = val.filter(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_DOC_CODES.mulicipalComplianceCode
        );
        this.confimationWaterTestingDoc = val.filter(
          ({ documentType }) =>
            documentType ===
            this.SCHOOL_APP_DOC_CODES.confimationWaterTestingCode
        );
        this.creditOrSurityBondDoc = val.filter(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_DOC_CODES.creditOrSurityBondCode
        );

        if (val.length > 0 && this.isFormValid === false) {
          this.$emit('validateForm');
        }
      },
    },
  },
  data: () => ({
    GOV_URL,
    NULL_STRING,
    rules: Rules,
    SCHOOL_APP_DOC_CODES,
    GROUP_CLASSIFICATION_CODES,
    SCHOOL_APP_DOC_CATEGORY_CODE,
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
    ...mapState(documentStore, ['applicationDocuments']),
  },
  mounted() {},
  created() {
    this.proofOfPurchaseDoc = this.applicationDocuments?.filter(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_DOC_CODES.proofOfPurchaseCode
    );
    this.mulicipalComplianceDoc = this.applicationDocuments?.filter(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_DOC_CODES.mulicipalComplianceCode
    );
    this.confimationWaterTestingDoc = this.applicationDocuments?.filter(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_DOC_CODES.confimationWaterTestingCode
    );
    this.creditOrSurityBondDoc = this.applicationDocuments?.filter(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_DOC_CODES.creditOrSurityBondCode
    );
  },
  methods: {
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
      return (
        this.formData.iosas_groupclassification ===
        this.GROUP_CLASSIFICATION_CODES.groupFour
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.v-label {
  display: inline;
}
</style>
