<script>
import axios from "axios";
import VueHorizontal from 'vue-horizontal';


export default {
  data() {
    return {
      searchInput: "",
      apiKey: "cXFRhnBAXKnWWIK6455uRtxFdwAGvyV2",

      lat: "",
      lon: "",
      radius: 5,

      suggestions: [],
      suggestionVisibility: false,
      apartments: [],
      pagLinks: [],
      totalPage: 0,
      paginationBaseURL: "",
      services:[],  
    };

  },
  components: {VueHorizontal},
  created () {
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
          console.log(response.config.url);
          console.log(response.data);
          console.log(response.data.links);
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
        .get(
          `http://127.0.0.1:8000/api/services`
        )
        .then((response) => {
            this.services = response.data;
            console.log(this.services);
          
        })
        .catch((e) => {
          console.log(e.message);
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
  },
};
</script>

<template>
  <div class="container mt-3">
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
        <!-- <button class="m-2 btn btn-primary"><i class="fa-solid fa-arrow-left"></i></button> -->
        <div class="servis-container">
            <div class="">
                <vue-horizontal responsive>
                    <section v-for="servis in services" :key="servis.id">
                      <h4>{{ servis.name  }}</h4>
                      <div class="servis-icon"><img :src="servis.icon" alt="" style="width: 30px;"></div> 
                    </section>
                </vue-horizontal>
            </div>
        </div>
        <!-- <button class="m-2 btn btn-primary"><i class="fa-solid fa-arrow-right"></i></button> -->
   </div>

<!-- button -->
    <div class="">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Filtri
        </button>
    </div>

</div>
<hr />
  <!-- Apartment -->
  <div class="container pb-3">
    <div class="row g-3 mb-3">
      <div v-for="apartment in apartments" class="col-3">
        <div class="card">
          <img :src="apartment.cover_img" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ apartment.name }}</h5>
            <p class="card-text">
              {{ apartment.address }}
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
    <!-- paginazione -->
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
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
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

.servis-container{
    width: 90vw;
}
</style>
