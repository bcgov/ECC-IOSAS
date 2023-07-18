<template>
  <v-card title="Contact Information" variant="tonal" class="reference-cards">
    <div class="content">
      <p>Independent Schools Branch</p>
      <div class="pt-3">
        <h4>Office:</h4>
        <a href="tel:250 387-3711">{{ phone }}</a>
      </div>
      <div class="pt-3">
        <h4>Fax:</h4>
        <p>{{ fax }}</p>
      </div>
      <div class="pt-3">
        <h4>Email:</h4>
        <a href="mailto:EDUC.IndependentSchoolsOffice@gov.bc.ca">{{ email }}</a>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ContactCard',
  data() {
    return {
      fax: '250 953-4908',
      phone: '250 387-3711',
      email: 'EDUC.IndependentSchoolsOffice@gov.bc.ca',
    };
  },
};
</script>
