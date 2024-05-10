<script>
export default {
  data() {
    return {};
  },

  computed: {},

  method: {
    fetchApartment(apartmentId) {
      axios.get('http://127.0.0.1:8000/api/apartments/${id_appartmentId}').then((res)) => {
        this.apartment = res.data;
        console.log(this.apartment);
      };
    },
  },
};
</script>

<template>
  <div>
    <h1>SERVIZI</h1>
    <div>card con tutte le iconcine dei servizi</div>
  </div>
</template>

<style lang="scss"></style>
