<template>
  <div class="m-3">
    <s-form>
      <div class="bg-light p-4" v-if="userform">
        <s-row gap="4">
          <s-column size="4">
            <s-field-validate label="First Name" rules="required|alpha_special">
              <s-textbox v-model="userform.name"></s-textbox>
            </s-field-validate>
          </s-column>
          <s-column size="4">
            <s-field label="E-mail">
              <s-field-view>{{ userform.email }}</s-field-view>
            </s-field>
          </s-column>
        </s-row>

      </div>
    </s-form>
  </div>
</template>
<script>
import { error, errorMessage } from "@/api/helpers";
import { getUser } from "@/api/auth";
export default {
  data() {
    return {
      loaderUp: false,
      loaderCp: false,
      userform: null,
      form: {
      },
    };
  },
  created() {
    getUser()
      .then((res) => {
        this.userform = res.data;
        this.loader = false;
      })
      .catch((err) => {
        this.formError = error(err);
        this.loader = false;
      });
  },
  methods: {
  
  },
};
</script>
