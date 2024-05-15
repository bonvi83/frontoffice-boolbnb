<script></script>

<template>
  <footer class="text-white d-flex justify-content-between align-items-center">
    <div
      class="container-fluid w-100 d-flex justify-content-between align-items-center"
    >
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-none d-sm-block">
          <router-link
            :to="{ name: 'home' }"
            class="nav-link active"
            aria-current="page"
          >
            <img src="../assets/logbnb.png" alt="Logo" class="logo" />
          </router-link>
        </div>

        <div class="h-100 px-0 px-sm-2">
          BoolBnB &copy;, Group 1 S.r.l <br />
          Made with &hearts; by Group 1
        </div>
        <!-- <p style="font-size: 10px" class="fw-lighter"></p> -->
      </div>

      <div>
        <div class="d-none d-sm-block">Seguici sui nostri social:</div>

        <div class="d-flex justify-content-center align-items-center">
          <div>
            <a href="https://www.facebook.com/">
              <i class="fa-brands fa-facebook fa-xl" style="color: #ffffff"></i>
            </a>
          </div>

          <div class="px-3">
            <a href="https://www.instagram.com">
              <i
                class="fa-brands fa-instagram fa-xl"
                style="color: #ffffff"
              ></i>
            </a>
          </div>

          <div class=" pe-3">
            <a href="https://www.youtube.com">
              <i class="fa-brands fa-youtube fa-xl" style="color: #ffffff"></i>
            </a>
          </div>

          <div>
            <a href="https://www.github.com">
              <i class="fa-brands fa-github fa-xl" style="color: #ffffff"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  min-height: 100px;
  background-color: rgb(0, 42, 56);
}

// .container {
//   align-items: baseline;
//   display: flex;
// }

.logo {
  height: 70px;
}

ul {
  list-style-type: none;
}

li {
  list-style: none;
  padding: 6px;
}

@media screen and (max-width: 576px) {
  .logo {
    height: 60px;
  }
}
</style>
