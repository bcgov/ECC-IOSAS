<template>
  <v-conatiner>
    <h4>Application Submission</h4>
    <div v-if="isEditing">
      <v-label
        >You will be contacted via email with the results of your application.
        Successful applicants will be invited for an Interview as outlined In
        Step 3 of the Establishing an Independent School Policy.
      </v-label>
      <br />
      <br />
      <h5>Attachments</h5>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Complete set of policies/procedures as outlined in the
            <a :href="GOV_URL.interviewChecklistPDFUrl"
              >Interview Checklist (PDF)</a
            ></v-label
          >
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_completesetofpoliciesoutlinedinchecklist"
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
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Business Plan with required financial information (Part A and B)
            <a :href="GOV_URL.interviewChecklistPDFUrl"
              >Interview Checklist (PDF)</a
            ></v-label
          >
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_businessplanincludingfinancialinformation"
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
    </div>
    <div v-else>
      <v-label
        >You will be contacted via email with the results of your application.
        Successful applicants will be invited for an Interview as outlined In
        Step 3 of the Establishing an Independent School Policy.
      </v-label>
      <br />
      <br />
      <h5>Attachments</h5>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Complete set of policies/procedures as outlined in the
            <a :href="GOV_URL.interviewChecklistPDFUrl"
              >Interview Checklist (PDF)</a
            ></v-label
          >
          <span class="orange"
            >iosas_completesetofpoliciesoutlinedinchecklist</span
          >
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_completesetofpoliciesoutlinedinchecklist
            )
          }}
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Business Plan with required financial information (Part A and B)
            <a :href="GOV_URL.interviewChecklistPDFUrl"
              >(Interview Checklist (PDF))</a
            ></v-label
          >
          <span class="orange"
            >iosas_businessplanincludingfinancialinformation</span
          >
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_businessplanincludingfinancialinformation
            )
          }}
        </v-col>
      </v-row>
    </div>
  </v-conatiner>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { GOV_URL } from '../../../utils/constants';
export default {
  name: 'SubmissionTab',
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
    GOV_URL,
    rules: Rules,
  }),
  mounted() {},
  computed: {},
  methods: {
    formatBooleanToYesNoString,
  },
};
</script>

<style scoped>
.v-label {
  display: inline;
}
</style>
