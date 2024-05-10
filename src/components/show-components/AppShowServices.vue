<script>
import axios from "axios";


export default {
  data() {
    return {

      services: null,

    };
  },

  computed: {

  },

  methods: {
    getServices() {
      axios.get(`http://127.0.0.1:8000/api/services`).then((result) => {
        this.services = result.data;
        // console.log(this.services);
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