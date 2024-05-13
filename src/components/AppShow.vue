<script>
import axios from "axios";

// import { api, store } from "../store";

import AppShowCarousel from "./show-components/AppShowCarousel.vue";
import AppShowMessages from "./show-components/AppShowMessages.vue";
import AppShowServices from "./show-components/AppShowServices.vue";
import AppShowMap from "./show-components/AppShowMap.vue";

export default {
  data() {
    return {
      apartmentId: null,
      name: "",
      address: "",
    };
  },

  methods: {
    fetchApartmentId() {
      axios
        .get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.id}`)
        .then((res) => {
          console.log(res);
          this.apartmentId = res.data.id;
          this.name = res.data.name;
          this.address = res.data.address;
        });
    },
  },

  created() {
    this.fetchApartmentId();
  },

  components: { AppShowCarousel, AppShowMessages, AppShowServices, AppShowMap },
};
</script>

<template>
  <div class="container d-flex justify-content-between align-items-center">
    <div class="my-3">
      <h1>{{ name }}</h1>
      <h2>{{ address }}</h2>
    </div>

    <div>
      <AppShowMessages :apartmentId="apartmentId"></AppShowMessages>
    </div>
  </div>

  <div>
    <AppShowCarousel></AppShowCarousel>
  </div>

  <div class="container my-4">
    <div class="row g-4">
      <div class="col-8">
        <div class="card h-100">
          <div class="card-header">Descrizione</div>
          <div class="card-body"></div>
        </div>
      </div>
      <div class="col-4">
        <div class="card h-100">
          <div class="card-header">Servizi</div>
          <div class="card-body">
            <div class="row row-cols-4 g-3">
              <AppShowServices></AppShowServices>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-header">Dove alloggerai</div>
          <div class="card-body p-0"><AppShowMap></AppShowMap></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
