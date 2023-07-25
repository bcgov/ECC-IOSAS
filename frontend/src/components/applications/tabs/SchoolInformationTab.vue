<template>
  <v-conatiner>
    <h4>School Information</h4>
    <br />
    <div v-if="isEditing">
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="proposed_school_name"
            v-model="formData.proposed_school_name"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Proposed School Name"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-label
        >Please specify grade range to be offered in the first year of
        operation</v-label
      >
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-select
            :disabled="!isEditing"
            id="start_grade"
            v-model="formData.start_grade"
            label="Select Start Grade"
            variant="outlined"
            color="rgb(59, 153, 252)"
            :items="GRADE_OPTIONS"
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-select
            :disabled="!isEditing"
            id="end_grade"
            v-model="formData.end_grade"
            label="Select End Grade"
            variant="outlined"
            color="rgb(59, 153, 252)"
            :items="GRADE_OPTIONS"
          ></v-select>
        </v-col>
      </v-row>
      <v-label
        >Please provide a brief overview of the proposed school, nature of
        program (international/Montessori/Waldorf/IB/other) and plans for future
        years.</v-label
      >
      <v-row>
        <v-col cols="12">
          <v-textarea
            :disabled="!isEditing"
            id="proposed_school_name"
            v-model="formData.proposed_school_name"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Overview"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>

      <v-label>School Address (If Known)</v-label>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="school_address_line_1"
            v-model="formData.school_address"
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
            id="school_address_line_2"
            v-model="formData.school_address"
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
            id="school_city"
            v-model="formData.school_city"
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
            v-model="formData.school_province"
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
            v-model="formData.school_country"
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
            id="school_postal_code"
            v-model="formData.school_postal_code"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Postal Code"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-label>School Mailing Address</v-label>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="school_address_line_1"
            v-model="formData.school_address"
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
            id="school_address_line_2"
            v-model="formData.school_address"
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
            id="school_city"
            v-model="formData.school_city"
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
            v-model="formData.school_province"
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
            v-model="formData.school_country"
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
            v-model="formData.school_postal_code"
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
            id="website_url"
            v-model="formData.website_url"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Website address (optional)"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="contact_email"
            v-model="formData.contact_email"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Application Contact E-mail"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="school_phone"
            v-model="formData.school_phone"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="School Phone (optional)"
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
            :disabled="!isEditing"
          >
            <v-radio label="Group 1" color="#003366" value="groupOne" disabled>
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
            <v-radio label="Group 3" color="#003366" value="groupFour">
              <template #label>
                <span :class="activeRadio">Group 4</span>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-label
            >For authorities applying for Group 2 classification, are there
            current plans to seek Group 1 classification in the second or
            subsequest year(s) of operation?
          </v-label>
          <v-radio-group
            v-model="groupOneBoolRadioGroup"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true">
              <template #label>
                <span :class="activeRadio">Yes</span>
              </template>
            </v-radio>
            <v-radio label="No" color="#003366" v-bind:value="false">
              <template #label>
                <span :class="activeRadio">No</span>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-label
        >School's Intended Affiliation/Association (CIS, ISABC, SCSBC, AMG,
        ACSIBC, SDA, or other if applicable)</v-label
      >
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="intended_affilliation"
            v-model="formData.contact_email"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Affiliation/Association"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Proposed School Name</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Proposed grade range in first year of operation</v-label>
          <p>
            {{ formData.iosas_startgrade }} -
            {{ formData.iosas_endgrade }}
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-label
            >Please provide a brief overview of the proposed school, nature of
            program (international/Montessori/Waldorf/IB/other) and plans for
            future years.</v-label
          >
          <p>
            {{ NULL_STRING }}
          </p>
        </v-col>
      </v-row>

      <br />
      <v-label><strong>School Address</strong></v-label>
      <div class="gray">
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Address Line 1</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Address Line 2</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>City</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Province</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Country</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Postal Code</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
        </v-row>
      </div>
      <br />

      <br />
      <v-label><strong>School Mailing Address</strong></v-label>
      <div class="gray">
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Address Line 1</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Address Line 2</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>City</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Province</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Country</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Postal Code</v-label>
            <p>{{ NULL_STRING }}</p>
          </v-col>
        </v-row>
      </div>
      <br />

      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Website address</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Application Contact E-mail</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>School Phone</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-label
            >Group Calassification applying for: (Group classification
            Information)</v-label
          >
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-label
            >For authorities applying for Group 2 classification, are there
            current plans to seek Group 1 classification in the second or
            subsequest year(s) of operation?
          </v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-label
            >School's Intended Affiliation/Association (CIS, ISABC, SCSBC, AMG,
            ACSIBC, SDA, or other if applicable)</v-label
          >
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
    </div>
  </v-conatiner>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { NULL_STRING } from '../../../utils/constants';
export default {
  name: 'SchoolInformationTab',
  components: {},
  props: {
    formData: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    NULL_STRING,
    requiredRules: [(v) => !!v || 'Required'],
    rules: Rules,
  }),
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
.v-label {
  white-space: break-spaces;
}

.gray {
  margin: 10px;
  padding: 10px;
}
</style>
