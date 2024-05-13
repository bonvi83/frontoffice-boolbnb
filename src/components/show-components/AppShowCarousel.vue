<script>
// AXIOS
import axios from "axios";
// STORE
import { api, store } from "../../store";

export default {
  data() {
    return {
      store,
      data: "",
      cover: "",
      coverImage: "",
      images: "",
      imgsUrls: "",
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
    fetchParams(endpoint = this.apiEndpoint) {
      axios.get(endpoint).then((res) => {
        if (res.data.cover_img && res.data.apartment_images) {
          this.data = res.data;

          // COVER IMG URL
          this.cover = res.data.cover_img;
          this.coverImage = res.data.cover_img;

          // IMAGES
          this.images = res.data.apartment_images;

          // IMAGES URLS
          this.imgsUrls = Object.values(this.images).map((obj) => obj.url);
        } else {
          // redirect alla pagina 404
          // this.$router.push({ name: 'not-found' })

          console.log("not found");
        }
      });
    },

    // CHANGE COVER IMG
    changeImg(i) {
      this.coverImage = this.imgsUrls[i];
    },

    backToCover() {
      this.coverImage = this.cover;
    },
  },

  created() {
    // GET IMAGES
    this.fetchParams();
  },
};
</script>

<template>
  <section class="container">
    <div
      class="carousel-container bordered row justify-content-between align-items-center"
    >
      <!-- COVER CONTAINER-->
      <div
        class="col-6 h-100 cover-container bordered d-flex justify-content-center align-items-center"
      >
        <!-- COVER IMG -->
        <div class="card h-100 w-100">
          <img
            :src="coverImage"
            alt=""
            class="img-fluid d-block rounded bordered h-100"
          />

          <div
            v-if="this.coverImage != this.cover"
            class="card-img-overlay d-flex justify-content-center align-items-end"
          >
            <button @click="backToCover()" class="cover-btn btn rounded">
              Back to cover
            </button>
          </div>
        </div>
      </div>

      <!-- THUMBS CONTAINER-->
      <div
        class="col-6 h-100 d-flex justify-content-center align-items-center bordered"
      >
        <div class="row h-100 justify-content-center align-items-center g-1">
          <!-- THUMBS IMGS -->
          <div
            @click="changeImg(index)"
            class="col-4 thumb-container"
            v-for="(imgUrl, index) in imgsUrls"
          >
            <div class="h-100 card">
              <img class="h-100 card-img" :src="imgUrl" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  // .bordered {
  //     border: solid 5px black;
  // }

  .carousel-container {
    height: 490px;

    // .cover-container {

    // }

    .cover-btn {
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .thumb-container {
      height: 160px;

      .active-thumb {
        border: 5px solid cornflowerblue;
      }
    }
  }
}
</style>
