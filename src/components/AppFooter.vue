<script></script>

<template>
  <footer class="text-white">
    <div
      class="container-fluid py-4 d-flex justify-content-between align-items-center ps-4"
    >
      <div class="team">
        <p class="h6">&copy; CLASS 117, TEAM 1</p>
        <!-- <p style="font-size: 10px" class="fw-lighter"></p> -->
      </div>

      <div class="icon-footer">
        <ul class="d-flex align-items-center ps-0">
          <li>
            <a href="https://www.facebook.com/"
              ><i class="fa-brands fa-facebook fa-xl" style="color: #ffffff"></i
            ></a>
          </li>
          <li>
            <a href="https://www.instagram.com"
              ><i
                class="fa-brands fa-instagram fa-xl"
                style="color: #ffffff"
              ></i
            ></a>
          </li>
          <li>
            <a href="https://www.youtube.com"
              ><i class="fa-brands fa-youtube fa-xl" style="color: #ffffff"></i
            ></a>
          </li>
        </ul>
      </div>

      <div class="pe-2">
        <a href=""
          ><router-link
            :to="{ name: 'home' }"
            class="nav-link active"
            aria-current="page"
            ><img src="../assets/logbnb.png" alt="Logo" height="55"
          /></router-link>
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: rgb(0, 27, 54);
}

.container {
  align-items: baseline;
  display: flex;
}

ul {
  list-style-type: none;
}

li {
  list-style: none;
  padding: 6px;
}
</style>
