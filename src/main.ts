/**
 * Entry point for the Vue application.
 * 
 * This script sets up the Vue application by importing the necessary modules,
 * creating the application instance, and then mounting it to the DOM.
 *
 * @fileoverview Vue application entry point.
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// Import Tailwind CSS file
import './assets/css/tailwind.css'

import router from './router'

// Create the Vue application instance
const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router for navigation
app.use(router)

// Mount the Vue application to the DOM
app.mount('#app')
