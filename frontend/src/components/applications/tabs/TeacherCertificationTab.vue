<template>
  <v-conatiner>
    <h4>Certification of Teachers</h4>
    <v-label><strong>Schools seeking Group 2 and 4 only</strong></v-label>
    <br />
    <v-label>
      The school principal/head of school and all teachers teaching a subject
      that is reported out on student report cards must hold valid British
      Columbia teaching credentials issued by the Teacher Certification Branch
      (TCB). Initial certification of Group 2 and Group 4 schools will typically
      not be possible for schools employing teachers relying on a Letter of
      Permission as certification.
    </v-label>
    <br />
    <br />
    <v-label
      >Note: All employees must have a criminal record check completed through
      theMinistry of Public Safety and Solicitor General. Volunteers working
      with childrenmay also have their criminal record check completed by the
      Ministry of Public Safety and Solicitor General or local police.
    </v-label>
    <br />
    <br />
    <v-label
      >How many teachers does the proposed school intend to employ upon
      opening?</v-label
    >
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="no"
          v-model="formData.contact_email"
          required
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
          >Are you aware of the requirements of teacher certification as they
          relate employees of Group 2, or 4 schools?</v-label
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
          <v-radio label="No" color="#003366" v-bind:value="null">
            <template #label>
              <span :class="activeRadio">N/A</span>
            </template>
          </v-radio>
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
          consultants, specialists, janitors, and persons assigned other special
          tasks?</v-label
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
  name: 'TeacherCertificationTab',
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
