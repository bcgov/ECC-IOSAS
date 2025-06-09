<template>
  <div>
    <p class="mt-3">
      This website provides a service for people wishing to open a new independent school in British Columbia.
    </p>
    <p class="mt-3">
      Independent schools are regulated by the
      <a :href="GOV_URL.independentActUrl" target="_blank">
        Independent School Act (PDF).</a>
      The Independent Schools Branch administers the Act as well as any
      <a :href="GOV_URL.schoolManualLawURL" target="_blank"
        >regulations, Minister's and Inspector's Orders</a>
      made under the Act.
    </p>
    <p class="mt-3">
      Please review the information at
      <a :href="GOV_URL.establishingSchoolURL" target="_blank">
      Establishing an Independent School - Province of British Columbia
        (gov.bc.ca)</a>
      before submitting an Expression of Interest (EOI).
    </p>
    <p class="mt-3">
      Once you have logged in to the Independent School BC portal you will be taken to a page where you will be able to create your Expression of Interest.
      If applicable, you will also be able to see any past Expressions of Interest that you have submitted.
    </p>
    <p class="mt-3">
      This information is collected by the Ministry of Education and Child Care
      under Sections 26 (a) and (c) of the
      <i>Freedom of Information and Protection of Privacy Act</i>
      (FOIPPA) and will be used to administer your Independent School application and certification process under Sections 4 and 6 of the
      <i>Independent School Act</i> as well as any
      <a :href="GOV_URL.schoolManualLawURL" target="_blank">
      regulations, Minister's and Inspector's Orders</a>
      made under the Act. (See
      <a :href="GOV_URL.schoolManualLawURL" target="_blank">
        Manual of School Law K-12 - Province of British Columbia Twenty-Third Edition.)</a>
    </p>
    <p class="mt-3">
      If you have any questions about the collection of personal information, or
      the application process, please email:
      <a href="mailto:EDUC.IndependentSchoolsOffice@gov.bc.ca" target="_blank">
      EDUC.IndependentSchoolsOffice@gov.bc.ca</a>
    </p>
    <p class="mt-3">
      To begin, you will need to create a BCeID if you do not have one already.
      If you have logged into other B.C. government services before, you may already have an account.
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
