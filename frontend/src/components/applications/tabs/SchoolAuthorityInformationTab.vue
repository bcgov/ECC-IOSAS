<template>
  <v-container>
    <h4>School Authority Information</h4>
    <br />
    <div v-if="isEditing">
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
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
      <v-label>School Authority Head</v-label>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_authorityheadfirstname"
            v-model="formData.iosas_authorityheadfirstname"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="First Name"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
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
            :disabled="!isEditing"
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
            :disabled="!isEditing"
            id="iosas_authorityheadphone"
            v-model="formData.iosas_authorityheadphone"
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="E-mail"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-label
        >Please indicate under which legislation your School Authority is
        incorporated:</v-label
      >
      <v-row>
        <!-- TODO: ADD URLS BACK society and provincial incorporation act -->
        <v-col cols="12" sm="12" md="6" xs="12">
          <div
            v-for="item in getApplicationPickListOptions[
              'iosas_incorporationtype'
            ]"
            :key="item.value"
          >
            <v-checkbox
              v-model="formData.iosas_incorporationtype"
              :value="item.value"
            >
              <template v-slot:label>
                <a target="_blank" :href="item.url" v-if="item.url">
                  {{ item.label }}
                </a>
                <p v-else>{{ item.label }}</p>
              </template>
            </v-checkbox>
          </div>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_officialregistrationnumber"
            v-model="formData.iosas_officialregistrationnumber"
            :rules="[rules.required()]"
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
          />
        </v-col>
      </v-row>

      <v-label
        >Describe how the authority and/or the school board (where applicable)
        intends to exercise its governance duties.</v-label
      >
      <v-row>
        <v-col cols="12">
          <v-textarea
            :disabled="!isEditing"
            id="iosas_howwillyouexercisegovernanceduties"
            v-model="formData.iosas_howwillyouexercisegovernanceduties"
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label=""
            color="rgb(59, 153, 252)"
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
            id="iosas_proponentspreviouslyinvolvedinisbc "
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
            :rules="
              formData.iosas_proponentspreviouslyinvolvedinisbc
                ? [rules.required()]
                : []
            "
            :maxlength="255"
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
      <v-label
        >Please indicate under which legislation your School Authority is
        incorporated:</v-label
      >
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <div v-for="item in INCORPORATION_TYPE_OPTIONS" :key="item.value">
            <v-checkbox
              :id="
                iosas_preexistingauthority
                  ? edu_incorporationtype
                  : iosas_incorporationtype
              "
              :v-model="
                iosas_preexistingauthority
                  ? formData.edu_incorporationtype
                  : formData.iosas_incorporationtype
              "
              :value="item.value"
              disabled
            >
              <template v-slot:label>
                <a target="_blank" :href="item.url" v-if="item.url">
                  {{ item.label }}
                </a>
                <p v-else>{{ item.label }}</p>
              </template>
            </v-checkbox>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Official Registration Number</v-label>
          <p>{{ formData.iosas_officialregistrationnumber || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Date of last Annual Report</v-label>
          <p>{{ formData.iosas_dateoflastannualreport || NULL_STRING }}</p>
        </v-col>
      </v-row>

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
            formatBooleanToYesNoString(iosas_proponentspreviouslyinvolvedinisbc)
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
import * as Rules from '../../../utils/institute/formRules';
import { mapState } from 'pinia';
import { metaDataStore } from '../../../store/modules/metaData';
import { formatBooleanToYesNoString } from '../../../utils/format';
import VueDatePicker from '@vuepic/vue-datepicker';
import {
  NULL_STRING,
  GOV_URL,
  INCORPORATION_TYPE_OPTIONS,
} from '../../../utils/constants';
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
    validateAndPopulate: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    GOV_URL,
    NULL_STRING,
    INCORPORATION_TYPE_OPTIONS,
    rules: Rules,
  }),
  computed: {
    ...mapState(metaDataStore, ['getApplicationPickListOptions']),
  },
  mounted() {},
  methods: {
    formatBooleanToYesNoString,
    getAuthorityHeadName() {
      return this.formData.iosas_authorityheadfirstname
        ? this.formData.iosas_authorityheadfirstname +
            ' ' +
            this.formData.iosas_authorityheadlastname
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
</style>
