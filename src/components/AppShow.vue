<script>

import AppShowCarousel from "./show-components/AppShowCarousel.vue";
import AppShowMessages from "./show-components/AppShowMessages.vue";
import AppShowServices from "./show-components/AppShowServices.vue";


export default {
    data() {
        return {};
    },


    components: { AppShowCarousel, AppShowMessages, AppShowServices }

};
</script>


<template>
    <div>
        <AppShowCarousel></AppShowCarousel>
    </div>

    <div>
        <AppShowMessages></AppShowMessages>
    </div>

    <div>
        <AppShowServices></AppShowServices>
    </div>
</template>

<style lang="scss">

</style>
