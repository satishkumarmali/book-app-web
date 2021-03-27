<template>
  <div class="item-form" :style="{ width: width }">
    <!-- GETTING -->
    <item-form-shimmer v-if="getting && !custom" />

    <!-- GET ERROR -->
    <s-alert
      v-else-if="id && getItemFaild"
      class="g-1"
      title="Oops!"
      color="danger"
      theme="muted"
      fluid
    >
      There was an error while processing your request. Please refresh & try
      again.
    </s-alert>

    <!-- RENDER YOUR THING -->
    <slot v-else-if="custom" :data="data" :getting="getting"></slot>

    <!-- RENDER FORM -->
    <s-form-validate
      v-else
      ref="form"
      @submit.prevent="$emit('submit')"
      #default="scope"
    >
      <header>
        <item-form-error class="mb-3" v-if="errors" :data="errors" />
        <s-alert
          color="warning"
          theme="muted"
          icon="vmdi-alert"
          class="gy-1 gx-2 mb-3"
          v-if="customError"
          title="Invalid Data."
          fluid
        >
          <p>{{ customError }}</p>
        </s-alert>
      </header>

      <div class="field-group g-4">
        <slot
          v-if="form"
          :data="data"
          :form="form"
          :saveItem="saveItem"
          :setField="setField"
          :saving="saving"
          :creating="id ? false : true"
          :validate="scope"
        />
      </div>

      <footer v-if="footer" class="flex flex--nowrap mt-4">
        <s-button
          v-if="save"
          class="flex__fit"
          color="primary"
          :label="id ? updateLabel : createLabel"
          @click.native="saveItem"
          :loader="saving"
          :disabled="disableSaveOnInvalid && scope.invalid"
        />
        <s-button
          v-if="!id"
          class="flex__fit ml-2"
          color="grey"
          theme="muted"
          @click.native="reset"
          label="Reset"
        />

        <template v-else>
          <s-button
            v-if="archive"
            class="flex__fit ml-auto"
            color="warning"
            theme="muted"
            :icon="data.archivedAt ? 'ArchiveArrowUp' : 'ArchiveArrowDown'"
            v-tooltip="data.archivedAt ? 'Unarchive Item' : 'Archive Item'"
            shape="square"
            @click.native="archiveItem"
            :loader="archiving"
          />
          <s-button
            v-if="del"
            class="flex__fit"
            :class="archive ? 'ml-2' : 'ml-auto'"
            color="danger"
            theme="muted"
            icon="vmdi-delete"
            shape="square"
            @click.native="deleteItem"
            :loader="deleting"
            v-tooltip="'Delete Item'"
          />
        </template>
      </footer>
    </s-form-validate>
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es";

export default {
  props: {
    custom: {
      type: Boolean,
      default: false,
    },
    item: [Number, String, Boolean],
    fields: {
      type: Array,
      default: () => [],
    },
    width: String,
    breadcrumb: [Boolean, String],
    breadcrumbRoute: String,
    get: Function,
    save: Function,
    del: Function,
    archive: Function,
    redirect: {
      type: Boolean,
      default: true,
    },
    redirectTo: {
      type: [Function, Object, String],
    },
    footer: {
      type: Boolean,
      default: true,
    },
    defaultData: Object,
    createLabel: {
      type: String,
      default: "Create",
    },
    updateLabel: {
      type: String,
      default: "Update",
    },
    formState: null,
    customValidation: {
      type: Function,
    },
    onCreateMessage: String,
    onUpdateMessage: String,
    onErrorMessage: String,
    disableSaveOnInvalid: {
      type: Boolean,
    },
  },
  data() {
    return {
      getting: false,
      saving: false,
      deleting: false,
      archiving: false,
      form: null,
      data: null,
      getItemFaild: false,
      saveItemFaild: false,
      errors: null,
      customError: null,
    };
  },

  components: {
    ItemFormShimmer: require("@/components/ItemFormShimmer").default,
    ItemFormError: require("@/components/ItemFormError").default,
  },

  watch: {
    form: {
      deep: true,
      handler(newValue) {
        this.$emit("update:formState", newValue);
      },
    },
  },

  computed: {
    fieldsSet() {
      return this.fields.map((field) => {
        if (typeof field !== "object") {
          return {
            name: field,
            value: undefined,
          };
        }
        return field;
      });
    },
    id() {
      if (this.item && this.item == "+") return null;
      return this.item;
    },
  },
  created() {
    if (this.defaultData) {
      this.setForm(cloneDeep(this.defaultData));
    } else if (this.id) {
      this.getItem();
    } else {
      this.setForm();
      this.updateBreadcrumb("Add New");
    }
  },

  methods: {
    async validate() {
      return await this.$refs.form.validate();
    },

    reset() {
      this.errors = null;
      this.customError = null;
      this.setForm();
    },

    setField(key, value) {
      this.$set(this.form, key, value);
      if (this.data) {
        this.$set(this.data, key, value);
      }
    },

    setError(err) {
      this.errors = err;
    },

    setFields(fields) {
      for (var key in fields) {
        this.$set(this.form, key, fields[key]);
        if (this.data) {
          this.$set(this.data, key, fields[key]);
        }
      }
    },

    setForm(res) {
      this.data = res;
      if (!this.form) this.$set(this, "form", {});
      this.fieldsSet.forEach((field) => {
        if (res && res.hasOwnProperty(field.name)) {
          this.$set(this.form, field.name, res[field.name]);
        } else {
          this.$set(this.form, field.name, field.value);
        }
      });
    },

    /**
     * Function handle redirection when CRUD operation is done.
     * @param {String} action 'create','update','delete','archive'
     * @param {Object} res Response of CRUD action.
     */
    doRedirect(action, res) {
      if (!this.redirect) return;
      if (this.redirectTo) {
        if (typeof this.redirectTo == "function") {
          this.redirectTo(action, res);
        } else if (typeof this.redirectTo == "string") {
          this.$router.push({ name: this.redirectTo });
        } else {
          this.$router.push(this.redirectTo);
        }
      } else {
        const breadcrumbs = this.$route.meta?.breadcrumbs;
        if (breadcrumbs) {
          const toRedirect = breadcrumbs[breadcrumbs.length - 2];
          if (toRedirect) this.$router.push({ name: toRedirect });
        }
      }
    },

    async getItem() {
      this.getItemFaild = false;
      this.getting = true;
      try {
        const res = await this.get(this.id);
        this.getting = false;
        this.setForm(res);
        this.$nextTick(() => {
          this.$emit("get", res);
        });
        this.updateBreadcrumb();
      } catch (err) {
        console.error(err);
        this.getting = false;
        this.getItemFaild = true;
      }
    },

    updateBreadcrumb(label) {
      if (!this.breadcrumb) return;
      this.$root.$emit(
        "shilp-breadcrumbs-label",
        this.breadcrumbRoute || this.$route.name,
        label || this.data[this.breadcrumb]
      );
    },

    async saveItem() {
      // In some cases, we need to manually validate the data
      // This function handles the manual validation before validating the form with vee-validate.
      if (this.customValidation) {
        const { isValid, message } = this.customValidation(
          this.form,
          this.data
        );
        if (!isValid) {
          this.customError = message;
          return;
        }
      }
      const isValid = await this.$refs.form.validate();
      if (!isValid) {
        this.$shilp.notify({
          title: "Invalid Data!",
          message:
            "You've provided invalid data in the form. Please verify & try again.",
          type: "warning",
        });
        return;
      }
      this.customError = null;
      this.errors = null;
      this.saving = true;
      this.saveItemFaild = false;
      try {
        const res = await this.save(this.id, this.form);
        this.success();
        if (!this.id) this.setForm();
        this.doRedirect(this.id ? "update" : "create", res);
      } catch (err) {
        this.saveItemFaild = true;
        this.error(err);
      }
      this.saving = false;
    },

    async archiveItem() {
      const isArchived = this.data.archivedAt;
      let msg;
      if (isArchived) {
        msg = "Are you sure you want to unarchive item?";
      } else {
        msg = "Are you sure you want to archive?";
      }
      const isConfirm = confirm(msg);

      if (!isConfirm) return;
      this.archiving = true;
      try {
        const action = isArchived ? "unarchive" : "archive";
        const res = await this.archive(this.id, action);
        this.success();
        this.doRedirect("archive", res);
      } catch (err) {
        this.error(err);
      }
      this.archiving = false;
    },

    async deleteItem() {
      const isConfirm = confirm("Are you sure you want to delete?");
      if (!isConfirm) return;

      this.deleting = true;
      try {
        const res = await this.del(this.id, "delete");
        this.success(true);
        this.doRedirect("delete", res);
      } catch (err) {
        this.error(err);
      }
      this.deleting = false;
    },

    success() {
      this.$shilp.notify({
        title: "Success",
        type: "success",
        message: this.id ? this.onUpdateMessage : this.onCreateMessage,
        duration: 4000,
      });
    },

    error(error) {
      this.errors = error.data;
      this.$shilp.notify({
        title: "An error occured.",
        message: this.onErrorMessage,
        type: "danger",
        duration: 4000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  z-index: 9;
}
</style>
