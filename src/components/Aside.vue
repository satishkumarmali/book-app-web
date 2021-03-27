<template>
  <div class="aside">
    <div class="aside__logo">
      <img src="@/assets/book.png" height="25px" width="150x" />
    </div>
    <router-link to="/me" class="aside__profile">
      <div class="aside__icon">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="#b0bec5"
            d="M6,17C6,15 10,13.9 12,13.9C14,13.9 18,15 18,17V18H6M15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6A3,3 0 0,1 15,9M3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5C3.89,3 3,3.9 3,5Z"
          />
        </svg>
      </div>
      <div class="aside__name">
        <p>
          {{
            $store.state.auth.user.name
          }}
        </p>
      </div>
    </router-link>
    <s-nav class="aside__nav" shape="rectangle" align="left" fluid stack>
      <template>
        <s-nav-item icon="AccountCircle" :to="{ name: 'books' }">
          Book
        </s-nav-item>
      </template>
      <s-nav-item
        icon="LoginVariant"
        @click.native="$shilp.modal.open('logout-modal')"
        >Logout</s-nav-item
      >
    </s-nav>
    <Logout :isOpen.sync="isPopup"></Logout>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isPopup: false,
    };
  },
  components: {
    Logout: require("@/components/Logout").default,
  },
  methods: {
    openPopup() {
      this.isPopup = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.aside__logo {
  height: 48px;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  img {
    height: 34px;
  }
}
.aside__profile {
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-top: 1px;
  background: rgb(27, 35, 39);
  .aside__icon {
    color: --color(grey, light);
  }
  .aside__name {
    margin-left: 10px;
  }
  p {
    margin: 0px;
    text-transform: capitalize;
    color: --color(grey, light);
    & + p {
      margin-top: 5px;
      font-size: 12px;
    }
  }
}
.aside__nav {
  ::v-deep .button {
    color: --color(grey, light);
    border-radius: 0;
    &:hover {
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.1);
      .button__icon {
        color: #ffffff;
      }
    }
    &__icon {
      color: --color(grey);
    }
    &.button--active {
      background-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      .button__icon {
        color: #ffffff;
      }
    }
  }
}
</style>
