<template>
  <v-container>
    <h4>Documents</h4>
    <br />
    <v-dialog v-model="documentUpload" width="auto">
      <DocumentUpload
        ref="documentUpload"
        @upload="upload"
        @close="closeDocumentDialog"
        :options="
          getDocumentPickListOptions?.['iosas_newschoolapplicationdocumenttype']
        "
        :selectedOption="selectedDocumentOption"
      />
    </v-dialog>
    <div v-if="isEditing">
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
            <v-label class="no-mb">School Policy/Procedure Manual</v-label>
            <br />
            <v-label class="sm"
              >Complete set of policies/procedures as outlined in the
              <a :href="GOV_URL.interviewChecklistPDFUrl"
                >Interview Checklist (PDF)</a
              >
            </v-label>

            <div v-if="schoolPolicyDoc" class="d-flex justify-space-between">
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ formatLongName(schoolPolicyDoc.fileName) }}
              </div>
              <v-btn
                secondary
                class="ml-15"
                variant="flat"
                size="sm"
                @click.stop="this.$emit('removeDocument', schoolPolicyDoc)"
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
              @click="toggleUpload(SCHOOL_APP_CODE_CODES.schoolPolicyCode)"
              >Upload</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label class="no-mb">Business Plan</v-label>
            <br />
            <v-label class="sm"
              >Business Plan with required financial information (Part A and B)
              <a :href="GOV_URL.interviewChecklistPDFUrl"
                >Interview Checklist (PDF)</a
              >
            </v-label>

            <div v-if="businessPlanDoc" class="d-flex justify-space-between">
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ formatLongName(businessPlanDoc.fileName) }}
              </div>
              <v-btn
                secondary
                class="ml-15"
                variant="flat"
                size="sm"
                @click.stop="this.$emit('removeDocument', businessPlanDoc)"
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
              @click="toggleUpload(SCHOOL_APP_CODE_CODES.businessPlanCode)"
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
                  documentType === SCHOOL_APP_CODE_CODES.otherDocCode
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
              @click="toggleUpload(SCHOOL_APP_CODE_CODES.otherDocCode)"
              >Upload</v-btn
            >
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
              <v-label class="no-mb"
                >Written confirmation of eligibility</v-label
              >
              <div
                v-if="confirmationOfEligibilityDoc"
                class="d-flex justify-space-between"
              >
                <div>
                  <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                    mdi-file-document-check-outline
                  </v-icon>
                  {{ formatLongName(confirmationOfEligibilityDoc.fileName) }}
                </div>
                <v-btn
                  secondary
                  class="ml-15"
                  variant="flat"
                  size="sm"
                  @click.stop="
                    this.$emit('removeDocument', confirmationOfEligibilityDoc)
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
                  toggleUpload(
                    SCHOOL_APP_CODE_CODES.confirmationOfEligibilityCode
                  )
                "
                >Upload</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="8" xs="12">
              <v-label class="no-mb"
                >Completed Free/Tuition Refund Policy</v-label
              >
              <div
                v-if="tuitionRefundPolicyDoc"
                class="d-flex justify-space-between"
              >
                <div>
                  <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                    mdi-file-document-check-outline
                  </v-icon>
                  {{ formatLongName(tuitionRefundPolicyDoc.fileName) }}
                </div>
                <v-btn
                  secondary
                  class="ml-15"
                  variant="flat"
                  size="sm"
                  @click.stop="
                    this.$emit('removeDocument', tuitionRefundPolicyDoc)
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
                  toggleUpload(SCHOOL_APP_CODE_CODES.tuitionRefundPolicyCode)
                "
                >Upload</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="8" xs="12">
              <v-label class="no-mb"
                >Contact Information for two business references</v-label
              >
              <div
                v-if="businessReferencesDoc"
                class="d-flex justify-space-between"
              >
                <div>
                  <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                    mdi-file-document-check-outline
                  </v-icon>
                  {{ formatLongName(businessReferencesDoc.fileName) }}
                </div>
                <v-btn
                  secondary
                  class="ml-15"
                  variant="flat"
                  size="sm"
                  @click.stop="
                    this.$emit('removeDocument', businessReferencesDoc)
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
                  toggleUpload(SCHOOL_APP_CODE_CODES.businessReferencesCode)
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
          <v-label class="no-mb">School Policy/Procedure Manual</v-label>
          <br />
          <v-label class="sm"
            >Complete set of policies/procedures as outlined in the
            <a :href="GOV_URL.interviewChecklistPDFUrl"
              >Interview Checklist (PDF)</a
            >
          </v-label>
          <div v-if="schoolPolicyDoc">
            <v-icon aria-hidden="false" color="rgb(0, 51, 102)" size="20">
              mdi-file-document-check-outline
            </v-icon>
            {{ formatLongName(schoolPolicyDoc.fileName) }}
          </div>
          <div v-else>{{ NULL_STRING }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label class="no-mb">Business Plan</v-label>
          <br />
          <v-label class="sm"
            >Business Plan with required financial information (Part A and B)
            <a :href="GOV_URL.interviewChecklistPDFUrl"
              >Interview Checklist (PDF)</a
            >
          </v-label>

          <div v-if="businessPlanDoc" class="d-flex justify-space-between">
            <div>
              <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                mdi-file-document-check-outline
              </v-icon>
              {{ formatLongName(businessPlanDoc.fileName) }}
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
                documentType === SCHOOL_APP_CODE_CODES.otherDocCode
            )"
            :key="document.id"
            v-if="
              getApplicationDocuments.filter(
                ({ documentType }) =>
                  documentType === SCHOOL_APP_CODE_CODES.otherDocCode
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
            <v-label>Written confirmation of eligibility</v-label>
            <div
              v-if="confirmationOfEligibilityDoc"
              class="d-flex justify-space-between"
            >
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ formatLongName(confirmationOfEligibilityDoc.fileName) }}
              </div>
            </div>
            <div v-else>{{ NULL_STRING }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Completed Free/Tuition Refund Policy</v-label>
            <div
              v-if="tuitionRefundPolicyDoc"
              class="d-flex justify-space-between"
            >
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ formatLongName(tuitionRefundPolicyDoc.fileName) }}
              </div>
            </div>
            <div v-else>{{ NULL_STRING }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Contact Information for two business references</v-label>
            <div
              v-if="businessReferencesDoc"
              class="d-flex justify-space-between"
            >
              <div>
                <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
                  mdi-file-document-check-outline
                </v-icon>
                {{ formatLongName(businessReferencesDoc.fileName) }}
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
import { formatLongName } from '../../../utils/format';
import {
  GOV_URL,
  SCHOOL_APP_CODE_CODES,
  NULL_STRING,
} from '../../../utils/constants';
export default {
  name: 'DocumentTab',
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
    isEditing: {
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
        this.schoolPolicyDoc = val.find(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_CODE_CODES.schoolPolicyCode
        );
        this.businessPlanDoc = val.find(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_CODE_CODES.businessPlanCode
        );
        this.confirmationOfEligibilityDoc = val.find(
          ({ documentType }) =>
            documentType ===
            this.SCHOOL_APP_CODE_CODES.confirmationOfEligibilityCode
        );
        this.tuitionRefundPolicyDoc = val.find(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_CODE_CODES.tuitionRefundPolicyCode
        );
        this.businessReferencesDoc = val.find(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_CODE_CODES.businessReferencesCode
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
    documentUpload: false,
    selectedDocumentOption: null,

    // categorized documents
    schoolPolicyDoc: null,
    businessPlanDoc: null,
    confirmationOfEligibilityDoc: null,
    tuitionRefundPolicyDoc: null,
    businessReferencesDoc: null,
  }),
  mounted() {},
  created() {
    this.schoolPolicyDoc = this.getApplicationDocuments?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.schoolPolicyCode
    );
    this.businessPlanDoc = this.getApplicationDocuments?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.businessPlanCode
    );
    this.confirmationOfEligibilityDoc = this.getApplicationDocuments?.find(
      ({ documentType }) =>
        documentType ===
        this.SCHOOL_APP_CODE_CODES.confirmationOfEligibilityCode
    );
    this.tuitionRefundPolicyDoc = this.getApplicationDocuments?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.tuitionRefundPolicyCode
    );
    this.businessReferencesDoc = this.getApplicationDocuments?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.businessReferencesCode
    );
  },
  computed: {
    ...mapState(metaDataStore, ['getDocumentPickListOptions']),
    ...mapState(documentStore, ['getApplicationDocuments']),
  },
  methods: {
    formatLongName,
    ...mapActions(documentStore, ['addApplicationDocument']),
    closeDocumentDialog() {
      this.documentUpload = false;
    },
    toggleUpload(documentCode = null) {
      this.selectedDocumentOption = documentCode;
      this.documentUpload = true;
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
