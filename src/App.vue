<script>
import AppMain from "./components/AppMain.vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  data() {
    return {};
  },
  props: {},
  methods: {},
  components: { AppHeader, AppMain, AppFooter },
};
</script>

<template>
  <div id="app">
    <div class="page-container">
      <AppHeader />
      <div class="container main-container">
        <router-view />
      </div>

      <AppFooter />
    </div>
  </div>
</template>

<style lang="scss">
@use "/src/styles/general.scss" as *;

.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .main-container {
    flex-grow: 1;
  }
}
</style>
