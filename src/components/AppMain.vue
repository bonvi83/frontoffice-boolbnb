<script>
import axios from "axios";
import AppMainHero from "./AppMainHero.vue";

export default {
  data() {
    return {
      apartments: [],
      // apartment: null,
    };
  },

  components: { AppMainHero },

  methods: {
    fetchApartments() {
      axios.get(`http://127.0.0.1:8000/api/apartments`).then((res) => {
        this.apartments = res.data;
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
    // this.fetchApartment();
  },
};
</script>

<template>
  <AppMainHero />

  <section class="container">
    <div class="mb-2">
      <div class="mt-5 border-bottom border-primary">
        <h2>Appartamenti in evidenza</h2>
      </div>

      <div class="row g-4 mt-3">
        <div
          v-for="apartment in apartments.slice(0, 4)"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <div class="card">
            <img :src="apartment.cover_img" alt="immagine-placeholder" />
            <div class="card-body">
              <!-- <h5 class="card-title">Titolo casa</h5> -->
              <a href="#">
                <h5 class="card-title">
                  {{ apartment.name }}
                </h5>
              </a>
              <p>{{ apartment.address }}</p>
            </div>
          </div>
        </div>

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
            <a href="#">
              <img
                :src="apartment.cover_img"
                class="card-img-top w-100 h-100"
                alt="immagine mancante"
              />
            </a>
            <div class="card-body">
              <h5 class="card-title">
                <a href="#">
                  {{ apartment.name }}
                </a>
              </h5>
              <p>{{ apartment.address }}</p>
              <!-- <a href="#">Vedi i dettagli
                <i class="fa-solid fa-eye"></i>
              </a> -->
            </div>
          </div>

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
                    <img src="../assets/01_Loggia_degli_Osii_in_Piazza_Mercanti,_Milano_-_Foto_Giovanni_Dall'Orto,_3-gen-2007.jpeg"
                        class="card-img-top" alt="immagine mancante" />
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
</style>
