<template>
  <div>
    <item-form
      class="m-2 p-4 bg-light"
      :fields="fields"
      :item="id"
      :get="get"
      :save="save"
      on-create-message="Book added successfully."
      on-update-message="Book updated successfully."
      on-error-message="Failed to update Book."
      :redirect-to="{ name: 'books' }"
      breadcrumb="first_name"
    >
      <template #default="{form,setField}">
        <div class="grid grid--3 g-4">
          <s-field-validate label="title" rules="required">
            <s-textbox
              :value="form.title"
              @input="setField('title', capitalize($event))"
            />
          </s-field-validate>
          <s-field-validate label="author" rules="required">
            <s-textbox
              :value="form.author"
              @input="setField('author', capitalize($event))"
            />
          </s-field-validate>
          <s-field-validate label="price" rules="required">
            <s-textbox v-model="form.price" rules="required" />
          </s-field-validate>

          <s-field-validate label="description" rules="required|alpha_special">
            <s-textbox v-model="form.description" rules="required" />
          </s-field-validate>
          <s-field-validate label="category" rules="required">
            <s-textbox v-model="form.category_id" rules="required" />
          </s-field-validate>
        </div>
      </template>
    </item-form>
  </div>
</template>
<script>
import { create, update, get } from "@/api/book";
export default {
  props: {
    id: String,
  },
  components: {
    ItemForm: require("@/components/ItemForm").default,
  },
  data() {
    return {
      fields: [
        "title",
        "author",
        "price",
        "description",
        "category_id"
      ],
    };
  },
  methods: {
    get(id) {
      return get(id);
    },
    save(id, data) {
      if (id) {
        data.role_id = 1;
        return update(id, data);
      } else {
        data.role_id = 1;
        return create(data);
      }
    },
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
