<template>
  <div class="m-3">
    <s-form v-if="form">
      <s-row gap="4">
        <s-column size="6">
          <h4 class="mb-1">Book Details:</h4>
          <div class="bg-light p-4 br-10">
            <table class="detail-table">
              <tr>
                <th>Title:</th>
                <td>
                  {{form.title}}
                </td>
              </tr>
              <tr>
                <th>Author:</th>
                <td>
                  {{form.author}}
                </td>
              </tr>
              <tr>
                <th>Image:</th>
                <td>
                  <img :src="form.image"  style="height:50px; width:80px" alt />
                </td>
              </tr>
              <tr>
                <th>Price:</th>
                <td>
                  {{form.price}}
                </td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>
                  {{form.description}}
                </td>
              </tr>
               <tr>
                <th>Rating:</th>
                <td>
                  {{form.rating}}
                </td>
              </tr>
               <tr>
                <th>Category:</th>
                <td>
                  {{form.category ? form.category.name : ''}}
                </td>
              </tr>
            </table>
          </div>
        </s-column>
      </s-row>
    </s-form>
    <div class="loader loader--dark p-6" v-else></div>
  </div>
</template>
<script>
import { get } from "@/api/book";
export default {
  components: {
  },
  props: {
    id: String,
  },
  data() {
    return {
      error: null,
      activateLoader: false,
      isPopup: false,
      isFormPopup: false,
      loader: false,
      form: null,
      activated_at: null,
      currentImage: null,
    };
  },
  created() {
    get(this.id).then((res) => {
        const data = res;
        this.form = data;
    });
  },
  methods: {
  },
};
</script>
