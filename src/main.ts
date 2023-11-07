/**
 * Entry point for the Vue application.
 * 
 * This script sets up the Vue application by importing the necessary modules,
 * creating the application instance, and then mounting it to the DOM.
 *
 * @fileoverview Vue application entry point.
 */

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

// Import Tailwind CSS file
import './assets/css/tailwind.css';

import router from './router';

/**
 * Create the Vue application instance and configure plugins.
 * 
 * @returns {Object} The Vue application instance.
 */
const app = createApp(App);

/**
 * Install Pinia for state management.
 * @see {@link https://pinia.vuejs.org/}
 */
app.use(createPinia());

/**
 * Install Vue Router for application routing.
 * @see {@link https://router.vuejs.org/}
 */
app.use(router);

/**
 * Mount the Vue application to the DOM.
 * @param {string} selector - The CSS selector of the application's root element.
 */
app.mount('#app');
