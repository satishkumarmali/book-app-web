<template>
  <div id="app">
    <router-view />
    <s-notification-container></s-notification-container>
    <s-modal-container></s-modal-container>
    <s-confirm></s-confirm>
  </div>
</template>

<script>
import bus from "@/bus";
export default {
  data() {
    return {
      isPopup: false,
    };
  },
  mounted() {
    bus.$on("network-error", () => {
      this.$notify({
        title: "Network Error!",
        text:
          "Please check your internet connection is working and refresh to try again.",
        type: "danger",
        duration: -1,
      });
    });
  },
};
</script>
