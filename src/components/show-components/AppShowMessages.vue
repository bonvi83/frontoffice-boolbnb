<script>
import axios from "axios";

export default {
    data() {
        return {
          userEmail: '',
          userName: '',
          userContent: '',
        };
    },


    props: {
      apartmentId: Number
    },

    methods: {
      sendMessages() {
      axios.post(`http://127.0.0.1:8000/api/messages`, {
        apartment_id: this.apartmentId,
        customer_email: this.userEmail,
        name: this.userName,
        content: this.userContent,
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
              <input v-model="userEmail" type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Inserisci il tuo nome</label>
              <input v-model="userName" type="name" class="form-control" id="name" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="text" class="form-label">Scrivi il messaggio</label>
              <textarea v-model="userContent" class="form-control" id="text" aria-describedby="emailHelp" style="height: 300px;"></textarea>
            </div>
            <button type="submit" @click.prevent="sendMessages()" class="btn btn-primary">Invia</button>
          </form>

          <!-- <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#messageModal">
            <i class="fa-solid fa-envelope"></i>
          </button>

          <div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="messageModalLabel">Manda un messaggio al proprietario</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label for="recipient-mail" class="col-form-label">Inserisci la mail</label>
                      <input v-model="userEmail" type="email" class="form-control" id="recipient-mail">
                    </div>
                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">Inserisci il tuo nome</label>
                      <input v-model="userName" type="name" class="form-control" id="recipient-name">
                    </div>
                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">Scrivi il messaggio</label>
                      <textarea v-model="userContent" class="form-control" id="message-text" style="height: 200px;"></textarea>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                  <button type="button" @click="sendMessages()" class="btn btn-primary">Invia</button>
                </div>
              </div>
            </div>
          </div> -->


          
        </div>
    </div>
  </template>

<style lang="scss">

</style>