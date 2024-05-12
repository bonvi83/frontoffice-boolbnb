<script>
import axios from "axios";

export default {
    data() {
        return {
          email: '',
          name: '',
          content: '',
        };
    },

    props: {
      apartmentId: Number
    },

    methods: {
      sendMessages() {
      axios.post(`http://127.0.0.1:8000/api/messages`, {
        apartment_id: this.apartmentId,
        customer_email: this.email,
        name: this.name,
        content: this.content,
      }).then((res) => {
          console.log(res.data);
          //reset del form del messaggio
          this.$refs.messageForm.reset();
      }).catch((error) => {
          console.log(error);
        });
      },
    },

    created(){
    }
};
</script>


<template>
    <div>
        <h1>MESSAGGI</h1>
        <div class="container">
          <form ref="messageForm">
            <div class="mb-3">
              <label for="email" class="form-label">Inserisci la mail</label>
              <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Inserisci il tuo nome</label>
              <input v-model="name" type="name" class="form-control" id="name" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="text" class="form-label">Scrivi il messaggio</label>
              <textarea v-model="content" class="form-control" id="text" aria-describedby="emailHelp" style="height: 300px;"></textarea>
            </div>
            <button type="submit" @click.prevent="sendMessages()" class="btn btn-primary">Invia</button>
          </form>
        </div>
    </div>
    
</template>

<style lang="scss">

</style>