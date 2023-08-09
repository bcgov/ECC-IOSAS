<template>
  <div>
    <h4>General</h4>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-label>EOI Number</v-label>
        <p>{{ eoi.iosas_eionumber || NULL_STRING }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="4" xs="12">
        <v-label>Status</v-label>
        <p>{{ eoi.iosas_reviewstatus || NULL_STRING }}</p>
      </v-col>
      <!-- <v-col cols="12" sm="12" md="4" xs="12">
        <v-label>{{ getCorrectDate().label }}</v-label>
        <p>{{ getCorrectDate().date || NULL_STRING }}</p>
      </v-col> -->
    </v-row>
    <br />
    <v-divider></v-divider>
    <h4>School Authority Information</h4>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>School Authority</v-label>
        <p>{{ eoi.iosas_schoolauthorityname || NULL_STRING }}</p>
      </v-col>
    </v-row>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>School Authority Head</v-label>
        <p>{{ getAuthorityHeadName() || NULL_STRING }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="3" xs="12">
        <v-label>E-Mail</v-label>
        <p>{{ eoi.iosas_schoolauthorityheademail || NULL_STRING }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="3" xs="12">
        <v-label>Phone</v-label>
        <p>{{ eoi.iosas_schoolauthorityheadphone || NULL_STRING }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label
          >Is the Designated Authority the same as Authority Head?</v-label
        >
        <p>
          {{
            formatBooleanToYesNoString(
              eoi.iosas_designatedcontactsameasauthorityhead
            )
          }}
        </p>
      </v-col>
    </v-row>
    <div v-if="!eoi.iosas_designatedcontactsameasauthorityhead">
      <v-row>
        <v-col cols="12" sm="12" md="6" xs="12">
          <v-label>Designated Authority Contact</v-label>
          <p>{{ getDesignatedHeadName() || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="3" xs="12">
          <v-label>E-mail</v-label>
          <p>{{ eoi.iosas_schoolauthoritycontactemail || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="3" xs="12">
          <v-label>Phone</v-label>
          <p>{{ eoi.ioas_schoolauthoritycontactphone || NULL_STRING }}</p>
        </v-col>
      </v-row>
    </div>
    <br />
    <v-label><strong>Authority Mailing Address</strong></v-label>
    <div class="ml-5">
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Address Line 1</v-label>
          <p>{{ eoi.iosas_authorityaddressline1 || NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Address Line 2</v-label>
          <p>{{ eoi.iosas_authorityaddressline2 || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>City</v-label>
          <p>{{ eoi.iosas_authoritycity || NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Province</v-label>
          <p>{{ eoi.iosas_authorityprovince || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Country</v-label>
          <p>{{ eoi.iosas_authoritycountry || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Postal Code</v-label>
          <p>{{ eoi.iosas_authoritypostalcode || NULL_STRING }}</p>
        </v-col>
      </v-row>
    </div>

    <v-divider></v-divider>
    <h4>School Information</h4>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="8" xs="12">
        <v-label>Proposed School Name</v-label>
        <p>{{ eoi.iosas_proposedschoolname || NULL_STRING }}</p>
      </v-col>
    </v-row>
    <br />
    <v-label><strong>School Address</strong></v-label>
    <div class="ml-5">
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Address Line 1</v-label>
          <p>{{ eoi.iosas_schooladdressline1 || NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Address Line 2</v-label>
          <p>{{ eoi.iosas_schooladdressline2 || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>City</v-label>
          <p>{{ eoi.iosas_schoolcity || NULL_STRING }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Province</v-label>
          <p>{{ eoi.iosas_schoolprovince || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Country</v-label>
          <p>{{ eoi.iosas_schoolcountry || NULL_STRING }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Postal Code</v-label>
          <p>{{ eoi.iosas_schoolpostalcode || NULL_STRING }}</p>
        </v-col>
      </v-row>
    </div>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Website</v-label>
        <p>{{ eoi.iosas_website || NULL_STRING }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>School Year</v-label>
        <p>{{ eoi._iosas_edu_year_value || NULL_STRING }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-label>Group Classification</v-label>
        <p>{{ eoi.iosas_groupclassification || NULL_STRING }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label
          >Plans to seek Group 1 classification in the second or subsequest year
          of operation?
        </v-label>
        <p>
          {{ formatBooleanToYesNoString(eoi.iosas_seekgrouponeclassification) }}
        </p>
      </v-col>
    </v-row>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Proposed grade range in first year of operation</v-label>
        <p>
          {{ eoi.iosas_startgrade }} -
          {{ eoi.iosas_endgrade }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { formatBooleanToYesNoString } from '../../utils/format';
import { NULL_STRING } from '../../utils/constants';
export default {
  name: 'ExpressionOfInterestReadOnlyView',
  components: {},
  props: {
    eoi: {
      type: Object,
      required: true,
    },
    getCorrectDate: {
      type: Function,
      required: true,
    },
  },
  mounted() {},
  data() {
    return {
      NULL_STRING,
    };
  },
  methods: {
    formatBooleanToYesNoString,
    getAuthorityHeadName() {
      return this.eoi.iosas_authorityheadfirstname
        ? this.eoi.iosas_authorityheadfirstname +
            ' ' +
            this.eoi.iosas_authorityheadname
        : null;
    },
    getDesignatedHeadName() {
      return this.eoi.iosas_designatedcontactfirstname
        ? this.eoi.iosas_designatedcontactfirstname +
            ' ' +
            this.eoi.iosas_schoolauthoritycontactname
        : null;
    },
  },
};
</script>
