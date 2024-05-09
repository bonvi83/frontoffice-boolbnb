<script>
import axios from "axios";

export default {
  data() {
    return {
      searchInput: "",
      apiKey: "cXFRhnBAXKnWWIK6455uRtxFdwAGvyV2",

      lat: "",
      lon: "",
      radius: 500,

      suggestions: [],
      apartments: [],
      pagLinks: [],
      paginationBaseURL: "",
    };
  },
  components: {},
  props: {},
  methods: {
    fecthAddresses(input) {
      this.suggestions = [];
      axios
        .get(
          `https://api.tomtom.com/search/2/geocode/${input}.json?typeahead=true&limit=3&countrySet=IT&lat=37.337&lon=-121.89&view=Unified&key=${this.apiKey}`
        )
        .then((response) => {
          const results = response.data.results;

          results.forEach((result) => {
            const suggestion = {
              address: result.address.freeformAddress,
              lat: result.position.lat,
              lon: result.position.lon,
            };
            this.suggestions.push(suggestion);
          });
        });
    },

    saveCoordinates(lat, lon) {
      this.lat = lat;
      this.lon = lon;
    },

    fetchApartments(latitude, longitude, radius) {
      axios
        .get(
          `http://127.0.0.1:8000/api/research/${latitude}&${longitude}&${radius}`
        )
        .then((response) => {
          console.log(response.config.url);
          console.log(response.data);
          console.log(response.data.links);
          this.apartments = response.data.data;
          this.pagLinks = response.data.links;
          this.paginationBaseURL = response.config.url;
        })
        .catch((e) => {
          console.log(e.message);
        });
    },

    paginationNav(url) {
      axios
        .get(url)
        .then((response) => {
          console.log(response.config.url);
          console.log(response.data);
          console.log(response.data.links);
          this.apartments = response.data.data;
          this.pagLinks = response.data.links;
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
  },
};
</script>

<template>
  <div class="container mt-3">
    <!-- search bar -->
    <div class="d-flex w-100 align-items-center">
      <label for="" class="flex-grow-1">
        <div>Dove</div>
        <input
          type="text"
          class="border-0 w-50 search-app-input"
          v-model="searchInput"
          @input="fecthAddresses(searchInput)"
          @keyup.enter="fetchApartments(lat, lon, radius)"
          placeholder="Cerca destinazione"
        />
      </label>

      <label for="" class="flex-grow-1">
        <div>Raggio di ricerca (mt)</div>
        <input
          type="number"
          min="500"
          step="500"
          class="border-0 w-50 search-app-input"
          v-model="radius"
          placeholder="Cerca destinazione"
        />
      </label>

      <button
        class="search-address"
        :disabled="!searchInput"
        @click="fetchApartments(lat, lon, radius)"
      >
        invia
      </button>
    </div>
    <!-- suggerimenti -->
    <ul v-if="suggestions">
      <li
        v-for="suggestion in suggestions"
        @click="saveCoordinates(suggestion.lat, suggestion.lon)"
      >
        {{ suggestion.address }}
      </li>
    </ul>
  </div>
  <!-- hr -->
  <hr />

  <!-- Apartment -->
  <div class="container pb-3">
    <div class="row g-3 mb-3">
      <div v-for="apartment in apartments" class="col-3">
        <div class="card">
          <img :src="apartment.cover_img" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ apartment.name }}</h5>
            <p class="card-text">
              {{ apartment.address }}
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
    <!-- paginazione -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-for="link in pagLinks">
          <a
            class="page-link"
            :class="{
              active: link.active,
              disabled: !link.url,
            }"
            v-html="link.label"
            href="javascript:void(0)"
            @click="paginationNav(paginationBaseURL + link.url)"
          ></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.search-address {
  width: 100px;
}

.search-app-input {
  outline: none;
}
</style>
