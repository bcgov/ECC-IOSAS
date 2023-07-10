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
      <v-form
        ref="expressionOfInterestForm"
        v-model="expressionOfInterestFormValid"
      >
        <v-container fluid class="content-container">
          <div class="form-container">
            <div class="d-flex justify-space-between">
              <h1>Expression of Interest</h1>
              <PrimaryButton
                v-if="!isEditing"
                secondary
                text="Edit"
                class="mr-2"
                :click-action="toggleEditMode"
              />
            </div>
            <br />
            <v-divider></v-divider>
            <div v-if="!isEditing">
              <ExpressionOfInterestReadOnlyView :eoi="getData()[0]" />
            </div>
            <div v-else>
              <div v-if="!isNew()">
                <h4>General</h4>
                <br />
                <v-row>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <!-- <v-text-field
                      v-if="!isReadOnly || isEditing"
                      id="iosas_expressionofinterestid"
                      v-model="getData()[0].iosas_expressionofinterestid"
                      required
                      :rules="[rules.required()]"
                      :maxlength="255"
                      variant="outlined"
                      label="EOI Number"
                      disabled
                      color="rgb(59, 153, 252)"
                    /> -->
                    <v-label>EOI Number </v-label>
                    <p>EOI-01020</p>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <!-- <v-text-field
                      v-if="!isReadOnly || isEditing"
                      id="status"
                      v-model="getData()[0].status"
                      required
                      :rules="[rules.required()]"
                      :maxlength="255"
                      variant="outlined"
                      label="Status"
                      disabled
                      color="rgb(59, 153, 252)"
                    /> -->
                    <v-label>Status </v-label>
                    <p>Draft</p>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </div>
              <h4>School Authority Information</h4>
              <br />
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-label
                    >Name of School Authority (as it appears on attached
                    incorporation documents)</v-label
                  >

                  <v-text-field
                    :disabled="!isEditing"
                    id="iosas_edu_schoolauthorityname"
                    v-model="getData()[0].iosas_edu_schoolauthorityname"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <br />
              <v-label>School Authority Head's Name</v-label>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    :disabled="!isEditing"
                    id="authority_head_name"
                    v-model="getData()[0].authority_head_name"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="3" xs="12">
                  <v-text-field
                    :disabled="!isEditing"
                    id="autority_head_email"
                    v-model="getData()[0].autority_head_email"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="E-mail"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="3" xs="12">
                  <v-text-field
                    :disabled="!isEditing"
                    id="autority_head_phone"
                    v-model="getData()[0].autority_head_phone"
                    required
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
                <v-col cols="12">
                  <v-label
                    >Is the Designated Authority the same as Authority
                    Head?</v-label
                  >
                  <v-radio-group
                    v-model="authorityBoolRadioGroup"
                    color="#003366"
                    class="mt-4"
                    direction="horizontal"
                    inline
                    :disabled="!isEditing"
                  >
                    <v-radio label="Yes" color="#003366" :value="true">
                      <template #label>
                        <span :class="activeRadio">Yes</span>
                      </template>
                    </v-radio>
                    <v-radio label="No" color="#003366" :value="false">
                      <template #label>
                        <span :class="activeRadio">No</span>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <div v-if="authorityBoolRadioGroup === false">
                <v-label>Designated Authority Contact's Name</v-label>
                <v-row>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-text-field
                      :disabled="!isEditing"
                      id="designated_authority_name"
                      v-model="getData()[0].designated_authority_name"
                      required
                      :rules="[rules.required()]"
                      :maxlength="255"
                      variant="outlined"
                      label="Name"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3" xs="12">
                    <v-text-field
                      :disabled="!isEditing"
                      id="designated_authority_email"
                      v-model="getData()[0].designated_authority_email"
                      required
                      :rules="[rules.required()]"
                      :maxlength="255"
                      variant="outlined"
                      label="E-mail"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3" xs="12">
                    <v-text-field
                      :disabled="!isEditing"
                      id="designated_authority_phone"
                      v-model="getData()[0].designated_authority_phone"
                      required
                      :rules="[]"
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
              <v-label>Authority Mailing Address</v-label>
              <v-row>
                <v-col cols="12" sm="12" md="8" xs="12">
                  <v-text-field
                    :disabled="!isEditing"
                    id="iosas_authorityaddressline1"
                    v-model="getData()[0].iosas_authorityaddressline1"
                    required
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
                    :disabled="!isEditing"
                    id="iosas_authorityaddressline2"
                    v-model="getData()[0].iosas_authorityaddressline2"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Address Line 2"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    :disabled="!isEditing"
                    id="iosas_authoritycity"
                    v-model="getData()[0].iosas_authoritycity"
                    required
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
                    v-model="getData()[0].iosas_authorityprovince"
                    required
                    :rules="[rules.required()]"
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
                    v-model="getData()[0].iosas_authoritycountry"
                    required
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
                    :disabled="!isEditing"
                    id="iosas_authoritypostalcode"
                    v-model="getData()[0].iosas_authoritypostalcode"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
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
                    :disabled="!isEditing"
                    id="iosas_proposedschoolname"
                    v-model="getData()[0].iosas_proposedschoolname"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Proposed School Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-label>School Address (If Known)</v-label>
              <v-row>
                <v-col cols="12" sm="12" md="8" xs="12">
                  <v-text-field
                    :disabled="!isEditing"
                    id="iosas_schooladdressline1"
                    v-model="getData()[0].iosas_schooladdressline1"
                    required
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
                    :disabled="!isEditing"
                    id="iosas_schooladdressline2"
                    v-model="getData()[0].iosas_schooladdressline2"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Address Line 2"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    :disabled="!isEditing"
                    id="iosas_schoolcity"
                    v-model="getData()[0].iosas_schoolcity"
                    required
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
                    id="iosas_schoolprovince"
                    v-model="getData()[0].iosas_schoolprovince"
                    required
                    :rules="[rules.required()]"
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
                    v-model="getData()[0].iosas_schoolcountry"
                    required
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
                    :disabled="!isEditing"
                    id="iosas_schoolpostalcode"
                    v-model="getData()[0].iosas_schoolpostalcode"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Postal Code"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    :disabled="!isEditing"
                    id="iosas_website"
                    v-model="getData()[0].iosas_website"
                    required
                    :rules="[]"
                    :maxlength="255"
                    variant="outlined"
                    label="Website address (optional)"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    :disabled="!isEditing"
                    id="school_year"
                    v-model="getData()[0].school_year"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="School Year"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-label
                    >Group Calassification applying for: (Group classification
                    Information)</v-label
                  >
                  <v-radio-group
                    v-model="iosas_groupclassification"
                    color="#003366"
                    class="mt-4"
                    direction="horizontal"
                    inline
                    :disabled="!isEditing"
                  >
                    <v-radio
                      label="Group 1"
                      color="#003366"
                      value="groupOne"
                      disabled
                    >
                      <template #label>
                        <span :class="activeRadio">Group 1</span>
                      </template>
                    </v-radio>
                    <v-radio label="Group 2" color="#003366" value="groupTwo">
                      <template #label>
                        <span :class="activeRadio">Group 2</span>
                      </template>
                    </v-radio>
                    <v-radio label="Group 3" color="#003366" value="groupThree">
                      <template #label>
                        <span :class="activeRadio">Group 3</span>
                      </template>
                    </v-radio>
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
                    v-model="iosas_seekgrouponeclassification"
                    color="#003366"
                    class="mt-4"
                    direction="horizontal"
                    inline
                    :disabled="!isEditing"
                  >
                    <v-radio label="Yes" color="#003366" value="yes">
                      <template #label>
                        <span :class="activeRadio">Yes</span>
                      </template>
                    </v-radio>
                    <v-radio label="No" color="#003366" value="no">
                      <template #label>
                        <span :class="activeRadio">No</span>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-label>Proposed grade range in first year of operation</v-label>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-select
                    id="iosas_startgrade"
                    v-model="getData()[0].iosas_startgrade"
                    label="Select Start Grade"
                    variant="outlined"
                    color="rgb(59, 153, 252)"
                    :items="GRADE_OPTIONS"
                    :disabled="!isEditing"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-select
                    id="iosas_endgrade"
                    v-model="getData()[0].iosas_endgrade"
                    label="Select End Grade"
                    variant="outlined"
                    color="rgb(59, 153, 252)"
                    :items="GRADE_OPTIONS"
                    :disabled="!isEditing"
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </div>

          <br />
          <v-container v-if="isEditing">
            <v-row align="end">
              <v-spacer />
              <PrimaryButton
                type="submit"
                primary
                text="Submit"
                class="mr-2"
                click-action="buttonAction"
              />
              <PrimaryButton
                id=""
                secondary
                text="Clear"
                class="mr-2"
                @click="handleReset"
              />
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
import { GRADE_OPTIONS } from '../../utils/constants';

import PrimaryButton from './../util/PrimaryButton.vue';
import ExpressionOfInterestReadOnlyView from './ExpressionOfInterestReadOnlyView.vue';

export default {
  name: 'ExpressionOfInterestForm',
  components: {
    PrimaryButton,
    ConfirmationDialog,
    ExpressionOfInterestReadOnlyView,
  },
  mixins: [alertMixin],
  props: {},
  data() {
    return {
      GRADE_OPTIONS,
      expressionOfInterestFormValid: true,
      isEditing: false,
      rules: Rules,
      authorityBoolRadioGroup: true,
      iosas_groupclassification: 'groupTwo',
      iosas_seekgrouponeclassification: 'yes',
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
    isLoading() {
      return false;
    },
  },
  watch: {
    expressionOfInterestFormValid(value) {
      if (value !== null && value !== undefined) {
        if (this.hasRequiredFieldValues() && value) {
          this.$emit('is-form-valid', true);
        } else {
          this.$emit('is-form-valid', false);
        }
      }
    },
  },
  created() {},
  methods: {
    isNew() {
      return this.$route.name === 'newExpressionOfInterest';
    },
    isReadOnly() {
      return true;
    },
    toggleEditMode() {
      return (this.isEditing = true);
    },
    getData() {
      return [
        {
          iosas_expressionofinterestid: 'EOI-01020',
          status: 'Draft',
          authority_country: 'Canada',
          authority_province: 'BC',
          school_province: 'BC',
          school_country: 'Canada',
          iosas_edu_schoolauthority: null,
          iosas_edu_school: 'Victoria High School',
          iosas_authorityaddressline1: '1010 main street',
          iosas_authorityaddressline2: null,
          iosas_authoritycity: 'Victoria',
          iosas_authoritycountry: 'Canada',
          iosas_authorityheadfirstname: 'Jack Smith',
          iosas_authorityheadname: 'Jack',
          iosas_authorityheadyominame: 'Smith',
          iosas_authoritypostalcode: 'V6V8F9',
          iosas_authorityprovince: 'BC',
          iosas_authoritycontactname: null,
          iosas_authoritycontactyominame: null,
          iosas_contactname: null,
          iosas_contactyominame: null,
          iosas_designatedcontactfirstname: null,
          iosas_designatedcontactsameasauthorityhead: false,
          iosas_edu_schoolauthorityname: null,
          iosas_edu_yearname: null,
          iosas_endgrade: null,
          iosas_eionumber: null,
          iosas_existingauthority: false,
          iosas_existingcontact: false,
          iosas_existinghead: false,
          iosas_groupclassification: 'Group 2',
          iosas_name: null,
          iosas_notes: null,
          iosas_proposedschoolname: 'Victoria High School',
          iosas_schooladdressline1: '3954729 Vancouvrer rd',
          iosas_schooladdressline2: null,
          iosas_schoolcity: 'Victoria',
          iosas_schoolcountry: 'Canada',
          iosas_schoolpostalcode: 'V3Z4F9',
          iosas_schoolprovince: 'BC',
          iosas_schoolauthoritycontactemail: 'jack.smith@education.school.com',
          iosas_schoolauthoritycontactname: null,
          ioas_schoolauthoritycontactphone: null,
          iosas_schoolauthorityheademail: null,
          iosas_schoolauthorityheadname: null,
          iosas_schoolauthorityheadphone: null,
          iosas_schoolauthorityname: null,
          iosas_seekgrouponeclassification: true,
          iosas_startgrade: 'Kindergarten',
          iosas_endgrade: '6',
          iosas_submissiondate: null,
          iosas_submissionmethod: null,
          iosas_website: 'www.schoolwebsite.com',
        },
      ];
    },
  },
};
</script>

<style scoped>
.v-label {
  white-space: break-spaces;
}
</style>
