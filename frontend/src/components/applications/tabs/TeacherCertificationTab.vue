<template>
  <v-container>
    <h4>Certification of Teachers</h4>
    <div v-if="isGroupThree()">
      <v-label
        >Certification of Teachers is not required for group 3 applications.
        <br />Click {{ isEditing ? 'Save & Next' : 'Next' }} to proceed.
      </v-label>
      <br />
    </div>
    <div v-else>
      <v-label
        >The school principal/head of school and all teachers teaching a subject
        that is reported out on student report cards must hold valid British
        Columbia teaching credentials issued by the
        <a :href="GOV_URL.teacherCertificationBranchUrl" target="_blank">
          Teacher Certification Branch</a
        >
        (TCB). Initial certification of Group 2 and Group 4 schools will
        typically not be possible for schools employing teachers relying on a
        Letter of Permission as certification.
      </v-label>
      <br />
      <br />
      <v-label
        >Note: All employees must have a criminal record check completed through
        the
        <a :href="GOV_URL.criminalRecordCheckUrl" target="_blank">
          Ministry of Public Safety and Solicitor General.</a
        >
        Volunteers working with children may also have their criminal record
        check completed by the Ministry of Public Safety and Solicitor General
        or local police.
      </v-label>
      <br />
      <br />
      <div v-if="isEditing">
        <v-label
          >How many teachers does the proposed school intend to employ upon
          opening?</v-label
        >
        <v-row>
          <v-col cols="12" sm="12" md="6" xs="12">
            <v-text-field
              id="iosas_numberofteachers"
              v-model="formData.iosas_numberofteachers"
              variant="outlined"
              type="number"
              color="rgb(59, 153, 252)"
              :rules="[rules.wholeNumber(), rules.required()]"
            />
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="8">
            <v-label
              >Are you aware of the requirements of
              <a :href="GOV_URL.teacherCertificationBranchUrl" target="_blank">
                teacher certification</a
              >as they relate employees of Group 2, or 4 schools?</v-label
            >
          </v-col>
          <v-col cols="4">
            <v-radio-group
              id="iosas_awareofcertificationrequirements"
              v-model="formData.iosas_awareofcertificationrequirements"
              color="#003366"
              class="mt-4"
              inline
              @change="$emit('validateAndPopulate', $event)"
              :rules="[rules.requiredSelect()]"
            >
              <v-radio
                v-for="item in getApplicationPickListOptions?.[
                  'iosas_awareofcertificationrequirements'
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
        <v-row align="center">
          <v-col cols="8">
            <v-label
              >Are you aware of the requirements for criminal record checks for
              employees who are working with children and who are not certified
              teachers, such as: administrative assistants, business managers,
              secretaries, counsellors, teacher assistants, health nurses,
              consultants, specialists, janitors, and persons assigned other
              special tasks?</v-label
            >
          </v-col>
          <v-col cols="4">
            <v-radio-group
              id="iosas_awareoftherequirementsforcrchecks"
              v-model="formData.iosas_awareoftherequirementsforcrchecks"
              color="#003366"
              class="mt-4"
              @change="$emit('validateAndPopulate', $event)"
              :rules="[rules.requiredRadio()]"
              inline
            >
              <v-radio label="Yes" color="#003366" v-bind:value="true" />
              <v-radio label="No" color="#003366" v-bind:value="false" />
            </v-radio-group>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-label
          >How many teachers does the proposed school intend to employ upon
          opening?</v-label
        >
        <v-row>
          <v-col cols="12" sm="12" md="6" xs="12">
            {{ formData.iosas_numberofteachers || NULL_STRING }}
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="8">
            <v-label
              >Are you aware of the requirements of
              <a :href="GOV_URL.teacherCertificationBranchUrl" target="_blank">
                teacher certification</a
              >
              as they relate employees of Group 2, or 4 schools?</v-label
            >
          </v-col>
          <v-col cols="4">
            <p>
              {{
                formData[
                  'iosas_awareofcertificationrequirements@OData.Community.Display.V1.FormattedValue'
                ] || NULL_STRING
              }}
            </p>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="8">
            <v-label
              >Are you aware of the requirements for criminal record checks for
              employees who are working with children and who are not certified
              teachers, such as: administrative assistants, business managers,
              secretaries, counsellors, teacher assistants, health nurses,
              consultants, specialists, janitors, and persons assigned other
              special tasks?</v-label
            >
          </v-col>
          <v-col cols="4">
            <p>
              {{
                formatBooleanToYesNoString(
                  formData.iosas_awareoftherequirementsforcrchecks
                )
              }}
            </p>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/formRules';
import { mapState } from 'pinia';
import { metaDataStore } from '../../../store/modules/metaData';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { NULL_STRING, GOV_URL } from '../../../utils/constants';
import { GROUP_CLASSIFICATION_CODES } from '../../../utils/application';
export default {
  name: 'TeacherCertificationTab',
  emits: ['validateAndPopulate'],
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
    GROUP_CLASSIFICATION_CODES,
    GOV_URL,
    rules: Rules,
  }),
  mounted() {},
  computed: {
    ...mapState(metaDataStore, ['getApplicationPickListOptions']),
  },

  methods: {
    formatBooleanToYesNoString,
    isGroupThree() {
      return (
        this.formData.iosas_groupclassification ===
        this.GROUP_CLASSIFICATION_CODES.groupThree
      );
    },
  },
};
</script>

<style scoped>
.v-label {
  display: inline-block;
}
</style>
