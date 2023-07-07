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
      <v-form ref="expressionOfInterestForm" v-model="formValid">
        <v-container fluid class="content-container">
          <div class="form-container">
            <h1>Expression of Interest</h1>
            <v-divider></v-divider>
            <div v-if="!isNew()">
              <h4>General</h4>
              <br />
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="eoi_number"
                    v-model="getData()[0].eoi_number"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="EOI Number"
                    disabled
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="status"
                    v-model="getData()[0].status"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Status"
                    disabled
                    color="rgb(59, 153, 252)"
                  />
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
                  id="school_authority_name"
                  v-model="getData()[0].school_authority_name"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Name"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-label>School Authority Head's Name</v-label>
            <v-row>
              <v-col cols="12" sm="12" md="6" xs="12">
                <v-text-field
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
                  id="authority_address_line_1"
                  v-model="getData()[0].authority_address_line_1"
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
                  id="authority_address_line_2"
                  v-model="getData()[0].authority_address_line_2"
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
                  id="authority_city"
                  v-model="getData()[0].authority_city"
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
                  id="authority_province"
                  v-model="getData()[0].authority_province"
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
                  id="authority_country"
                  v-model="getData()[0].authority_country"
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
                  id="authority_postal_code"
                  v-model="getData()[0].authority_postal_code"
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
                  id="proposed_school_name"
                  v-model="getData()[0].proposed_school_name"
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
                  id="school_address_line_1"
                  v-model="getData()[0].school_address_line_1"
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
                  id="school_address_line_2"
                  v-model="getData()[0].school_address_line_2"
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
                  id="school_city"
                  v-model="getData()[0].school_city"
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
                  id="school_province"
                  v-model="getData()[0].school_province"
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
                  id="school_country"
                  v-model="getData()[0].school_country"
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
                  id="school_postal_code"
                  v-model="getData()[0].school_postal_code"
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
                  id="school_year"
                  v-model="getData()[0].school_year"
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
                  v-model="groupRadioGroup"
                  color="#003366"
                  class="mt-4"
                  direction="horizontal"
                  inline
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
                  v-model="groupOneBoolRadioGroup"
                  color="#003366"
                  class="mt-4"
                  direction="horizontal"
                  inline
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
                  id="start_grade"
                  v-model="getData()[0].start_grade"
                  label="Select Start Grade"
                  variant="outlined"
                  color="rgb(59, 153, 252)"
                  :items="GRADE_OPTIONS"
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="12" md="6" xs="12">
                <v-select
                  id="end_grade"
                  v-model="getData()[0].end_grade"
                  label="Select End Grade"
                  variant="outlined"
                  color="rgb(59, 153, 252)"
                  :items="GRADE_OPTIONS"
                ></v-select>
              </v-col>
            </v-row>
          </div>
          <br />
          <v-container>
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
import { EOI_PAYLOAD, GRADE_OPTIONS } from '../../utils/constants';

import PrimaryButton from './../util/PrimaryButton.vue';

export default {
  name: 'ExpressionOfInterestForm',
  components: {
    PrimaryButton,
    ConfirmationDialog,
  },
  mixins: [alertMixin],
  props: {},
  data() {
    return {
      EOI_PAYLOAD,
      GRADE_OPTIONS,
      formValid: true,
      rules: Rules,
      authorityBoolRadioGroup: true,
      groupRadioGroup: 'groupTwo',
      groupOneBoolRadioGroup: 'yes',
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
    isLoading() {
      return false;
    },
  },
  created() {},
  methods: {
    isNew() {
      return this.$route.name === 'newExpressionOfInterest';
    },
    getData() {
      return [
        {
          eoi_number: 'EOI-01020',
          status: 'Draft',
          authority_country: 'Canada',
          authority_province: 'BC',
          school_province: 'BC',
          school_country: 'Canada',
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
