<script>

export default {
  data() {
    return {};
  },
};
</script>
<template>
    
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
         <!-- logo -->
    
        <div class="container">
           
                <div>
                    <a href=""><router-link
                    :to="{ name: 'home' }"
                    class="nav-link active"
                    aria-current="page"
                    ><img src="../assets/logbnb.png" alt="Logo" height="50" /></router-link>
                </a>
                </div>
            
            <!-- navigazione -->
            <div>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">

                        <ul class="navbar-nav align-items-center">
                            
                            <li class="nav-item">
                                <router-link
                                :to="{ name: 'home' }"
                                class="nav-link active"
                                aria-current="page"
                                ><img src="../assets/house.svg" alt="Logo"/><span class="d-none d-lg-inline-block">
                                    Home
                                </span></router-link>
                            </li>
                            <li class="nav-item align-self-center">
                                <router-link
                                :to="{ name: 'apartments.view' }"
                                class="nav-link active"
                                aria-current="page"
                                ><img src="../assets/search.svg" alt="Logo"/>
                                <span class="d-none d-lg-inline-block">Cerca</span>
                                </router-link>
                            </li>
                        
                            <li class="nav-item"><a class="nav-link active" href="http://127.0.0.1:8000/">
                                <img src="../assets/person.svg" alt="Logo" />
                                <span class="d-none d-lg-inline-block">Accedi</span>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
            </div>
        </div>
  </nav>
</template>
<style scoped>
    img{
        height: 40px;
    }
    a{
        text-decoration: none;
    }
    li.nav-item{
        img{
            height: 20px;
            margin-right: 2px;
            padding-bottom: 4px;
        }
    }
    @media (max-width: 992px) { 
        li.nav-item{
        img{
            height: 33px; 
        }
    }
    }
</style>