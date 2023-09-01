<template>
  <v-container>
    <h4>School Information</h4>
    <br />
    <div v-if="isEditing">
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_proposedschoolname"
            v-model="formData.iosas_proposedschoolname"
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Proposed School Name"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-select
            id="_iosas_edu_year_value"
            disabled
            v-model="formData._iosas_edu_year_value"
            label="School Year"
            variant="outlined"
            color="rgb(59, 153, 252)"
            :items="getSchoolYears"
            item-title="label"
            item-value="value"
            :rules="[rules.requiredSelect()]"
          >
          </v-select>
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
            item-title="label"
            item-value="value"
            :items="this.getApplicationPickListOptions['iosas_startgrade']"
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
            item-title="label"
            item-value="value"
            :items="this.getApplicationPickListOptions['iosas_endgrade']"
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
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Overview"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>

      <v-label>School Address (Optional)</v-label>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_addressline1"
            v-model="formData.iosas_addressline1"
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
            disabled
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
            :maxlength="255"
            variant="outlined"
            label="Postal Code"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-label>School Mailing Address (Optional)</v-label>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_mailingaddress1"
            v-model="formData.iosas_mailingaddress1"
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
            disabled
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
            :maxlength="255"
            variant="outlined"
            label="Website address (optional)"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_phonenumber"
            v-model="formData.iosas_phonenumber"
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
            >Group Classification applying for:
            <a :href="GOV_URL.groupClassificationUrl" target="_blank"
              >(Group classification Information)</a
            ></v-label
          >
          <v-radio-group
            id="iosas_groupclassification"
            v-model="formData.iosas_groupclassification"
            color="#003366"
            class="mt-4"
            inline
            @change="$emit('validateAndPopulate', $event)"
            :rules="[rules.requiredSelect()]"
          >
            <v-radio
              v-for="item in getApplicationPickListOptions?.[
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
      <v-row
        v-if="
          formData.iosas_groupclassification ===
          GROUP_CLASSIFICATION_CODES.groupTwo
        "
      >
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
            :rules="
              formData.iosas_groupclassification ===
              GROUP_CLASSIFICATION_CODES.groupTwo
                ? [rules.requiredRadio()]
                : []
            "
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-label
        >School's Intended Affiliation/Association (<a
          :href="GOV_URL.CIS"
          target="_blank"
          >CIS, </a
        ><a :href="GOV_URL.ISABC" target="_blank">ISABC, </a>
        <a :href="GOV_URL.SCSBC" target="_blank">SCSBC, </a>
        <a :href="GOV_URL.AMS" target="_blank">AMS, </a>
        <a :href="GOV_URL.ACSIBC" target="_blank">ACSIBC, </a>
        <a :href="GOV_URL.SDA" target="_blank">SDA,</a> or other if
        applicable)</v-label
      >
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-checkbox
            id="iosas_schoolaffiliation"
            v-for="item in getApplicationMultiPickListOptions[
              'iosas_schoolaffiliation'
            ]"
            :key="item.value"
            v-model="formData.iosas_schoolaffiliation"
            :value="item.value"
            :label="item.label"
          />
        </v-col>
      </v-row>
      <br />
      <v-label>Other School affiliation</v-label>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_schoolassociationother"
            v-model="formData.iosas_schoolassociationother"
            :maxlength="255"
            variant="outlined"
            :rules="
              formData.iosas_schoolaffiliation.includes(AFFILIATION_CODES.other)
                ? [rules.required()]
                : []
            "
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
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>School Year</v-label>
          <p>
            {{
              formData[
                '_iosas_edu_year_value@OData.Community.Display.V1.FormattedValue'
              ] || NULL_STRING
            }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Proposed grade range in first year of operation</v-label>
          <p>
            {{
              formData[
                'iosas_startgrade@OData.Community.Display.V1.FormattedValue'
              ]
            }}
            -
            {{
              formData[
                'iosas_endgrade@OData.Community.Display.V1.FormattedValue'
              ]
            }}
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
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>School Phone</v-label>
          <p>{{ formData.iosas_phone || NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-label
            >Group Classification applying for:
            <a :href="GOV_URL.groupClassificationUrl" target="_blank"
              >(Group classification Information)</a
            ></v-label
          >
          <p>
            {{
              formData[
                'iosas_groupclassification@OData.Community.Display.V1.FormattedValue'
              ] || NULL_STRING
            }}
          </p>
        </v-col>
      </v-row>
      <v-row
        v-if="
          formData.iosas_groupclassification ===
          GROUP_CLASSIFICATION_CODES.groupTwo
        "
      >
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
            >School's Intended Affiliation/Association (<a
              :href="GOV_URL.CIS"
              target="_blank"
              >CIS, </a
            ><a :href="GOV_URL.ISABC" target="_blank">ISABC, </a>
            <a :href="GOV_URL.SCSBC" target="_blank">SCSBC, </a>
            <a :href="GOV_URL.AMS" target="_blank">AMS, </a>
            <a :href="GOV_URL.ACSIBC" target="_blank">ACSIBC, </a>
            <a :href="GOV_URL.SDA" target="_blank">SDA,</a> or other if
            applicable)</v-label
          >
          <v-col cols="12" sm="12" md="12" xs="12">
            <div
              v-for="item in getApplicationMultiPickListOptions[
                'iosas_schoolaffiliation'
              ]"
              :key="item.value"
            >
              <v-checkbox
                v-model="formData.iosas_schoolaffiliation"
                :value="item.value"
                :label="item.label"
                disabled
              />
            </div>
          </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-label>Other</v-label>
          <p>{{ formData.iosas_schoolaffiliationother || NULL_STRING }}</p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { mapState } from 'pinia';
import { metaDataStore } from '../../../store/modules/metaData';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { NULL_STRING, GOV_URL } from '../../../utils/constants';
import {
  GROUP_CLASSIFICATION_CODES,
  AFFILIATION_CODES,
} from '../../../utils/application';
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
    GOV_URL,
    GROUP_CLASSIFICATION_CODES,
    AFFILIATION_CODES,
    rules: Rules,
  }),
  mounted() {},
  computed: {
    ...mapState(metaDataStore, [
      'getSchoolYears',
      'getApplicationPickListOptions',
      'getApplicationMultiPickListOptions',
    ]),
  },
  methods: {
    formatBooleanToYesNoString,
  },
};
</script>

<style scoped>
.v-label {
  display: inline-block;
}
</style>
