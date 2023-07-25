<template>
  <v-conatiner>
    <br />
    <h4>Educational Program</h4>
    <br />
    <div>
      <v-label
        >Describe familiarity with British Columbia’s curriculum and the school
        administration’s plans to support the implementation of B.C.s curriculum
        (pro-D, collaboration, etc.):</v-label
      >
      <v-row v-if="isEditing">
        <v-col cols="12">
          <v-textarea
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
      <v-row v-else>
        <v-col cols="12">
          {{ NULL_STRING }}
        </v-col>
      </v-row>
      <h4>Additional Programs</h4>
      <v-label
        >At this time does the proposed school intend on enrolling any of the
        following students? (Check all that apply)</v-label
      >
      <v-row>
        <v-col cols="6" sm="6" md="4" xs="6">
          <v-checkbox
            :disabled="!isEditing"
            v-model="selected"
            label="Indigenous Students"
            value="Indigenous Students"
          ></v-checkbox>
        </v-col>
        <v-col cols="6" sm="6" md="4" xs="6">
          <v-checkbox
            :disabled="!isEditing"
            v-model="selected"
            label="English Language Learner Students"
            value="English Language Learner Students"
          ></v-checkbox>
        </v-col>
        <v-col cols="6" sm="6" md="4" xs="6">
          <v-checkbox
            :disabled="!isEditing"
            v-model="selected"
            label="International Students"
            value="Business Corporation Act"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="6" md="4" xs="6">
          <v-checkbox
            :disabled="!isEditing"
            v-model="selected"
            label="Students with diverse abilities"
            value="Students with diverse abilities"
          ></v-checkbox>
        </v-col>
        <v-col cols="6" sm="6" md="4" xs="6">
          <v-checkbox
            :disabled="!isEditing"
            v-model="selected"
            label="Other (please specify):"
            value="Other (please specify):"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="no"
            v-model="formData.contact_email"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="other"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
    </div>
  </v-conatiner>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { NULL_STRING } from '../../../utils/constants';
export default {
  name: 'EducationalProgramTab',
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
    requiredRules: [(v) => !!v || 'Required'],
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
  white-space: break-spaces;
}
</style>
