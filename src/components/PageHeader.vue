<template>
  <portal to="header">
    <div class="flex flex--middle h-100">
      <div class="flex__fit">
        <s-button
          v-if="backLink"
          shape="square"
          title="back link"
          :to="backLink"
          icon="ArrowLeft"
          color="primary"
          size="sm"
          class="mr-2"
        ></s-button>
      </div>
      <h4 class="flex__fit m-0">{{ title }}</h4>
      <div class="flex__fit">
        <div v-if="title == 'Individual Provider'">
          <s-button
            v-if="createUrl"
            shape="pill"
            :title="tooltip"
            :to="createUrl"
            icon="Plus"
            color="primary"
            theme="muted"
            size="sm"
            class="ml-2"
            >Create</s-button
          >
        </div>
        <div v-else>
          <s-button
            v-if="createUrl"
            shape="pill"
            :title="tooltip"
            :to="createUrl"
            icon="Plus"
            color="primary"
            theme="muted"
            size="sm"
            class="ml-2"
            >Add</s-button
          >
        </div>
      </div>
      <slot></slot>
    </div>
  </portal>
</template>

<script>
export default {
  props: {
    title: String,
    createUrl: [String, Object],
    tooltip: String,
    backLink: [String, Object],
  },
};
</script>
