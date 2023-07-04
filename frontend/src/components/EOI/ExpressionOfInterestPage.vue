<template>
  <v-container fluid class="full-height">
    <ExpressionOfInterestForm />
  </v-container>
</template>

<script>
import ExpressionOfInterestForm from "./ExpressionOfInterestForm.vue";

export default {
  name: "ExpressionOfInterestPage",
  components: {
    ExpressionOfInterestForm,
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
