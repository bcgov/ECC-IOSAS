<template>
  <div class="v-input__details" v-if="isVisible">
    <div class="v-messages" role="alert">
      <div class="v-messages__message" style="transform-origin: center center">
        Required
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequiredMessage',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.v-messages__message {
  color: #b00020;
  opacity: 100% !important;
}
.v-messages {
  opacity: 100%;
}
</style>
