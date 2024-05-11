<script>
// AXIOS
import axios from "axios";
// STORE
import { api, store } from "../../store";

export default {
    data() {
        return {
            store,
            coverImage: '',
            images: '',
        };
    },

    computed: {
        // COMPUTED ROUTE
        apiEndpoint() {
            return api.baseUrl + `apartments/${this.$route.params.id}`;
        },
    },

    methods: {

        // API CALL FOR IMAGES
        fetchImages(endpoint = this.apiEndpoint) {
            axios.get(endpoint).then((res) => {

                if (res.data.cover_img && res.data.apartment_images) {
                    // COVER IMG
                    this.coverImage = res.data.cover_img;
                    console.log(this.coverImage)
                    // IMAGES
                    this.images = res.data.apartment_images;
                    console.log(this.images)
                } else {
                    // redirect alla pagina 404
                    // this.$router.push({ name: 'not-found' })

                    console.log('not found')
                }

            });
        },

        backToCover () {

        },

        

    },

    created() {
        // GET IMAGES
        this.fetchImages()

    },
};
</script>


<template>
    <section class="container">

        <h1>CAROSELLO</h1>

        <div class="carousel-container row my-5">

            <!-- COVER CONTAINER-->
            <div class="col-6 bordered d-flex justify-content-center align-items-center">
                <!-- COVER IMG -->
                <div class="card bordered">
                    <img :src="coverImage" alt="" class=" card-img rounded bordered">

                    <div class="card-img-overlay d-flex justify-content-center align-items-end">
                        <button class="">Cover</button>
                    </div>
                </div>


            </div>

            <!-- THUMBS CONTAINER-->
            <div class="col-6 d-flex justify-content-center align-items-center bordered">

                <div class="row justify-content-center align-items-center g-1">
                    <!-- THUMBS IMGS -->
                    <div class="col-4 thumb-container " v-for="image in images">
                        <div class="h-100 card">
                            <img class="h-100 card-img active-thumb" :src="image.url" alt="">
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </section>
</template>

<style lang="scss" scoped>
section {

    .bordered {
        border: solid 5px black;
    }

    .carousel-container {
        height: 60vh;

        .thumb-container {
            height: 120px;

            .active-thumb {
                border: 5px solid cornflowerblue;
            }
        }
    }

}
</style>