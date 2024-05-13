<script>
</script>

<template>
  <footer class="text-white">
    <div class="container-fluid py-4 d-flex justify-content-between">
      <div class="team">
        <p class="h6">&copy; CLASS 117, TEAM 1</p>

        <p style="font-size: 10px" class="fw-lighter"></p>
      </div>

      <div>
        <a href=""
          ><router-link
            :to="{ name: 'home' }"
            class="nav-link active"
            aria-current="page"
            ><img src="../assets/logbnb.png" alt="Logo" height="50"
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
  }

</style>

