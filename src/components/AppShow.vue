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

      floor: "",
      n_bathroom: "",
      n_bed: "",
      n_room: "",
      square_meters: "",
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
          this.floor = res.data.floor;
          this.n_bathroom = res.data.n_bathroom;
          this.n_bed = res.data.n_bed;
          this.n_room = res.data.n_room;
          this.square_meters = res.data.square_meters;
        });
    },
  },

  created() {
    this.fetchApartmentId();

    window.scrollTo(0, -7);
  },

  components: { AppShowCarousel, AppShowMessages, AppShowServices, AppShowMap },
};
</script>

<template>
  <div class="container">
    <div class="mt-3">
      <button @click="$router.back()" class="btn btn-primary">
        <i class="fa-solid fa-arrow-left"></i>
        <span class="d-none d-sm-inline"> Torna Indietro</span>
      </button>
    </div>

    <div
      class="row text-center justify-content-between align-items-center my-3"
    >
      <div class="col-12 col-md-6 text-md-start">
        <h1>{{ name }}</h1>

        <h4 class="">{{ address }}</h4>
      </div>

      <div class="col-12 col-md-6 text-md-end">
        <AppShowMessages :apartmentId="apartmentId"></AppShowMessages>
      </div>
    </div>
  </div>

  <div>
    <AppShowCarousel></AppShowCarousel>
  </div>

  <div class="container my-4">
    <div class="row g-4">
      <div class="col-8">
        <div class="card h-100" style="max-height: 450px">
          <div class="card-header">Descrizione</div>
          <div class="card-body">
            <!-- nr stanze -->
            <div class="fs-5"><strong>N° Stanze:</strong> {{ n_room }}</div>
            <!-- nr letti -->
            <div class="fs-5"><strong>N° Letti:</strong> {{ n_bed }}</div>
            <!-- nr bagni -->
            <div class="fs-5"><strong>N° Bagni:</strong> {{ n_bathroom }}</div>
            <!-- mt quadrati -->
            <div class="fs-5">
              <strong>Superficie:</strong> {{ square_meters }}mq
            </div>
            <!-- piano -->
            <div class="fs-5"><strong>N° Piano:</strong> {{ floor }}</div>
            <!-- descrizione -->
            <div class="fs-5"><strong>Descrizione:</strong></div>
            <div class="apartment-desc">
              Benvenuti in questo elegante appartamento situato nel cuore
              pulsante di Milano. Situato in una posizione privilegiata, a pochi
              passi dai principali punti di interesse culturale e commerciale
              della città, questo appartamento rappresenta la perfetta fusione
              di comfort moderno e fascino storico. Questo appartamento
              rappresenta una rara opportunità di vivere nel cuore di Milano,
              con tutti i comfort moderni e il fascino della storicità. Perfetto
              per chi cerca un'abitazione di prestigio in una delle città più
              dinamiche e affascinanti d'Italia. Non perdete l'occasione di
              visitare questa splendida proprietà. Per maggiori informazioni o
              per prenotare una visita, non esitate a contattarci.
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card h-100" style="max-height: 450px">
          <div class="card-header">Servizi</div>
          <div class="card-body overflow-auto">
            <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 g-3">
              <AppShowServices></AppShowServices>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-header">Dove alloggerai</div>
          <div class="card-body p-0">
            <AppShowMap></AppShowMap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @media screen and (min-width: 576px) {
//   .address {
//     font-size: larger;
//   }
// }

.apartment-desc {
  height: 150px;
  overflow: auto;
}
</style>
