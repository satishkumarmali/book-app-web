<template>
  <section class="login bg-grey-darkest">
    <div class="login__wrap">
      <div class="login__logo mb-6">
        <img src="" height="50px" alt />
      </div>
      <div class="shadow-6 login__box bg-light p-5 radius-4">
        <h5 class="mb-4">Enter your new password.</h5>
        <div>
          <s-form-validate v-slot="{ invalid }" :error-message="error">
            <s-field-validate name="varificationCode" label="Varification Code" rules="required">
              <s-textbox v-model="form.forgot_pwd_code" placeholder="Enter Varification Code"></s-textbox>
            </s-field-validate>
            <s-field-validate
              name="newPassword"
              label="New Password"
              rules="required|strong_password"
              :password-toggle="true"
              class="mt-3"
            >
              <s-textbox type="password" v-model="form.new_password" placeholder="New Password"></s-textbox>
            </s-field-validate>
            <s-field-validate
              name="confirmPassword"
              label="Confirm Password"
              rules="required|strong_password"
              class="mt-3"
              :password-toggle="true"
            >
              <s-textbox
                type="password"
                v-model="form.confirm_password"
                placeholder="Confirm Password"
              >></s-textbox>
            </s-field-validate>
            <s-button
              size="lg"
              :loader="loader"
              @click.native="reset()"
              icon="LoginVariant"
              color="primary"
              align="right"
              fluid
              type="submit"
              class="mt-4"
              :disabled="invalid"
            >
              <strong>Submit</strong>
            </s-button>
          </s-form-validate>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { reset } from "@/api/auth";
import { error } from "@/api/helpers";
import { setToken } from "@/plugins/axios";

export default {
  data() {
    return {
      loader: false,
      error: null,
      form: {
        new_password: null,
        confirm_password: null,
        forgot_pwd_code: null,
      },
    };
  },
  methods: {
    reset() {
      this.error = null;
      this.loader = true;
      const data = this.form;
      if (this.form.new_password == this.form.confirm_password) {
        reset(data)
          .then((res) => {
            this.$notify({
              title: "Change password successfully.",
              type: "success",
              text: this.errorMessage,
            });
            this.loader = false;
            this.$router.replace("/login");
          })
          .catch((err) => {
            this.error = error(err);
            this.errorMessage = errorMessage(err);
            this.$notify({
              title: this.error,
              type: "error",
              text: this.errorMessage,
              duration: 10000,
            });
            this.loader = false;
          });
      } else {
        this.$notify({
          title: "New password and Confirm password not match.",
          type: "error",
          duration: 10000,
        });
        this.loader = false;
      }
    },
  },
};
</script>
