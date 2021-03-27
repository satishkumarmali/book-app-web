<template>
  <div v-if="hydrated" class="layout layout">
    <header class="header flex flex--between flex--fit flex--middle">
      <s-breadcrumbs />
      <div class="pr-2 pl-4">
        <portal-target name="header" slim></portal-target>
      </div>
    </header>
    <aside class="aside">
      <app-aside></app-aside>
    </aside>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>

  <div v-else class="hydrating">
    <div class="p-6 loader loader--xl"></div>
    <template v-if="takingLonger">
      <p>Taking longer than usual...</p>
      <s-button
        to="/logout"
        align="right"
        icon="LoginVariant"
        class="mt--3"
        size="sm"
        color="primary"
        >Logout & Try Again</s-button
      >
    </template>
  </div>
</template>
<script>
import hydrate from "@/api/hydrate";
import { error } from "@/api/helpers";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      takingLonger: false,
      hydrated: true,
    };
  },
  components: {
    AppAside: require("@/components/Aside").default,
  },

  created() {
    if (
      !window.localStorage.getItem(`v2_${process.env.VUE_APP_SERVER}_token`)
    ) {
      this.$router.replace("/login");
      return;
    }
    hydrate()
      .then(([user]) => {
        console.log('user====>', user)
        this.$store.commit("auth/SET_USER", user.data);
        this.hydrated = true;
      })
      .catch((err) => {
        this.$notify({
          title: "Can not load user data!",
          text: "Please refresh to again",
          type: "error",
          duration: -1,
        });
        console.error(error(err));
      });
  },

  mounted() {
    setTimeout(() => {
      this.takingLonger = true;
    }, 5000);
  },
};
</script>

<style lang="scss" scoped>
.layout {
  --aside-size: 192px;
  --header-size: 48px;
  height: 100vh;
  display: grid;
  grid-template-columns: var(--aside-size) auto;
  grid-template-rows: var(--header-size) auto;
  .aside {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    background-color: --color(grey, darkest);
  }
  .header {
    grid-column: 2 / 3;
  }
  .main {
    grid-column: 2 / 3;
    overflow: auto;
    background-color: --color(grey, lighter);
  }
}

.hydrating {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
