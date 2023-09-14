<template>
  <v-container>
    <div v-if="isEditing">
      <div v-if="isNotGroupThree()">
        <h4>School Semester Indicator Type</h4>
        <v-row>
          <v-col cols="12" sm="12" md="12" xs="12">
            <v-select
              v-model="formData.iosas_semestertype"
              :items="getApplicationMultiPickListOptions['iosas_semestertype']"
              multiple
              :rules="[rules.requiredMultiSelect()]"
              item-title="label"
              item-value="value"
              placeholder="Select all that apply"
            ></v-select>
          </v-col>
        </v-row>
        <br />
      </div>
      <v-label><strong>Half day Kindergarten</strong></v-label>
      <br />
      <v-label class="sm">Minimum required hours per year 450 Hours </v-label>
      <v-row>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_halfdaykindergartenproposedhoursperday_d"
            v-model="formData.iosas_halfdaykindergartenproposedhoursperday_d"
            variant="outlined"
            label="Proposed Hours Per Day"
            color="rgb(59, 153,
            252)"
            type="number"
            @change="
              roundUp($event, 'iosas_halfdaykindergartenproposedhoursperday_d')
            "
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_halfdaykgtproposeddaysinsession_d"
            v-model="formData.iosas_halfdaykgtproposeddaysinsession_d"
            variant="outlined"
            label="Proposed Number of Days in Session"
            color="rgb(59, 153, 252)"
            type="number"
            @change="roundUp($event, 'iosas_halfdaykgtproposeddaysinsession_d')"
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_halfdaykindergartenproposedhoursperyear_d"
            v-model="formData.iosas_halfdaykindergartenproposedhoursperyear_d"
            variant="outlined"
            label="Proposed Hours Per Year"
            color="rgb(59, 153, 252)"
            type="number"
            @change="
              roundUp($event, 'iosas_halfdaykindergartenproposedhoursperyear_d')
            "
            :rules="
              validateHalfDayHours()
                ? [
                    rules.numberGreaterThanOrEqualMinimum(
                      450,
                      'A minimun of 450 hours is required'
                    ),
                  ]
                : []
            "
          />
        </v-col>
      </v-row>
      <v-label><strong>Full day Kindergarten</strong></v-label>
      <br />
      <v-label class="sm">Minimum required hours per year 850 Hours </v-label>
      <v-row>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_fulldaykgtproposedhoursperday_d"
            v-model="formData.iosas_fulldaykgtproposedhoursperday_d"
            variant="outlined"
            label="Proposed Hours Per Day"
            color="rgb(59, 153, 252)"
            type="number"
            @change="roundUp($event, 'iosas_fulldaykgtproposedhoursperday_d')"
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_fulldaykgtproposeddaysinsesssion_d"
            v-model="formData.iosas_fulldaykgtproposeddaysinsesssion_d"
            variant="outlined"
            label="Proposed Number of Days in Session"
            color="rgb(59, 153, 252)"
            type="number"
            @change="
              roundUp($event, 'iosas_fulldaykgtproposeddaysinsesssion_d')
            "
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_fulldaykgtproposedhoursperyear_d"
            v-model="formData.iosas_fulldaykgtproposedhoursperyear_d"
            variant="outlined"
            label="Proposed Hours Per Year"
            color="rgb(59, 153, 252)"
            type="number"
            @change="roundUp($event, 'iosas_fulldaykgtproposedhoursperyear_d')"
            :rules="
              validateFullDayHours()
                ? [
                    rules.numberGreaterThanOrEqualMinimum(
                      850,
                      'A minimun of 850 hours is required'
                    ),
                  ]
                : []
            "
          />
        </v-col>
      </v-row>
      <v-label><strong>Grades 1-12</strong></v-label>
      <br />
      <v-label class="sm">Minimum required hours per year 850 Hours </v-label>
      <v-row>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_grades112proposedhoursperday_d"
            v-model="formData.iosas_grades112proposedhoursperday_d"
            variant="outlined"
            label="Proposed Hours Per Day"
            color="rgb(59, 153, 252)"
            type="number"
            @change="roundUp($event, 'iosas_grades112proposedhoursperday_d')"
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_grades112proposeddaysinsession_d"
            v-model="formData.iosas_grades112proposeddaysinsession_d"
            variant="outlined"
            label="Proposed Number of Days in Session"
            color="rgb(59, 153, 252)"
            type="number"
            @change="roundUp($event, 'iosas_grades112proposeddaysinsession_d')"
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_grades112proposedhoursperyear_d"
            v-model="formData.iosas_grades112proposedhoursperyear_d"
            variant="outlined"
            label="Proposed Hours Per Year"
            color="rgb(59, 153, 252)"
            type="number"
            @change="roundUp($event, 'iosas_grades112proposedhoursperyear_d')"
            :rules="
              validateGradeHours()
                ? [
                    rules.numberGreaterThanOrEqualMinimum(
                      850,
                      'A minimun of 850 hours is required'
                    ),
                  ]
                : []
            "
          />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <div v-if="isNotGroupThree()">
        <h4>School Semester Indicator Type</h4>
        <p>
          {{
            formData[
              'iosas_semestertype@OData.Community.Display.V1.FormattedValue'
            ]
          }}
        </p>
        <br />
      </div>
      <v-label><strong>Half day Kindergarten</strong></v-label>
      <br />
      <v-label class="sm">Minimum required hours per year 450 Hours </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Hours Per Day</v-label>
          <p>
            {{
              formData.iosas_halfdaykindergartenproposedhoursperday_d ||
              NULL_STRING
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Number of Days in Session</v-label>
          <p>
            {{
              formData.iosas_halfdaykgtproposeddaysinsession_d || NULL_STRING
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Hours Per Year</v-label>
          <p>
            {{
              formData.iosas_halfdaykindergartenproposedhoursperyear_d ||
              NULL_STRING
            }}
          </p>
        </v-col>
      </v-row>
      <br />
      <v-label><strong>Full day Kindergarten</strong></v-label>
      <br />
      <v-label class="sm">Minimum required hours per year 850 Hours </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Hours Per Day</v-label>
          <p>
            {{ formData.iosas_fulldaykgtproposedhoursperday_d || NULL_STRING }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Number of Days in Session</v-label>
          <p>
            {{
              formData.iosas_fulldaykgtproposeddaysinsesssion_d || NULL_STRING
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Hours Per Year</v-label>
          <p>
            {{ formData.iosas_fulldaykgtproposedhoursperday_d || NULL_STRING }}
          </p>
        </v-col>
      </v-row>
      <br />
      <v-label><strong>Grades 1-12</strong></v-label>
      <br />
      <v-label class="sm">Minimum required hours per year 850 Hours </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Hours Per Day</v-label>
          <p>
            {{ formData.iosas_grades112proposedhoursperday_d || NULL_STRING }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Number of Days in Session</v-label>
          <p>
            {{ formData.iosas_grades112proposeddaysinsession_d || NULL_STRING }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Hours Per Year</v-label>
          <p>
            {{ formData.iosas_grades112proposedhoursperyear_d || NULL_STRING }}
          </p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'pinia';
import { metaDataStore } from '../../../store/modules/metaData';
import * as Rules from '../../../utils/formRules';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { NULL_STRING } from '../../../utils/constants';
import { GROUP_CLASSIFICATION_CODES } from '../../../utils/application';
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
    NULL_STRING,
    GROUP_CLASSIFICATION_CODES,
    rules: Rules,
  }),
  computed: {
    ...mapState(metaDataStore, ['getApplicationMultiPickListOptions']),
  },
  methods: {
    formatBooleanToYesNoString,
    isNotGroupThree() {
      return (
        this.formData.iosas_groupclassification !==
        this.GROUP_CLASSIFICATION_CODES.groupThree
      );
    },
    validateHalfDayHours() {
      return (
        this.formData.iosas_halfdaykindergartenproposedhoursperday_d ||
        this.formData.iosas_halfdaykgtproposeddaysinsession_d ||
        this.formData.iosas_halfdaykindergartenproposedhoursperyear_d
      );
    },
    validateFullDayHours() {
      return (
        this.formData.iosas_fulldaykgtproposedhoursperday_d ||
        this.formData.iosas_fulldaykgtproposeddaysinsesssion_d ||
        this.formData.iosas_fulldaykgtproposedhoursperyear_d
      );
    },
    validateGradeHours() {
      return (
        this.formData.iosas_grades112proposedhoursperday_d ||
        this.formData.iosas_grades112proposeddaysinsession_d ||
        this.formData.iosas_grades112proposedhoursperyear_d
      );
    },
    roundUp(event, field) {
      if (!event.target.value) {
        this.formData[field] = null;
      } else {
        this.formData[field] = Number(Number(event.target.value).toFixed(2));
      }
    },
  },
};
</script>
