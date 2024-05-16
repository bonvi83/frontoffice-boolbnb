<script>
import axios from "axios";
import { store } from "../store/index";
import VueHorizontal from "vue-horizontal";
import SearchBar from "./UI/SearchBar.vue";

export default {
  data() {
    return {
      store,

      n_room: null,
      n_bathroom: null,
      n_bed: null,
      squere_meters: null,
      floor: null,
      radius: store.radius ? store.radius : 5,

      services: [],
      selectedServices: [],
    };
  },
  components: { VueHorizontal, SearchBar },
  created() {
    this.fetchServices();
  },

  methods: {
	toggleCheckbox(id) {
		const index = this.selectedServices.indexOf(id);
		if (index === -1) {
		this.selectedServices.push(id); // Aggiungi l'ID se non è già presente
		} else {
		this.selectedServices.splice(index, 1); // Rimuovi l'ID se è già presente
		}
	},
    removeFilter(filter) {
      this[filter] = null;
	  // Chiamo dopo update dei servizi
      this.fetchFilteredApartments();
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
      store.radiusMt = this.radius * 1000;
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
          `http://127.0.0.1:8000/api/research/${store.lat}&${store.lon}&${store.radiusMt}/${this.n_room}/${this.n_bathroom}/${this.n_bed}/${this.squere_meters}/${this.floor}/${servicesUrl}`
        )
        .then((response) => {
          console.log(response.data.data);
          store.apartments = response.data.data; // Salva gli appartamenti filtrati nel data del componente
          store.pagLinks = response.data.links;
          store.totalPage = response.data.last_page;
          store.paginationBaseURL = response.config.url;
		  //salvo i filtri 

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
          store.apartments = response.data.data;
          store.pagLinks = response.data.links;
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    resetFilters() {
      this.n_room = null;
      this.n_bathroom = null;
      this.n_bed = null;
      this.n_square_meters = null;
      this.floor = null;
	  this.radius = store.radius ? store.radius : 5; 
	  this.selectedServices = [];
    },
  },
};
</script>

<template>
  <div class="mt-3 container-fluid">
    <div class="row justify-content-center">
      <div class="col-6">
        <search-bar class="search-cotumized"></search-bar>
      </div>
    </div>
  </div>
  <!-- Button trigger modal -->
  <div class="d-flex justify-content-between align-items-center px-3 trigger-modal ">
    <div class="d-flex">
      <div class="servis-container me-3 d-none d-sm-block">
        <div class="p-3">
          <vue-horizontal responsive :button="true" class="horizontal">
            <section
              v-for="service in services"
              :key="service.id"
              class="text-center mx-2"
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
    <div class="m-3">
      <button
        type="button"
        class="btn text-badg-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Filtri
      </button>
    </div>
  </div>
  <!-- Selected Filter -->
  <div class="container d-flex justify-content-center align-items-center">
	<h5 class="mb-0 me-2 selected-filter-title" 
		v-if="n_room || n_bathroom || n_bed || squere_meters || floor"
		>Filtri Selezionati:
	</h5>
	<div>
		<div class="badge rounded-pill text-badg-1 emx-1" v-if="n_room">
			Camere: {{ n_room }}
			<span @click="removeFilter('n_room')" class="ms-2 text-danger" style="cursor: pointer;">&times;</span>
		</div>
		<div class="badge rounded-pill text-badg-1 mx-1" v-if="n_bathroom">
			Bagni: {{ n_bathroom }}
			<span @click="removeFilter('n_bathroom')" class="ms-2 text-danger" style="cursor: pointer;">&times;</span>
		</div>
		<div class="badge rounded-pill text-badg-1 mx-1" v-if="n_bed">
			Posti Letto: {{ n_bed }}
			<span @click="removeFilter('n_bed')" class="ms-2 text-danger" style="cursor: pointer;">&times;</span>
		</div>
		<div class="badge rounded-pill text-badg-1 mx-1" v-if="squere_meters">
			Superficie: {{ squere_meters }}
			<span @click="removeFilter('squere_meters')" class="ms-2 text-danger" style="cursor: pointer;">&times;</span>
		</div>
		<div class="badge rounded-pill text-badg-1 mx-1" v-if="floor">
			Piano: {{ floor }}
			<span @click="removeFilter('floor')" class="ms-2 text-danger" style="cursor: pointer;">&times;</span>
		</div>
	</div>
		
</div>

  <!-- Apartment -->
  <div class="m-sm-2 m-md-3 m-lg-4 m-xl-5 pb-3">
    <div class="row g-sm-2 g-md-3 g-lg-4 mb-5">
      <div
        v-for="apartment in store.apartments"
        class="col-sm-12 col-md-6 col-lg-3 my-4"
      >
        <div class="card h-100 apartment-card"
        :class="apartment.sponsorships ? 'sponsorshpis' : ''">
            <router-link
              :to="{ name: 'apartment.show', params: { id: apartment.id } }"
            >
            <img
            :src="apartment.cover_img || 'https://placehold.co/600x400'"
            class="card-img-top image-card"
            alt="..."
          />
            </router-link>
          
         
          <div class="card-body">
            <h5 class="card-title">{{ apartment.name }}</h5>
            <p class="card-text">
              {{ apartment.address }}
            </p>
            <router-link
                :to="{ name: 'apartment.show', params: { id: apartment.id } }">
                <button class="btn text-badg-1">
                  Vai all'appartamento
                  <i class="fa-solid fa-circle-arrow-right"></i>
                </button>
              </router-link>
          </div>
        </div>
      </div>
    </div>
    <!--  paginazione -->
    <nav v-if="store.totalPage > 1" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-for="link in store.pagLinks">
          <a
            class="page-link"
            :class="{
              active: link.active,
              disabled: !link.url,
            }"
            v-html="link.label"
            href="javascript:void(0)"
            @click="paginationNav(store.paginationBaseURL + link.url)"
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
					<div class="input-group d-flex gap-3 align-items-center justify-content-around">
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
							min="5"
							step="5"
							/>
						</div>
					</div>

				<!-- filtri servizi -->
					<div class="d-flex flex-wrap my-3 justify-content-center">
						<section
							v-for="service in services"
							:key="service.id"
							class="model-services-box  text-center mx-3"
						>
							<div class="servis-icon" @click="toggleCheckbox(service.id)">
							<input
								class="form-check-input mt-auto mb-auto d-none"
								type="checkbox"
								:value="service.id"
								:id="'service-' + service.id"
								v-model="selectedServices"
							/>
							<img
								:src="service.icon"
								alt=""
								style="width: 50px"
								:class="{
								'opacity-100': selectedServices.includes(service.id),
								'opacity-25': !selectedServices.includes(service.id),
								}"
							/>
							</div>
							<div
							class="text-service-name"
							:class="{
								'text-success': selectedServices.includes(service.id),
							}"
							>
							{{ service.name.toUpperCase() }}
							</div>
						</section>
					</div>
				</div>

				<div class="modal-footer">
				<button type="button" class="btn btn-warning" @click="resetFilters">
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
.servis-container {
  width: 90vw;
  .text-service-name {
    font-size: 12px;
  }
}
.map {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.image-card {
  height: 280px;
  object-fit: cover;
}
.servis-icon img.opacity-25 {
  opacity: 0.25;
  transition: opacity 0.3s;
}

.servis-icon img.opacity-100 {
  opacity: 1;
  transition: opacity 0.3s;
}
.text-service-name{
	font-size: 8px;
}
.model-services-box{
	width: 80px;
}
.text-badg-1{
	color: rgb(228, 211, 211);
	background-color: rgb(0, 42, 56);
	opacity: 0.7;
	cursor: pointer;
	&:hover{
		opacity: 1;

	}
}
.selected-filter-title{
	color: rgb(0, 42, 56);
}
.apartment-card{
    box-shadow: 1px 1px 15px -5px #000000;
    color: rgb(0, 42, 56);;
}
.trigger-modal{
    margin-top: 30px;
    border-bottom: 1px solid rgb(237, 237, 237);
    border-top: 1px solid rgb(237, 237, 237);
    box-shadow: 1px 1px 9px -6px #000000;
}
.search-cotumized{
    border: 1px solid rgb(36, 36, 36,0.3);
    box-shadow: 0px 7px 9px -7px rgba(0,0,0,0.3);
}
.sponsorshpis{
    border: #f5c909;
    box-shadow: 1px 1px 10px -5px #000000, 1px 1px 10px 1px #f5c909;
  }
</style>
