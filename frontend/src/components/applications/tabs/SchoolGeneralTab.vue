<template>
  <v-conatiner>
    <h4>General</h4>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-text-field
          id="application_number"
          v-model="formData.application_number"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          disabled
          label="Application Number"
          color="rgb(59, 153, 252)"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-text-field
          id="status"
          v-model="formData.status"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="Status"
          disabled
          color="rgb(59, 153, 252)"
        />
      </v-col>
    </v-row>
    <v-label
      ><strong>
        Will the proposed school comply with Section 1 of the Schedule of the
        Independent School Act, which requires that:
      </strong>
    </v-label>
    <v-row>
      <br />
      <v-col cols="12">
        <v-label>
          <ol type="1">
            <li>
              No program is in existence or is proposed at the independent
              school that would, in theory or in practice, promote or foster
              doctrines of:
            </li>
            <ol type="a" class="ml-5">
              <li>racial or ethnic superiority or persecution,</li>
              <li>religious intolerance or persecution,</li>
              <li>social change through violent action, or,</li>
              <li>sedition.</li>
            </ol>
          </ol>
        </v-label>
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
    <v-row>
      <v-col cols="12">
        <v-label>
          <ol start="2">
            <li>
              The independent school facilities will comply with the enactments
              of British Columbia and the municipality or regional district in
              which the facilities are located, and,
            </li>
          </ol>
        </v-label>
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
    <v-row>
      <v-col cols="12">
        <v-label>
          <ol start="3">
            <li>
              The authority complies with the Independent School Act and its
              regulations.
            </li>
          </ol>
        </v-label>
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
  name: 'SchoolGeneralTab',
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
