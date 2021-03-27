<template>
  <div class="item-form-shimmer">
    <s-alert
      v-if="data.error"
      title="There was an Error!"
      color="danger"
      theme="muted"
      icon="vmdi-alert"
      class="g-2"
      fluid
    >
      <p>{{ data.error }}</p>
      <ul v-if="data.message">
        <li v-for="(item, index) in errorArray" :key="`message-${index}`">
          {{ item }}
        </li>
      </ul>
    </s-alert>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  computed: {
    errorArray() {
      if (Array.isArray(this.data.message)) {
        return this.data.message;
      } else {
        return [this.data.message];
      }
    },
  },
};
</script>
