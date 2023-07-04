<template>
  <v-container fluid class="full-height">
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
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
