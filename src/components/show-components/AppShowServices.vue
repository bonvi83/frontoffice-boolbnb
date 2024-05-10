<script>

// AXIOS
import axios from "axios";
// STORE
// import { api, store } from "../store";


export default {
  data() {
    return {

      services: '',

    };
  },

  computed: {

  },

  methods: {

    // API CALL FOR SERVICES
    getServices() {
      axios.get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.id}`).then((res) => {

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
    this.getServices()
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
