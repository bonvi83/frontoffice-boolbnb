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

  created(){
    this.fetchApartments();
    // this.fetchApartment();
  },
  

};

</script>

<template>


    <AppMainHero />



    <section class="container bg-body-secondary">

        <div class="mb-2">
            <h2>Appartamenti in evidenza</h2>

            <div class="d-flex">
                <div v-for="apartment in apartments.slice(0,4)" class="card">
                    <!-- <img
            src="../assets/01_Loggia_degli_Osii_in_Piazza_Mercanti,_Milano_-_Foto_Giovanni_Dall'Orto,_3-gen-2007.jpeg"
            class="card-img-top"
            alt="immagine mancante"
          /> -->

                    <img :src="apartment.cover_img" alt="immagine-placeholder" />

                    <div class="card-body">
                        <!-- <h5 class="card-title">Titolo casa</h5> -->
                        <h5 class="card-title">
                            {{ apartment.name }}
                        </h5>
                        <a href="#" class="btn btn-primary">Vedi info</a>
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
            <h2>Eventualmente altri bei appartamentini</h2>

            <div class="d-flex">
                <div class="card">
                    <img src="../assets/01_Loggia_degli_Osii_in_Piazza_Mercanti,_Milano_-_Foto_Giovanni_Dall'Orto,_3-gen-2007.jpeg"
                        class="card-img-top" alt="immagine mancante" />
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
                    <img src="../assets/01_Loggia_degli_Osii_in_Piazza_Mercanti,_Milano_-_Foto_Giovanni_Dall'Orto,_3-gen-2007.jpeg"
                        class="card-img-top" alt="immagine mancante" />
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
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

</style>
