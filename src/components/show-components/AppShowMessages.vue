<script>
import axios from "axios";

export default {
  data() {
    return {
      userEmail: "",
      userName: "",
      userContent: "",
      validationErrors: {}, // Oggetto per memorizzare gli errori di validazione
      messageSent: false,
    };
  },

  props: {
    apartmentId: Number,
  },

  computed: {
    shouldCloseModal() {
      return this.messageSent;
    },
  },

  watch: {
    //fa riferimento a messageSent in data
    messageSent(newValue) {
      // Chiudo la modale quando messageSent diventa true
      if (newValue) {
        const modal = document.getElementById("messageModal");
        // Rimuovo la classe 'show' dalla modale per nasconderla
        modal.classList.remove("show");
        // Imposto l'attributo 'aria-hidden' a 'true' per nascondere la modale agli screen reader
        modal.setAttribute("aria-hidden", "true");
        // Rimuovo la classe 'modal-open' dal tag body
        document.body.classList.remove("modal-open");
        // Rimuovo il backdrop della modale
        const backdrop = document.querySelector(".modal-backdrop");
        backdrop.remove();
      }
    },
  },

  methods: {
    sendMessages() {
      axios
        .post(`http://127.0.0.1:8000/api/messages`, {
          apartment_id: this.apartmentId,
          customer_email: this.userEmail,
          name: this.userName,
          content: this.userContent,
        })
        .then((res) => {
          if (res.data.success) {
            //Reset del form del messaggio
            this.userEmail = "";
            this.userName = "";
            this.userContent = "";
            //Reset degli errori di validazione
            this.validationErrors = {};
            this.messageSent = true; // Imposto la variabile di controllo a true
            setTimeout(() => {
              this.messageSent = false; // Resetto la variabile di controllo dopo 5s
            }, 35000);
          } else {
            this.validationErrors = res.data.data; // Memorizzo gli errori di validazione
            // console.log(this.validationErrors);
          }
        })
        .catch((error) => {
          console.log("Errore durante la richiesta: ", error);
          // console.log(error.response.data.message);
        });
    },
  },

  created() {},
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div>
          <!-- Bottone Modale -->
          <button
            type="button"
            class="mt-1 btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#messageModal"
          >
            <span class="d-inline-block me-3">Maggiori informazioni</span>
            <i class="fa-solid fa-envelope"></i>
          </button>
          <!-- Messaggio inviato -->
          <span v-if="messageSent" class="ms-4 text-success"
            >Messaggio inviato!</span
          >
        </div>

        <!-- Modale -->
        <div
          class="modal fade"
          id="messageModal"
          tabindex="-1"
          aria-labelledby="messageModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title fs-5" id="messageModalLabel">
                  Manda un messaggio al proprietario
                </h2>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="email" class="col-form-label"
                      >Inserisci la mail</label
                    >
                    <input
                      v-model="userEmail"
                      type="email"
                      class="form-control"
                      id="email"
                    />
                    <span
                      v-if="validationErrors.customer_email"
                      class="text-danger"
                      >{{
                        validationErrors.customer_email.find((error) => true)
                      }}</span
                    >
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label"
                      >Inserisci il tuo nome</label
                    >
                    <input
                      v-model="userName"
                      type="name"
                      class="form-control"
                      id="recipient-name"
                    />
                    <span v-if="validationErrors.name" class="text-danger">{{
                      validationErrors.name.find((error) => true)
                    }}</span>
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label"
                      >Scrivi il messaggio</label
                    >
                    <textarea
                      v-model="userContent"
                      class="form-control"
                      id="message-text"
                      style="height: 200px"
                    ></textarea>
                    <span v-if="validationErrors.content" class="text-danger">{{
                      validationErrors.content.find((error) => true)
                    }}</span>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Chiudi
                </button>
                <!-- <button type="button" @click="sendMessages()"  :data-bs-dismiss="messageSent ? 'modal' : ''" class="btn btn-primary">Invia</button> -->
                <button
                  type="button"
                  @click="sendMessages()"
                  :data-bs-dismiss="shouldCloseModal ? 'modal' : ''"
                  class="btn btn-primary"
                >
                  Invia
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
