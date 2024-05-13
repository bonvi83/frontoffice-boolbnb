<script>
import axios from "axios";
import { store } from "../store/index";
import VueHorizontal from "vue-horizontal";

export default {
  data() {
    return {
      store,
      searchInput: "",
      apiKey: "cXFRhnBAXKnWWIK6455uRtxFdwAGvyV2",

      lat: "",
      lon: "",
      radius: 5,

      n_room: null,
      n_bathroom: null,
      n_bed: null,
      squere_meters: null,
      floor: null,

      suggestions: [],
      suggestionVisibility: false,
      apartments: [],
      pagLinks: [],
      totalPage: 0,
      paginationBaseURL: "",
      services: [],
      selectedServices: [],
    };
  },
  components: { VueHorizontal },

  /* computed: {
    filterApartments() {
      return filterApartments = [... this.apartments];
    },
  }, */

  created() {
    this.fetchServices();
  },

  methods: {
      fecthAddresses(input) {
        this.suggestionVisibility = true;
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

      saveCoordinates(lat, lon, address) {
        this.lat = lat;
        this.lon = lon;
        this.searchInput = address;
        this.suggestionVisibility = false;
      },

      fetchApartments(latitude, longitude, radius) {
        const radiusMt = radius * 1000;
        axios
          .get(
            `http://127.0.0.1:8000/api/research/${latitude}&${longitude}&${radiusMt}`
          )
          .then((response) => {
            console.log(response.data);
            this.apartments = response.data.data;
            this.pagLinks = response.data.links;
            this.totalPage = response.data.last_page;
            this.paginationBaseURL = response.config.url;
          })
          .catch((e) => {
            console.log(e.message);
          });
      },

      fetchServices() {
        axios
          .get(`http://127.0.0.1:8000/api/services`)
          .then((response) => {
            this.services = response.data;
          })
          .catch((e) => {
            console.log(e.message);
          });
      },

      setFilterServices(id) {
        const index = this.selectedServices.indexOf(id);
        if (index === -1) {
          this.selectedServices.push(id); // Aggiungi l'ID se non è già presente
        } else {
          this.selectedServices.splice(index, 1); // Rimuovi l'ID se è già presente
        }

        // Chiamo dopo update dei servizi
        this.fetchFilteredApartments();
      },

      fetchFilteredApartments() {
        const radiusMt = this.radius * 1000;
        let servicesUrl =
          this.selectedServices.length == 0
            ? null
            : this.selectedServices.join(",");

        if (this.n_room == "") this.n_room = null;
        if (this.n_bathroom == "") this.n_bathroom = null;
        if (this.n_bed == "") this.n_bed = null;
        if (this.squere_meters == "") this.squere_meters = null;
        if (this.floor == "") this.floor = null;

        axios
          .get(
            `http://127.0.0.1:8000/api/research/${this.lat}&${this.lon}&${radiusMt}/${this.n_room}/${this.n_bathroom}/${this.n_bed}/${this.squere_meters}/${this.floor}/${servicesUrl}`
          )
          .then((response) => {
            console.log(response.data.data);
            this.apartments = response.data.data; // Salva gli appartamenti filtrati nel data del componente
            this.pagLinks = response.data.links;
            this.totalPage = response.data.last_page;
            this.paginationBaseURL = response.config.url;
          })
          .catch((error) => {
            console.error("Error fetching filtered apartments:", error);
          });
      },

      paginationNav(url) {
        axios
          .get(url)
          .then((response) => {
            console.log(response.config.url);
            console.log(response.data);
            console.log(response.data.links);
            this.apartments = response.data.data;
            this.pagLinks = response.data.links;
          })
          .catch((e) => {
            console.log(e.message);
          });
      },
      resetFilters(){
      this.n_room = null;
      this.n_bathroom = null;
      this.n_ded = null;
      this.n_square_meters = null;
      this.floor = null;
      },
  },
 
};
</script>

<template>
  <div class="mt-3 container-fluid">
    <div class="row justify-content-center">
      <div class="col-6">
        <!-- search bar -->
        <div class="search-bar">
          <label for="" class="flex-grow-1">
            <div>Dove</div>
            <input
              type="text"
              class="border-0 w-100 search-app-input pe-2"
              v-model="searchInput"
              @input="fecthAddresses(searchInput)"
              @keyup.enter="fetchApartments(lat, lon, radius)"
              placeholder="Cerca destinazione"
            />
          </label>

          <!-- suggerimenti -->
          <div id="suggestion" v-if="suggestionVisibility">
            <div
              class="suggested-address"
              v-for="suggestion in suggestions"
              @click="
                saveCoordinates(
                  suggestion.lat,
                  suggestion.lon,
                  suggestion.address
                )
              "
            >
              {{ suggestion.address }}
            </div>
          </div>

          <label for="">
            <div>Raggio di ricerca (km)</div>
            <input
              type="number"
              min="5"
              step="5"
              class="border-0 w-75 search-app-input"
              v-model="radius"
              placeholder="Cerca destinazione"
            />
          </label>

          <button
            class="search-address-btn"
            :disabled="!searchInput"
            @click="fetchApartments(lat, lon, radius)"
          >
            <font-awesome-icon icon="magnifying-glass" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- hr -->
  <hr />

  <!-- Button trigger modal -->
  <div class="d-flex justify-content-between align-items-center px-3">
    <div class="d-flex">
      <div class="servis-container">
        <div class="p-3">
          <vue-horizontal responsive :button="true" class="horizontal">
            <section
              v-for="service in services"
              :key="service.id"
              class="text-center mx-3"
            >
              <div class="servis-icon" @click="setFilterServices(service.id)">
                <img
                  :src="service.icon"
                  alt=""
                  style="width: 45px"
                  class="opacity-25"
                  :class="{
                    'opacity-100 w': selectedServices.includes(service.id),
                  }"
                />
              </div>
              <div
                class="text-service-name"
                :class="{
                  'text-success fs-6': selectedServices.includes(service.id),
                }"
              >
                {{ service.name.toUpperCase() }}
              </div>
            </section>
          </vue-horizontal>
        </div>
      </div>
    </div>

    <!-- button dei filtri della modalle-->
    <div class="">
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Filtri
      </button>
    </div>
  </div>
  <hr />

  <!-- Apartment -->
  <div class="m-sm-2 m-md-3 m-lg-4 m-xl-5 pb-3">
    <div class="row g-sm-2 g-md-3 g-lg-4 mb-5">
      <div
        v-for="apartment in apartments"
        class="col-sm-12 col-md-6 col-lg-3 my-4"
      >
        <div class="card">
          <img
            :src="apartment.cover_img || 'https://placehold.co/600x400'"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ apartment.name }}</h5>
            <p class="card-text">
              {{ apartment.address }}
            </p>
            <div class="d-flex my-3">
              <div v-for="service in apartment.services" class="me-1">
                <img :src="service.icon" alt="" style="width: 30px" />
              </div>
            </div>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
    <!--  paginazione -->
    <nav v-if="totalPage > 1" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-for="link in pagLinks">
          <a
            class="page-link"
            :class="{
              active: link.active,
              disabled: !link.url,
            }"
            v-html="link.label"
            href="javascript:void(0)"
            @click="paginationNav(paginationBaseURL + link.url)"
          ></a>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Modal -->
  <div
    class="modal fade modal-lg"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Ricerca Avanzata
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- filtri appartamenti -->
          <div
            class="input-group d-flex gap-3 align-items-center justify-content-around"
          >
            <!-- numero stanze -->
            <div>
              <p class="m-0">Numero Stanze</p>
              <input
                type="number"
                class="form-control"
                placeholder="N° Stanze"
                v-model.number="n_room"
                aria-describedby="addon-wrapping"
                min="0"
              />
            </div>

            <!-- numero bagno -->
            <div>
              <p class="m-0">Numero Bagni</p>
              <input
                type="number"
                class="form-control"
                placeholder="N° Bagni"
                v-model.number="n_bathroom"
                aria-describedby="addon-wrapping"
                min="0"
              />
            </div>
            <!-- m2 -->
            <div>
              <p class="m-0">Metri Quadri</p>
              <input
                type="number"
                class="form-control"
                placeholder="Metri Quadri"
                v-model.number="squere_meters"
                aria-describedby="addon-wrapping"
                min="20"
                step="5"
              />
            </div>

            <!--n bed -->
            <div>
              <p class="m-0">Letti</p>
              <input
                type="number"
                class="form-control"
                placeholder="Letti"
                v-model.number="n_bed"
                aria-describedby="addon-wrapping"
                min="0"
              />
            </div>
            <!--n floor -->
            <div>
              <p class="m-0">Piano</p>
              <input
                type="number"
                class="form-control"
                placeholder="Piano"
                v-model.number="floor"
                aria-describedby="addon-wrapping"
                min="0"
              />
            </div>
            <!--radius -->
            <div>
              <p class="m-0">Raggio di Ricerca</p>
              <input
                type="number"
                class="form-control"
                placeholder="Raggio di Ricerca"
                v-model.number="radius"
                aria-describedby="addon-wrapping"
                min="0"
              />
            </div>
          </div>

          <!-- filtri servizi -->
          <div class="d-flex flex-wrap my-3">
            <div
              v-for="service in services"
              class="d-flex justify-content-center align-content-center"
            >
              <input
                class="form-check-input mt-auto mb-auto"
                type="checkbox"
                :value="service.id"
                :id="'service-' + service.id"
                v-model="selectedServices"
              />
              <img :src="service.icon" alt="" style="width: 50px" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-warning"
            @click="resetFilters">
            Reset
          </button>
          <button
            class="btn btn-primary"
            @click="fetchFilteredApartments()"
            data-bs-dismiss="modal"
          >
            Cerca
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid black;
  border-radius: 20px;
  padding: 0.8rem;
}
.search-address-btn {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;

  border: none;
}

.search-app-input {
  outline: none;
}

#suggestion {
  background-color: white;
  width: 100%;
  box-shadow: 0 15px 15px 0 grey;
  position: absolute;
  top: 110%;
  left: 0;
  z-index: 1;

  .suggested-address {
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;

    cursor: pointer;
  }
}

.servis-container {
  width: 90vw;
  .text-service-name {
    font-size: 12px;
  }
}
</style>
