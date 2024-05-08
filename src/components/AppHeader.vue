<script>

export default {
  data() {
    return {};
  },
};
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <a href=""><router-link
                :to="{ name: 'home' }"
                class="nav-link active"
                aria-current="page"
                ><img src="../assets/logbnb.png" alt="Logo" height="50" /></router-link>
        </a>
        <a href="http://127.0.0.1:8000/">login</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              :to="{ name: 'home' }"
              class="nav-link active"
              aria-current="page"
              >home</router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'apartments.view' }"
              class="nav-link active"
              aria-current="page"
              >ricerca</router-link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
    <h1>
        
              
    </h1>

</template>
<style scoped>
    img{
        height: 40px;
    }
</style>