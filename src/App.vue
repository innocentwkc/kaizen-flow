<!--
 * Main layout component for the Vue application.
 *
 * This component sets up the main structure of the application, including
 * navigation and router views.
 *
 * @file MainLayout.vue
 * @description Main layout component with navigation and router views.
-->

<script setup lang="ts">
/**
 * @module MainLayout
 * @description The main layout component that assembles the whole application view.
 */

/**
 * RouterLink and RouterView are essential components from vue-router.
 * RouterLink is used for navigation, and RouterView is a placeholder for matched components.
 * 
 * @see {@link https://router.vuejs.org/api/#router-link}
 * @see {@link https://router.vuejs.org/api/#router-view}
 */
import { RouterLink, RouterView } from 'vue-router'
/**
 * Navigation is the component that renders the application's navigation bar.
 */
import Navigation from './components/Navigation.vue'
</script>

<template>
  <Navigation />
  <RouterView class="view-body"/>
</template>

<style>
#app {
  display: flex;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
