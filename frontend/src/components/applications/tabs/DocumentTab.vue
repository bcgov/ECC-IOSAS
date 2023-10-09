<template>
  <v-container>
    <h4>Documents</h4>
    <v-label class="sm"
      >Please see
      <a target="_blank" :href="GOV_URL.interviewChecklistPDFUrl"
        >Interview Checklist</a
      >
      for information.</v-label
    >
    <br />
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
        :documentCategory="SCHOOL_APP_DOC_CATEGORY_CODE.shcoolApplication"
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
            <div
              v-if="schoolPolicyDoc.length !== 0"
              class="d-flex justify-space-between"
              v-for="document in schoolPolicyDoc"
              :key="document.id"
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
              @click="toggleUpload(SCHOOL_APP_DOC_CODES.schoolPolicyCode)"
              >Upload</v-btn
            >
          </v-col>
        </v-row>
        <RequiredMessage :condition="schoolPolicyDoc.length === 0" />
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label class="no-mb">Business Plan</v-label>
            <br />
            <v-label class="sm"
              >Upload Word or PDF version of Business Plan; including Part A and
              Part B here.</v-label
            >

            <div
              class="d-flex justify-space-between"
              v-for="document in businessPlanDoc"
              :key="document.id"
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
              v-if="businessPlanDoc.length <= 2"
              secondary
              class="mt-2 block"
              variant="outlined"
              @click="toggleUpload(SCHOOL_APP_DOC_CODES.businessPlanCode)"
              >Upload</v-btn
            >
          </v-col>
        </v-row>
        <RequiredMessage :condition="businessPlanDoc.length === 0" />
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
                  documentType === SCHOOL_APP_DOC_CODES.otherDocCode
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
              @click="toggleUpload(SCHOOL_APP_DOC_CODES.otherDocCode)"
              >Upload</v-btn
            >
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
              <v-label class="no-mb"
                >Written confirmation of eligibility</v-label
              >
              <div
                v-if="confirmationOfEligibilityDoc.length !== 0"
                class="d-flex justify-space-between"
                v-for="document in confirmationOfEligibilityDoc"
                :key="document.id"
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
                  toggleUpload(
                    SCHOOL_APP_DOC_CODES.confirmationOfEligibilityCode
                  )
                "
                >Upload</v-btn
              >
            </v-col>
          </v-row>
          <RequiredMessage
            :condition="confirmationOfEligibilityDoc.length === 0"
          />
          <v-row>
            <v-col cols="12" sm="12" md="8" xs="12">
              <v-label class="no-mb"
                >Completed Free/Tuition Refund Policy</v-label
              >
              <div
                v-if="tuitionRefundPolicyDoc.length !== 0"
                v-for="document in tuitionRefundPolicyDoc"
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
                  toggleUpload(SCHOOL_APP_DOC_CODES.tuitionRefundPolicyCode)
                "
                >Upload</v-btn
              >
            </v-col>
          </v-row>
          <RequiredMessage :condition="tuitionRefundPolicyDoc.length === 0" />
          <v-row>
            <v-col cols="12" sm="12" md="8" xs="12">
              <v-label class="no-mb"
                >Contact Information for two business references</v-label
              >
              <div
                v-if="businessReferencesDoc.length !== 0"
                v-for="document in businessReferencesDoc"
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
                  toggleUpload(SCHOOL_APP_DOC_CODES.businessReferencesCode)
                "
                >Upload</v-btn
              >
            </v-col>
          </v-row>
          <RequiredMessage :condition="businessReferencesDoc.length === 0" />
        </div>
      </div>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-label class="no-mb">School Policy/Procedure Manual</v-label>
          <div
            v-if="schoolPolicyDoc.length !== 0"
            class="d-flex justify-space-between"
            v-for="document in schoolPolicyDoc"
            :key="document.id"
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
          <v-label class="no-mb">Business Plan</v-label>

          <div
            v-if="businessPlanDoc.length !== 0"
            class="d-flex justify-space-between"
            v-for="document in businessPlanDoc"
            :key="document.id"
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
                documentType === SCHOOL_APP_DOC_CODES.otherDocCode
            )"
            :key="document.id"
            v-if="
              applicationDocuments.filter(
                ({ documentType }) =>
                  documentType === SCHOOL_APP_DOC_CODES.otherDocCode
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
            <v-label>Written confirmation of eligibility</v-label>
            <div
              v-if="confirmationOfEligibilityDoc.length !== 0"
              class="d-flex justify-space-between"
              v-for="document in confirmationOfEligibilityDoc"
              :key="document.id"
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
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Completed Free/Tuition Refund Policy</v-label>
            <div
              v-if="tuitionRefundPolicyDoc.length !== 0"
              v-for="document in tuitionRefundPolicyDoc"
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
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Contact Information for two business references</v-label>
            <div
              v-if="businessReferencesDoc.length !== 0"
              v-for="document in businessReferencesDoc"
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
import RequiredMessage from '../../util/RequiredMessage.vue';
import { GOV_URL, NULL_STRING } from '../../../utils/constants';
import {
  SCHOOL_APP_DOC_CODES,
  GROUP_CLASSIFICATION_CODES,
  SCHOOL_APP_DOC_CATEGORY_CODE,
} from '../../../utils/application';
export default {
  name: 'DocumentTab',
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
    isEditing: {
      type: Boolean,
      required: true,
    },
    isDocumentsLoading: {
      type: Boolean,
      required: true,
    },
    isFormValid: {
      type: Boolean,
      default: null,
    },
  },
  watch: {
    applicationDocuments: {
      handler(val) {
        this.schoolPolicyDoc = val.filter(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_DOC_CODES.schoolPolicyCode
        );
        this.businessPlanDoc = val.filter(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_DOC_CODES.businessPlanCode
        );

        this.confirmationOfEligibilityDoc = val.filter(
          ({ documentType }) =>
            documentType ===
            this.SCHOOL_APP_DOC_CODES.confirmationOfEligibilityCode
        );
        this.tuitionRefundPolicyDoc = val.filter(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_DOC_CODES.tuitionRefundPolicyCode
        );
        this.businessReferencesDoc = val.filter(
          ({ documentType }) =>
            documentType === this.SCHOOL_APP_DOC_CODES.businessReferencesCode
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
    this.schoolPolicyDoc = this.applicationDocuments?.filter(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_DOC_CODES.schoolPolicyCode
    );
    this.businessPlanDoc = this.applicationDocuments?.filter(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_DOC_CODES.businessPlanCode
    );
    this.confirmationOfEligibilityDoc = this.applicationDocuments?.filter(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_DOC_CODES.confirmationOfEligibilityCode
    );
    this.tuitionRefundPolicyDoc = this.applicationDocuments?.filter(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_DOC_CODES.tuitionRefundPolicyCode
    );
    this.businessReferencesDoc = this.applicationDocuments?.filter(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_DOC_CODES.businessReferencesCode
    );
  },
  computed: {
    ...mapState(metaDataStore, ['getDocumentPickListOptions']),
    ...mapState(documentStore, ['applicationDocuments']),
  },
  methods: {
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
