<template>
  <v-container>
    <h4>Projected Student Enrolment</h4>
    <v-label class="sm d-inline"
      >NOTE: A new school must have 10 or more school age students who are
      enrolled with the school and reported as 1.00 FTE each in accordance with
      the
      <a :href="GOV_URL.instructionsForIndependentSchoolsUrl" target="_blank">
        1701 instructions for independent schools
      </a>
      for the September data collection.
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
            variant="outlined"
            label="Kindergarten"
            type="number"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg1"
            v-model="formData.iosas_numberofstudentsg1"
            variant="outlined"
            type="number"
            label="Grade 1"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg2"
            v-model="formData.iosas_numberofstudentsg2"
            variant="outlined"
            type="number"
            label="Grade 2"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg3"
            v-model="formData.iosas_numberofstudentsg3"
            variant="outlined"
            type="number"
            label="Grade 3"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg4"
            v-model="formData.iosas_numberofstudentsg4"
            variant="outlined"
            type="number"
            label="Grade 4"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg5"
            v-model="formData.iosas_numberofstudentsg5"
            variant="outlined"
            type="number"
            label="Grade 5"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg6"
            v-model="formData.iosas_numberofstudentsg6"
            variant="outlined"
            type="number"
            label="Grade 6"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg7"
            v-model="formData.iosas_numberofstudentsg7"
            variant="outlined"
            type="number"
            label="Grade 7"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            disabled
            id="iosas_primaryschooltotal"
            v-model="formData.iosas_primaryschooltotal"
            variant="outlined"
            type="number"
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
            variant="outlined"
            type="number"
            label="Grade 8"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg9"
            v-model="formData.iosas_numberofstudentsg9"
            variant="outlined"
            type="number"
            label="Grade 9"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg10"
            v-model="formData.iosas_numberofstudentsg10"
            variant="outlined"
            type="number"
            label="Grade 10"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg11"
            v-model="formData.iosas_numberofstudentsg11"
            variant="outlined"
            type="number"
            label="Grade 11"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            id="iosas_numberofstudentsg12"
            v-model="formData.iosas_numberofstudentsg12"
            variant="outlined"
            type="number"
            label="Grade 12"
            :rules="[rules.requiredNumber(), rules.number()]"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            disabled
            id="iosas_highschooltotal"
            v-model="formData.iosas_highschooltotal"
            variant="outlined"
            type="number"
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
            :rules="[
              rules.numberGreaterThanOrEqualMinimum(
                10,
                'A new school must have 10 or more students enrolled'
              ),
            ]"
            variant="outlined"
            type="number"
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
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/formRules';
import { displayDefaultNumberValue } from '../../../utils/format';
import { NULL_STRING, GOV_URL } from '../../../utils/constants';
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
    GOV_URL,
    NULL_STRING,
    rules: Rules,
  }),
  methods: {
    displayDefaultNumberValue,
  },
};
</script>

<style>
/* Change color of disabled validation error */
.v-input--disabled .v-input__details,
.v-input--disabled .v-input__prepend,
.v-input--disabled .v-input__append {
  color: #b00020;
  opacity: 0.9 !important;
}
</style>
