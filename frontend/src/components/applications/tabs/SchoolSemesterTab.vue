<template>
  <v-container>
    <h4>School Semester Indicator Type</h4>
    <v-label class="sm"
      >Schools Seeking Group 1, 2 and 4 only. Please select however many fit the
      intended school.</v-label
    >
    <v-row>
      <v-col cols="6" sm="6" md="6" xs="6">
        <div
          v-for="item in getApplicationMultiPickListOptions[
            'iosas_semestertype'
          ]"
          :key="item.value"
        >
          <v-checkbox
            v-model="formData.iosas_semestertype"
            :label="item.label"
            :value="item.value"
            :disabled="!isEditing"
          >
          </v-checkbox>
        </div>
      </v-col>
    </v-row>

    <div v-if="isEditing">
      <br />
      <v-label><strong>Half day Kindergarten</strong></v-label>
      <br />
      <v-label class="sm">Minimum required hours per year 450 Hours </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_halfdaykindergartenproposedhoursperday"
            v-model="formData.iosas_halfdaykindergartenproposedhoursperday"
            :maxlength="255"
            variant="outlined"
            label="Proposed Hours Per Day"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_halfdaykindergartenproposeddaysinsession"
            v-model="formData.iosas_halfdaykindergartenproposeddaysinsession"
            :maxlength="255"
            variant="outlined"
            label="Proposed Number of Days in Session"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_halfdaykindergartenproposedhoursperyear"
            v-model="formData.iosas_halfdaykindergartenproposedhoursperyear"
            :maxlength="255"
            variant="outlined"
            label="Proposed Hours Per Year"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-label><strong>Full day Kindergarten</strong></v-label>
      <br />
      <v-label class="sm">Minimum required hours per year 850 Hours </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_fulldaykindergartenproposedhoursperday"
            v-model="formData.iosas_fulldaykindergartenproposedhoursperday"
            :maxlength="255"
            variant="outlined"
            label="Proposed Hours Per Day"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_fulldaykindergartenproposeddaysinsession"
            v-model="formData.iosas_fulldaykindergartenproposeddaysinsession"
            :maxlength="255"
            variant="outlined"
            label="Proposed Number of Days in Session"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_fulldaykindergartenproposedhoursperyear"
            v-model="formData.iosas_fulldaykindergartenproposedhoursperyear"
            :maxlength="255"
            variant="outlined"
            label="Proposed Hours Per Year"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-label><strong>Grades 1-12</strong></v-label>
      <br />
      <v-label class="sm">Minimum required hours per year 850 Hours </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_grades112proposedhoursperday"
            v-model="formData.iosas_grades112proposedhoursperday"
            :maxlength="255"
            variant="outlined"
            label="Proposed Hours Per Day"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_grades112proposeddaysinsession"
            v-model="formData.iosas_grades112proposeddaysinsession"
            :maxlength="255"
            variant="outlined"
            label="Proposed Number of Days in Session"
            color="rgb(59, 153, 252)"
          />
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-text-field
            :disabled="!isEditing"
            id="iosas_grades112proposedhoursperyear"
            v-model="formData.iosas_grades112proposedhoursperyear"
            :maxlength="255"
            variant="outlined"
            label="Proposed Hours Per Year"
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <br />
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
    rules: Rules,
  }),
  mounted() {},
  computed: {
    ...mapState(metaDataStore, ['getApplicationMultiPickListOptions']),
  },
  methods: { formatBooleanToYesNoString },
};
</script>
