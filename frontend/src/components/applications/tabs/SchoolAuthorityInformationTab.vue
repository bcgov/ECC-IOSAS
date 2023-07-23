<template>
  <v-conatiner>
    <h4>School Authority Information</h4>
    <br />
    <div v-if="isEditing">
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="contact_email"
            v-model="formData.contact_email"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Name of School Authority"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="school_phone"
            v-model="formData.school_phone"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="School Authority Head's Name"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="contact_email"
            v-model="formData.contact_email"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="E-mail"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-label
        >Please indicate under which legislation your School Authority is
        incorporated:</v-label
      >
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-checkbox
            :disabled="!isEditing"
            v-model="selected"
            label="Societies Act"
            value="Societies Act"
          ></v-checkbox>
          <v-checkbox
            :disabled="!isEditing"
            v-model="selected"
            label="Business Corporation Act"
            value="Business Corporation Act"
          ></v-checkbox>
          <v-checkbox
            :disabled="!isEditing"
            v-model="selected"
            label="an Order in Council or Private Act"
            value="an Order in Council or Private Act"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="school_phone"
            v-model="formData.school_phone"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Official Registration Number"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="contact_email"
            v-model="formData.contact_email"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label="Date of last Annual Report (optional)"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>

      <v-label
        >Describe how the authority and/or the school board (where applicable)
        intends to exercise its governance duties.</v-label
      >
      <v-row>
        <v-col cols="12">
          <v-textarea
            :disabled="!isEditing"
            id="proposed_school_name"
            v-model="formData.proposed_school_name"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label=""
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>

      <v-label
        >Have any of the proponents for the proposed school been previously
        involved in operating an independent school in BC or elsewhere in the
        past 10 years. If so, please provide details below.
      </v-label>
      <v-row>
        <v-col cols="12">
          <v-textarea
            :disabled="!isEditing"
            id="proposed_school_name"
            v-model="formData.proposed_school_name"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label=""
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Name of School Authority</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>School Authority Head's Name</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>E-mail</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-label
            >Please indicate under which legislation your School Authority is
            incorporated:</v-label
          >
          <p><v-icon> mdi-check </v-icon>Societies Act</p>
          <p><v-icon> mdi-check </v-icon>Business Corporation Act</p>
          <p><v-icon> mdi-close </v-icon>an Order in Council or Private Act</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Official Registration Number</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Date of last Annual Report</v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-label
            >Describe how the authority and/or the school board (where
            applicable) intends to exercise its governance duties.</v-label
          >
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-label
            >Have any of the proponents for the proposed school been previously
            involved in operating an independent school in BC or elsewhere in
            the past 10 years. If so, please provide details below.
          </v-label>
          <p>{{ NULL_STRING }}</p>
        </v-col>
      </v-row>
    </div>
  </v-conatiner>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { NULL_STRING } from '../../../utils/constants';
export default {
  name: 'SchoolAuthorityInformationTab',
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
  methods: {},
};
</script>

<style scoped>
.v-label {
  white-space: break-spaces;
}
</style>
