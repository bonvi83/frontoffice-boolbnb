<script>
import AppMain from "./components/AppMain.vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { store } from "./store";

export default {
  data() {
    return { store };
  },

  methods: {},

  props: {},

  components: { AppHeader, AppMain, AppFooter },
};
</script>

<template>
  <div id="app">
    <div class="page-container">
      <AppHeader />

      <div class="main-container">
        <router-view />

        <AppFooter />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "/src/styles/general.scss" as *;

.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  // .AppHeader {
  //   position: fixed;
  // }

  .main-container {
    padding-top: 100px;
    height: 100vh;
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
