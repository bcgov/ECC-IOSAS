<template>
  <v-conatiner>
    <h4>Projected Student Enrolment</h4>
    <v-label
      ><strong>
        NOTE: A new school must have 10 or more school age students who are
        enrolled with the school and reported as 1.00 FTE each in accordance
        with the 1701 instructions for independent schools for the September
        data collection.
      </strong>
    </v-label>
    <br />
    <br />
    <div v-if="isEditing">
      <v-label>Total Student enrolment projection at start-up</v-label>
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
            label="Kindergarten"
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
            label="Grade 1"
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
            label="Grade 2"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="contact_email"
            v-model="formData.contact_email"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Grade 3"
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
            label="Grade 4"
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
            label="Grade 5"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
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
            label="Grade 6"
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
            label="Grade 7"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            disabled
            id="contact_email"
            v-model="formData.contact_email"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Total (A)"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>

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
            label="Grade 8"
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
            label="Grade 9"
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
            label="Grade 10"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="contact_email"
            v-model="formData.contact_email"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Grade 11"
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
            label="Grade 12"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            disabled
            id="school_phone"
            v-model="formData.school_phone"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Total (B)"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            disabled
            id="contact_email"
            v-model="formData.contact_email"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Total of A and B enrolment"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-label>Total Student enrolment projection at start-up</v-label>
      <br />
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Kindergarten</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 1</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 2</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 3</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 4</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 5</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 6</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 7</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Total (A)</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 8</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 9</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 10</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 11</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 12</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Total (B)</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Total of A and B enrolment</v-label>
          <p>{{ NULL_STRING }}</p>
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
  name: 'StudentEnrolmentTab',
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
