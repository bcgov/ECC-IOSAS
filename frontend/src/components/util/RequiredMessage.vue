<template>
  <v-text-field
    class="hidden-field"
    type="hidden"
    :rules="condition ? [rules.required()] : []"
  />
</template>

<script>
import * as Rules from '../utils/formRules';
export default {
  name: 'RequiredMessage',
  props: {
    condition: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: Rules,
    };
  },
};
</script>

<style lang="scss" scoped>
.hidden-field {
  :deep(.v-input__control) {
    grid-area: none !important;
  }
}
</style>
