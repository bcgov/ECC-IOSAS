<template>
  <v-container fluid>
    <div>
      <div class="d-flex justify-space-between">
        <h1>Expression of Interest</h1>
      </div>
      <br />
      <v-divider></v-divider>
      <div>
        <EOIFormHeader :eoi="eoi" :draftStatusCode="draftStatusCode" />
        <v-divider></v-divider>
        <h4>School Authority Information</h4>
        <br />
        <v-row>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-label>School Authority</v-label>
            <p>{{ getSchoolAuthorityName() || NULL_STRING }}</p>
          </v-col>
        </v-row>
        <br />
        <v-label><strong>Authority Mailing Address</strong></v-label>
        <div class="ml-5">
          <v-row>
            <v-col cols="12" sm="12" md="8" xs="12">
              <v-label>Address Line 1</v-label>
              <p>{{ eoi.iosas_authorityaddressline1 || NULL_STRING }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="8" xs="12">
              <v-label>Address Line 2</v-label>
              <p>{{ eoi.iosas_authorityaddressline2 || NULL_STRING }}</p>
            </v-col>
            <v-col cols="12" sm="12" md="4" xs="12">
              <v-label>City</v-label>
              <p>{{ eoi.iosas_authoritycity || NULL_STRING }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="4" xs="12">
              <v-label>Province</v-label>
              <p>{{ eoi.iosas_authorityprovince || NULL_STRING }}</p>
            </v-col>
            <v-col cols="12" sm="12" md="4" xs="12">
              <v-label>Country</v-label>
              <p>{{ eoi.iosas_authoritycountry || NULL_STRING }}</p>
            </v-col>
            <v-col cols="12" sm="12" md="4" xs="12">
              <v-label>Postal Code</v-label>
              <p>{{ eoi.iosas_authoritypostalcode || NULL_STRING }}</p>
            </v-col>
          </v-row>
        </div>
        <br />
        <v-divider></v-divider>
        <h4>School Authority Contacts</h4>
        <br />
        <div>
          <v-row>
            <v-col cols="12" sm="12" md="6" xs="12">
              <v-label>Designated Authority Contact</v-label>
              <p>{{ getDesignatedHeadName() || NULL_STRING }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="6" xs="12">
              <v-label>E-mail</v-label>
              <p>{{ eoi.iosas_schoolauthoritycontactemail || NULL_STRING }}</p>
            </v-col>
            <v-col cols="12" sm="12" md="6" xs="12">
              <v-label>Phone</v-label>
              <p>{{ eoi.iosas_schoolauthoritycontactphone || NULL_STRING }}</p>
            </v-col>
          </v-row>
        </div>
        <br />
        <v-row>
          <v-col cols="12">
            <v-label
              >Is the School Authority Head the same person as the Designated
              Authority Contact?</v-label
            >
            <p>
              {{
                formatBooleanToYesNoString(
                  eoi.iosas_designatedcontactsameasauthorityhead
                )
              }}
            </p>
          </v-col>
        </v-row>
        <br />
        <v-row>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-label>School Authority Head</v-label>
            <p>{{ getAuthorityHeadName() || NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-label>E-Mail</v-label>
            <p>{{ eoi.iosas_schoolauthorityheademail || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-label>Phone</v-label>
            <p>{{ eoi.iosas_schoolauthorityheadphone || NULL_STRING }}</p>
          </v-col>
        </v-row>
        <br />

        <v-divider></v-divider>
        <h4>School Information</h4>
        <br />
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Proposed School Name</v-label>
            <p>{{ eoi.iosas_proposedschoolname || NULL_STRING }}</p>
          </v-col>
        </v-row>
        <br />
        <v-label><strong>School Address</strong></v-label>
        <div class="ml-5">
          <v-row>
            <v-col cols="12" sm="12" md="8" xs="12">
              <v-label>Address Line 1</v-label>
              <p>{{ eoi.iosas_schooladdressline1 || NULL_STRING }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="8" xs="12">
              <v-label>Address Line 2</v-label>
              <p>{{ eoi.iosas_schooladdressline2 || NULL_STRING }}</p>
            </v-col>
            <v-col cols="12" sm="12" md="4" xs="12">
              <v-label>City</v-label>
              <p>{{ eoi.iosas_schoolcity || NULL_STRING }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="4" xs="12">
              <v-label>Province</v-label>
              <p>{{ eoi.iosas_schoolprovince || NULL_STRING }}</p>
            </v-col>
            <v-col cols="12" sm="12" md="4" xs="12">
              <v-label>Country</v-label>
              <p>{{ eoi.iosas_schoolcountry || NULL_STRING }}</p>
            </v-col>
            <v-col cols="12" sm="12" md="4" xs="12">
              <v-label>Postal Code</v-label>
              <p>{{ eoi.iosas_schoolpostalcode || NULL_STRING }}</p>
            </v-col>
          </v-row>
        </div>
        <br />
        <v-row>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-label>Website</v-label>
            <p>{{ eoi.iosas_website || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-label>School Year</v-label>
            <p>
              {{
                eoi[
                  '_iosas_edu_year_value@OData.Community.Display.V1.FormattedValue'
                ] || NULL_STRING
              }}
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-label>Group Classification</v-label>
            <p>
              {{
                eoi[
                  'iosas_groupclassification@OData.Community.Display.V1.FormattedValue'
                ] || NULL_STRING
              }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-label
              >Plans to seek Group 1 classification in the second or subsequest
              year of operation?
            </v-label>
            <p>
              {{
                formatBooleanToYesNoString(eoi.iosas_seekgrouponeclassification)
              }}
            </p>
          </v-col>
        </v-row>
        <br />
        <v-row>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-label>Proposed grade range in first year of operation</v-label>
            <p>
              {{
                eoi[
                  'iosas_startgrade@OData.Community.Display.V1.FormattedValue'
                ]
              }}
              -
              {{
                eoi['iosas_endgrade@OData.Community.Display.V1.FormattedValue']
              }}
            </p>
          </v-col>
        </v-row>
        <br />
        <v-divider></v-divider>
        <h4>Documents</h4>
        <div v-if="eoi?.documents.length">
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

        <br />
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" sm="12" md="12" xs="12">
            <v-label>Additional Notes</v-label>
            <p>{{ eoi.iosas_notes || NULL_STRING }}</p>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
import EOIFormHeader from './EOIFormHeader.vue';
import { formatBooleanToYesNoString } from '../../utils/format';
import { NULL_STRING, EOI_DOC_CODES } from '../../utils/constants';
export default {
  name: 'ExpressionOfInterestReadOnlyView',
  components: {
    EOIFormHeader,
  },
  props: {
    eoi: {
      type: Object,
      required: true,
    },
    draftStatusCode: {
      type: Number,
      required: true,
    },
  },
  mounted() {},
  data() {
    return {
      incorporationDocument: null,
      certificateOfGoodStandingDocument: null,
      otherDocuments: null,
      NULL_STRING,
      EOI_DOC_CODES,
    };
  },
  created() {
    if (this.eoi?.documents?.length > 0) {
      this.incorporationDocument = this.eoi.documents.find(
        ({ iosas_eoidocumenttype }) =>
          iosas_eoidocumenttype === this.EOI_DOC_CODES.incorporation
      );
      this.certificateOfGoodStandingDocument = this.eoi.documents.find(
        ({ iosas_eoidocumenttype }) =>
          iosas_eoidocumenttype === this.EOI_DOC_CODES.goodStanding
      );
      this.otherDocuments = this.eoi.documents.filter(
        ({ iosas_eoidocumenttype }) =>
          iosas_eoidocumenttype === this.EOI_DOC_CODES.other
      );
    }
  },
  methods: {
    formatBooleanToYesNoString,
    getSchoolAuthorityName() {
      return this.eoi?.iosas_existingauthority
        ? this.eoi[
            '_iosas_edu_schoolauthority_value@OData.Community.Display.V1.FormattedValue'
          ]
        : this.eoi.iosas_schoolauthorityname;
    },
    getAuthorityHeadName() {
      return this.eoi?.iosas_authorityheadfirstname
        ? this.eoi.iosas_authorityheadfirstname +
            ' ' +
            this.eoi.iosas_schoolauthorityheadname
        : null;
    },
    getDesignatedHeadName() {
      return this.eoi?.iosas_designatedcontactfirstname
        ? this.eoi.iosas_designatedcontactfirstname +
            ' ' +
            this.eoi.iosas_schoolauthoritycontactname
        : null;
    },
  },
};
</script>
