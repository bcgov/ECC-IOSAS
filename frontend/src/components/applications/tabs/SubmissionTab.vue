<template>
  <v-conatiner>
    <h4>Application Submission</h4>
    <v-label
      >You will be contacted via email with the results of your application.
      Successful applicants will be invited for an Interview as outlined In Step
      3 of the Establishing an Independent School Policy.
    </v-label>
    <br />
    <br />
    <h5>Attachments</h5>
    <v-row align="center">
      <v-col cols="8">
        <v-label
          >Complete set of policies/procedures as outlined in the Interview
          Checklist (PDF)</v-label
        >
      </v-col>
      <v-col cols="4">
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
    <v-row align="center">
      <v-col cols="8">
        <v-label
          >Business Plan with required financial information (Part A and B)
          (Interview Checklist (PDF))</v-label
        >
      </v-col>
      <v-col cols="4">
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
  </v-conatiner>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
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
</style>
