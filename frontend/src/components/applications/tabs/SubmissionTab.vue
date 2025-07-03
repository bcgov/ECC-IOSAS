<template>
  <v-container>
    <h4>Application Submission</h4>
    <div>
      <v-label
        >You will be contacted via email with the results of your application.
        Successful applicants will be invited for an Interview as outlined In
        Step 3 of the
        <a :href="GOV_URL.establishingSchoolURL"
          >Establishing an Independent School</a
        >.
      </v-label>
      <br />
      <br/>
      <p>Once submitted, your application will be considered final and additional documents will not be accepted.</p>
        <v-label>
          <ul class="ml-5">
            <li>
              Applications will be processed in order of receipt.
            </li>
            <li>
              Invitations/dates for successful applicants to proceed to interview stage will be prioritized in order of application approval.
            </li>
            <li>
              Applicants should be prepared to interview anytime after Remembrance Day.
            </li>
          </ul>
        </v-label>

    </div>
  </v-container>
</template>

<script>
import { GOV_URL } from '../../../utils/constants';
export default {
  name: 'SubmissionTab',
  data: () => ({
    GOV_URL,
  }),
};
</script>

<style scoped>
.v-label {
  display: inline;
}
</style>
