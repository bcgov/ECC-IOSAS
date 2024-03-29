<template>
  <v-container>
    <h4>Application for Group Certification</h4>
    <v-label v-if="isGroup(GROUP_CLASSIFICATION_CODES.groupThree)"
      >Group Certification is not required for group 3 applications. <br />Click
      {{ isEditing ? 'Save & Next' : 'Next' }} to proceed.
    </v-label>
    <v-label
      v-if="
        isGroup(GROUP_CLASSIFICATION_CODES.groupTwo) ||
        isGroup(GROUP_CLASSIFICATION_CODES.groupFour)
      "
      >The proposed school will establish an educational program that will
      comply with the instructional goals, time, and program requirements
      determined by the Minister, as specified in the<a
        :href="GOV_URL.educationalStandardsOrderUrl"
        target="_blank"
      >
        Educational Standards Order.
      </a>
    </v-label>
    <br />
    <br />

    <div v-if="isEditing">
      <div v-if="isGroup(GROUP_CLASSIFICATION_CODES.groupTwo)">
        <v-label><strong>Group 2:</strong></v-label>
        <v-row align="center">
          <v-col cols="8">
            <v-label
              >If the proposed school is intending to seek funding, are you
              familiar with
              <a :href="GOV_URL.independentSchoolGrants" target="_blank"
                >Grants to Independent Schools Policy?</a
              >
            </v-label>
          </v-col>
          <v-col cols="4">
            <v-radio-group
              id="iosas_familiarwithgrantstoispolicyifseekingfunds"
              v-model="
                formData.iosas_familiarwithgrantstoispolicyifseekingfunds
              "
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

        <v-row align="center">
          <v-col cols="8">
            <v-label
              >Will the School Authority operate on a non-profit basis?
            </v-label>
          </v-col>
          <v-col cols="4">
            <v-radio-group
              id="iosas_willsaoperateonnonprofitbasis"
              v-model="formData.iosas_willsaoperateonnonprofitbasis"
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
        <br />
      </div>
      <div v-if="isGroup(GROUP_CLASSIFICATION_CODES.groupFour)">
        <v-label><strong>Group 4:</strong></v-label>
        <v-label class="block"
          >Has the school applicant’s authority obtained written confirmation
          from a financial institution or surety provider of their eligibility
          to obtain a bond in the form of an irrevocable letter of credit or
          surety bond in the amount of $100,000, consistent with requirements of
          the
          <a :href="GOV_URL.independentSchoolRegulations" target="_blank">
            Independent School Regulation?</a
          >
          <br />
          Specifically:
          <ul class="ml-10">
            <li>
              $100,000 of bonding must be in place when making Application for
              Interim Certification.
            </li>
            <li>
              Bonding amount will be revised as required based on the enrolment
              30 days after the first day of class.
            </li>
          </ul>
        </v-label>
        <v-row align="center">
          <v-col cols="8">
            <v-label
              >Please note that the Ministry will not issue an Interim
              Certification until the required bonding instrument has been
              provided by the Group 4 applicant.</v-label
            >
          </v-col>
          <v-col cols="4">
            <v-radio-group
              id="iosas_hasthesaobtainedirrevocableloc"
              v-model="formData.iosas_hasthesaobtainedirrevocableloc"
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
        <br />
        <v-row align="center">
          <v-col cols="8">
            <v-label
              >Has the authority developed a fees and tuition refund policy that
              ensures refunds in the event the school is unable to obtain or
              maintain a Group 4 Certificate of Classification in the first year
              of operation?</v-label
            >
          </v-col>
          <v-col cols="4">
            <v-radio-group
              id="iosas_hastheauthoritydevelopedarefundpolicy"
              v-model="formData.iosas_hastheauthoritydevelopedarefundpolicy"
              color="#003366"
              class="mt-4"
              inline
              @change="$emit('validateAndPopulate', $event)"
              :rules="[rules.requiredSelect()]"
            >
              <v-radio
                v-for="item in getApplicationPickListOptions?.[
                  'iosas_hastheauthoritydevelopedarefundpolicy'
                ]"
                :key="item.value"
                inline
                :label="item.label"
                color="#003366"
                v-bind:value="item.value"
              />
            </v-radio-group>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-else>
      <div v-if="isGroup(GROUP_CLASSIFICATION_CODES.groupTwo)">
        <v-label><strong>Group 2:</strong></v-label>
        <v-row align="center">
          <v-col cols="8">
            <v-label
              >If the proposed school is intending to seek funding, are you
              familiar with
              <a :href="GOV_URL.independentSchoolGrants" target="_blank"
                >Grants to Independent Schools Policy?</a
              >
            </v-label>
          </v-col>
          <v-col cols="4">
            <p>
              {{
                formatBooleanToYesNoString(
                  formData.iosas_familiarwithgrantstoispolicyifseekingfunds
                )
              }}
            </p>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="8">
            <v-label
              >Will the School Authority operate on a non-profit basis?
            </v-label>
          </v-col>
          <v-col cols="4">
            <p>
              {{
                formatBooleanToYesNoString(
                  formData.iosas_willsaoperateonnonprofitbasis
                )
              }}
            </p>
          </v-col>
        </v-row>
      </div>
      <div v-if="isGroup(GROUP_CLASSIFICATION_CODES.groupFour)">
        <v-label><strong>Group 4 only:</strong></v-label>
        <v-label class="block"
          >Has the school applicant’s authority obtained written confirmation
          from a financial institution or surety provider of their eligibility
          to obtain a bond in the form of an irrevocable letter of credit or
          surety bond in the amount of $100,000, consistent with requirements of
          the
          <a :href="GOV_URL.independentSchoolRegulations" target="_blank">
            Independent School Regulation?</a
          >
          <br />Specifically:
          <ul class="ml-10">
            <li>
              $100,000 of bonding must be in place when making Application for
              Interim Certification.
            </li>
            <li>
              Bonding amount will be revised as required based on the enrolment
              30 days after the first day of class.
            </li>
          </ul>
        </v-label>
        <v-row align="center">
          <v-col cols="8">
            <v-label
              >Please note that the Ministry will not issue an Interim
              Certification until the required bonding instrument has been
              provided by the Group 4 applicant.</v-label
            >
          </v-col>
          <v-col cols="4">
            <p>
              {{
                formatBooleanToYesNoString(
                  formData.iosas_hasthesaobtainedirrevocableloc
                )
              }}
            </p>
          </v-col>
        </v-row>
        <br />
        <v-row align="center">
          <v-col cols="8">
            <v-label
              >Has the authority developed a fees and tuition refund policy that
              ensures refunds in the event the school is unable to obtain or
              maintain a Group 4 Certificate of Classification in the first year
              of operation?
            </v-label>
          </v-col>
          <v-col cols="4">
            {{
              formData[
                'iosas_hastheauthoritydevelopedarefundpolicy@OData.Community.Display.V1.FormattedValue'
              ] || NULL_STRING
            }}
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'pinia';
import * as Rules from '../../../utils/formRules';
import { metaDataStore } from '../../../store/modules/metaData';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { NULL_STRING, GOV_URL } from '../../../utils/constants';
import { GROUP_CLASSIFICATION_CODES } from '../../../utils/application';
export default {
  name: 'GroupCertificationTab',
  emits: ['validateAndPopulate'],
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
    GROUP_CLASSIFICATION_CODES,
    rules: Rules,
  }),
  mounted() {},
  computed: {
    ...mapState(metaDataStore, ['getApplicationPickListOptions']),
  },
  methods: {
    formatBooleanToYesNoString,
    isGroup(group) {
      return this.formData.iosas_groupclassification === group;
    },
  },
};
</script>

<style scoped>
.v-label {
  display: inline;
}

li {
  display: list-item;
  list-style-position: inside;
}
.block {
  display: block;
}
</style>
