<template>
  <v-container>
    <h4>General</h4>
    <br />
    <div v-if="isEditing">
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Application Number </v-label>
          <p>{{ formData.iosas_applicationnumber }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Status </v-label>
          <p>
            {{
              formData['statuscode@OData.Community.Display.V1.FormattedValue']
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>{{ getCorrectDate().label }}</v-label>
          <p>{{ getCorrectDate().date }}</p>
        </v-col>
      </v-row>
      <br />
      <v-label
        ><strong
          >Will the proposed school comply with Section 1 of the Schedule of the
          <a :href="GOV_URL.independentSchoolActUrl" target="_blank"
            >Independent School Act</a
          >, which requires that:
        </strong>
      </v-label>
      <v-row>
        <br />
        <v-col cols="12">
          <v-label>
            <ol type="1" class="ml-5">
              <li>
                No program is in existence or is proposed at the independent
                school that would, in theory or in practice, promote or foster
                doctrines of:
              </li>
              <ol type="a" class="ml-10">
                <li>racial or ethnic superiority or persecution,</li>
                <li>religious intolerance or persecution,</li>
                <li>social change through violent action, or,</li>
                <li>sedition.</li>
              </ol>
            </ol>
          </v-label>
          <v-radio-group
            id="iosas_nopromotionofinappropriatedoctrines"
            v-model="formData.iosas_nopromotionofinappropriatedoctrines"
            color="#003366"
            class="mt-4"
            inline
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-label>
            <ol start="2" class="ml-5">
              <li>
                The independent school facilities will comply with the
                enactments of British Columbia and the municipality or regional
                district in which the facilities are located, and,
              </li>
            </ol>
          </v-label>
          <v-radio-group
            id="iosas_willcomplywithenactmentsofbc"
            v-model="formData.iosas_willcomplywithenactmentsofbc"
            color="#003366"
            class="mt-4"
            inline
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-label>
            <ol start="3" class="ml-5">
              <li>
                The authority complies with the Independent School Act and its
                regulations.
              </li>
            </ol>
          </v-label>
          <v-radio-group
            id="iosas_authoritycomplieswithisaregulations"
            v-model="formData.iosas_authoritycomplieswithisaregulations"
            color="#003366"
            class="mt-4"
            inline
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Application Number </v-label>
          <p>{{ formData.iosas_applicationnumber }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Status </v-label>
          <p>
            {{
              formData['statuscode@OData.Community.Display.V1.FormattedValue']
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>{{ getCorrectDate().label }}</v-label>
          <p>{{ getCorrectDate().date }}</p>
        </v-col>
      </v-row>
      <br />
      <v-label
        ><strong
          >Will the proposed school comply with Section 1 of the Schedule of the
          <a :href="GOV_URL.independentSchoolActUrl" target="_blank"
            >Independent School Act</a
          >, which requires that:
        </strong>
      </v-label>
      <v-row>
        <br />
        <v-col cols="12">
          <v-label>
            <ol type="1" class="ml-5">
              <li>
                No program is in existence or is proposed at the independent
                school that would, in theory or in practice, promote or foster
                doctrines of:
              </li>
              <ol type="a" class="ml-10">
                <li>racial or ethnic superiority or persecution,</li>
                <li>religious intolerance or persecution,</li>
                <li>social change through violent action, or,</li>
                <li>sedition.</li>
              </ol>
            </ol>
          </v-label>
          <p>
            {{
              formatBooleanToYesNoString(
                formData.iosas_nopromotionofinappropriatedoctrines
              )
            }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-label>
            <ol start="2" class="ml-5">
              <li>
                The independent school facilities will comply with the
                enactments of British Columbia and the municipality or regional
                district in which the facilities are located, and,
              </li>
            </ol>
          </v-label>
          <p>
            {{
              formatBooleanToYesNoString(
                formData.iosas_willcomplywithenactmentsofbc
              )
            }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-label>
            <ol start="3" class="ml-5">
              <li>
                The authority complies with the Independent School Act and its
                regulations.
              </li>
            </ol>
          </v-label>
          <p>
            {{
              formatBooleanToYesNoString(
                formData.iosas_authoritycomplieswithisaregulations
              )
            }}
          </p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { GOV_URL } from '../../../utils/constants';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { NULL_STRING } from '../../../utils/constants';
export default {
  name: 'SchoolGeneralTab',
  emits: ['validateAndPopulate'],
  props: {
    formData: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    draftCode: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    NULL_STRING,
    GOV_URL,
    rules: Rules,
  }),
  methods: {
    formatBooleanToYesNoString,
    getCorrectDate() {
      return this.formData?.statuscode === this.draftCode
        ? {
            label: 'Created Date',
            date: this.formData[
              'createdon@OData.Community.Display.V1.FormattedValue'
            ],
          }
        : {
            label: 'Decision Date',
            date: this.formData[
              'iosas_submissiondate@OData.Community.Display.V1.FormattedValue'
            ],
          };
    },
  },
};
</script>
