<template>
  <h4>Documents</h4>
  <div v-if="isViewOnly">
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Incorporation Certificate</v-label>
        <div v-if="incorporationDocument">
          <v-icon aria-hidden="false" color="rgb(0, 51, 102)" size="20">
            mdi-file-document-check-outline
          </v-icon>
          {{ incorporationDocument.iosas_file_name }}
        </div>
        <div v-else>{{ NULL_STRING }}</div>
      </v-col>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Certificate Issue Date</v-label>
        <p>
          {{
            eoi[
              'iosas_incorporationcertificateissuedate@OData.Community.Display.V1.FormattedValue'
            ] || NULL_STRING
          }}
        </p>
      </v-col>
    </v-row>
    <v-spacer />
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Certificate of Good Standing</v-label>
        <div v-if="certificateOfGoodStandingDocument">
          <v-icon aria-hidden="false" color="rgb(0, 51, 102)" size="20">
            mdi-file-document-check-outline
          </v-icon>
          {{ certificateOfGoodStandingDocument.iosas_file_name }}
        </div>
        <div v-else>{{ NULL_STRING }}</div>
      </v-col>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Certificate of Good Standing Issue Date</v-label>
        <p>
          {{
            eoi[
              'iosas_certificateofgoodstandingissuedate@OData.Community.Display.V1.FormattedValue'
            ] || NULL_STRING
          }}
        </p>
      </v-col>
    </v-row>
    <v-label>Other</v-label>
    <v-row>
      <v-col cols="12" sm="12" md="4" xs="12">
        <div
          v-for="document in otherDocuments"
          key="document.documentid"
          v-if="otherDocuments"
        >
          <v-icon aria-hidden="false" color="rgb(0, 51, 102)" size="20">
            mdi-file-document-check-outline
          </v-icon>
          {{ document.iosas_file_name }}
        </div>
        <div v-else>{{ NULL_STRING }}</div>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    HEREEE documents
    <h4>Documents</h4>
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label class="no-mb">Incorporation Certificate </v-label>
        <v-label class="sm"
          >Issued under the
          <a :href="GOV_URL.BClawsUrl" target="_blank">Societies Act</a>
          or the
          <a :href="GOV_URL.BCLawBusinessActUrl" target="_blank"
            >Business Corporations Act.</a
          ></v-label
        >
        <div v-if="incorporationDocument" class="d-flex">
          <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
            mdi-file-document-check-outline
          </v-icon>
          <p>{{ incorporationDocument.fileName }}</p>
          <v-btn
            secondary
            class="ml-15"
            variant="flat"
            size="sm"
            @click.stop="removeDocment(incorporationDocument)"
            ><v-icon aria-hidden="false" color="red" size="20">
              mdi-delete-forever-outline
            </v-icon></v-btn
          >
        </div>
        <v-btn
          v-else
          secondary
          class="mt-2 block"
          variant="outlined"
          @click="toggleUpload(incorporationDocCode)"
          >Upload</v-btn
        >
        <div class="v-input__details" v-if="incorporationDocumentRequired">
          <div class="v-messages" role="alert">
            <div
              class="v-messages__message"
              style="transform-origin: center center"
            >
              Required
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Certificate Issue Date</v-label>
        <VueDatePicker
          ref="iosas_incorporationcertificateissuedate"
          v-model="eoi.iosas_incorporationcertificateissuedate"
          :enable-time-picker="false"
          format="yyyy-MM-dd"
          :class="certificateIssueDateRequired ? error : ''"
          @update:model-value="dateSelected"
        />
        <div class="v-input__details" v-if="certificateIssueDateRequired">
          <div class="v-messages" role="alert">
            <div
              class="v-messages__message"
              style="transform-origin: center center"
            >
              Required
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label class="no-mb">Certificate of Good Standing</v-label>
        <v-label class="sm"
          >Required if original incorporation documents are more than 6 months
          old. For information please see
          <a :href="GOV_URL.certificateOfGoodStandingUrl" target="_blank"
            >Certificates of Good Standing.
          </a>
        </v-label>

        <div v-if="certificateOfGoodStandingDocument" class="d-flex">
          <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
            mdi-file-document-check-outline
          </v-icon>
          {{ certificateOfGoodStandingDocument.fileName }}
          <v-btn
            secondary
            class="ml-15"
            variant="flat"
            size="sm"
            @click.stop="removeDocment(certificateOfGoodStandingDocument)"
            ><v-icon aria-hidden="false" color="red" size="20">
              mdi-delete-forever-outline
            </v-icon></v-btn
          >
        </div>
        <v-btn
          v-else
          secondary
          class="mt-2 block"
          variant="outlined"
          @click="toggleUpload(certificateOfGoodStandingDocCode)"
          >Upload</v-btn
        >
      </v-col>

      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Certificate of Good Standing Issue Date</v-label>
        <VueDatePicker
          ref="iosas_certificateofgoodstandingissuedate"
          v-model="eoi.iosas_certificateofgoodstandingissuedate"
          :rules="certificateOfGoodStandingDocument ? [rules.required()] : []"
          :enable-time-picker="false"
          format="yyyy-MM-dd"
          :class="goodStandingIssueDateRequired ? error : ''"
          @change="dateSelected"
        />
        <div class="v-input__details" v-if="goodStandingIssueDateRequired">
          <div
            class="v-messages"
            role="alert"
            id="iosas_incorporationcertificateissuedate-messages"
          >
            <div
              class="v-messages__message"
              style="transform-origin: center center"
            >
              Required
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Other (Optional)</v-label>
        <div v-for="document in otherDocuments" key="document.content">
          <div class="d-flex">
            <v-icon color="rgb(0, 51, 102)" size="20" class="mr-1">
              mdi-file-document-check-outline
            </v-icon>
            {{ document.fileName }}
            <v-btn
              secondary
              class="ml-15"
              variant="flat"
              size="sm"
              @click.stop="removeDocment(document)"
              ><v-icon aria-hidden="false" color="red" size="20">
                mdi-delete-forever-outline
              </v-icon></v-btn
            >
          </div>
        </div>
        <v-btn
          secondary
          class="mt-2 block"
          variant="outlined"
          @click="toggleUpload(otherDocCode)"
          >Upload</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { NULL_STRING, GOV_URL } from '../../utils/constants';
export default {
  name: 'EOIDocuments',
  emits: ['toggleUpload', 'removeDocment'],
  props: {
    eoi: {
      type: Object,
      required: true,
    },
    documents: {
      type: Array,
      required: false,
      default: [],
    },
    isViewOnly: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    NULL_STRING,
    GOV_URL,
    incorporationDocument: null,
    certificateOfGoodStandingDocument: null,
    otherDocuments: null,
  }),
  created() {
    if (this.eoi?.documents?.length > 0) {
      this.incorporationDocument = this.eoi.documents.find(
        ({ iosas_eoidocumenttype }) => iosas_eoidocumenttype === 100000000
      );
      this.certificateOfGoodStandingDocument = this.eoi.documents.find(
        ({ iosas_eoidocumenttype }) => iosas_eoidocumenttype === 100000001
      );
      this.otherDocuments = this.eoi.documents.filter(
        ({ iosas_eoidocumenttype }) => iosas_eoidocumenttype === 100000002
      );
    }
  },
  methods: {
    displayDocuments() {
      console.log('DOCUMENTS');
    },
  },
};
</script>
