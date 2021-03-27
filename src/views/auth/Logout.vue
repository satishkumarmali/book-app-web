<template>
  <div></div>
</template>
<script>
import { resetStore } from "@/store/";
export default {
  beforeCreate() {
    window.localStorage.removeItem(`v2_${process.env.VUE_APP_SERVER}_token`);
    resetStore();
    setTimeout(() => {
      this.$router.replace("/login");
    }, 500);
  }
};
</script>