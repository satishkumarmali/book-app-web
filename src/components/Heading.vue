<template>
  <div class="heading">
    <h4 class="text-primary">{{ title }}</h4>
    <p class="text-grey text-sm">{{ desc }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    desc: String,
  },
};
</script>
