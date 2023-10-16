<template>
  <div class="app-navigation flex">
    <div class="flex-1 h-screen bg-gray-200 py-2 px-4">
      <ul>
        <li class="relative mb-6">
          <!-- <input type="search" class="w-full rounded shadow py-2 px-3 outline-none focus:shadow-outline focus:bg-gray-200" placeholder="Search"> -->
          <!-- <div class="relative text-black-600 focus-within:text-black-700" /> -->
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </span>
          <input type="search" name="q" class="w-full rounded shadow py-2 px-3 pl-12 outline-none focus:shadow-outline focus:bg-black-200" placeholder="Search..." autocomplete="off">
        </li>
        <!-- border-l-4 border-black mb-2 -->
        <li class="border-black mb-2" :class="{ 'border-l-4': isActive('home') }">
          <router-link to="/" class="py-2 px-3 inline-block w-full h-full font-bold" @click="setActiveLink('home')">
            <svg class="inline h-6 w-6 -mt-1 mr-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Dashboard
          </router-link>
        </li>
        <li class="border-black mb-2" :class="{ 'border-l-4': isActive('recent') }">
          <router-link to="/recent" class="py-2 px-3 inline-block w-full h-full text-black font-bold" @click="setActiveLink('recent')">
            <!-- <svg class="inline h-6 w-6 -mt-1 mr-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> -->
            <svg class="inline h-6 w-6 -mt-1 mr-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" viewBox="0 0 24 24" stroke="currentColor">
              <path id="Shape" d="M9.682,18.75a.75.75,0,0,1,.75-.75,8.25,8.25,0,1,0-6.189-2.795V12.568a.75.75,0,0,1,1.5,0v4.243a.75.75,0,0,1-.751.75H.75a.75.75,0,0,1,0-1.5H3a9.75,9.75,0,1,1,7.433,3.44A.75.75,0,0,1,9.682,18.75Zm2.875-4.814L9.9,11.281a.754.754,0,0,1-.22-.531V5.55a.75.75,0,1,1,1.5,0v4.889l2.436,2.436a.75.75,0,1,1-1.061,1.06Z" transform="translate(1.568 2.25)" fill="#141124"/>
            </svg>
            Recent
          </router-link>
        </li>
        <li class="border-black mb-2" :class="{ 'border-l-4': isActive('calender') }">
          <router-link to="/calender" class="py-2 px-3 inline-block w-full h-full text-black font-bold" @click="setActiveLink('calender')">
            <!-- <svg class="inline h-6 w-6 -mt-1 mr-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> -->
            <CalenderIcon  class="inline h-6 w-6 -mt-1 mr-2" fill="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" viewBox="0 0 24 24" stroke="currentColor" />
            Calender
          </router-link>
        </li>
        <li class="border-black mb-2" :class="{ 'border-l-4': isActive('popular') }">
          <router-link to="/popular" class="py-2 px-3 inline-block w-full h-full text-black font-bold" @click="setActiveLink('popular')">
            <svg class="inline h-6 w-6 -mt-1 mr-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Popular
          </router-link>
        </li>
        <li class="border-black mb-2" :class="{ 'border-l-4': isActive('timer') }">
          <router-link to="/timer" class="py-2 px-3 inline-block w-full h-full text-black font-bold" @click="setActiveLink('popular')">
            <svg class="inline h-6 w-6 -mt-1 mr-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 2H15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.24 10.76L12 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Timer
          </router-link>
        </li>
        <!-- <li class="mb-2">
          <a href="#" class="py-2 px-3 inline-block w-full h-full text-black font-bold">
            <svg class="inline h-6 w-6 -mt-1 mr-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Uploads
          </a>
        </li> -->
        <!-- <li class="mb-2">
          <a href="#" class="py-2 px-3 inline-block w-full h-full text-black font-bold">
            <svg class="inline h-6 w-6 -mt-1 mr-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Settings
          </a>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import CalenderIcon from './icons/CalenderIcon.vue'

  /**
   * Holds the currently active link.
   * @type {Ref}
   */
  const activeLink = ref(null);

  /**
   * Checks if a given link is active.
   *
   * @param {string} link - The link to check.
   * @returns {boolean} True if the link is active, false otherwise.
   */
  const isActive = (link) => {
    return activeLink.value === link;
  };

  /**
   * Sets the active link based on the clicked link. If the clicked link is already active,
   * it toggles off the active state.
   *
   * @param {string} link - The clicked link.
   */
  const setActiveLink = (link) => {
    activeLink.value = activeLink.value === link ? null : link;
  };

</script>

<style lang="scss">
  .app-navigation {
    z-index: 1001;

    /* Define a transition for the border */
    .border-l-4, .border-black {
      transition: border-left-color 0.3s ease-in-out;
    }

  }
</style>