<template>
  <div class="w-full">
    <h1>Recent</h1>
    <ul>
      <li v-for="file in files">
        {{ file }}
      </li>
    </ul>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';

const files = ref('')

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/get-modules');
    files.value = response.data.fileList
    console.log(response.data.fileList)
  } catch (error) {
    console.error('Error:', error);
    files.value = 'An error occurred while fetching data.'
  }
})

</script>