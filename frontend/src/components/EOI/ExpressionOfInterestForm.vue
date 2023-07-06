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
        <v-container class="content-container">
          <h1>Expression of Interest</h1>
          <v-divider></v-divider>
          <br />
          <div v-if="!isNew()">
            <h4>General</h4>
            <br />
            <v-row>
              <v-col cols="6">
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
              <v-col cols="6">
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
          </div>
          <br />
          <h4>School Authority Information</h4>
          <br />
          <v-row>
            <v-col cols="6">
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
            <v-col cols="6">
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
            <v-col cols="3">
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
            <v-col cols="3">
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
              <v-col cols="6">
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
              <v-col cols="3">
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
              <v-col cols="3">
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
            <v-col cols="8">
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
            <v-col cols="8">
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
            <v-col cols="4">
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
            <v-col cols="4">
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
            <v-col cols="4">
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
            <v-col cols="4">
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

          <br />
          <h4>School Information</h4>
          <br />
          <v-row>
            <v-col cols="6">
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
            <v-col cols="8">
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
            <v-col cols="8">
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
            <v-col cols="4">
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
            <v-col cols="4">
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
            <v-col cols="4">
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
            <v-col cols="4">
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
            <v-col cols="6">
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
            <v-col cols="6">
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
                >For authorities applying for Group 2 classification, are there
                current plans to seek Group 1
              </v-label>
              <v-label
                >classification in the second or subsequest year of
                operation?</v-label
              >
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
            <v-col cols="6">
              <v-select
                id="start_grade"
                v-model="getData()[0].start_grade"
                label="Select Start Grade"
                variant="outlined"
                color="rgb(59, 153, 252)"
                :items="[
                  'Kindergarten',
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  '10',
                  '11',
                  '12',
                ]"
              >
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                id="end_grade"
                v-model="getData()[0].end_grade"
                label="Select End Grade"
                variant="outlined"
                color="rgb(59, 153, 252)"
                :items="[
                  'Kindergarten',
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  '10',
                  '11',
                  '12',
                ]"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
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
      </v-form>
    </template>
  </div>
</template>

<script>
import { authStore } from "./../../store/modules/auth";
import { mapState } from "pinia";
import alertMixin from "./../../mixins/alertMixin";
import * as Rules from "./../../utils/institute/formRules";
import ConfirmationDialog from "../../components/util/ConfirmationDialog.vue";
import { EOI_PAYLOAD } from "../../utils/constants";

import PrimaryButton from "./../util/PrimaryButton.vue";

export default {
  name: "ExpressionOfInterestForm",
  components: {
    PrimaryButton,
    ConfirmationDialog,
  },
  mixins: [alertMixin],
  props: {},
  data() {
    return {
      EOI_PAYLOAD,
      formValid: true,
      rules: Rules,
      authorityBoolRadioGroup: true,
      groupRadioGroup: "groupTwo",
      groupOneBoolRadioGroup: "yes",
    };
  },
  computed: {
    ...mapState(authStore, ["isAuthenticated", "userInfo"]),
    isLoading() {
      return false;
    },
  },
  created() {},
  methods: {
    isNew() {
      return this.$route.name === "newExpressionOfInterest";
    },
    getData() {
      return [
        {
          eoi_number: "EOI-01020",
          status: "Draft",
          proposed_school_name: null,
          school_year: null,
          group_classification: null,
          school_authority_name: null,
          autority_head_name: null,
          authority_head_email: null,
          authority_head_phone: null,
          designated_authority_name: null,
          designated_authority_email: null,
          designated_authority_phone: null,
          authority_address_line_1: null,
          authority_address_line_2: null,
          authority_city: null,
          authority_country: "Canada",
          authority_province: "BC",
          authority_postal_code: null,
          school_address_line_1: null,
          school_address_line_2: null,
          school_city: null,
          school_province: "BC",
          school_country: "Canada",
          school_postal_code: null,
          website_url: null,
          seek_group_one: false,
          proposed_grade_range: null,
        },
      ];
    },
  },
};
</script>

<style scoped>
.content-container {
  border-radius: 5px;
  padding-top: 50px;
  box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -webkit-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -moz-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
}

.activeRadio {
  color: rgb(59, 153, 252);
}
</style>
