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
      <div class="container h-100 d-flex justify-content-center align-items-center text-center">
        <div>
          <div class="rounded-5">
            <h1 class="main-title text-white">BoolBnB</h1>
          </div>

          <div class="my-3 rounded-5">
            <p class="fs-2 text-center text-white sub-title">
              Prenota ora la tua vacanza da sogno in uno dei nostri alloggi
              selezionati
            </p>
          </div>

          <div class=" d-flex justify-content-center align-items-center">
            <div class="search-bar-container">
              <search-bar></search-bar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.search-bar-container {
  max-width: 700px;
  width: 100%;
}

.search-bar {
  background-color: white;
}

.hero {
  height: 55vh;
  background-image: url("../assets/Houses_Villa_Design_Pools_537090_1920x1080.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: start;
  align-items: center;

  .shadow {
    background-color: rgba(0, 0, 0, 0.6);
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

// media query

@media screen and (max-width: 575px) {
  .hero {
    height: 60vh;
  }

  .main-title {
    font-size: 5rem;
  }

  .sub-title {
    font-size: 2rem;
  }
}

@media screen and (min-width: 576px) {
  .main-title {
    font-size: 6rem;
  }

  .sub-title {
    font-size: 3rem;
  }
}

@media screen and (min-width: 768px) {
  .main-title {
    font-size: 8rem;
  }

  .sub-title {
    font-size: 4rem;
  }
}
</style>
