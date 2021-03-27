<template>
  <div class="bg-light radius-4">
    <div class="bb-lightest flex flex--middle py-2 px-3">
      <h4 class="flex__fluid">{{ title }}</h4>
      <div class="flex__fit">
        <s-button
          icon="vmdi-close"
          color="grey"
          theme="muted"
          size="md"
          shape="circle"
          @click.native="$shilp.modal.close()"
        />
      </div>
    </div>
    <div class="p-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>