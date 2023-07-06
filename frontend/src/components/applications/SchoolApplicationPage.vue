<template>
  <v-container fluid class="full-height">
    <v-breadcrumbs :items="items"
      ><template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <!-- <v-timeline direction="horizontal" class="fixed" align="center" side="end">
      <v-timeline-item
        v-for="step in steps"
        key="step"
        size="small"
        dot-color="green-lighten-1"
        icon="mdi-check"
      >
        <div>
          <div class="step-title">{{ step.title }}</div>
        </div>
      </v-timeline-item>
    </v-timeline> -->

    <br />
    <SchoolApplicationForm />
  </v-container>
</template>

<script>
import SchoolApplicationForm from "./SchoolApplicationForm.vue";

export default {
  name: "School Application Page",
  components: {
    SchoolApplicationForm,
  },
  data: () => ({
    items: [
      {
        title: "Dashboard",
        disabled: false,
        href: "/",
      },
      {
        title: `Application`,
        disabled: true,
        href: "school-application",
      },
    ],
    steps: [
      { title: "EOI Approved", complete: true, isCurrent: false },
      { title: "App Submitted", complete: true, isCurrent: false },
      { title: "App Review", complete: true, isCurrent: false },
      { title: "Interview", complete: false, isCurrent: true },
      { title: "Pre-Certification", complete: false, isCurrent: false },
      { title: "Interim Certification", complete: false, isCurrent: false },
    ],
  }),
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
.full-height {
  height: 100%;
}

.v-timeline--horizontal.v-timeline.v-timeline--side-end,
.v-timeline-item,
.v-timeline-item__body {
  padding: none !important;
  padding-block-end: 0 !important;
  padding-block-start: 0 !important;
}

.step-title {
  font-size: 12px;
  line-height: 0;
}
</style>
