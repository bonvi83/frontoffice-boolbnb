<script>

import axios from "axios";
// import { api, store } from "../store";

import AppShowCarousel from "./show-components/AppShowCarousel.vue";
import AppShowMessages from "./show-components/AppShowMessages.vue";
import AppShowServices from "./show-components/AppShowServices.vue";


export default {
    data() {
        return {
          apartment: null,
        };
    },

    computed: {

    },

    methods: {
      fetchApartment(apartmentId) {
      axios.get(`http://127.0.0.1:8000/api/apartments/${apartmentId}`).then((res) => {
        this.apartment = res.data;
        console.log(this.apartment);
        });
      },
    },

    created() {
      this.fetchApartment(10);
    },

    components: { AppShowCarousel, AppShowMessages, AppShowServices }

};
</script>


<template>
    <div>
        <AppShowCarousel></AppShowCarousel>
    </div>

    <div>
        <AppShowMessages></AppShowMessages>
    </div>

    <div>
        <AppShowServices></AppShowServices>
    </div>
</template>

<style lang="scss">

</style>