<script>

// AXIOS
import axios from "axios";
// STORE
import { api, store } from "../../store";


export default {
  data() {
    return {

      store,

      services: '',

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

        if (res.data.services) {
          this.services = res.data.services;
          console.log(this.services);
        } else {
          // redirect alla pagina 404
          // this.$router.push({ name: 'not-found' })
          console.log('not found')
        }
        
      });
    },

  },

  created() {
    this.fetchServices()
  }
};

</script>

<template>

  <h1>SERVIZI</h1>
  <div>card con tutte le iconcine dei servizi</div>

  <div v-for="(service, index) in services" :key="index">

    <div>
      {{ service.name }}
    </div>

    <img :src="service.icon" alt="">

  </div>

</template>

<style lang="scss"></style>
