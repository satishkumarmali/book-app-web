<template>
  <label class="field__label flex flex--nowrap flex--middle flex--fit">
    <span><slot></slot></span>
    <s-icon :size="18" name="vmdi-information" class="ml-2" :title="tooltip" />
  </label>
</template>

<script>
export default {
  props: {
    tooltip: String,
  },
};
</script>
