<script >
import axios from "axios";
// STORE
import { api, store } from "../../store";

export default {
    data() {
        return {
            lat,
            lon,
        };
    },

    computed: {
        // COMPUTED ROUTE
        apiEndpoint() {
            return api.baseUrl + `apartments/${this.$route.params.id}`;
        },
    },
    created () {
        fetchLatLon() ;
    },

    methods:{
        fetchLatLon(endpoint = this.apiEndpoint){
            axios.get(endpoint).then((res) => {
                this.lat = res.data.lat;
                this.lon= res.data.lon;

            });
    },
    },
}

</script>


<template>
    <div>
        {{lan}}
    </div>
</template>



<style lang="scss" scoped>

</style>