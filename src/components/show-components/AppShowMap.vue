<script>
import axios from "axios";
import { api } from "../../store";
import tt from "@tomtom-international/web-sdk-maps";

export default {
  data() {
    return {
      lat: "",
      lon: "",

      map: null,
    };
  },

  computed: {
    apiEndpoint() {
      return api.baseUrl + `apartments/${this.$route.params.id}`;
    },
  },

  methods: {
    // API CALL FOR SERVICES
    fetchServices(endpoint = this.apiEndpoint) {
      axios.get(endpoint).then((res) => {
        if (res.data.lat && res.data.lon) {
          this.lat = parseFloat(res.data.lat);
          this.lon = parseFloat(res.data.lon);

          this.initializeMap();
        } else {
          // redirect alla pagina 404
          // this.$router.push({ name: 'not-found' })
          console.log("not found");
        }
      });
    },

    initializeMap() {
      console.log(this.lat);
      const map = tt.map({
        key: "cXFRhnBAXKnWWIK6455uRtxFdwAGvyV2",

        container: "map",
        center: [this.lon, this.lat],
        zoom: 15,
      });

      new tt.Marker().setLngLat([this.lon, this.lat]).addTo(map);
    },
  },

  created() {
    this.fetchServices();
  },
};
</script>

<template>
  <div id="map" class="map"></div>
</template>

<style lang="scss" scoped>
.map {
  height: 500px;
  width: 100%;
}
</style>
