<template>
  <v-text-field
    class="hidden-field"
    type="hidden"
    :rules="condition ? [rules.required()] : []"
  />
  <!-- <div class="v-input__details" v-if="isVisible">
    <div class="v-messages" role="alert">
      <div class="v-messages__message" style="transform-origin: center center">
        Required
      </div>
    </div>
  </div> -->
</template>

<script>
import * as Rules from '../utils/formRules';
export default {
  name: 'RequiredMessage',
  props: {
    condition: {
      type: Boolean,
      required: true,
    },
    // isVisible: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  data() {
    return {
      rules: Rules,
    };
  },
};
</script>

<style scoped>
/* .v-messages__message {
  color: #b00020;
  opacity: 100% !important;
}
.v-messages {
  opacity: 100%;
} */

.hidden-field {
  :deep(.v-input__control) {
    grid-area: none !important;
  }
}
</style>
