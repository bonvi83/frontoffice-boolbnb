<script>

// AXIOS
import axios from "axios";
// STORE
// import { api, store } from "../store";

export default {
    data() {
        return {
            // store, 

            coverImage: '',

            images: [],

        };
    },

    methods: {

        // API CALL FOR SERVICES
        getImages() {
            axios.get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.id}`).then((res) => {

                if (res.data.cover_img && res.data.apartment_images ) {
                    this.coverImage = res.data.cover_img;
                    console.log(this.coverImage)
                    
                    this.images = res.data.apartment_images;
                    console.log(this.images)
                } else {
                    // redirect alla pagina 404
                    // this.$router.push({ name: 'not-found' })

                    console.log('not found')
                }

            });
        },

    },

    created() {

        this.getImages()

    },
};
</script>


<template>
    <div>
        <h1>CAROSELLO</h1>
    </div>
</template>

<style lang="scss">

</style>