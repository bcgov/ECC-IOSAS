<template>
  <v-conatiner>
    <h4>Application for Group Certification</h4>
    <v-label><strong> (Schools Seeking group and 4 only) </strong></v-label>
    <v-label
      >The proposed school will establish an educational program that will
      comply with the instructional goals, time, and program requirements
      determined by the Minister, as specified in the Educational Standards
      Order.</v-label
    >
    <br />
    <br />

    <div v-if="isEditing">
      <v-row align="center">
        <v-col cols="8">
          <v-label><strong>Group 2:</strong></v-label>
          <v-label
            >If the proposed school is intending to seek funding, are you
            familiar with Grants to Independent Schools Policy?
          </v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_familiarwithgrantstoispolicyifseekingfunds"
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

      <v-row align="center">
        <v-col cols="8">
          <v-label><strong>Group 2:</strong></v-label>
          <v-label
            >Will the School Authority operate on a non-profit basis?
          </v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_willsaoperateonnonprofitbasis"
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
      <br />
      <v-label><strong>Group 4 only:</strong></v-label>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Has the school applicant's authority obtained written confirmation
            from a bank or surety provider of the authority's eligibility to
            meet the bonding requirements of the Independent School Regulation
            (sections 12 to 17) as these apply to Group 4 independent
            schools?</v-label
          >
        </v-col>
        <v-col cols="4">
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

      <br />

      <v-label class="block"
        >Has the school applicant’s authority obtained written confirmation from
        a financial institution or surety provider of their eligibility to
        obtain a bond in the form of an irrevocable letter of credit or surety
        bond in the amount of $100,000, consistent with requirements of the
        Independent School Regulation?
        <br />
        Specifically:
        <ul class="ml-10">
          <li>
            $100,000 of bonding must be in place when making Application for
            Interim Certification.
          </li>
          <li>
            Bonding amount will be revised as required based on the enrolment 30
            days after the first day of class.
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
            <v-radio label="No" color="#003366" v-bind:value="null">
              <template #label>
                <span :class="activeRadio">N/A</span>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <br />
      <v-label
        >Has the authority developed a fees and tuition refund policy that
        ensures refunds in the event the school is unable to obtain or maintain
        a Group 4 Certificate of Classification in the first year of operation?
      </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-textarea
            :disabled="!isEditing"
            id="school_phone"
            v-model="formData.school_phone"
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
      <v-row align="center">
        <v-col cols="8">
          <v-label><strong>Group 2:</strong></v-label>
          <v-label
            >If the proposed school is intending to seek funding, are you
            familiar with Grants to Independent Schools Policy?
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
          <v-label><strong>Group 2:</strong></v-label>
          <v-label
            >Group 2: Will the School Authority operate on a non-profit basis?
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
      <br />
      <v-label><strong>Group 4 only:</strong></v-label>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Has the school applicant's authority obtained written confirmation
            from a bank or surety provider of the authority's eligibility to
            meet the bonding requirements of the Independent School Regulation
            (sections 12 to 17) as these apply to Group 4 independent
            schools?</v-label
          >
        </v-col>
        <v-col cols="4">
          <p>{{ formatBooleanToYesNoString(true) }}</p>
        </v-col>
      </v-row>

      <br />

      <v-label class="block"
        >Has the school applicant’s authority obtained written confirmation from
        a financial institution or surety provider of their eligibility to
        obtain a bond in the form of an irrevocable letter of credit or surety
        bond in the amount of $100,000, consistent with requirements of the
        Independent School Regulation?
        <br />
        Specifically:
        <ul class="ml-10">
          <li>
            $100,000 of bonding must be in place when making Application for
            Interim Certification.
          </li>
          <li>
            Bonding amount will be revised as required based on the enrolment 30
            days after the first day of class.
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
          <p>{{ formatBooleanToYesNoString(true) }}</p>
        </v-col>
      </v-row>
      <br />
      <v-label
        >Has the authority developed a fees and tuition refund policy that
        ensures refunds in the event the school is unable to obtain or maintain
        a Group 4 Certificate of Classification in the first year of operation?
      </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          {{ NULL_STRING }}
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
  name: 'GroupCertificationTab',
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
li {
  display: list-item;
  list-style-position: inside;
}
.block {
  display: block;
}
</style>
