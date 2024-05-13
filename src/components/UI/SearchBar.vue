<script>
import axios from "axios";
import { store } from "../../store/index";

export default {
  data() {
    return {
      store,
      suggestions: [],
      suggestionVisibility: false,
      apartments: [],
      pagLinks: [],
      totalPage: 0,
      paginationBaseURL: "",

      searchInput: "",

      lat: "",
      lon: "",
      radius: 5,
    };
  },
  components: {},
  props: {},
  methods: {
    fecthAddresses(input) {
      this.suggestionVisibility = true;
      this.suggestions = [];
      axios
        .get(
          `https://api.tomtom.com/search/2/geocode/${input}.json?typeahead=true&limit=3&countrySet=IT&lat=37.337&lon=-121.89&view=Unified&key=${store.apiKey}`
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

    saveCoordinates(lat, lon, address) {
      this.lat = lat;
      store.lat = lat;
      this.lon = lon;
      store.lon = lon;
      this.searchInput = address;
      this.suggestionVisibility = false;
    },

    fetchApartments(latitude, longitude, radius) {
      const radiusMt = radius * 1000;
      store.radiusMt = radiusMt;
      axios
        .get(
          `http://127.0.0.1:8000/api/research/${latitude}&${longitude}&${radiusMt}`
        )
        .then((response) => {
          console.log(response.data);
          this.apartments = response.data.data;
          store.apartments = response.data.data;
          this.pagLinks = response.data.links;
          store.pagLinks = response.data.links;
          this.totalPage = response.data.last_page;
          store.totalPage = response.data.last_page;
          this.paginationBaseURL = response.config.url;
          store.paginationBaseURL = response.config.url;
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
  },
};
</script>

<template>
  <!-- search bar -->
  <div class="search-bar">
    <label for="" class="flex-grow-1">
      <div>Dove</div>
      <input
        type="text"
        class="border-0 w-100 search-app-input pe-2"
        v-model="searchInput"
        @input="fecthAddresses(searchInput)"
        @keyup.enter="fetchApartments(lat, lon, radius)"
        placeholder="Cerca destinazione"
      />
    </label>

    <!-- suggerimenti -->
    <div id="suggestion" v-if="suggestionVisibility">
      <div
        class="suggested-address"
        v-for="suggestion in suggestions"
        @click="
          saveCoordinates(suggestion.lat, suggestion.lon, suggestion.address)
        "
      >
        {{ suggestion.address }}
      </div>
    </div>

    <label for="">
      <div>Raggio di ricerca (km)</div>
      <input
        type="number"
        min="5"
        step="5"
        class="border-0 w-75 search-app-input"
        v-model="radius"
        placeholder="Cerca destinazione"
      />
    </label>

    <button
      class="search-address-btn"
      :disabled="!searchInput"
      @click="fetchApartments(lat, lon, radius)"
    >
      <font-awesome-icon icon="magnifying-glass" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid black;
  border-radius: 20px;
  padding: 0.8rem;
}
.search-address-btn {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;

  border: none;
}

.search-app-input {
  outline: none;
}

#suggestion {
  background-color: white;
  width: 100%;
  box-shadow: 0 15px 15px 0 grey;
  position: absolute;
  top: 110%;
  left: 0;
  z-index: 1;

  .suggested-address {
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;

    cursor: pointer;
  }
}
</style>
