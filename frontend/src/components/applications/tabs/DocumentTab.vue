<template>
  <v-container>
    <h4>Documents</h4>
    <br />
    <ConfirmationDialog ref="confirmDeleteDocument">
      <template #message>
        <p>This document will be removed from your records.</p>
      </template>
    </ConfirmationDialog>
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
    <div v-else class="document-container">
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
              @click.stop="removeDocument(schoolPolicyDoc)"
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
              @click.stop="removeDocument(businessPlanDoc)"
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
      <v-label class="sm">Schools seeking Group 4 only</v-label>
      <br />
      <br />
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label class="no-mb">Written confirmation of eligibility</v-label>
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
              @click.stop="removeDocument(confirmationOfEligibilityDoc)"
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
              toggleUpload(SCHOOL_APP_CODE_CODES.confirmationOfEligibilityCode)
            "
            >Upload</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label class="no-mb">Completed Free/Tuition Refund Policy</v-label>
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
              @click.stop="removeDocument(tuitionRefundPolicyDoc)"
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
            @click="toggleUpload(SCHOOL_APP_CODE_CODES.tuitionRefundPolicyCode)"
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
              @click.stop="removeDocument(businessReferencesDoc)"
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
            @click="toggleUpload(SCHOOL_APP_CODE_CODES.businessReferencesCode)"
            >Upload</v-btn
          >
        </v-col>
      </v-row>
    </div>
    <div></div>
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { mapState } from 'pinia';
import { metaDataStore } from '../../../store/modules/metaData';
import alertMixin from '../../../mixins/alertMixin';
import ApiService from '../../../common/ApiService';
import ApplicationService from '../../../common/ApplicationService';
import ConfirmationDialog from '../../../components/util/ConfirmationDialog.vue';
import DocumentUpload from '../../common/DocumentUpload.vue';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { formatLongName } from '../../../utils/format';
import { GOV_URL, SCHOOL_APP_CODE_CODES } from '../../../utils/constants';
export default {
  name: 'DocumentTab',
  emits: ['validateAndPopulate', 'upload'],
  mixins: [alertMixin],
  components: {
    ConfirmationDialog,
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
    documents: {
      type: Array,
      required: true,
    },
  },
  watch: {
    documents: {
      handler(val) {
        console.log(val);
        if (!this.schoolPolicyDoc) {
          this.schoolPolicyDoc = val.find(
            ({ documentType }) =>
              documentType === this.SCHOOL_APP_CODE_CODES.schoolPolicyCode
          );
        }
        if (!this.businessPlanDoc) {
          this.businessPlanDoc = val.find(
            ({ documentType }) =>
              documentType === this.SCHOOL_APP_CODE_CODES.businessPlanCode
          );
        }
        if (!this.confirmationOfEligibilityDoc) {
          this.confirmationOfEligibilityDoc = val.find(
            ({ documentType }) =>
              documentType ===
              this.SCHOOL_APP_CODE_CODES.confirmationOfEligibilityCode
          );
        }
        if (!this.tuitionRefundPolicyDoc) {
          this.tuitionRefundPolicyDoc = val.find(
            ({ documentType }) =>
              documentType ===
              this.SCHOOL_APP_CODE_CODES.tuitionRefundPolicyCode
          );
        }
        if (!this.tuitionRefundPolicyDoc) {
          this.businessReferencesDoc = val.find(
            ({ documentType }) =>
              documentType === this.SCHOOL_APP_CODE_CODES.businessReferencesCode
          );
        }
      },
    },
  },
  data: () => ({
    GOV_URL,
    rules: Rules,
    SCHOOL_APP_CODE_CODES,
    isDocumentsLoading: false,
    documentUpload: false,
    selectedDocumentOption: null,

    schoolPolicyDoc: null,
    businessPlanDoc: null,
    confirmationOfEligibilityDoc: null,
    tuitionRefundPolicyDoc: null,
    businessReferencesDoc: null,
  }),
  mounted() {},
  created() {
    this.schoolPolicyDoc = this.documents?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.schoolPolicyCode
    );
    this.businessPlanDoc = this.documents?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.businessPlanCode
    );
    this.confirmationOfEligibilityDoc = this.documents?.find(
      ({ documentType }) =>
        documentType ===
        this.SCHOOL_APP_CODE_CODES.confirmationOfEligibilityCode
    );
    this.tuitionRefundPolicyDoc = this.documents?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.tuitionRefundPolicyCode
    );
    this.businessReferencesDoc = this.documents?.find(
      ({ documentType }) =>
        documentType === this.SCHOOL_APP_CODE_CODES.businessReferencesCode
    );
  },
  computed: {
    ...mapState(metaDataStore, ['getDocumentPickListOptions']),
  },
  methods: {
    formatBooleanToYesNoString,
    formatLongName,
    closeDocumentDialog() {
      this.documentUpload = false;
    },
    toggleUpload(documentCode = null) {
      this.selectedDocumentOption = documentCode;
      this.documentUpload = true;
    },
    async upload(document) {
      this.$emit('upload', document);
    },

    async removeDocument(document) {
      const documentName = document.iosas_documentid
        ? document.iosas_file_name
        : document.fileName;
      const confirmation = await this.$refs.confirmDeleteDocument.open(
        `Remove Document - ${documentName}?`,
        null,
        {
          color: '#fff',
          width: 580,
          closeIcon: false,
          subtitle: false,
          dark: false,
          resolveText: 'Confirm',
          rejectText: 'Cancel',
        }
      );
      if (!confirmation) {
        return;
      } else {
        this.isDocumentsLoading = true;
        const filteredDocuments = this.documents.filter(({ id }) => {
          return id !== document.id;
        });
        if (document.iosas_documentid) {
          await ApiService.deleteDocument(document.iosas_documentid)
            .then(async () => {
              const documentResponse =
                await ApplicationService.getApplicationDocuments(
                  this.formData.iosas_applicationid
                );
              if (documentResponse) {
                this.$emit(
                  'upload',
                  filteredDocuments.concat(documentResponse.data.value),
                  true
                );
              }
              this.isDocumentsLoading = false;
              this.setSuccessAlert(
                `Success! The Document ${document.iosas_file_name} has been removed from your records`
              );
            })
            .catch((error) => {
              console.error(error);
              this.setFailureAlert(
                error?.response?.data?.message
                  ? error?.response?.data?.message
                  : 'An error occurred while saving the expression of Interest. Please try again later.'
              );
            });
        } else {
          this.isDocumentsLoading = false;
          return this.$emit('upload', filteredDocuments, true);
        }
      }
    },
  },
};
</script>

<style scoped>
.v-label {
  display: inline;
}

.document-container {
  min-height: 30vh;
}
</style>
