<template>
  <section class="login bg-grey-darkest">
    <div class="login__wrap">
      <div class="login__logo mb-6">
        <img src="" height="50px" alt />
      </div>

      <div class="shadow-6 login__box p-5 bg-light radius-4">
        <p
          class="alert mb-md alert--fluid alert--danger alert--muted"
          v-if="this.error"
        >
          {{ this.error }}
        </p>

        <s-form-validate
          @submit="login()"
          v-slot="{ invalid }"
          :error-message="error"
          class="field-group g-3"
        >
          <s-field-validate
            name="E-mail"
            rules="required|email"
            before-icon="Email"
          >
            <s-textbox v-model="form.email" placeholder="E-mail"></s-textbox>
          </s-field-validate>
          <s-field-validate name="Password" rules="required" before-icon="Lock">
            <s-textbox
              v-model="form.password"
              type="password"
              placeholder="Password"
            ></s-textbox>
          </s-field-validate>
          <s-button
            size="lg"
            :loader="loader"
            @click.native="login()"
            icon="LoginVariant"
            color="primary"
            align="right"
            fluid
            type="submit"
            :disabled="invalid"
          >
            <strong>LOGIN</strong>
          </s-button>
        </s-form-validate>
        <router-link to="/forgot" class="forgot-link"
          >Forgot Password?</router-link
        >
      </div>
    </div>
  </section>
</template>
<script>
import { login } from "@/api/auth";
import { error } from "@/api/helpers";
import { setToken } from "@/plugins/axios";

export default {
  data() {
    return {
      loader: false,
      error: null,
      form: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      this.error = null;
      this.loader = true;
      login(this.form)
        .then((res) => {
          setToken(res.data.token);
          this.loader = false;
          if (res.data) {
            this.$router.replace("/books");
          }
        })
        .catch((err) => {
          this.error = error(err);
          this.loader = false;
        });
    },
  },
};
</script>
<style lang="scss">
.login__logo {
  text-align: center;
}

.login .alert--danger.alert--muted {
  color: #69031a;
  padding: 10px 15px;
  margin-bottom: 20px !important;
  display: block;
  font-size: 16px;
  margin-top: -20px;
}
.forgot-link {
  margin-top: 20px;
  text-decoration: underline;
  font-size: 14px;
  color: #999;
  display: inline-block;
  text-decoration: none;
}
</style>
