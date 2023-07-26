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
            id="iosas_numberofstudentskindergarten"
            v-model="formData.iosas_numberofstudentskindergarten"
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
            id="iosas_numberofstudentsg1"
            v-model="formData.iosas_numberofstudentsg1"
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
            id="iosas_numberofstudentsg2"
            v-model="formData.iosas_numberofstudentsg2"
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
            id="iosas_numberofstudentsg3"
            v-model="formData.iosas_numberofstudentsg3"
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
            id="iosas_numberofstudentsg4"
            v-model="formData.iosas_numberofstudentsg4"
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
            id="iosas_numberofstudentsg5"
            v-model="formData.iosas_numberofstudentsg5"
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
            id="iosas_numberofstudentsg6"
            v-model="formData.iosas_numberofstudentsg6"
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
            id="iosas_numberofstudentsg7"
            v-model="formData.iosas_numberofstudentsg7"
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
            id="iosas_primaryschooltotal"
            v-model="formData.iosas_primaryschooltotal"
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
            id="iosas_numberofstudentsg8"
            v-model="formData.iosas_numberofstudentsg8"
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
            id="iosas_numberofstudentsg9"
            v-model="formData.iosas_numberofstudentsg9"
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
            id="iosas_numberofstudentsg10"
            v-model="formData.iosas_numberofstudentsg10"
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
            id="iosas_numberofstudentsg11"
            v-model="formData.iosas_numberofstudentsg11"
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
            id="iosas_numberofstudentsg12"
            v-model="formData.iosas_numberofstudentsg12"
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
            id="iosas_highschooltotal"
            v-model="formData.iosas_highschooltotal"
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
            id="iosas_totalenrolment"
            v-model="formData.iosas_totalenrolment"
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
          <p>
            {{
              displayDefaultNumberValue(
                formData.iosas_numberofstudentskindergarten
              )
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 1</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg1) }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 2</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg2) }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 3</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg3) }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 4</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg4) }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 5</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg5) }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 6</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg6) }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 7</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg7) }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Total (A)</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_primaryschooltotal) }}
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 8</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg8) }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 9</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg9) }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 10</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg10) }}
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 11</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg11) }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Grade 12</v-label>
          <p>
            {{ displayDefaultNumberValue(formData.iosas_numberofstudentsg12) }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Total (B)</v-label>
          <p>{{ displayDefaultNumberValue(formData.iosas_highschooltotal) }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Total of A and B enrolment</v-label>
          <p>{{ displayDefaultNumberValue(formData.iosas_totalenrolment) }}</p>
        </v-col>
      </v-row>
    </div>
  </v-conatiner>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import {
  formatBooleanToYesNoString,
  displayDefaultNumberValue,
} from '../../../utils/format';
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
    displayDefaultNumberValue,
  },
};
</script>
