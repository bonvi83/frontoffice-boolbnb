import { createRouter, createWebHistory } from "vue-router";

import AppMain from "./components/AppMain.vue";
import AppSearch from "./components/AppSearch.vue";
import AppShow from "./components/AppShow.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppMain,
    },

    {
      path: "/apartments-search",
      name: "apartments.search",
      component: AppSearch,
    },

    {
      path: "/apartment/:id",
      name: "apartment.show",
      component: AppShow,
    },
  ],
});

export { router };
