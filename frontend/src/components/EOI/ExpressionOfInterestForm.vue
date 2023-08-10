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
            The Expression of Interest application will be removed from your
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
              <ExpressionOfInterestReadOnlyView
                :eoi="this.eoi"
                :draftStatusCode="draftStatusCode"
              />
            </div>
            <div v-else>
              <div v-if="!isNew()">
                <EOIFormHeader :eoi="data" :draftStatusCode="draftStatusCode" />
                <v-divider></v-divider>
              </div>
              <h4>School Authority Information</h4>
              <br />
              <v-row>
                <v-col cols="12">
                  <v-label class="no-margin"
                    >Does the School Authority Exist?</v-label
                  >
                  <v-radio-group
                    id="iosas_existingauthority"
                    v-model="data.iosas_existingauthority"
                    color="#003366"
                    class="mt-4"
                    inline
                  >
                    <v-radio label="Yes" color="#003366" :value="true" />
                    <v-radio label="No" color="#003366" :value="false" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  xs="12"
                  v-if="data.iosas_existingauthority"
                >
                  <v-label>Search for School Authority By Name</v-label>
                  <v-autocomplete
                    label="School Authority Name"
                    :items="schoolAuthorityOptions"
                    id="_iosas_authorityhead_value"
                    v-model="data._iosas_authorityhead_value"
                    variant="outlined"
                    item-title="label"
                    item-value="value"
                    :rules="[rules.requiredSelect()]"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="12" xs="12" v-else>
                  <v-label
                    >School Authority Name (as it appears on attached
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
              <div>
                <v-label>School Authority Head</v-label>
                <v-row v-if="fetchingAuthorityHead">
                  <v-col class="d-flex justify-center">
                    <v-progress-circular
                      class="mt-15 mb-15"
                      :size="70"
                      :width="7"
                      color="primary"
                      indeterminate
                      :active="isLoading"
                    />
                  </v-col>
                </v-row>
                <div v-else>
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
                        v-model="data.iosas_schoolauthorityheadname"
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
                </div>
              </div>
              <br />
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
                    :disabled="populateAndDisableAuthorityAddress"
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
                    :disabled="populateAndDisableAuthorityAddress"
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
                    :disabled="populateAndDisableAuthorityAddress"
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
                    :disabled="populateAndDisableAuthorityAddress"
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
                    :items="schoolYearOptions"
                    item-title="label"
                    item-value="value"
                    :rules="[rules.requiredSelect()]"
                  >
                  </v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-label>
                  Group Classification applying for:
                  <a :href="GOV_URL.groupClassificationUrl" target="_blank"
                    >(Group classification Information)</a
                  >
                </v-label>
                <v-col cols="12">
                  <v-radio-group
                    id="iosas_groupclassification"
                    v-model="data.iosas_groupclassification"
                    color="#003366"
                    class="mt-4 inline-box"
                    inline
                    :rules="[rules.requiredSelect()]"
                    v-for="item in pickListOptions?.[
                      'iosas_groupclassification'
                    ]"
                    :key="item.value"
                  >
                    <v-radio
                      inline
                      :label="item.label"
                      color="#003366"
                      :value="item.value"
                    />
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
                    :items="pickListOptions?.['iosas_startgrade']"
                    item-title="label"
                    item-value="value"
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
                    :items="pickListOptions?.['iosas_endgrade']"
                    item-title="label"
                    item-value="value"
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
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-label>Incorporation Certificate</v-label>
                  <br />
                  <div v-if="renderDocument(100000000)[0]" class="d-flex">
                    <div>
                      <v-icon
                        aria-hidden="false"
                        color="rgb(0, 51, 102)"
                        size="20"
                      >
                        mdi-file-document-check-outline
                      </v-icon>
                      {{ renderDocument(100000000)[0].fileName }}
                    </div>

                    <v-btn
                      secondary
                      class="ml-15"
                      variant="flat"
                      size="sm"
                      @click.stop="removeDocment(renderDocument(100000000)[0])"
                      ><v-icon aria-hidden="false" color="red" size="20">
                        mdi-delete-forever-outline
                      </v-icon></v-btn
                    >
                  </div>

                  <v-btn
                    v-else
                    secondary
                    class="mt-2"
                    variant="outlined"
                    @click="toggleUpload(100000000)"
                    >Upload</v-btn
                  >
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-label>Certificate Issue Date</v-label>
                  <VueDatePicker
                    ref="iosas_incorporationcertificateissuedate"
                    v-model="data.iosas_incorporationcertificateissuedate"
                    :rules="[rules.required()]"
                    :enable-time-picker="false"
                    format="yyyy-MM-dd"
                  />
                </v-col>
              </v-row>
              <v-spacer />
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-label>Certificate of Good Standing (Optional)</v-label>
                  <br />
                  <div v-if="renderDocument(100000001)[0]" class="d-flex">
                    <div>
                      <v-icon
                        aria-hidden="false"
                        color="rgb(0, 51, 102)"
                        size="20"
                      >
                        mdi-file-document-check-outline
                      </v-icon>
                      {{ renderDocument(100000001)[0].fileName }}
                    </div>
                    <v-btn
                      secondary
                      class="ml-15"
                      variant="flat"
                      size="sm"
                      @click.stop="removeDocment(renderDocument(100000001)[0])"
                      ><v-icon aria-hidden="false" color="red" size="20">
                        mdi-delete-forever-outline
                      </v-icon></v-btn
                    >
                  </div>
                  <v-btn
                    v-else
                    secondary
                    class="mt-2"
                    variant="outlined"
                    @click="toggleUpload(100000001)"
                    >Upload</v-btn
                  >
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-label>Certificate of Good Standing Issue Date</v-label>
                  <VueDatePicker
                    ref="iosas_certificateofgoodstandingissuedate"
                    v-model="data.iosas_certificateofgoodstandingissuedate"
                    :rules="[rules.required()]"
                    :enable-time-picker="false"
                    format="yyyy-MM-dd"
                  />
                </v-col>
              </v-row>
              <v-spacer />
              <v-label>Other (Optional)</v-label>
              <v-row>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <div
                    v-for="document in renderDocument(100000002)"
                    key="document.content"
                  >
                    <div class="d-flex">
                      <div>
                        <v-icon
                          aria-hidden="false"
                          color="rgb(0, 51, 102)"
                          size="20"
                        >
                          mdi-file-document-check-outline
                        </v-icon>
                        {{ document.fileName }}
                      </div>
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
                    class="mt-2"
                    variant="outlined"
                    @click="toggleUpload(100000002)"
                    >Upload</v-btn
                  >
                </v-col>
              </v-row>

              <br />
              <br />
              <v-dialog v-model="documentUpload" width="auto">
                <DocumentUpload
                  ref="documentUpload"
                  @upload="upload"
                  @close="closeDocumentDialog"
                  :options="documentTypeOptions"
                  :selectedOption="selectedDocumentOption"
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
                <v-col cols="12">
                  <v-alert type="error" title="Error" variant="outlined">
                    Ensure all required fields are filled out before proceeding
                    to the next step
                  </v-alert>
                </v-col>
              </v-row>

              <br />
              <v-row>
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
                      v-if="!isNew()"
                      variant="plain"
                      @click="handleDelete"
                      class="link-button"
                    >
                      Cancel Submission
                    </v-btn>
                  </v-row>
                </v-container>
              </v-row>
            </div>
          </div>
        </v-container>
      </v-form>
    </template>
  </div>
</template>

<script>
import ApiService from '../../common/apiService';
import { authStore } from './../../store/modules/auth';
import { mapState } from 'pinia';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import alertMixin from './../../mixins/alertMixin';
import * as Rules from './../../utils/institute/formRules';
import ConfirmationDialog from '../../components/util/ConfirmationDialog.vue';
import DocumentUpload from '../common/DocumentUpload.vue';
import { formatDateTime } from '../../utils/format';
import { GOV_URL, NULL_STRING } from '../../utils/constants';

import PrimaryButton from './../util/PrimaryButton.vue';
import ExpressionOfInterestReadOnlyView from './ExpressionOfInterestReadOnlyView.vue';
import EOIFormHeader from './EOIFormHeader.vue';
import { metaDataStore } from '../../store/modules/metaData';

export default {
  name: 'ExpressionOfInterestForm',
  components: {
    PrimaryButton,
    ConfirmationDialog,
    ExpressionOfInterestReadOnlyView,
    DocumentUpload,
    VueDatePicker,
    EOIFormHeader,
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
    schoolYearOptions: {
      type: Array,
      required: true,
    },
    pickListOptions: {
      type: Object,
      required: true,
    },
    documentTypeOptions: {
      type: Array,
      required: true,
    },
    schoolAuthorityOptions: {
      type: Array,
      required: true,
    },
  },
  watch: {
    eoi: {
      handler(val) {
        if (val) {
          this.data = this.eoi;
          if (val.iosas_reviewstatus === this.draftStatusCode) {
            this.isEditing = true;
          }
        }
      },
    },
    'data._iosas_authorityhead_value': {
      handler(val) {
        if (val && this.data.iosas_existingauthority) {
          console.log(val);
          this.populateAndDisableAuthorityAddress = true;
          const matchedAuthority = this.schoolAuthorityOptions.find(
            (authority) => authority.value === val
          );

          const authorityAddress = {
            iosas_authorityaddressline1:
              matchedAuthority.authority.edu_address_street1,
            iosas_authorityaddressline2: null,
            iosas_authorityprovince:
              matchedAuthority.authority.edu_address_province,
            iosas_authoritycity: matchedAuthority.authority.edu_address_city,
            iosas_authoritypostalcode:
              matchedAuthority.authority.edu_address_postalcode,
            iosas_authoritycountry:
              matchedAuthority.authority.edu_address_country,
          };

          this.fetchingAuthorityHead = true;
          this.handleGetAuthorityHead(val);
          return (this.data = { ...this.data, ...authorityAddress });
        }
      },
    },
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
      GOV_URL,
      draftStatusCode: 100000006,
      isFormValid: false,
      isEditing: false,
      isSubmitted: false,
      schoolAddressKnown: false,
      applicationConfirmation: false,
      fetchingAuthorityHead: false,
      populateAndDisableAuthorityAddress: false,
      documentUpload: false,
      selectedDocumentOption: null,
      rules: Rules,
      data: {
        iosas_authoritycountry: 'Canada',
        iosas_authorityprovince: 'British Columbia',
        iosas_existingauthority: false,
        iosas_designatedcontactsameasauthorityhead: true,
        iosas_schooladdressline2: 'line 2',
        iosas_schoolcity: 'Victoria',
        iosas_schoolcountry: 'Canada',
        iosas_schoolprovince: 'British Columbia',
      },
      documents: [],
      showActivationSnackBar: false,
      activationErrorMessage: null,
      showError: false,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
  },
  created() {
    console.log(this.eoi);
    this.data = this.isNew() ? this.data : this.eoi;
    this.isEditing =
      this.isNew() || this.eoi?.iosas_reviewstatus === this.draftStatusCode;
  },
  methods: {
    authStore,
    formatDateTime,
    closeDocumentDialog() {
      this.documentUpload = false;
    },
    toggleUpload(documentCode = null) {
      this.selectedDocumentOption = documentCode;
      this.documentUpload = true;
    },
    isNew() {
      return this.$route.name === 'newExpressionOfInterest';
    },
    isReadOnly() {
      return this.eoi.iosas_reviewstatus !== this.draftStatusCode;
    },
    async handleGetAuthorityHead(schoolAuthorityId) {
      try {
        const response = await metaDataStore().getAuthorityHead(
          schoolAuthorityId
        );
        this.fetchingAuthorityHead = false;

        // Replace with from API
        if (response?.length > 0) {
          console.log(response);
          // populate with actual data from response
          const contact = {
            iosas_authorityheadfirstname: null,
            iosas_schoolauthorityheadname: null,
            iosas_schoolauthorityheademail: null,
            iosas_schoolauthorityheadphone: null,
          };
          this.data = { ...this.data, ...contact };
        }
        // Set contact information here
      } catch (e) {
        this.fetchingAuthorityHead = false;
        throw e;
      }
    },
    async handleUpdate() {
      console.log('PATCHING', this.data);

      if (this.isSubmitted) {
        const valid = await this.$refs.expressionOfInterestForm.validate();
        this.isFormValid = valid.valid;
      }

      this.showError = this.isSubmitted ?? !this.isFormValid;
      if (this.isFormValid || !this.isSubmitted) {
        this.$emit('setIsLoading');
        ApiService.updateEOI(
          this.data.iosas_expressionofinterestid,
          this.data,
          this.isSubmitted
        )
          .then(() => {
            if (this.documents.length > 0) {
              this.handleUploadDocuments(response.data);
            }
            if (this.isSubmitted) {
              this.$router.push({
                name: 'applicationConfirmation',
                params: { type: 'EOI' },
              });
            } else {
              this.setSuccessAlert(
                'Success! Expression of Interest draft has been update'
              );
            }
          })
          .catch((error) => {
            console.error(error);
            this.setFailureAlert(
              error?.response?.data?.message
                ? error?.response?.data?.message
                : 'An error occurred while saving the expression of Interest. Please try again later.'
            );
          })
          .finally(() => {
            this.$emit('setIsLoading');
          });
      }
    },
    async handleDelete() {
      const confirmation = await this.$refs.confirmDelete.open(
        'Cancel Submission - Expression of Interest?',
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
        this.$emit('setIsLoading');
        ApiService.cancelEOI(this.data.iosas_expressionofinterestid)
          .then(() => {
            this.$router.push({
              name: 'applicationConfirmation',
              params: { type: 'Delete#EOI' },
            });
          })
          .catch((error) => {
            console.error(error);
            this.setFailureAlert(
              error?.response?.data?.message
                ? error?.response?.data?.message
                : 'An error occurred while cancelling the expression of Interest. Please try again later.'
            );
          })
          .finally(() => {
            this.$emit('setIsLoading');
          });
      }
    },
    handleDraftSubmit() {
      this.isSubmitted = false;
      if (!this.isNew()) {
        return this.handleUpdate();
      }
      this.$emit('setIsLoading');
      ApiService.createEOI(this.data, this.isSubmitted)
        .then((response) => {
          if (this.documents.length > 0) {
            this.handleUploadDocuments(response.data);
          }
          // What happens if document upload fails? Throw error, fail silently?
          this.setSuccessAlert(
            'Success! The Expression of Interest has been saved.'
          );
        })
        .catch((error) => {
          console.error(error);
          this.setFailureAlert(
            error?.response?.data?.message
              ? error?.response?.data?.message
              : 'An error occurred while saving the expression of Interest. Please try again later.'
          );
        })
        .finally(() => {
          this.$emit('setIsLoading');
        });
    },
    async handleSubmit() {
      this.isSubmitted = true;
      if (!this.isNew()) {
        return this.handleUpdate();
      }
      const valid = await this.$refs.expressionOfInterestForm.validate();

      this.isFormValid = valid.valid;
      this.showError = !this.isFormValid;
      if (this.isFormValid) {
        this.$emit('setIsLoading');
        ApiService.createEOI(this.data, this.isSubmitted)
          .then((response) => {
            if (this.documents.length > 0) {
              this.handleUploadDocuments(response.data);
            }
            // Redirect to Confirmation Page - pass Id to fetch data?
            this.$router.push({
              name: 'applicationConfirmation',
              params: { type: 'EOI' },
            });
          })
          .catch((error) => {
            console.error(error);
            this.setFailureAlert(
              error?.response?.data?.message
                ? error?.response?.data?.message
                : 'An error occurred while saving the expression of Interest. Please try again later.'
            );
          })
          .finally(() => {
            this.$emit('setIsLoading');
          });
      }
    },
    async upload(document) {
      this.documents = [...this.documents, document];
      console.log(this.documents);
    },
    async handleUploadDocuments(eoiID) {
      Promise.all(
        this.documents.map(async (document) => {
          const payload = {
            ...document,
            regardingId: eoiID,
            regardingType: 'iosas_expressionofinterest',
          };
          await ApiService.uploadFile(payload)
            .then(() => {
              return;
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
    renderDocument(documentCode) {
      // LOGIC HERE TO DISPLAY CORRECT DOCUMENT (SAVED VS UPLOADED)
      if (this.data.documents?.length > 0) {
        // iosas_file_name
        console.log(this.data.documents);
      } else if (this.documents.length > 0) {
      }
      return this.documents.filter(
        (document) => document.documentTypeCode === documentCode
      );
    },
    removeDocment(document) {
      console.log('DOCUMENT PASSED IN', document);
      console.log('documents', this.documents);
      if (document.id) {
        // Delete with pop confirm
      } else {
        console.log('HEEEEERE');
        // First find index
        const index = this.documents.findIndex(
          (x) => x.conent === document.content
        );
        console.log(item);
        this.documents.slice(index, 1);
        return this.documents;
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
}

:deep(.dp__input) {
  height: 55px;
}
:deep(.mdi-information) {
  color: #003366;
}
:deep(.dp__active_date) {
  background-color: #003366;
  color: white;
}
:deep(.dp__select) {
  color: #003366;
}
:deep(.dp__today) {
  border-color: #003366;
}

.inline-box {
  display: -webkit-inline-box !important;
}
</style>
