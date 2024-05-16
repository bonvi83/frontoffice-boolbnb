<script>
import { store } from "../store";
export default {
  data() {
    return {
      store,
    };
  },

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
};
</script>
<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light">
    <!-- logo -->

    <div class="container-fluid">
      <div>
        <a href="" @click="clearStore()"
          ><router-link
            :to="{ name: 'home' }"
            class="nav-link active"
            @click="clearStore()"
            aria-current="page"
            ><img src="../assets/logbnb.png" alt="Logo" height="50"
          /></router-link>
        </a>
      </div>

      <!-- navigazione -->
      <div class="navbar-wrapper">
        <!-- Div per proteggere l'hamburger, momentaneamente commentato -->

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav align-items-center">
            <li class="nav-item" @click="clearStore()">
              <router-link
                :to="{ name: 'home' }"
                class="nav-link active"
                @click="clearStore()"
                aria-current="page"
                ><img src="../assets/house.svg" alt="Logo" /><span
                  class="d-none d-lg-inline-block"
                >
                  Home
                </span></router-link
              >
            </li>
            <!-- <li class="nav-item align-self-center">
              <router-link
                :to="{ name: 'apartments.search' }"
                class="nav-link active"
                aria-current="page"
                ><img src="../assets/search.svg" alt="Logo" class="me-2" />
                <span class="d-none d-lg-inline-block"> Cerca </span>
              </router-link>
            </li> -->

            <li class="nav-item" @click="clearStore()">
              <a class="nav-link active" href="http://127.0.0.1:8000/">
                <img src="../assets/person.svg" alt="Logo" />
                <span class="d-none d-lg-inline-block">Accedi</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.navbar.fixed-top.navbar-expand-lg.navbar-light {
  height: 100px;
  background-color: rgba($color: white, $alpha: 0.85);
}

img {
  height: 90px;
}
a {
  text-decoration: none;
}
li.nav-item {
  img {
    height: 20px;
    margin-right: 2px;
    padding-bottom: 4px;
  }
}
@media (max-width: 992px) {
  li.nav-item {
    img {
      height: 33px;
    }
  }
}

.navbar-wrapper {
  /* 
        width: 632px;
        display: flex;
        flex-grow: 1;*/
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
