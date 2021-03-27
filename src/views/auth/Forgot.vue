<template>
  <section class="login bg-grey-darkest">
    <div class="login__wrap">
      <div class="login__logo mb-6">
        <img src="" height="50px" alt />
      </div>
      <div class="shadow-6 login__box bg-light p-5 radius-4">
        <h5 class="mb-2">
          Enter your email address and we will send you varification code to
          reset your password.
        </h5>
        <s-form-validate v-slot="{ invalid }" :error-message="error">
          <s-field-validate name="E-mail" rules="required|email" before-icon="Email">
            <s-textbox v-model="form.email" placeholder="E-mail"></s-textbox>
          </s-field-validate>
          <s-button
            size="lg"
            class="mt-4"
            :loader="loader"
            @click.native="forgotPassword()"
            icon="LoginVariant"
            color="primary"
            align="right"
            fluid
            type="submit"
            :disabled="invalid"
          >
            <strong>Send</strong>
          </s-button>
        </s-form-validate>
      </div>
    </div>
  </section>
</template>
<script>
import { forgotPassword } from "@/api/auth";
import { error } from "@/api/helpers";
import { setToken } from "@/plugins/axios";

export default {
  data() {
    return {
      loader: false,
      error: null,
      form: {
        email: null,
      },
    };
  },
  methods: {
    forgotPassword() {
      this.error = null;
      this.loader = true;
      forgotPassword(this.form)
        .then((res) => {
          this.$notify({
            title:
              "Your request for forgot password send to your registered email",
            type: "success",
            text: this.errorMessage,
          });
          this.loader = false;
          this.$router.replace("/reset");
        })
        .catch((err) => {
          this.error = error(err);
          this.loader = false;
        });
    },
  },
};
</script>
