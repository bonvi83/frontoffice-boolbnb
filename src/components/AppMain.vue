<script>
import axios from "axios";
import AppMainHero from "./AppMainHero.vue";

export default {
  data() {
    return {
      apartments: [],
      // apartment: null,
      apartmentId: null,
    };
  },

  components: { AppMainHero },

  methods: {
    fetchApartments() {
      axios.get(`http://127.0.0.1:8000/api/apartments`).then((res) => {
        this.apartments = res.data.data;
        console.log(this.apartments);
      });
    },

    // fetchApartment(apartmentId){
    //   axios.get(`http://127.0.0.1:8000/api/apartments/${apartmentId}`)
    //   .then((res) => {
    //     this.apartment = res.data.data;
    //   })
    //   .catch((err) =>{
    //     console.error(err)
    //   });
    // }
  },

  created() {
    this.fetchApartments();
  },
};
</script>

<template>
  <AppMainHero />

  <section class="container-fluid">
    <div class="mb-2">
      <div class="mt-5 border-bottom border-primary">
        <h2>Appartamenti in evidenza</h2>
      </div>

      <div class="row g-4 mt-3">
        <div
          v-for="apartment in apartments.slice(0, 4)"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <div class="card h-100"
          :class="apartment.sponsorships ? 'sponsorshpis' : ''">
            <router-link
              :to="{ name: 'apartment.show', params: { id: apartment.id } }"
            >
              <img
                :src="apartment.cover_img"
                class="card-img-top image-card"
                alt="immagine-placeholder"
              />
            </router-link>
            <div class="card-body">
              <router-link
                :to="{ name: 'apartment.show', params: { id: apartment.id } }"
              >
                <h5 class="card-title">
                  {{ apartment.name }}
                </h5>
              </router-link>
              <p>{{ apartment.address }}</p>
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
    </div>

    <div class="mb-2">
      <div class="mt-5 border-bottom border-primary">
        <h2>Appartamenti senza sponsorizzazione</h2>
      </div>
      <div class="row g-4 my-3">
        <div
          v-for="apartment in apartments"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <div class="card h-100">
            <!-- <router-link :to="{ name: 'apartment.show' }"> -->
            <img
              :src="apartment.cover_img"
              class="card-img-top image-card"
              alt="immagine mancante"
            />
            <!-- </router-link> -->

            <div class="card-body">
              <h5 class="card-title">
                <a href="#">
                  <!-- <router-link :to="{ name: 'apartment.show' }"> -->
                  {{ apartment.name }}
                  <!-- </router-link> -->
                </a>
              </h5>
              <p>{{ apartment.address }}</p>

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
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  box-shadow: 1px 1px 10px -5px #000000;
  color: rgb(0, 42, 56);
  img:hover {
    opacity: 0.7;
  }

  .card-body {
    a {
      text-decoration: none;
      color: rgb(0, 42, 56) ;
      cursor: pointer;
    }
  }

  .card-title {
    font-weight: bold;
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
}
.image-card {
  height: 280px;
  object-fit: cover;
}
.sponsorshpis{
    border: #f5c909;
    box-shadow: 1px 1px 10px -5px #000000, 1px 1px 10px 1px #f5c909;
  }


</style>
