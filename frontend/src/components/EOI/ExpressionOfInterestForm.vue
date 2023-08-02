<template>
  <div>
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
    <template v-if="!isLoading">
      <ConfirmationDialog ref="confirmDelete">
        <template #message>
          <p>
            The Expression of Interest application will be deleted from your
            records. A new EOI can be submitted in the future.
          </p>
        </template>
      </ConfirmationDialog>
      <v-snackbar
        id="activationSnackBar"
        v-model="showActivationSnackBar"
        elevation="24"
        location="top"
        centered
        color="error"
        transition="slide-y-transition"
      >
        {{ activationErrorMessage }}
      </v-snackbar>
      <v-form
        @submit.prevent="handleSubmit"
        id="expressionOfInterestForm"
        ref="expressionOfInterestForm"
        validate-on="blur"
        v-model="isFormValid"
      >
        <v-container fluid class="content-container">
          <div class="form-container">
            <div class="d-flex justify-space-between">
              <h1>Expression of Interest</h1>
            </div>
            <br />
            <v-divider></v-divider>
            <div v-if="!isEditing && !isNew()">
              <ExpressionOfInterestReadOnlyView :eoi="this.eoi" />
            </div>
            <div v-else>
              <div v-if="!isNew()">
                <h4>General</h4>
                <br />
                <v-row>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-label>EOI Number </v-label>
                    <p>{{ data.iosas_eionumber }}</p>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-label>Status </v-label>
                    <p>{{ data.iosas_reviewstatus }}</p>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </div>
              <h4>School Authority Information</h4>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-label
                    >Name of School Authority (as it appears on attached
                    incorporation documents)</v-label
                  >

                  <v-text-field
                    id="iosas_schoolauthorityname"
                    v-model="data.iosas_schoolauthorityname"
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <br />
              <v-label>School Authority Head</v-label>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_authorityheadfirstname"
                    v-model="data.iosas_authorityheadfirstname"
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="First Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_schoolauthorityheadname"
                    v-model="data.iosas_authorityheadname"
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Last Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_schoolauthorityheademail"
                    v-model="data.iosas_schoolauthorityheademail"
                    :rules="[rules.required(), rules.email()]"
                    :maxlength="255"
                    variant="outlined"
                    label="E-mail"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_schoolauthorityheadphone"
                    v-model="data.iosas_schoolauthorityheadphone"
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Phone"
                    return-masked-value
                    mask="(###) ###-####"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-label class="no-margin"
                  >Is the Designated Authority the same as Authority
                  Head?</v-label
                >
                <v-col cols="12">
                  <v-radio-group
                    v-model="data.iosas_designatedcontactsameasauthorityhead"
                    color="#003366"
                    class="mt-4"
                    inline
                  >
                    <v-radio label="Yes" color="#003366" :value="true" />
                    <v-radio label="No" color="#003366" :value="false" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <div v-if="!data.iosas_designatedcontactsameasauthorityhead">
                <v-label>Designated Authority Contact</v-label>
                <v-row>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-text-field
                      id="iosas_designatedcontactfirstname"
                      v-model="data.iosas_designatedcontactfirstname"
                      :rules="
                        data.iosas_designatedcontactsameasauthorityhead
                          ? [rules.required()]
                          : []
                      "
                      :maxlength="255"
                      variant="outlined"
                      label="First Name"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-text-field
                      id="iosas_schoolauthoritycontactname"
                      v-model="data.iosas_schoolauthoritycontactname"
                      :rules="
                        data.iosas_designatedcontactsameasauthorityhead
                          ? [rules.required()]
                          : []
                      "
                      :maxlength="255"
                      variant="outlined"
                      label="Last Name"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-text-field
                      id="iosas_schoolauthoritycontactemail"
                      v-model="data.iosas_schoolauthoritycontactemail"
                      :rules="
                        data.iosas_designatedcontactsameasauthorityhead
                          ? [rules.required()]
                          : []
                      "
                      :maxlength="255"
                      variant="outlined"
                      label="E-mail"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-text-field
                      id="ioas_schoolauthoritycontactphone"
                      v-model="data.ioas_schoolauthoritycontactphone"
                      :rules="
                        data.iosas_designatedcontactsameasauthorityhead
                          ? [rules.required()]
                          : []
                      "
                      :maxlength="255"
                      variant="outlined"
                      label="Phone"
                      return-masked-value
                      mask="(###) ###-####"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                </v-row>
              </div>
              <v-label><strong>Authority Mailing Address</strong></v-label>
              <v-row>
                <v-col cols="12" sm="12" md="8" xs="12">
                  <v-text-field
                    id="iosas_authorityaddressline1"
                    v-model="data.iosas_authorityaddressline1"
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Address Line 1"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="8" xs="12">
                  <v-text-field
                    id="iosas_authorityaddressline2"
                    v-model="data.iosas_authorityaddressline2"
                    :rules="[]"
                    :maxlength="255"
                    variant="outlined"
                    label="Address Line 2"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_authoritycity"
                    v-model="data.iosas_authoritycity"
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="City"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_authorityprovince"
                    v-model="data.iosas_authorityprovince"
                    :rules="[]"
                    :maxlength="255"
                    disabled
                    variant="outlined"
                    label="Province"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_authoritycountry"
                    v-model="data.iosas_authoritycountry"
                    disabled
                    :rules="[]"
                    :maxlength="255"
                    variant="outlined"
                    label="Country"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_authoritypostalcode"
                    v-model="data.iosas_authoritypostalcode"
                    :rules="[rules.required(), rules.postalCode()]"
                    :maxlength="7"
                    variant="outlined"
                    label="Postal Code"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <h4>School Information</h4>
              <br />
              <v-row>
                <v-col cols="12" sm="12" md="8" xs="12">
                  <v-text-field
                    id="iosas_proposedschoolname"
                    v-model="data.iosas_proposedschoolname"
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Proposed School Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-radio-group
                    v-model="schoolAddressKnown"
                    color="#003366"
                    label="Is the School Address Known?"
                    class="mt-4"
                    inline
                  >
                    <v-radio label="Yes" color="#003366" :value="true" />
                    <v-radio label="No" color="#003366" :value="false" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <div v-if="schoolAddressKnown">
                <v-label><strong>School Address</strong></v-label>
                <v-row>
                  <v-col cols="12" sm="12" md="8" xs="12">
                    <v-text-field
                      id="iosas_schooladdressline1"
                      v-model="data.iosas_schooladdressline1"
                      :rules="schoolAddressKnown ? [rules.required()] : []"
                      :maxlength="255"
                      variant="outlined"
                      label="Address Line 1"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="8" xs="12">
                    <v-text-field
                      id="iosas_schooladdressline2"
                      v-model="data.iosas_schooladdressline2"
                      :rules="[]"
                      :maxlength="255"
                      variant="outlined"
                      label="Address Line 2"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="4" xs="12">
                    <v-text-field
                      id="iosas_schoolcity"
                      v-model="data.iosas_schoolcity"
                      :rules="schoolAddressKnown ? [rules.required()] : []"
                      :maxlength="255"
                      variant="outlined"
                      label="City"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="4" xs="12">
                    <v-text-field
                      id="iosas_schoolprovince"
                      v-model="data.iosas_schoolprovince"
                      :rules="schoolAddressKnown ? [rules.required()] : []"
                      :maxlength="255"
                      disabled
                      variant="outlined"
                      label="Province"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="4" xs="12">
                    <v-text-field
                      id="iosas_schoolcountry"
                      v-model="data.iosas_schoolcountry"
                      disabled
                      :rules="schoolAddressKnown ? [rules.required()] : []"
                      :maxlength="255"
                      variant="outlined"
                      label="Country"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="4" xs="12">
                    <v-text-field
                      id="iosas_schoolpostalcode"
                      v-model="data.iosas_schoolpostalcode"
                      :rules="
                        schoolAddressKnown
                          ? [rules.required(), rules.postalCode()]
                          : []
                      "
                      :maxlength="7"
                      variant="outlined"
                      label="Postal Code"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                </v-row>
              </div>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_website"
                    v-model="data.iosas_website"
                    :rules="[rules.website()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Website address (optional)"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-select
                    id="_iosas_edu_year_value"
                    v-model="data._iosas_edu_year_value"
                    label="Select School Year"
                    variant="outlined"
                    color="rgb(59, 153, 252)"
                    :items="YEAR_OPTIONS"
                    :rules="[rules.requiredSelect()]"
                  >
                  </v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-label>
                  Group Calassification applying for:
                  <a :href="GOV_URL.groupClassificationUrl" target="_blank"
                    >(Group classification Information)</a
                  >
                </v-label>
                <v-col cols="12">
                  <v-radio-group
                    id="iosas_groupclassification"
                    v-model="data.iosas_groupclassification"
                    color="#003366"
                    class="mt-4"
                    inline
                    @change="validateAndPopulate"
                    :rules="[rules.requiredRadio()]"
                  >
                    <v-radio label="Group 2" color="#003366" value="Group 2" />
                    <v-radio label="Group 3" color="#003366" value="Group 3" />
                    <v-radio label="Group 4" color="#003366" value="Group 4" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-label
                    >For authorities applying for Group 2 classification, are
                    there current plans to seek Group 1 classification in the
                    second or subsequest year of operation?
                  </v-label>
                  <v-radio-group
                    id="iosas_seekgrouponeclassification"
                    v-model="data.iosas_seekgrouponeclassification"
                    color="#003366"
                    class="mt-4"
                    inline
                    @change="validateAndPopulate"
                    :rules="[rules.requiredRadio()]"
                  >
                    <v-radio label="Yes" color="#003366" :value="true" />
                    <v-radio label="No" color="#003366" :value="false" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-label>Proposed grade range in first year of operation</v-label>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-select
                    id="iosas_startgrade"
                    v-model="data.iosas_startgrade"
                    label="Select Start Grade"
                    variant="outlined"
                    color="rgb(59, 153, 252)"
                    :items="GRADE_OPTIONS"
                    :rules="[rules.requiredSelect()]"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-select
                    id="iosas_endgrade"
                    v-model="data.iosas_endgrade"
                    label="Select End Grade"
                    variant="outlined"
                    color="rgb(59, 153, 252)"
                    :items="GRADE_OPTIONS"
                    :rules="[
                      rules.requiredSelect(),
                      rules.gradeRangeRule(
                        data.iosas_startgrade,
                        data.iosas_endgrade
                      ),
                    ]"
                  ></v-select>
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <h4>Documents</h4>
              <v-btn @click="toggleUpload">Upload</v-btn>

              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Document Type</th>
                    <th class="text-left">Certificate Issue date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in documents" :key="item.type">
                    <td>{{ item.type }}</td>
                    <td>{{ item.issue_date }}</td>
                  </tr>
                </tbody>
              </v-table>

              <br />
              <br />
              <!-- <div v-if="!documentUpload">
                <v-card class="document-upload-card">
                  <v-row align-self="center" justify="center">
                    <v-btn @click="toggleUpload">Upload</v-btn>
                  </v-row>
                </v-card>
              </div> -->
              <!-- <div v-else>
                <DocumentUpload
                  ref="documentUpload"
                  @close:form="showOptions"
                  @upload="uploadDocument"
                />
              </div> -->

              <v-dialog v-model="documentUpload" width="auto">
                <DocumentUpload
                  ref="documentUpload"
                  @close:form="showOptions"
                  @upload="uploadDocument"
                />
              </v-dialog>

              <v-row>
                <v-col cols="12" sm="12" md="12" xs="12">
                  <v-checkbox
                    v-model="applicationConfirmation"
                    label="I confirm this application is complete and ready to be submitted for review."
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row justify="center" align="center" v-if="showError">
                <v-col>
                  <v-alert type="error" title="Error" variant="outlined">
                    Ensure all required fields are filled out before proceeding
                    to the next step
                  </v-alert>
                </v-col>
              </v-row>

              <br />
              <v-container v-if="isEditing || isNew()">
                <v-row align="end">
                  <v-spacer />
                  <PrimaryButton
                    v-if="authStore().isAuthenticated"
                    secondary
                    text="Save Draft"
                    class="mr-2"
                    :click-action="handleDraftSubmit"
                  />
                  <v-btn
                    type="submit"
                    primary
                    class="mt-2 submit-button"
                    variant="elevated"
                    :disabled="!applicationConfirmation"
                    >Submit</v-btn
                  >
                </v-row>
                <v-row align="end">
                  <v-spacer />
                  <v-btn
                    variant="plain"
                    @click="handleDelete"
                    class="link-button"
                  >
                    Delete Draft
                  </v-btn>
                </v-row>
              </v-container>
            </div>
          </div>

          <br />
          <v-container v-if="isEditing || isNew()">
            <v-row align="end">
              <v-spacer />
              <PrimaryButton
                v-if="authStore().isAuthenticated"
                secondary
                text="Save Draft"
                class="mr-2"
                :click-action="handleDraftSubmit"
              />
              <v-btn
                type="submit"
                primary
                class="mt-2 submit-button"
                variant="elevated"
                :disabled="!applicationConfirmation"
                >Submit</v-btn
              >
            </v-row>
            <v-row align="end" v-if="!isNew()">
              <v-spacer />
              <v-btn variant="plain" @click="handleDelete" class="link-button">
                Delete Draft
              </v-btn>
            </v-row>
          </v-container>
        </v-container>
      </v-form>
    </template>
  </div>
</template>

<script>
import { authStore } from './../../store/modules/auth';
import { mapState } from 'pinia';
import alertMixin from './../../mixins/alertMixin';
import * as Rules from './../../utils/institute/formRules';
import ConfirmationDialog from '../../components/util/ConfirmationDialog.vue';
import DocumentUpload from '../common/DocumentUpload.vue';
import { GRADE_OPTIONS, YEAR_OPTIONS, GOV_URL } from '../../utils/constants';

import PrimaryButton from './../util/PrimaryButton.vue';
import ExpressionOfInterestReadOnlyView from './ExpressionOfInterestReadOnlyView.vue';

export default {
  name: 'ExpressionOfInterestForm',
  components: {
    PrimaryButton,
    ConfirmationDialog,
    ExpressionOfInterestReadOnlyView,
    DocumentUpload,
  },
  emits: ['setIdLoading'],
  mixins: [alertMixin],
  props: {
    eoi: {
      type: Object,
      required: false,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isFormValid: {
      handler(val) {
        if (val) {
          this.showError = false;
        } else if (val === false) {
          this.showError = true;
        }
      },
    },
  },
  data() {
    return {
      GRADE_OPTIONS,
      GOV_URL,
      YEAR_OPTIONS,
      isFormValid: false,
      isEditing: false,
      defaultStatus: 'Submitted',
      schoolAddressKnown: false,
      applicationConfirmation: false,
      documentUpload: false,
      rules: Rules,
      documents: [
        {
          type: 'Incorporation Certificate',
          issue_date: null,
        },
        {
          type: 'Certificate of Good standing',
          issue_date: null,
        },
        { type: 'Other', issue_date: null },
      ],
      data: {
        iosas_eionumber: null,
        iosas_reviewstatus: null,
        iosas_authorityaddressline1: null,
        iosas_authorityaddressline2: null,
        iosas_authoritycity: null,
        iosas_authoritycountry: 'Canada',
        iosas_authorityheadfirstname: null,
        iosas_authorityheadname: null,
        iosas_authoritypostalcode: null,
        iosas_authorityprovince: 'British Columbia',
        iosas_designatedcontactfirstname: null,
        iosas_designatedcontactsameasauthorityhead: true,
        _iosas_edu_year_value: null,
        iosas_groupclassification: null,
        iosas_proposedschoolname: null,
        iosas_schooladdressline1: null,
        iosas_schooladdressline2: null,
        iosas_schoolcity: null,
        iosas_schoolcountry: 'Canada',
        iosas_schoolpostalcode: null,
        iosas_schoolprovince: 'British Columbia',
        iosas_schoolauthoritycontactemail: null,
        iosas_schoolauthoritycontactname: null,
        ioas_schoolauthoritycontactphone: null,
        iosas_schoolauthorityheademail: null,
        iosas_schoolauthorityheadname: null,
        iosas_schoolauthorityheadphone: null,
        iosas_schoolauthorityname: null,
        iosas_seekgrouponeclassification: null,
        iosas_startgrade: null,
        iosas_endgrade: null,
        iosas_website: null,
      },
      showActivationSnackBar: false,
      activationErrorMessage: null,
      showError: false,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
  },
  created() {
    this.data = this.isNew() ? this.data : this.eoi;
    this.isEditing = this.eoi?.iosas_reviewstatus === 'Draft';
  },
  methods: {
    authStore,
    toggleUpload() {
      this.documentUpload = true;
    },
    async handleAddDocuments() {
      const confirmation = await this.$refs.documentUpload.open(
        'Delete Draft Expression of Interest?',
        null,
        {
          color: '#fff',
          width: 580,
          closeIcon: false,
          subtitle: false,
          dark: false,
          resolveText: 'Delete',
          rejectText: 'Cancel',
        }
      );
      if (!confirmation) {
        return;
      } else {
        this.$emit('setIsLoading');
        setTimeout(() => {
          this.$router.push({
            name: 'applicationConfirmation',
            params: { type: 'Delete' },
          });
        }, 1000);
      }
    },
    isNew() {
      return this.$route.name === 'newExpressionOfInterest';
    },
    isReadOnly() {
      return this.eoi.iosas_reviewstatus !== 'Draft';
    },
    async handleDelete() {
      const confirmation = await this.$refs.confirmDelete.open(
        'Delete Draft Expression of Interest?',
        null,
        {
          color: '#fff',
          width: 580,
          closeIcon: false,
          subtitle: false,
          dark: false,
          resolveText: 'Delete',
          rejectText: 'Cancel',
        }
      );
      if (!confirmation) {
        return;
      } else {
        this.$emit('setIsLoading');
        setTimeout(() => {
          this.$router.push({
            name: 'applicationConfirmation',
            params: { type: 'Delete#EOI' },
          });
        }, 1000);
      }
    },
    handleDraftSubmit() {
      this.defaultStatus = 'Draft';
      this.handleSubmit();
    },
    async handleSubmit() {
      const valid = await this.$refs.expressionOfInterestForm.validate();

      this.isFormValid = valid.valid;
      this.showError = !this.isFormValid;
      if (this.isFormValid) {
        this.$emit('setIsLoading');
        // mocking a loading state - will be replaced when API is connected.
        setTimeout(() => {
          // mocking eoiNumber - will be replaced when API is connected.
          const number = Math.floor(Math.random() * (9000 - 2000 + 1) + 2000);
          const eoiNumber = `EOI-0${number}`;
          const payload = {
            ...this.data,
            iosas_eionumber: eoiNumber,
            iosas_reviewstatus: this.defaultStatus,
          };
          // mocking database interactions  - will be replaced when API is connected.
          const storedApplications = JSON.parse(
            localStorage.getItem('applications')
          );
          let applications = [];
          if (storedApplications) {
            applications = [...storedApplications, payload];
          } else {
            applications = [payload];
          }
          localStorage.setItem('applications', JSON.stringify(applications));
          this.$router.push({
            name: 'applicationConfirmation',
            params: { type: 'EOI' },
          });
          console.log(payload);
        }, 1000);
      }
    },
    validateAndPopulate(e) {
      // RadioGroup does not update the form to trigger validation refresh if the error is already being displayed on the UI,
      // must attach a change event, and set the field programatically.
      // RadioGroup appears to work following the happy path, This is only needed for RadioGroups with 'Required' validation
      const isBoolean = ['true', 'false'].includes(e.target.value);
      const defaultValue = isBoolean
        ? JSON.parse(e.target.value)
        : e.target.value;
      this.data[e.target.attributes?.name?.value] = defaultValue;

      // if the form is already !valid, trigger the validation to clear the error on the updated radioGroup
      if (this.isFormValid === false) {
        this.$refs.expressionOfInterestForm.validate();
      }
    },
  },
};
</script>

<style scoped>
.submit-button {
  background-color: #003366 !important;
  color: white !important;
}

.no-margin {
  margin-bottom: none !important;
}

.v-label {
  display: inline-block;
}
.document-upload-card {
  padding: 1.1rem;
  max-width: 50rem;
  min-width: 10rem;
  /* height: 250px; */
}
</style>
