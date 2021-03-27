<template>
  <div class="m-3">
    <page-header title="Edit Book" backLink="/book"></page-header>
    <div v-if="form" :class="{ 'loader overlay overlay--light': !form }">
      <admin-form :edit="form"></admin-form>
    </div>
  </div>
</template>

<script>
import { get } from "@/api/user";
export default {
  props: {
    id: String
  },
  data() {
    return {
      form: null
    };
  },
  created() {
    get(this.id).then(res => {
      const data = res.data;
      this.form = data;
    });
  },
  components: {
    AdminForm: require("./Form").default
  }
};
</script>
