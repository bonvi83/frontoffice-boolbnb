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
    <div
      class="container h-100 w-100 d-flex justify-content-start align-items-center"
    >
      <div class="wrapper row h-100 w-100 justify-content-between">
        <div
          class="col-4 h-80 hero-card p-5 rounded-5 d-flex justify-content-center align-items-center"
        >
          <div class="fs-1 text-white slogan">
            <span class="big-text">Prenota ora</span>

            <br />

            <span
              >la tua vacanza da
              <span class="big-text">sogno</span>
            </span>

            <br />

            <span> in uno dei nostri </span>

            <br />

            <span>alloggi </span>

            <br />

            <span class="big-text">selezionati</span>
          </div>
        </div>
        <div class="col-6">
          <search-bar></search-bar>
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
  height: 60vh;

  background-image: url("../assets/Houses_Villa_Design_Pools_537090_1920x1080.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: start;
  align-items: center;

  .wrapper {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .hero-card {
    height: 80%;
    background-color: rgba(0, 0, 0, 0.6);

    .slogan {
      width: 100%;
      line-height: 3.5rem;
    }

    span {
      font-size: calc(1vw + 1vh);
    }

    .big-text {
      font-size: calc(2vw + 2vh);
    }
  }
}
</style>
