<template>
  <div class="m-3">
    <portal to="header">
      <s-button
        color="primary"
        icon="Plus"
        :to="{ name: 'book', params: { id: '+' } }"
        label="Add New"
      />
    </portal>

    <div class="bg-light">
      <sp-list
        :actions="['refresh', 'settings', 'filters' ,'search']"
        ref="bookList"
        endpoint="v1/book"
        :filters.sync="filters"
        :attrs="cols"
      >
        <!-- Filter -->
        <template #filters>
        <s-field label="Category" class="mb-3">
          <s-select
            v-model="filters.category_id"
            placeholder="Select"
            :options="categoryOption"
          />
        </s-field>
        <s-field label="Rating" class="mb-3">
          <s-select
            v-model="filters.rating"
            placeholder="Select"
            :options="ratingOptions"
          />
        </s-field>
        <s-button
          class="w-100"
          size="sm"
          color="primary"
          label="reset"
          @click.native="resetFilter"
        />
      </template>
        <sp-list-table>
          <template v-slot:action="{ item }">
            <s-button
              :to="{ name: 'book', params: { id: item.id } }"
              title="Edit book"
              size="sm"
              icon="SquareEditOutline"
              color="info"
              shape="square"
            ></s-button>
            <s-button 
                :to="{ name: 'book-view', params: { id: item.id } }"
                size="sm"
                title="View book"
                shape="square"
                icon="EyeOutline"
                color="info"
                class="ml-2"
              ></s-button>
            <s-button
              @click.native="deleteBook(item.id)"
              size="sm"
              title="Delete book"
              icon="Delete"
              color="danger"
              shape="square"
              class="ml-1"
            ></s-button>
          </template>
        </sp-list-table>
      </sp-list>
    </div>
  </div>
</template>
<script>
import { deleteBook } from "@/api/book";
export default {
  components: {
  },
  data() {
    return {
      error: null,
      loader: false,
      cols: [
        {
          name: "_index",
          label: "#",
        },
        "title",
        {name: "price", label: "Price", sortable: true},
        {name: "rating", label: "Rating", sortable: true},
        "description",
        { name: "action", fix: true },
      ],
      filters: {
        category_id: null,
        rating: null,
      },
      ratingOptions: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
      ],
      categoryOption: [
        { label: "Fiction", value: "1" },
        { label: "Science", value: "2" },
      ],
    };
  },
  methods: {
    deleteBook(id) {
      this.error = null;
      this.loader = true;
      deleteBook(id)
        .then((res) => {
          this.$notify({
            title: "Delete Successfully",
            message: "Book deleted successfully",
            type: "success",
            text: this.error,
          });
          if (this.$refs.bookList) {
            this.$refs.bookList.refresh();
          }
          this.loader = false;
        })
        .catch((err) => {
          this.error = error(err);
          this.$notify({
            title: "Failed to delete.",
            type: "error",
            text: this.error,
          });
          this.loader = false;
        });
    },
    resetFilter() {
      this.filters = {
        category_id: null,
        rating: null,
      };
    },
  },
};
</script>
