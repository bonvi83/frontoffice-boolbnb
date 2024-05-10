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

            images: [],

        };
    },

    computed: {
        apiEndpoint() {
            return api.baseUrl + `apartments/${this.$route.params.id}`;
        },
    },

    methods: {

        // API CALL FOR SERVICES
        fetchImages(endpoint = this.apiEndpoint) {
            axios.get(endpoint).then((res) => {

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

        this.fetchImages()

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