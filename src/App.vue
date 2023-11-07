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
 * HelloWorld is a sample component showcasing a simple hello world message.
 */
import HelloWorld from './components/HelloWorld.vue'

/**
 * Navigation is the component that renders the application's navigation bar.
 */
import Navigation from './components/Navigation.vue'
</script>

<template>
  <Navigation class="fixed top-0 left-0 right-0 z-30" />
  <RouterView class="view-body mt-16" />
</template>

<style scoped lang="scss">
#app {
  @apply flex;
}

.view-body {
  @apply mt-16;
}

.logo {
  @apply block mx-auto my-0 mb-8;
}

nav {
  @apply mt-8;
}

@media (min-width: 1024px) {
  .logo {
    @apply m-0 mr-8;
  }
}
</style>
