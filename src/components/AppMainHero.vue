<script>
import axios from "axios";
import { store } from "../store/index";
import SearchBar from "./UI/SearchBar.vue";

export default {
  data() {
    return {
      store,
    };
  },
  components: { SearchBar },

  methods: {
    clearStore() {
      store.lat = "";
      store.lon = "";
      store.radiusMt = "";
      store.radius = "";

      store.searchInput = "";

      store.suggestions = [];
      store.suggestionVisibility = false;
      store.apartments = [];
      store.pagLinks = [];
      store.totalPage = 0;
      store.paginationBaseURL = "";
    },
  },

  created() {
    this.clearStore();
  },
};
</script>

<template>
  <section class="hero">

    <div class="shadow h-100 w-100">
      <div class="container h-100">

        <div class="row justify-content-center align-items-center flex-column h-100">

          <div class="col-12 text-center rounded-5">
            <h1 class="main-title text-white">
              BoolBnB
            </h1>
          </div>

          <div class="col-10 my-3 rounded-5">
            <p class="fs-2 text-center text-white">
              Prenota ora
              la tua vacanza da
              sogno
              in uno dei nostri
              alloggi
              selezionati
            </p>
          </div>

          <div class="col-8">
            <div>
              <search-bar></search-bar>
            </div>
          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
.search-bar {
  background-color: white;
}

.hero {
  height: 50vh;

  background-image: url("../assets/Houses_Villa_Design_Pools_537090_1920x1080.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: start;
  align-items: center;

  .shadow {
    background-color: rgba(0, 0, 0, 0.6);

    .main-title{
      font-size: 8rem;
    }
  }

  .wrapper {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .hero-card {
    
    .big-text {
      font-size: calc(2vw + 2vh);
    }
  }
}
</style>
