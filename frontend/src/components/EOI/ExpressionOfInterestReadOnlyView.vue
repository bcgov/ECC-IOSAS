<template>
  <div>
    <h4>General</h4>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>EOI Number</v-label>
        <p>{{ eoi.iosas_eionumber || nullString }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Status</v-label>
        <p>{{ eoi.status || nullString }}</p>
      </v-col>
    </v-row>
    <br />
    <v-divider></v-divider>
    <h4>School Authority Information</h4>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>School Authority</v-label>
        <p>{{ eoi.iosas_edu_schoolauthorityname || nullString }}</p>
      </v-col>
    </v-row>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>School Authority Head</v-label>
        <p>{{ getAuthorityHeadName() || nullString }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="3" xs="12">
        <v-label>E-Mail</v-label>
        <p>{{ eoi.iosas_schoolauthorityheademail || nullString }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="3" xs="12">
        <v-label>Phone</v-label>
        <p>{{ eoi.iosas_schoolauthorityheadphone || nullString }}</p>
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
          <p>{{ getDesignatedHeadName() || nullString }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="3" xs="12">
          <v-label>E-mail</v-label>
          <p>{{ eoi.iosas_schoolauthoritycontactemail || nullString }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="3" xs="12">
          <v-label>Phone</v-label>
          <p>{{ eoi.ioas_schoolauthoritycontactphone || nullString }}</p>
        </v-col>
      </v-row>
    </div>
    <br />
    <v-label>Authority Mailing Address</v-label>
    <div class="gray">
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Address Line 1</v-label>
          <p>{{ eoi.iosas_authorityaddressline1 || nullString }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Address Line 2</v-label>
          <p>{{ eoi.iosas_authorityaddressline2 || nullString }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>City</v-label>
          <p>{{ eoi.iosas_authoritycity || nullString }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Province</v-label>
          <p>{{ eoi.iosas_authorityprovince || nullString }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Country</v-label>
          <p>{{ eoi.iosas_authoritycountry || nullString }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Postal Code</v-label>
          <p>{{ eoi.iosas_authoritypostalcode || nullString }}</p>
        </v-col>
      </v-row>
    </div>

    <v-divider></v-divider>
    <h4>School Information</h4>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="8" xs="12">
        <v-label>Proposed School Name</v-label>
        <p>{{ eoi.iosas_proposedschoolname || nullString }}</p>
      </v-col>
    </v-row>
    <br />
    <v-label>School Address</v-label>
    <div class="gray">
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Address Line 1</v-label>
          <p>{{ eoi.iosas_schooladdressline1 || nullString }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-label>Address Line 2</v-label>
          <p>{{ eoi.iosas_schooladdressline2 || nullString }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>City</v-label>
          <p>{{ eoi.iosas_schoolcity || nullString }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Province</v-label>
          <p>{{ eoi.iosas_schoolprovince || nullString }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Country</v-label>
          <p>{{ eoi.iosas_schoolcountry || nullString }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="4" xs="12">
          <v-label>Postal Code</v-label>
          <p>{{ eoi.iosas_schoolpostalcode || nullString }}</p>
        </v-col>
      </v-row>
    </div>
    <br />
    <v-row>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>Website</v-label>
        <p>{{ eoi.iosas_website || nullString }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6" xs="12">
        <v-label>School Year</v-label>
        <p>{{ eoi._iosas_edu_year_value || nullString }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-label>Group Calassification</v-label>
        <p>{{ eoi.iosas_groupclassification || nullString }}</p>
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
export default {
  name: 'ExpressionOfInterestReadOnlyView',
  components: {},
  props: {
    eoi: {
      type: Object,
      required: true,
    },
  },
  mounted() {},
  data() {
    return {
      nullString: '-',
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

<style scoped>
.v-label {
  white-space: break-spaces;
}

.gray {
  margin: 10px;
  padding: 10px;
}
</style>
