<template>
  <v-card title="Related Links" variant="tonal" class="reference-cards">
    <div class="content">
      <ul class="pl-5">
        <li
          class="pt-2"
          v-for="link in links.filter((link) => link.title !== undefined)"
          :key="link.title"
        >
          <a :href="link.href" target="_blank">
            {{ link.title }}
          </a>
        </li>
      </ul>
    </div></v-card
  >
</template>

<script>
import { GOV_URL } from '../../utils/constants';
export default {
  name: 'RelatedLinksCard',
  props: {
    showExtraEOILink: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      GOV_URL,
      links: [
        {
          ...(this.showExtraEOILink && {
            title: 'Requirements for submitting Expression of Interest',
            href: GOV_URL.establishingSchoolURL,
          }),
        },
        {
          title: 'Independent School Information for Administrators',
          href: GOV_URL.independentSchoolInfoUrl,
        },
        {
          title: 'Independent School Contacts',
          href: GOV_URL.independentSchoolContractsUrl,
        },
        {
          title: 'Update your school information',
          href: GOV_URL.schoolInfoUpdateUrl,
        },
        {
          title: 'Teacher certification',
          href: GOV_URL.teacherCertificationUrl,
        },
        {
          title: 'Federation of Independent School Associations (FISA)',
          href: GOV_URL.FISAUrl,
        },
      ],
    };
  },
};
</script>
