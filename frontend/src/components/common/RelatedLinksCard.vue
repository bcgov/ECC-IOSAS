<template>
  <v-card title="Related Links" variant="tonal" class="reference-cards">
    <div class="content">
      <ul class="pl-5">
        <li class="pt-2" v-for="link in links" :key="link.title">
          <a :href="link.href" target="_blank">
            {{ link.title }}
          </a>
        </li>
      </ul>
    </div></v-card
  >
</template>

<script>
export default {
  name: 'RelatedLinksCard',
  data() {
    return {
      links: [
        {
          title: 'Independent School Information for Administrators',
          href: 'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/program-management/independent-schools',
        },
        {
          title: ' Independent School Contacts',
          href: 'http://www.bced.gov.bc.ca/apps/imcl/imclWeb/IndSchool.do?school_category=Independent%20School',
        },
        {
          title: 'Update your school information',
          href: 'http://www.bced.gov.bc.ca/apps/imcl/imclWeb/SchoolUpdateForm.do',
        },
        {
          title: 'Teacher certification',
          href: 'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/teacher-certification?keyword=teacher&keyword=certification',
        },
        {
          title: 'Federation of Independent School Associations (FISA)',
          href: 'https://fisabc.ca/',
        },
      ],
    };
  },
};
</script>
