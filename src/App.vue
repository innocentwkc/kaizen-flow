<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navigation from './components/Navigation.vue'
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/wind-icon.png" width="125" height="125" />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <Navigation />

  <RouterView class="view-body"/>
</template>

<style>
#app {
  display: flex;
  /* flex-direction: row; */
}

.view-body {
  /* position: relative; */
  /* left: 350px; */
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  /* width: 100%; */
  /* font-size: 12px; */
  /* text-align: center; */
  /* margin-top: 2rem; */
}


@media (min-width: 1024px) {
  
  .logo {
    margin: 0 2rem 0 0;
  }

}
</style>
