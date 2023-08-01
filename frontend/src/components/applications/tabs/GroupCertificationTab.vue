<template>
  <v-container>
    <h4>Application for Group Certification</h4>
    <v-label><strong>Schools Seeking group 2 and 4 only</strong></v-label>
    <br />
    <br />
    <v-label
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
            v-model="formData.iosas_familiarwithgrantstoispolicyifseekingfunds"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
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
            v-model="formData.iosas_willsaoperateonnonprofitbasis"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
      <br />
      <v-label><strong>Group 4:</strong></v-label>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Has the school applicant's authority obtained written confirmation
            from a bank or surety provider of the authority's eligibility to
            meet the bonding requirements of the
            <a :href="GOV_URL.independentSchoolRegulations" target="_blank"
              >Independent School Regulation (sections 12 to 17)</a
            >
            as these apply to Group 4 independent schools?</v-label
          >
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_hassaobtaineddocumentsregardingbondingreqs"
            v-model="formData.iosas_hassaobtaineddocumentsregardingbondingreqs"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <br />

      <v-label class="block"
        >Has the school applicant’s authority obtained written confirmation from
        a financial institution or surety provider of their eligibility to
        obtain a bond in the form of an irrevocable letter of credit or surety
        bond in the amount of $100,000, consistent with requirements of the
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
            id="iosas_hasthesaobtainedirrevocableloc"
            v-model="formData.iosas_hasthesaobtainedirrevocableloc"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
            <v-radio label="No" color="#003366" v-bind:value="null" />
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
            id="iosas_hastheauthoritydevelopedarefundpolicy"
            v-model="formData.iosas_hastheauthoritydevelopedarefundpolicy"
            :disabled="!isEditing"
            :maxlength="255"
            variant="outlined"
            label=""
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
    </div>
    <div v-else>
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
          <v-label>
            Will the School Authority operate on a non-profit basis?
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
            meet the bonding requirements of the
            <a :href="GOV_URL.independentSchoolRegulations" target="_blank"
              >Independent School Regulation (sections 12 to 17)</a
            >
            as these apply to Group 4 independent schools?</v-label
          >
        </v-col>
        <v-col cols="4">
          <p>
            {{
              formatBooleanToYesNoString(
                formData.iosas_hassaobtaineddocumentsregardingbondingreqs
              )
            }}
          </p>
        </v-col>
      </v-row>

      <br />

      <v-label class="block"
        >Has the school applicant’s authority obtained written confirmation from
        a financial institution or surety provider of their eligibility to
        obtain a bond in the form of an irrevocable letter of credit or surety
        bond in the amount of $100,000, consistent with requirements of the
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
      <v-label
        >Has the authority developed a fees and tuition refund policy that
        ensures refunds in the event the school is unable to obtain or maintain
        a Group 4 Certificate of Classification in the first year of operation?
      </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          {{
            formatBooleanToYesNoString(
              formData.iosas_hastheauthoritydevelopedarefundpolicy
            )
          }}
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { formatBooleanToYesNoString } from '../../../utils/format';
import { NULL_STRING, GOV_URL } from '../../../utils/constants';
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
    GOV_URL,
    NULL_STRING,
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
