<template>
  <v-conatiner>
    <h4>School Information</h4>
    <br />
    <div v-if="isEditing">
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_proposedschoolname"
            v-model="formData.iosas_proposedschoolname"
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
            id="iosas_startgrade"
            v-model="formData.iosas_startgrade"
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
            id="iosas_endgrade"
            v-model="formData.iosas_endgrade"
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
            id="iosas_overview"
            v-model="formData.iosas_overview"
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
            id="iosas_addressline1"
            v-model="formData.iosas_addressline1"
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
            id="iosas_addressline2"
            v-model="formData.iosas_addressline2"
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
            id="iosas_city"
            v-model="formData.iosas_city"
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
            id="iosas_province"
            v-model="formData.iosas_province"
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
            id="iosas_country"
            v-model="formData.iosas_country"
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
            id="iosas_postalcode"
            v-model="formData.iosas_postalcode"
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
            id="iosas_mailingaddress1"
            v-model="formData.iosas_mailingaddress1"
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
            id="iosas_mailingaddress2"
            v-model="formData.iosas_mailingaddress2"
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
            id="iosas_mailingaddresscity"
            v-model="formData.iosas_mailingaddresscity"
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
            id="iosas_mailingaddressprovince"
            v-model="formData.iosas_mailingaddressprovince"
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
            id="iosas_mailingaddresscountry"
            v-model="formData.iosas_mailingaddresscountry"
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
            id="iosas_mailingaddresspostalcode"
            v-model="formData.iosas_mailingaddresspostalcode"
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
            v-model="formData.iosas_website"
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
            id="iosas_phone"
            v-model="formData.iosas_phone"
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
            v-model="formData.iosas_groupclassification"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Group 1" color="#003366" value="Group 1" disabled />
            <v-radio label="Group 2" color="#003366" value="Group 2" />
            <v-radio label="Group 3" color="#003366" value="Group 3" />
            <v-radio label="Group 4" color="#003366" value="Group 4" />
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
            v-model="formData.iosas_seekgroup1classification"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
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
            id="iosas_schoolaffiliation"
            v-model="formData.iosas_schoolaffiliation"
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
          <p>{{ formData.iosas_proposedschoolname || NULL_STRING }}</p>
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
            {{ formData.iosas_overview || NULL_STRING }}
          </p>
        </v-col>
      </v-row>

      <br />
      <v-label><strong>School Address</strong></v-label>
      <div class="ml-5">
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Address Line 1</v-label>
            <p>{{ formData.iosas_addressline1 || NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Address Line 2</v-label>
            <p>{{ formData.iosas_addressline2 || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>City</v-label>
            <p>{{ formData.iosas_city || NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Province</v-label>
            <p>{{ formData.iosas_province || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Country</v-label>
            <p>{{ formData.iosas_country || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Postal Code</v-label>
            <p>{{ formData.iosas_postalcode || NULL_STRING }}</p>
          </v-col>
        </v-row>
      </div>
      <br />

      <br />
      <v-label><strong>School Mailing Address</strong></v-label>
      <div class="ml-5">
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Address Line 1</v-label>
            <p>{{ formData.iosas_mailingaddress1 || NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Address Line 2</v-label>
            <p>{{ formData.iosas_mailingaddress2 || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>City</v-label>
            <p>{{ formData.iosas_mailingaddresscity || NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Province</v-label>
            <p>{{ formData.iosas_mailingaddressprovince || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Country</v-label>
            <p>{{ formData.iosas_mailingaddresscountry || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Postal Code</v-label>
            <p>{{ formData.iosas_mailingaddresspostalcode || NULL_STRING }}</p>
          </v-col>
        </v-row>
      </div>
      <br />

      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Website address</v-label>
          <p>{{ formData.iosas_website || NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Application Contact E-mail</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>School Phone</v-label>
          <p>{{ formData.iosas_phone || NULL_STRING }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-label
            >Group Calassification applying for: (Group classification
            Information)</v-label
          >
          <p>{{ formData.iosas_groupclassification || NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-label
            >For authorities applying for Group 2 classification, are there
            current plans to seek Group 1 classification in the second or
            subsequest year(s) of operation?
          </v-label>
          <p>
            {{
              formatBooleanToYesNoString(
                formData.iosas_seekgroup1classification
              )
            }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-label
            >School's Intended Affiliation/Association (CIS, ISABC, SCSBC, AMG,
            ACSIBC, SDA, or other if applicable)</v-label
          >
          <p>{{ formData.iosas_schoolaffiliation || NULL_STRING }}</p>
        </v-col>
      </v-row>
    </div>
  </v-conatiner>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { NULL_STRING, GRADE_OPTIONS } from '../../../utils/constants';
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
    GRADE_OPTIONS,
    rules: Rules,
  }),
  mounted() {},
  computed: {},
  methods: {
    formatBooleanToYesNoString,
  },
};
</script>
