<script>
</script>
<template>
    <footer class="bg-dark text-white">
        <div class="container py-4 d-flex justify-content-between">
            <div>
                <p class="h6">&copy; CLASS: 117, TEAM 5</p>
                <p style="font-size: 10px" class="fw-lighter">
                </p>
            </div>
            
            <div>  
                <a href=""><router-link
                :to="{ name: 'home' }"
                class="nav-link active"
                aria-current="page"
                ><img src="../assets/logbnb.png" alt="Logo" height="50" /></router-link>
                </a>
            </div>
        </div>
    </footer>

</template>
<style scoped>

</style>