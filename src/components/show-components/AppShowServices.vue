<script>
// AXIOS
import axios from "axios";
// STORE
import { api, store } from "../../store";

export default {
  data() {
    return {
      store,

      services: "",
    };
  },

  computed: {
    apiEndpoint() {
      return api.baseUrl + `apartments/${this.$route.params.slug}`;
    },
  },

  methods: {
    // API CALL FOR SERVICES
    fetchServices(endpoint = this.apiEndpoint) {
      axios.get(endpoint).then((res) => {
        if (res.data.services) {
          this.services = res.data.services;
        } else {
          // redirect alla pagina 404
          // this.$router.push({ name: 'not-found' })
          console.log("not found");
        }
      });
    },
  },

  created() {
    this.fetchServices();
  },
};
</script>

<template>
  <div
    class="col text-center"
    v-for="(service, index) in services"
    :key="index"
  >
    <img :src="service.icon" alt="" class="service-icon" />
    <div class="service-name">
      {{ service.name }}
    </div>
  </div>
</template>

<style lang="scss">
.service-icon {
  width: 50px;
}

.service-name {
  font-size: 12px;
}
</style>
