<template>
  <v-container>
    <h4>School Facility</h4>
    <br />
    <div v-if="isEditing">
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-text-field
            id="iosas_nameofmunicipalityorregionaldistrict"
            v-model="formData.iosas_nameofmunicipalityorregionaldistrict"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Name of Municipality of Regional District"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Has the authority contacted local government for confirmation that
            school facility will meet all current municipal/regional district
            codes, regarding zoning, building, fire prevention, and
            health?</v-label
          >
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_hastheauthoritycontactedlocalgovernment"
            v-model="formData.iosas_hastheauthoritycontactedlocalgovernment"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
      <br />
      <v-label
        >If a school location has not yet been confirmed, please describe what
        steps you are taking to acquire a facility for the proposed school?
      </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-textarea
            id="iosas_whatstepsareyoutakingtoacquirethefacility"
            v-model="formData.iosas_whatstepsareyoutakingtoacquirethefacility"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Can the authority confirm that lead testing consistent with the
            policy,<a :href="GOV_URL.leadTestingUrl" target="_blank">
              Testing Lead Content in Drinking Water of Independent School
              Facilities, </a
            >will occur prior to students using the facility?</v-label
          >
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_confirmationofleadtestingfordrinkingwater"
            v-model="formData.iosas_confirmationofleadtestingfordrinkingwater"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
      <br />
      <v-row align="center">
        <v-col cols="8">
          <v-label>Will Students attending the school be housed in:</v-label>
          <br />
          <v-label class="ml-10">A homestay setting:</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_studentshousedinahomesetting"
            v-model="formData.iosas_studentshousedinahomesetting"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-10">A boarding/dormitory setting:</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_studentshousedinadormitorysetting"
            v-model="formData.iosas_studentshousedinadormitorysetting"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Name of Municipality of Regional District</v-label>
          <p>
            {{
              formData.iosas_nameofmunicipalityorregionaldistrict || NULL_STRING
            }}
          </p>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Has the authority contacted local government for confirmation that
            school facility will meet all current municipal/regional district
            codes, regarding zoning, building, fire prevention, and
            health?</v-label
          >
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_hastheauthoritycontactedlocalgovernment
            )
          }}
        </v-col>
      </v-row>
      <br />
      <v-label
        >If a school location has not yet been confirmed, please describe what
        steps you are taking to acquire a facility for the proposed school?
      </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <p>
            {{
              formData.iosas_whatstepsareyoutakingtoacquirethefacility ||
              NULL_STRING
            }}
          </p>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Can the authority confirm that lead testing consistent with the
            policy,<a :href="GOV_URL.leadTestingUrl" target="_blank">
              Testing Lead Content in Drinking Water of Independent School
              Facilities, </a
            >will occur prior to students using the facility?</v-label
          >
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_confirmationofleadtestingfordrinkingwater
            )
          }}
        </v-col>
      </v-row>
      <br />
      <v-row align="center">
        <v-col cols="8">
          <v-label>Will Students attending the school be housed in:</v-label>
          <br />
          <v-label class="ml-10">A homestay setting:</v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_studentshousedinahomesetting
            )
          }}
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-10">A boarding/dormitory setting:</v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_studentshousedinadormitorysetting
            )
          }}
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/formRules';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { NULL_STRING, GOV_URL } from '../../../utils/constants';
export default {
  name: 'SchoolFacility',
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
