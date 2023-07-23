<template>
  <v-conatiner>
    <h4>School Semester Indicator Type</h4>
    <v-label
      >Schools Seeking Group 1, 2 and 4 only. Please select however many fit the
      intended school.</v-label
    >
    <v-row>
      <v-col cols="6" sm="6" md="4" xs="6">
        <v-checkbox
          :disabled="!isEditing"
          v-model="selected"
          label="Semestered"
          value="Semestered"
        ></v-checkbox>
      </v-col>
      <v-col cols="6" sm="6" md="4" xs="6">
        <v-checkbox
          :disabled="!isEditing"
          v-model="selected"
          label="Linear"
          value="Linear"
        ></v-checkbox>
      </v-col>
      <v-col cols="6" sm="6" md="4" xs="6">
        <v-checkbox
          :disabled="!isEditing"
          v-model="selected"
          label="Regular School Year (Sept - June)"
          value="Regular School Year (Sept - June)"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" sm="6" md="4" xs="6">
        <v-checkbox
          :disabled="!isEditing"
          v-model="selected"
          label="Summer"
          value="Summer"
        ></v-checkbox>
      </v-col>
      <v-col cols="6" sm="6" md="4" xs="6">
        <v-checkbox
          :disabled="!isEditing"
          v-model="selected"
          label="All Year"
          value="All Year"
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-label><strong>Half day Kindergarten</strong></v-label>
    <br />
    <v-label> Minimum required hours per year 450 Hours </v-label>
    <v-row>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="school_phone"
          v-model="formData.school_phone"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="Proposed Hours Per Day"
          color="rgb(59, 153, 252)"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="school_phone"
          v-model="formData.school_phone"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="Proposed Number of Days in Session"
          color="rgb(59, 153, 252)"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="contact_email"
          v-model="formData.contact_email"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="Proposed Hours Per Year"
          color="rgb(59, 153, 252)"
        />
      </v-col>
    </v-row>
    <v-label><strong>Full day Kindergarten</strong></v-label>
    <br />
    <v-label> Minimum required hours per year 850 Hours </v-label>
    <v-row>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="school_phone"
          v-model="formData.school_phone"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="Proposed Hours Per Day"
          color="rgb(59, 153, 252)"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="school_phone"
          v-model="formData.school_phone"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="Proposed Number of Days in Session"
          color="rgb(59, 153, 252)"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="contact_email"
          v-model="formData.contact_email"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="Proposed Hours Per Year"
          color="rgb(59, 153, 252)"
        />
      </v-col>
    </v-row>
    <v-label><strong>Grades 1-12</strong></v-label>
    <br />
    <v-label> Minimum required hours per year 850 Hours </v-label>
    <v-row>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="school_phone"
          v-model="formData.school_phone"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="Proposed Hours Per Day"
          color="rgb(59, 153, 252)"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="school_phone"
          v-model="formData.school_phone"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="Proposed Number of Days in Session"
          color="rgb(59, 153, 252)"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="contact_email"
          v-model="formData.contact_email"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="Proposed Hours Per Year"
          color="rgb(59, 153, 252)"
        />
      </v-col>
    </v-row>
  </v-conatiner>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
export default {
  name: 'SchoolSemesterTab',
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
