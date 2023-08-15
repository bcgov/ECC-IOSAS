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
      <ConfirmationDialog ref="confirmDeleteDocument">
        <template #message>
          <p>This document will be removed from your records.</p>
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
        <v-container fluid>
          <div>
            <div class="d-flex justify-space-between">
              <h1>Expression of Interest</h1>
            </div>
            <IndependentSchoolDisclaimer />
            <br />
            <v-divider></v-divider>
            <div>
              <div v-if="!isNew()">
                <EOIFormHeader :eoi="data" :draftStatusCode="draftStatusCode" />
                <v-divider></v-divider>
              </div>
              <h4>School Authority Information</h4>
              <br />
              <v-row>
                <v-col cols="12">
                  <v-label class="no-mb"
                    >Is this Expression of Interest for an existing School
                    Authority?</v-label
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
                    :items="getSchoolAuthorityListOptions"
                    id="_iosas_edu_schoolauthority_value"
                    v-model="data._iosas_edu_schoolauthority_value"
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
              <h4>School Authority Contacts</h4>
              <br />

              <div>
                <v-label>Designated Authority Contact</v-label>
                <v-label
                  >The designated contact is the person submitting the
                  application, and the person who will receive follow-up emails
                  and contact by the ministry.</v-label
                >
                <v-row>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-text-field
                      id="iosas_designatedcontactfirstname"
                      v-model="data.iosas_designatedcontactfirstname"
                      :disabled="populatedAndDisableDesignatedContact"
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
                      :disabled="populatedAndDisableDesignatedContact"
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
                      :disabled="populatedAndDisableDesignatedContact"
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
                      :disabled="populatedAndDisableDesignatedContact"
                      :rules="
                        data.iosas_designatedcontactsameasauthorityhead
                          ? [rules.required()]
                          : []
                      "
                      :maxlength="255"
                      variant="outlined"
                      label="Phone"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                </v-row>
              </div>
              <v-row>
                <v-col cols="12">
                  <v-label class="no-mb"
                    >Is the School Authority Head the same person as the
                    Designated Authority Contact?</v-label
                  >
                  <v-radio-group
                    id="iosas_designatedcontactsameasauthorityhead"
                    v-model="data.iosas_designatedcontactsameasauthorityhead"
                    color="#003366"
                    class="mt-4"
                    :rules="[rules.requiredRadio()]"
                    inline
                  >
                    <v-radio label="Yes" color="#003366" :value="true" />
                    <v-radio label="No" color="#003366" :value="false" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <div>
                <v-label>School Authority Head</v-label>
                <div>
                  <v-row>
                    <v-col cols="12" sm="12" md="6" xs="12">
                      <v-text-field
                        id="iosas_authorityheadfirstname"
                        v-model="data.iosas_authorityheadfirstname"
                        :disabled="populatedAndDisableAuthorityHead"
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
                        :disabled="populatedAndDisableAuthorityHead"
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
                        :disabled="populatedAndDisableAuthorityHead"
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
                        :disabled="populatedAndDisableAuthorityHead"
                        :rules="[rules.required()]"
                        :maxlength="255"
                        variant="outlined"
                        label="Phone"
                        color="rgb(59, 153, 252)"
                      />
                    </v-col>
                  </v-row>
                </div>
              </div>
              <br />

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
                    label="Is the School Address known?"
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
                    :items="getActiveSchoolYearSelect"
                    item-title="label"
                    item-value="value"
                    :rules="[rules.requiredSelect()]"
                  >
                  </v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-label class="no-mb">
                    Group Classification applying for:
                    <a :href="GOV_URL.groupClassificationUrl" target="_blank"
                      >(Group classification Information)</a
                    >
                  </v-label>
                  <v-radio-group
                    id="iosas_groupclassification"
                    v-model="data.iosas_groupclassification"
                    color="#003366"
                    class="mt-4"
                    inline
                    @change="validateAndPopulate"
                    :rules="[rules.requiredSelect()]"
                  >
                    <v-radio
                      v-for="item in getEOIPickListOptions?.[
                        'iosas_groupclassification'
                      ]"
                      :key="item.value"
                      inline
                      :label="item.label"
                      color="#003366"
                      v-bind:value="item.value"
                    />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-label class="no-mb"
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
                    :rules="
                      data.iosas_groupclassification === groupTwoCode
                        ? [rules.requiredRadio()]
                        : []
                    "
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
                    :items="getEOIPickListOptions?.['iosas_startgrade']"
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
                    :items="getEOIPickListOptions?.['iosas_endgrade']"
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
              <!-- TODO: Enable ability to add documents to EOI -->
              <v-divider></v-divider>
              <h4>Documents</h4>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-label>Incorporation Certificate</v-label>
                  <br />
                  <div v-if="incorporationDocument" class="d-flex">
                    <div>
                      <v-icon
                        aria-hidden="false"
                        color="rgb(0, 51, 102)"
                        size="17"
                      >
                        mdi-file-document-check-outline
                      </v-icon>
                      <p>{{ incorporationDocument.fileName }}</p>
                    </div>

                    <!-- TODO: Add ability to delete documents -->
                    <!-- <v-btn
                      secondary
                      class="ml-15"
                      variant="flat"
                      size="sm"
                      @click.stop="removeDocment(incorporationDocument)"
                      ><v-icon aria-hidden="false" color="red" size="20">
                        mdi-delete-forever-outline
                      </v-icon></v-btn
                    > -->
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
                  <div v-if="certificateOfGoodStandingDocument" class="d-flex">
                    <div>
                      <v-icon
                        aria-hidden="false"
                        color="rgb(0, 51, 102)"
                        size="17"
                      >
                        mdi-file-document-check-outline
                      </v-icon>
                      {{ certificateOfGoodStandingDocument.fileName }}
                    </div>
                    <!-- TODO: Add ability to delete documents -->
                    <!-- <v-btn
                      secondary
                      class="ml-15"
                      variant="flat"
                      size="sm"
                      @click.stop="
                        removeDocment(certificateOfGoodStandingDocument)
                      "
                      ><v-icon aria-hidden="false" color="red" size="20">
                        mdi-delete-forever-outline
                      </v-icon></v-btn
                    > -->
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
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-label>Other (Optional)</v-label>
                  <div
                    v-for="document in otherDocuments"
                    key="document.content"
                  >
                    <div class="d-flex">
                      <div>
                        <v-icon
                          aria-hidden="false"
                          color="rgb(0, 51, 102)"
                          size="17"
                        >
                          mdi-file-document-check-outline
                        </v-icon>
                        {{ document.fileName }}
                      </div>
                      <!-- TODO: Add ability to delete documents -->
                      <!-- <v-btn
                        secondary
                        class="ml-15"
                        variant="flat"
                        size="sm"
                        @click.stop="removeDocment(document)"
                        ><v-icon aria-hidden="false" color="red" size="20">
                          mdi-delete-forever-outline
                        </v-icon></v-btn
                      > -->
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
              <v-divider></v-divider>
              <v-label>Additional Notes (Optional)</v-label>
              <v-row>
                <v-col cols="12" sm="12" md="12" xs="12">
                  <v-textarea
                    id="iosas_notes"
                    v-model="data.iosas_notes"
                    variant="outlined"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>

              <br />
              <br />
              <v-dialog v-model="documentUpload" width="auto">
                <DocumentUpload
                  ref="documentUpload"
                  @upload="upload"
                  @close="closeDocumentDialog"
                  :options="
                    getDocumentPickListOptions?.['iosas_eoidocumenttype']
                  "
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
      <!-- <v-col cols="12" sm="12" md="4" xs="12">
        <RelatedLinksCard />
        <ContactCard />
      </v-col> -->
    </template>
  </div>
</template>

<script>
import ApiService from '../../common/apiService';
import { authStore } from './../../store/modules/auth';
import { metaDataStore } from './../../store/modules/metaData';
import { applicationsStore } from './../../store/modules/applications';
import IndependentSchoolDisclaimer from '../IndependentSchoolDisclaimer.vue';
import { mapState } from 'pinia';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import alertMixin from './../../mixins/alertMixin';
import * as Rules from './../../utils/institute/formRules';
import ConfirmationDialog from '../../components/util/ConfirmationDialog.vue';
import DocumentUpload from '../common/DocumentUpload.vue';
import { GOV_URL } from '../../utils/constants';

import PrimaryButton from './../util/PrimaryButton.vue';
import EOIFormHeader from './EOIFormHeader.vue';

export default {
  name: 'ExpressionOfInterestForm',
  components: {
    IndependentSchoolDisclaimer,
    PrimaryButton,
    ConfirmationDialog,
    DocumentUpload,
    VueDatePicker,
    EOIFormHeader,
  },
  emits: ['setIdLoading', 'fetchEOIData'],
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
    draftStatusCode: {
      type: Number,
      required: true,
    },
  },
  watch: {
    'data.certificateissuedate': {
      handler(val) {},
    },
    documents: {
      handler(val) {
        this.incorporationDocument = val.find(
          ({ documentType }) => documentType === 100000000
        );
        this.certificateOfGoodStandingDocument = val.find(
          ({ documentType }) => documentType === 100000001
        );
        this.otherDocuments = val.filter(
          ({ documentType }) => documentType === 100000002
        );
        return;
      },
    },
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
    schoolAddressKnown: {
      handler(val) {
        if (val) {
          return (this.data = {
            ...this.data,
            iosas_schoolcountry: 'Canada',
            iosas_schoolprovince: 'British Columbia',
          });
        } else {
          return (this.data = {
            ...this.data,
            iosas_schoolcountry: null,
            iosas_schoolprovince: null,
          });
        }
      },
    },
    'data._iosas_edu_year_value': {
      handler(val) {
        const matchedSchoolYear = this.getActiveSchoolYearSelect.find(
          ({ value }) => value === val
        );
        this.schoolYearLabel = matchedSchoolYear.year.iosas_label;
        console.log(this.schoolYearLabel);
        return;
      },
    },
    'data.iosas_designatedcontactsameasauthorityhead': {
      handler(val, oldVal) {
        // Dont trigger watch on initial load of draft
        if (oldVal === undefined && !this.isNew()) {
          return;
        }
        let contact;
        if (val) {
          this.populatedAndDisableAuthorityHead = true;
          contact = {
            iosas_authorityheadfirstname:
              this.data.iosas_designatedcontactfirstname,
            iosas_schoolauthorityheadname:
              this.data.iosas_schoolauthoritycontactname,
            iosas_schoolauthorityheademail:
              this.data.iosas_schoolauthoritycontactemail,
            iosas_schoolauthorityheadphone:
              this.data.ioas_schoolauthoritycontactphone,
          };
        } else {
          this.populatedAndDisableAuthorityHead = false;
          contact;
        }
        return (this.data = { ...this.data, ...contact });
      },
    },
    'data._iosas_edu_schoolauthority_value': {
      handler(val, oldVal) {
        // Dont trigger watch on initial load of draft
        if (oldVal === undefined && !this.isNew()) {
          return;
        }
        console.log(this.data._iosas_edu_schoolauthority_value);
        console.log(val);
        if (val && this.data.iosas_existingauthority) {
          this.populateAndDisableAuthorityAddress = true;
          const matchedAuthority = this.getSchoolAuthorityListOptions.find(
            (authority) => authority.value === val
          );
          this.authorityName = matchedAuthority.authority.edu_name;
          console.log(matchedAuthority);
          const authorityAddress = {
            iosas_authorityaddressline1:
              matchedAuthority.authority.edu_address_street1,
            iosas_authorityaddressline2:
              matchedAuthority.authority.edu_address_street2,
            iosas_authorityprovince:
              matchedAuthority.authority.edu_address_province,
            iosas_authoritycity: matchedAuthority.authority.edu_address_city,
            iosas_authoritypostalcode:
              matchedAuthority.authority.edu_address_postalcode,
            iosas_authoritycountry:
              matchedAuthority.authority.edu_address_country,
          };

          console.log(this.authorityName);
          return (this.data = {
            ...this.data,
            iosas_schoolauthorityname: null,
            ...authorityAddress,
          });
        }
      },
    },
    'data.iosas_schoolauthorityname': {
      handler(val) {
        if (val) {
          this.authorityName = val;
        }
        console.log(this.authorityName);
      },
    },
    'data.iosas_existingauthority': {
      handler(val, oldVal) {
        // Dont trigger watch on initial load of draft
        if (oldVal === undefined && !this.isNew()) {
          return;
        }
        this.populateAndDisableAuthorityAddress = false;
        console.log(this.authorityName);
        console.log('Why set to null if true');
        return (this.data = {
          ...this.data,
          iosas_authorityaddressline1: null,
          iosas_authorityaddressline2: null,
          iosas_authorityprovince: null,
          iosas_authoritycity: null,
          iosas_authoritypostalcode: null,
          _iosas_edu_schoolauthority_value: null,
          iosas_authoritycountry: 'Canada',
          iosas_authorityprovince: 'British Columbia',
        });
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
      groupTwoCode: 100000000,
      authorityName: null,
      schoolYearLabel: null,
      incorporationDocument: null,
      certificateOfGoodStandingDocument: null,
      otherDocuments: null,
      isFormValid: false,
      isEditing: false,
      isSubmitted: false,
      schoolAddressKnown: null,
      applicationConfirmation: false,
      populateAndDisableAuthorityAddress: false,
      populatedAndDisableDesignatedContact: false,
      populatedAndDisableAuthorityHead: false,
      populateAndDisableContactPhone: false,
      documentUpload: false,
      selectedDocumentOption: null,
      rules: Rules,
      data: {},
      documents: [],
      showActivationSnackBar: false,
      activationErrorMessage: null,
      showError: false,
    };
  },
  computed: {
    ...mapState(metaDataStore, [
      'getActiveSchoolYearSelect',
      'getEOIPickListOptions',
      'getDocumentPickListOptions',
      'getSchoolAuthorityListOptions',
    ]),
    ...mapState(applicationsStore, ['setConfirmationMessage']),
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
  },
  created() {
    this.data = this.isNew() ? this.data : this.eoi;
    this.isEditing =
      this.isNew() || this.eoi?.iosas_reviewstatus === this.draftStatusCode;

    console.log(this.data);
    if (this.data?.documents?.length > 0) {
      this.displayDocuments();
    }

    // Disable autopopulated fields on draft applications
    if (!this.isNew()) {
      if (this.data.iosas_designatedcontactsameasauthorityhead) {
        this.populatedAndDisableAuthorityHead = true;
      }
      if (this.data.iosas_existingauthority) {
        this.populateAndDisableAuthorityAddress = true;
      }
      if (this.data.iosas_schooladdressline1) {
        this.schoolAddressKnown = true;
      } else {
        this.schoolAddressKnown = false;
      }
    }

    // populate DAC if authenticated and new EOI
    if (this.isAuthenticated && this.isNew()) {
      this.populatedAndDisableDesignatedContact = true;
      const designatedContact = {
        iosas_existingcontact: true,
        iosas_designatedcontactfirstname: this.userInfo.firstName,
        iosas_schoolauthoritycontactname: this.userInfo.lastName,
        iosas_schoolauthoritycontactemail: this.userInfo.email,
        ioas_schoolauthoritycontactphone: this.userInfo?.phone || null,
      };
      return (this.data = { ...this.data, ...designatedContact });
    }
  },
  methods: {
    authStore,
    applicationsStore,
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
    async handleUpdate() {
      console.log('updating');
      if (this.isSubmitted) {
        const valid = await this.$refs.expressionOfInterestForm.validate();
        this.isFormValid = valid.valid;
        this.showError = !this.isFormValid;
      }

      if (this.isFormValid || !this.isSubmitted) {
        this.$emit('setIsLoading');
        ApiService.updateEOI(
          this.data.iosas_expressionofinterestid,
          this.data,
          this.isSubmitted
        )
          .then(async (response) => {
            if (this.documents.length > 0) {
              this.handleUploadDocuments(
                this.data.iosas_expressionofinterestid
              );
            }
            if (this.isSubmitted) {
              await applicationsStore().setConfirmationMessage(
                `Thank you for submitting your Expression of Interest for ${this.authorityName} to open a new independent school, ${this.data.iosas_proposedschoolname}, in September of ${this.schoolYearLabel}.`
              );
              this.$router.push({
                name: 'applicationConfirmation',
                params: { type: 'EOI' },
              });
            } else {
              this.$emit('fetchEOIData');

              this.setSuccessAlert(
                'Success! Expression of Interest draft has been updated'
              );
            }
          })
          .catch((error) => {
            this.setFailureAlert(
              error?.response?.data?.message
                ? error?.response?.data?.message
                : 'An error occurred while saving the expression of Interest. Please try again later.'
            );
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
          .then(async () => {
            await applicationsStore().setConfirmationMessage(
              `Expression of Interest ${this.data.iosas_eoinumber} has been successfully removed from your records.`
            );
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
        console.log('going to handleUpdate if im not new');
        return this.handleUpdate();
      }
      this.$emit('setIsLoading');
      ApiService.createEOI(this.data, this.isSubmitted)
        .then((response) => {
          if (this.documents.length > 0) {
            this.handleUploadDocuments(response.data);
          }
          this.setSuccessAlert(
            'Success! The Expression of Interest has been updated.'
          );
          this.$router.push({
            name: 'expressionOfInterest',
            params: { id: response.data },
          });
        })
        .catch((error) => {
          this.setFailureAlert(
            error?.response?.data?.message
              ? error?.response?.data?.message
              : 'An error occurred while saving the expression of Interest. Please try again later.'
          );
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
          .then(async (response) => {
            if (this.documents.length > 0) {
              this.handleUploadDocuments(response.data);
            }

            await applicationsStore().setConfirmationMessage(
              `Thank you for submitting your Expression of Interest for ${this.authorityName} to open a new independent school, ${this.data.iosas_proposedschoolname}, in September of ${this.schoolYearLabel}.`
            );
            this.$router.push({
              name: 'applicationConfirmation',
              params: { type: 'EOI' },
            });
          })
          .catch((error) => {
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
            .then((response) => {
              return response;
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
    displayDocuments() {
      this.incorporationDocument = this.data?.documents
        .map((doc) => ({ fileName: doc.iosas_file_name, ...doc }))
        .find(
          ({ iosas_eoidocumenttype }) => iosas_eoidocumenttype === 100000000
        );

      // Set boolean

      this.certificateOfGoodStandingDocument = this.data?.documents
        .map((doc) => ({ fileName: doc.iosas_file_name, ...doc }))
        .find(
          ({ iosas_eoidocumenttype }) => iosas_eoidocumenttype === 100000001
        );

      // Set boolean
      this.otherDocuments = this.data?.documents
        .map((doc) => ({ fileName: doc.iosas_file_name, ...doc }))
        .filter(
          ({ iosas_eoidocumenttype }) => iosas_eoidocumenttype === 100000002
        );
    },
    async removeDocment(document) {
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
        if (document.iosas_documentid) {
          this.$emit('setIsLoading');
          await ApiService.deleteDocument(document.iosas_documentid)
            .then(async () => {
              const documentResponse = await ApiService.getEOIDocuments(
                this.data.iosas_expressionofinterestid
              );
              if (documentResponse) {
                this.data.documents = documentResponse.data.value;
                this.displayDocuments();
              }
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
            })
            .finally(this.$emit('setIsLoading'));
        } else {
          // TODO: add temporary id to differentiate between staged documents
          const filteredDocuments = this.documents.filter(({ content }) => {
            return content !== document.content;
          });

          this.documents = filteredDocuments;
          return this.documents;
        }
      }
    },
    shouldWatchDataChange(oldValue) {
      if (oldValue === undefined && !this.isNew()) {
        return;
      }
    },
    validateAndPopulate(e) {
      // RadioGroup does not update the form to trigger validation refresh if the error is already being displayed on the UI,
      // must attach a change event, and set the field programatically.
      // RadioGroup appears to work following the happy path, This is only needed for RadioGroups with 'Required' validation
      if (e.target.attributes?.name?.value === 'iosas_groupclassification') {
        this.data[e.target.attributes?.name?.value] = Number(e.target.value);
      } else {
        const isBoolean = ['true', 'false'].includes(e.target.value);
        const defaultValue = isBoolean
          ? JSON.parse(e.target.value)
          : e.target.value;
        this.data[e.target.attributes?.name?.value] = defaultValue;
      }

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
