<script>

import axios from "axios";
// import { api, store } from "../store";

import AppShowCarousel from "./show-components/AppShowCarousel.vue";
import AppShowMessages from "./show-components/AppShowMessages.vue";
import AppShowServices from "./show-components/AppShowServices.vue";


export default {
    data() {
      return {
        apartmentId: null,
      };
    },

    
    computed: {

    },

    methods: {
      // fetchApartment(apartmentId) {
      // axios.get(`http://127.0.0.1:8000/api/apartments/${apartmentId}`).then((res) => {
      //   this.apartment = res.data;
      //   console.log(this.apartment);
      //   });
      // },

      fetchApartmentId() {
          axios.get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.id}`).then((res) => {
          this.apartmentId = res.data.id;
        });
      }
     
    },

    created() {
      this.fetchApartmentId();
    },

    components: { AppShowCarousel, AppShowMessages, AppShowServices }

};
</script>


<template>
    <div>
        <AppShowCarousel></AppShowCarousel>
    </div>

    <div>
        <AppShowMessages :apartmentId="apartmentId" ></AppShowMessages>
    </div>

    <div>
        <AppShowServices></AppShowServices>
    </div>
</template>

<style lang="scss">

</style>