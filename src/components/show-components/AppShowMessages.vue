<script>
import axios from "axios";

export default {
    data() {
        return {
          messages: null,
        };
    },

    props: {
      apartmentId: Number
    },

    methods: {
      fetchMessages() {
      axios.post(`http://127.0.0.1:8000/api/messages`).then((res) => {
        this.messages = res.data;
        // console.log(this.messages);
        });
      },
    },

    created(){
      this.fetchMessages();
    }
};
</script>


<template>
    <div>
        <h1>MESSAGGI</h1>
        <h1 style="color: green;">{{ apartmentId }}</h1>
        <div class="container">
          <form>
            <div class="mb-3">
              <label for="email" class="form-label">Inserisci la mail</label>
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Inserisci il tuo nome</label>
              <input type="name" class="form-control" id="name" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="text" class="form-label">Scrivi il messaggio</label>
              <textarea class="form-control" id="text" aria-describedby="emailHelp" style="height: 300px;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Invia</button>
          </form>
        </div>
    </div>
</template>

<style lang="scss">

</style>