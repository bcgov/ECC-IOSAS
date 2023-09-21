<template>
  <v-container>
    <h4>School Authority Information</h4>
    <br />
    <div v-if="isEditing">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="6"
          xs="12"
          v-if="formData.iosas_preexistingauthority"
        >
          <v-autocomplete
            label="School Authority Name"
            id="_iosas_edu_schoolauthority_value"
            disabled
            v-model="formData._iosas_edu_schoolauthority_value"
            :items="getSchoolAuthorityListOptions"
            variant="outlined"
            item-title="label"
            item-value="value"
            :rules="[rules.requiredSelect()]"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12" v-else>
          <v-text-field
            :disabled="!isEditing"
            id="iosas_schoolauthority"
            v-model="formData.iosas_schoolauthority"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Name of School Authority"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>

      <v-label
        >Please indicate under which legislation your School Authority is
        incorporated:</v-label
      >
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-radio-group
            id="iosas_incorporationtype"
            v-model="formData.iosas_incorporationtype"
            color="#003366"
            inline
            :disabled="formData.iosas_preexistingauthority"
            @change="$emit('validateAndPopulate', $event)"
            :rules="
              formData.iosas_preexistingauthority
                ? []
                : [rules.requiredSelect()]
            "
          >
            <v-radio
              v-for="item in getApplicationPickListOptions[
                'iosas_incorporationtype'
              ]"
              :key="item.value"
              inline
              color="#003366"
              :value="item.value"
            >
              <template v-slot:label>
                <a
                  target="_blank"
                  :href="getIncorporationUrl(item.label)"
                  v-if="getIncorporationUrl(item.label)"
                >
                  {{ item.label }}
                </a>
                <p v-else>{{ item.label }}</p>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="formData.iosas_preexistingauthority"
            id="iosas_officialregistrationnumber"
            v-model="formData.iosas_officialregistrationnumber"
            :rules="
              formData.iosas_preexistingauthority ? [] : [rules.required()]
            "
            :maxlength="255"
            variant="outlined"
            label="Official Registration Number"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <VueDatePicker
            ref="iosas_dateoflastannualreport"
            v-model="formData.iosas_dateoflastannualreport"
            :rules="[rules.required()]"
            :enable-time-picker="false"
            format="yyyy-MM-dd"
            :disabled="formData.iosas_preexistingauthority"
          />
        </v-col>
      </v-row>

      <v-label>Authority Mailing Address</v-label>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-text-field
            id="iosas_authorityaddressline1"
            v-model="formData.iosas_authorityaddressline1"
            :disabled="formData.iosas_preexistingauthority"
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
            v-model="formData.iosas_authorityaddressline2"
            :disabled="formData.iosas_preexistingauthority"
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
            v-model="formData.iosas_authoritycity"
            :disabled="formData.iosas_preexistingauthority"
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
            v-model="formData.iosas_authorityprovince"
            :disabled="formData.iosas_preexistingauthority"
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
            v-model="formData.iosas_authoritycountry"
            :disabled="formData.iosas_preexistingauthority"
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
            v-model="formData.iosas_authoritypostalcode"
            :disabled="formData.iosas_preexistingauthority"
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
        <v-row>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-text-field
              id="iosas_designatedcontactfirstname"
              v-model="formData.iosas_designatedcontactfirstname"
              :rules="[rules.required()]"
              variant="outlined"
              label="First Name"
              color="rgb(59, 153, 252)"
              disabled
            />
          </v-col>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-text-field
              id="iosas_schoolauthoritycontactname"
              v-model="formData.iosas_schoolauthoritycontactname"
              :rules="[rules.required()]"
              variant="outlined"
              label="Last Name"
              color="rgb(59, 153, 252)"
              disabled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-text-field
              id="iosas_schoolauthoritycontactemail"
              v-model="formData.iosas_schoolauthoritycontactemail"
              :rules="[rules.required()]"
              variant="outlined"
              label="E-mail"
              color="rgb(59, 153, 252)"
              disabled
            />
          </v-col>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-text-field
              id="iosas_schoolauthoritycontactphone"
              v-model="formData.iosas_schoolauthoritycontactphone"
              variant="outlined"
              label="Phone"
              color="rgb(59, 153, 252)"
              disabled
            />
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="12">
          <v-label class="no-mb"
            >Is the School Authority Head the same person as the Designated
            Authority Contact?</v-label
          >
          <v-radio-group
            id="iosas_designatedcontactsameasauthorityhead"
            v-model="formData.iosas_designatedcontactsameasauthorityhead"
            color="#003366"
            class="mt-4"
            inline
            disabled
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-label>School Authority Head</v-label>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            id="iosas_authorityheadfirstname"
            v-model="formData.iosas_authorityheadfirstname"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="First Name"
            color="rgb(59, 153, 252)"
            disabled
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            disabled
            id="iosas_authorityheadlastname"
            v-model="formData.iosas_authorityheadlastname"
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
            disabled
            id="iosas_authorityheademail"
            v-model="formData.iosas_authorityheademail"
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="E-mail"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            disabled
            id="iosas_authorityheadphone"
            v-model="formData.iosas_authorityheadphone"
            :maxlength="255"
            variant="outlined"
            label="Phone"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <br />
      <v-divider></v-divider>
      <v-label
        >Describe how the authority and/or the school board (where applicable)
        intends to exercise its governance duties.</v-label
      >
      <v-row>
        <v-col cols="12">
          <v-textarea
            id="iosas_howwillyouexercisegovernanceduties"
            v-model="formData.iosas_howwillyouexercisegovernanceduties"
            :rules="[rules.required()]"
            :maxlength="2000"
            variant="outlined"
            label=""
            color="rgb(59, 153, 252)"
            auto-grow
          />
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Have any of the proponents for the proposed school been previously
            involved in operating an independent school in BC or elsewhere in
            the past 10 years?</v-label
          >
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_proponentspreviouslyinvolvedinisbc"
            v-model="formData.iosas_proponentspreviouslyinvolvedinisbc"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            direction="horizontal"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-label>If so, please provide details below. </v-label>
      <v-row>
        <v-col cols="12">
          <v-textarea
            id="iosas_detailsofinvolvement"
            v-model="formData.iosas_detailsofinvolvement"
            :maxlength="2000"
            :rules="
              formData.iosas_proponentspreviouslyinvolvedinisbc
                ? [rules.required()]
                : []
            "
            auto-grow
            variant="outlined"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Name of School Authority</v-label>
          <p>{{ formData.iosas_schoolauthority || NULL_STRING }}</p>
        </v-col>
      </v-row>
      <br />
      <v-label>School Authority Legislation </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          {{
            formData[
              'iosas_incorporationtype@OData.Community.Display.V1.FormattedValue'
            ] || NULL_STRING
          }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Official Registration Number</v-label>
          <p>{{ formData.iosas_officialregistrationnumber || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Date of last Annual Report</v-label>
          <p>
            {{
              formData[
                'iosas_dateoflastannualreport@OData.Community.Display.V1.FormattedValue'
              ] || NULL_STRING
            }}
          </p>
        </v-col>
      </v-row>
      <br />
      <v-label><strong>Authority Mailing Address</strong></v-label>
      <div class="ml-5">
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Address Line 1</v-label>
            <p>{{ formData.iosas_authorityaddressline1 || NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" xs="12">
            <v-label>Address Line 2</v-label>
            <p>{{ formData.iosas_authorityaddressline2 || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>City</v-label>
            <p>{{ formData.iosas_authoritycity || NULL_STRING }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Province</v-label>
            <p>{{ formData.iosas_authorityprovince || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Country</v-label>
            <p>{{ formData.iosas_authoritycountry || NULL_STRING }}</p>
          </v-col>
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-label>Postal Code</v-label>
            <p>{{ formData.iosas_authoritypostalcode || NULL_STRING }}</p>
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
            <p>
              {{ formData.iosas_schoolauthoritycontactemail || NULL_STRING }}
            </p>
          </v-col>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-label>Phone</v-label>
            <p>
              {{ formData.iosas_schoolauthoritycontactphone || NULL_STRING }}
            </p>
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
                formData.iosas_designatedcontactsameasauthorityhead
              )
            }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>School Authority Head</v-label>
          <p>{{ getAuthorityHeadName() || NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>E-mail</v-label>
          <p>{{ formData.iosas_authorityheademail || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Phone</v-label>
          <p>{{ formData.iosas_authorityheadphone || NULL_STRING }}</p>
        </v-col>
      </v-row>
      <br />
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-label
            >Describe how the authority and/or the school board (where
            applicable) intends to exercise its governance duties.</v-label
          >
          <p>
            {{
              formData.iosas_howwillyouexercisegovernanceduties || NULL_STRING
            }}
          </p>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Have any of the proponents for the proposed school been previously
            involved in operating an independent school in BC or elsewhere in
            the past 10 years?</v-label
          >
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_proponentspreviouslyinvolvedinisbc
            )
          }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-label>If so, please provide details below. </v-label>
          <p>
            {{ formData.iosas_detailsofinvolvement || NULL_STRING }}
          </p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/formRules';
import { mapState } from 'pinia';
import { metaDataStore } from '../../../store/modules/metaData';
import { formatBooleanToYesNoString } from '../../../utils/format';
import VueDatePicker from '@vuepic/vue-datepicker';
import { NULL_STRING, GOV_URL } from '../../../utils/constants';
export default {
  name: 'SchoolAuthorityInformationTab',
  components: {
    VueDatePicker,
  },
  emits: ['validateAndPopulate'],
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
    GOV_URL,
    NULL_STRING,
    rules: Rules,
  }),
  computed: {
    ...mapState(metaDataStore, [
      'getApplicationPickListOptions',
      'getSchoolAuthorityListOptions',
    ]),
  },
  methods: {
    formatBooleanToYesNoString,
    getIncorporationUrl(label) {
      const urlHashMap = {
        'Provincial Incorporation Act': GOV_URL.businessCorporationActUrl,
        'Society Act': GOV_URL.societiesActUrl,
      };
      return urlHashMap[label] ? urlHashMap[label] : null;
    },
    getAuthorityHeadName() {
      return this.formData.iosas_authorityheadfirstname
        ? this.formData.iosas_authorityheadfirstname +
            ' ' +
            this.formData.iosas_authorityheadlastname
        : null;
    },
    getDesignatedHeadName() {
      return this.formData?.iosas_designatedcontactfirstname
        ? this.formData.iosas_designatedcontactfirstname +
            ' ' +
            this.formData.iosas_schoolauthoritycontactname
        : null;
    },
  },
};
</script>

<style scoped>
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

:deep(.dp__disabled) {
  background-color: #ffffff !important;
  color: #a8a8a8;
}
</style>
