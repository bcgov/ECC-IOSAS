<template>
  <v-container>
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
    <h4>Document</h4>
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
    <div>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <div v-for="document in documents" :key="document.id">
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
                @click.stop="removeDocument(document)"
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
            @click="toggleUpload()"
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
import ConfirmationDialog from '../../../components/util/ConfirmationDialog.vue';
import DocumentUpload from '../../common/DocumentUpload.vue';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { formatLongName } from '../../../utils/format';
import { GOV_URL, SCHOOL_APP_CODE_CODES } from '../../../utils/constants';
export default {
  name: 'DocumentTab',
  emits: ['validateAndPopulate', 'upload'],
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
  data: () => ({
    GOV_URL,
    rules: Rules,
    SCHOOL_APP_CODE_CODES,
    isDocumentsLoading: false,
    documentUpload: false,
    selectedDocumentOption: null,
  }),
  mounted() {
    console.log(
      this.getDocumentPickListOptions?.[
        'iosas_newschoolapplicationdocumenttype'
      ]
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
              const documentResponse = await ApiService.getEOIDocuments(
                this.data.iosas_expressionofinterestid
              );
              if (documentResponse) {
                this.documents = filteredDocuments.concat(
                  documentResponse.data.value
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
          this.documents = filteredDocuments;
          this.isDocumentsLoading = false;
          return this.documents;
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
</style>
