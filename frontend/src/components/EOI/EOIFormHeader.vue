<template>
  <h4>General</h4>
  <br />
  <v-row>
    <v-col cols="12" sm="12" md="4" xs="12">
      <v-label>EOI Number </v-label>
      <p>{{ eoi.iosas_eoinumber }}</p>
    </v-col>
    <v-col cols="12" sm="12" md="4" xs="12">
      <v-label>{{ getCorrectDate().label }}</v-label>
      <p>{{ getCorrectDate().date }}</p>
    </v-col>
    <v-col cols="12" sm="12" md="4" xs="12">
      <v-label>Status </v-label>
      <p>
        {{
          eoi['iosas_reviewstatus@OData.Community.Display.V1.FormattedValue'] ||
          NULL_STRING
        }}
      </p>
    </v-col>
  </v-row>
  <br />
</template>

<script>
import { NULL_STRING } from '../../utils/constants';
export default {
  name: 'EOIFormHeader',
  props: {
    eoi: {
      type: Object,
      required: true,
    },
    draftStatusCode: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    NULL_STRING,
  }),
  methods: {
    getCorrectDate() {
      return this.eoi.iosas_reviewstatus === this.draftStatusCode
        ? {
            label: 'Created Date',
            date:
              this.eoi['createdon@OData.Community.Display.V1.FormattedValue'] ||
              NULL_STRING,
          }
        : {
            label: 'Decision Date',
            date:
              this.eoi[
                'iosas_submissiondate@OData.Community.Display.V1.FormattedValue'
              ] || NULL_STRING,
          };
    },
  },
};
</script>
