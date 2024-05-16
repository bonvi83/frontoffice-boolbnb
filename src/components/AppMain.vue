<script>
import axios from "axios";
import AppMainHero from "./AppMainHero.vue";

export default {
  data() {
    return {
      apartments: [],
      // apartment: null,
      apartmentId: null,

      pagLinks: [],
      totalPage: 0,
      paginationBaseURL: "",
    };
  },

  components: { AppMainHero },

  methods: {
    fetchApartments() {
      axios.get(`http://127.0.0.1:8000/api/apartments`).then((res) => {
        console.log(res);
        this.apartments = res.data.data;
        this.pagLinks = res.data.links;
        this.totalPage = res.data.last_page;
        this.paginationBaseURL = res.config.url;
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

  <section class="container-fluid mb-3">
    <div class="mb-2">
      <div class="mt-5 border-bottom border-primary">
        <h2>Appartamenti in evidenza</h2>
      </div>

      <div class="row g-4 mt-3">
        <div
          v-for="apartment in apartments"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <div class="card h-100">
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
                :to="{ name: 'apartment.show', params: { id: apartment.id } }"
              >
                <button class="btn btn-primary">
                  Vai all'appartamento
                  <i class="fa-solid fa-circle-arrow-right"></i>
                </button>
              </router-link>
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

        <!-- <div class="card">
          <img
            src="../assets/01_Loggia_degli_Osii_in_Piazza_Mercanti,_Milano_-_Foto_Giovanni_Dall'Orto,_3-gen-2007.jpeg"
            class="card-img-top"
            alt="immagine mancante"
          />
          <div class="card-body">
            <h5 class="card-title">Titolo casa</h5>
            <a href="#" class="btn btn-primary">Vedi info</a>
          </div>
        </div>

        <div class="card">
          <img
            src="../assets/01_Loggia_degli_Osii_in_Piazza_Mercanti,_Milano_-_Foto_Giovanni_Dall'Orto,_3-gen-2007.jpeg"
            class="card-img-top"
            alt="immagine mancante"
          />
          <div class="card-body">
            <h5 class="card-title">Titolo casa</h5>
            <a href="#" class="btn btn-primary">Vedi info</a>
          </div>
        </div>

        <div class="card">
          <img
            src="../assets/01_Loggia_degli_Osii_in_Piazza_Mercanti,_Milano_-_Foto_Giovanni_Dall'Orto,_3-gen-2007.jpeg"
            class="card-img-top"
            alt="immagine mancante"
          />
          <div class="card-body">
            <h5 class="card-title">Titolo casa</h5>
            <a href="#" class="btn btn-primary">Vedi info</a>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  img:hover {
    opacity: 0.7;
  }

  .card-body {
    a {
      text-decoration: none;
      color: inherit;
    }

    a:hover {
      opacity: 0.6;
    }
  }

  .card-title {
    font-weight: bold;
  }
}
.image-card {
  height: 280px;
  object-fit: cover;
}
</style>
