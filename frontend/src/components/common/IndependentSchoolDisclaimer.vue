<template>
  <div>
    <p class="mt-3">
      Independent schools are regulated by the
      <a :href="GOV_URL.independentActUrl" target="_blank"
        >Independent School Act (PDF).</a
      >
      The Independent Schools Branch administers the Act as well as any
      <a :href="GOV_URL.schoolManualLawURL" target="_blank"
        >regulations, Minister's and Inspector's Orders</a
      >
      made under the Act.
    </p>
    <p class="mt-3">
      This information is collected by the Ministry of Education and Child Care
      under Section 26 (c) of the
      <i>Freedom of Information and Protection of Privacy Act</i>
      (FOIPPA) and will be used to evaluate your application to establish an
      independent school. Information related to a prospective school's finances
      or market research are collected in confidence but may be subject to
      disclosure under FOIPPA.
    </p>
    <p class="mt-3">
      Please review the information at
      <a :href="GOV_URL.establishingSchoolURL" target="_blank"
        >Establishing an Independent School - Province of British Columbia
        (gov.bc.ca)</a
      >
      before submitting an Expression of Interest (EOI).
    </p>
    <p class="mt-3">
      If you have any questions about the collection of personal information, or
      the application process, please email:
      <a href="mailto:EDUC.IndependentSchoolsOffice@gov.bc.ca" target="_blank"
        >EDUC.IndependentSchoolsOffice@gov.bc.ca</a
      >
    </p>
  </div>
</template>

<script>
import { GOV_URL } from '../../utils/constants';
export default {
  name: 'IndependentSchoolDisclaimer',
  data: () => ({
    GOV_URL,
  }),
};
</script>
