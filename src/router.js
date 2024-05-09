import { createRouter, createWebHistory } from "vue-router";

import AppMain from "./components/AppMain.vue";
import AppAparments from "./components/AppAparments.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppMain,
    },

    {
      path: "/apartments-view",
      name: "apartments.view",
      component: AppApartments,
    },
    
  ],
});

export { router };
