/**
 * Defines a store for managing a counter state within the Vue application.
 * This store provides reactive state, computed state, and actions to modify the state.
 * 
 * @module useCounterStore
 * @file useCounterStore.js
 * @description Pinia store for a counter with increment functionality.
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * Define and export the counter store.
 * 
 * @returns {Object} The counter store with its state, getters, and actions.
 */
export const useCounterStore = defineStore('counter', () => {
  /**
   * Reactive state: count
   * @type {Ref<number>}
   */
  const count = ref(0)

  /**
   * Computed state: doubleCount
   * Represents twice the value of the count state.
   * @type {ComputedRef<number>}
   */
  const doubleCount = computed(() => count.value * 2)

  /**
   * Action: increment
   * Increments the count state by one.
   */
  function increment() {
    count.value++
  }

  // Expose the state, computed properties, and actions.
  return { count, doubleCount, increment }
})
