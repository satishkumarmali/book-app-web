<template>
  <s-modal size="xs" overlay="dark" id="logout-modal">
    <modal title="Logout">
      <h3 class="text-center">
        Are you sure,
        <br />you want logout?
      </h3>
      <div class="popup__footer mt-4">
        <s-button color="primary" @click.native="logout()">YES</s-button>
        <s-button color="primary" @click.native="close()">NO</s-button>
      </div>
    </modal>
  </s-modal>
</template>
<script>
export default {
  props: ["isOpen"],
  components: {
    Modal: require("@/components/Modal").default,
  },
  methods: {
    close() {
      this.$shilp.modal.close("logout-modal");
    },
    logout() {
      this.$router.replace("/logout");
      this.$shilp.modal.close("logout-modal");
    },
  },
};
</script>
