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
            id="iosas_halfdaykindergartenproposedhoursperday"
            v-model="formData.iosas_halfdaykindergartenproposedhoursperday"
            variant="outlined"
            label="Proposed Hours Per Day"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_halfdaykindergartenproposeddaysinsession"
            v-model="formData.iosas_halfdaykindergartenproposeddaysinsession"
            variant="outlined"
            label="Proposed Number of Days in Session"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_halfdaykindergartenproposedhoursperyear"
            v-model="formData.iosas_halfdaykindergartenproposedhoursperyear"
            variant="outlined"
            label="Proposed Hours Per Year"
            color="rgb(59, 153, 252)"
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
            id="iosas_fulldaykindergartenproposedhoursperday"
            v-model="formData.iosas_fulldaykindergartenproposedhoursperday"
            variant="outlined"
            label="Proposed Hours Per Day"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_fulldaykindergartenproposeddaysinsession"
            v-model="formData.iosas_fulldaykindergartenproposeddaysinsession"
            variant="outlined"
            label="Proposed Number of Days in Session"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_fulldaykindergartenproposedhoursperyear"
            v-model="formData.iosas_fulldaykindergartenproposedhoursperyear"
            variant="outlined"
            label="Proposed Hours Per Year"
            color="rgb(59, 153, 252)"
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
            id="iosas_grades112proposedhoursperday"
            v-model="formData.iosas_grades112proposedhoursperday"
            variant="outlined"
            label="Proposed Hours Per Day"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_grades112proposeddaysinsession"
            v-model="formData.iosas_grades112proposeddaysinsession"
            variant="outlined"
            label="Proposed Number of Days in Session"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" lg="4" md="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_grades112proposedhoursperyear"
            v-model="formData.iosas_grades112proposedhoursperyear"
            variant="outlined"
            label="Proposed Hours Per Year"
            color="rgb(59, 153, 252)"
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
              formData.iosas_halfdaykindergartenproposedhoursperday ||
              NULL_STRING
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Number of Days in Session</v-label>
          <p>
            {{
              formData.iosas_halfdaykindergartenproposeddaysinsession ||
              NULL_STRING
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Hours Per Year</v-label>
          <p>
            {{
              formData.iosas_halfdaykindergartenproposedhoursperyear ||
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
            {{
              formData.iosas_fulldaykindergartenproposedhoursperday ||
              NULL_STRING
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Number of Days in Session</v-label>
          <p>
            {{
              formData.iosas_fulldaykindergartenproposeddaysinsession ||
              NULL_STRING
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Hours Per Year</v-label>
          <p>
            {{
              formData.iosas_fulldaykindergartenproposedhoursperday ||
              NULL_STRING
            }}
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
            {{ formData.iosas_grades112proposedhoursperday || NULL_STRING }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Number of Days in Session</v-label>
          <p>
            {{ formData.iosas_grades112proposeddaysinsession || NULL_STRING }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Proposed Hours Per Year</v-label>
          <p>
            {{ formData.iosas_grades112proposedhoursperyear || NULL_STRING }}
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
        this.formData.iosas_halfdaykindergartenproposedhoursperday ||
        this.formData.iosas_halfdaykindergartenproposeddaysinsession ||
        this.formData.iosas_halfdaykindergartenproposedhoursperyear
      );
    },
    validateFullDayHours() {
      return (
        this.formData.iosas_fulldaykindergartenproposedhoursperday ||
        this.formData.iosas_fulldaykindergartenproposeddaysinsession ||
        this.formData.iosas_fulldaykindergartenproposedhoursperyear
      );
    },
    validateGradeHours() {
      return (
        this.formData.iosas_grades112proposedhoursperday ||
        this.formData.iosas_grades112proposeddaysinsession ||
        this.formData.iosas_grades112proposedhoursperyear
      );
    },
  },
};
</script>
