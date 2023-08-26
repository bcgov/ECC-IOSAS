<template>
  <v-container>
    <h4>Application Submission</h4>
    <div>
      <v-label
        >You will be contacted via email with the results of your application.
        Successful applicants will be invited for an Interview as outlined In
        Step 3 of the
        <a :href="GOV_URL.establishingSchoolURL"
          >Establishing an Independent School Policy.</a
        >.
      </v-label>
    </div>
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { GOV_URL } from '../../../utils/constants';
export default {
  name: 'SubmissionTab',
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
    rules: Rules,
  }),
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
</style>
