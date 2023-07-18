<template>
  <v-conatiner>
    <h4>School Facility</h4>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="8" xs="12">
        <v-text-field
          :disabled="!isEditing"
          id="school_phone"
          v-model="formData.school_phone"
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
    <br />
    <v-label
      >If a school location has not yet been confirmed, please describe what
      steps you are taking to acquire a facility for the proposed school?
    </v-label>
    <v-row>
      <v-col cols="12" sm="12" md="8" xs="12">
        <v-textarea
          :disabled="!isEditing"
          id="school_phone"
          v-model="formData.school_phone"
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
          >Can the authority confirm that lead testing consistent with the
          policy, Testing Lead Content in Drinking Water of Independent School
          Facilities, will occur prior to students using the facility?</v-label
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
    <br />
    <v-row align="center">
      <v-col cols="8">
        <v-label>Will Students attending the school be housed in:</v-label>
        <br />
        <v-label class="ml-10">A homestay setting:</v-label>
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
        <v-label class="ml-10">A boarding/dormitory setting:</v-label>
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
import * as Rules from './../../utils/institute/formRules';
export default {
  name: 'SchoolFacility',
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
