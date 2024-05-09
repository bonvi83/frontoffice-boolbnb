<script>
import axios from "axios";

export default {
  data() {
    return {
      searchInput: "",
      apiKey: "cXFRhnBAXKnWWIK6455uRtxFdwAGvyV2",

      lat: "",
      lon: "",
      radius: 0,

      suggestions: [],
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

    salavCoordinate(lat, lon) {
      this.lat = lat;
      this.lon = lon;
    },

    fetchApartments(latitude, longitude, radius) {
      axios
        .get(
          `http://127.0.0.1:8000/api/research/${latitude}&${longitude}&${radius}`
        )
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>

<template>
  <h1>ricerca</h1>

  <input
    type="text"
    v-model="searchInput"
    @input="fecthAddresses(searchInput)"
  />

  <ul v-if="suggestions">
    <li
      v-for="suggestion in suggestions"
      @click="salavCoordinate(suggestion.lat, suggestion.lon)"
    >
      {{ suggestion.address }}
    </li>
  </ul>

  <h2>Lat: {{ lat }}</h2>
  <h2>Lon: {{ lon }}</h2>

  <button @click="fetchApartments(lat, lon, radius)">invia</button>
</template>

<style lang="scss" scoped></style>
