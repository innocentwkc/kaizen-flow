<template>
  <div class="w-full p-2">
     <div class="mb-4">
        <label for="calendar-file" class="block text-sm font-medium text-gray-700">Select Calendar File:</label>
        <select id="calendar-file" v-model="selectedFile" @change="fetchCalendarEvents" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option v-for="file in files" :key="file" :value="file">{{ file }}</option>
        </select>
      </div>
    <div class='calendar-container'>
      <FullCalendar class="" :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup>

/**
 * Calendar Event Management.
 * 
 * This script handles calendar event fetching and management in a Vue application,
 * utilizing Axios for HTTP requests and FullCalendar for displaying events.
 *
 * @module CalendarEventManagement
 * @file CalendarEventManagement.js
 * @description Script setup for a calendar event management Vue component.
 */

import { computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios'
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid'; // import this if you need dayGrid
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid'; // for timeGrid views

/**
 * Accessing the route.
 * @type {RouteLocationNormalizedLoaded}
 */
const route = useRoute();

/**
 * Filename parameter from the route.
 * @type {ComputedRef<string>}
 */
const filename = computed(() => route.params.filename || 'No filename provided');

/**
 * Original path from the route.
 * @type {ComputedRef<string>}
 */
const originalPath = computed(() => route.path);

/**
 * Calendar options for FullCalendar component.
 * @type {Ref<Object>}
 */
const calendarOptions = ref({
  // FullCalendar options...
});

/**
 * Files list from the server.
 * @type {Ref<Array>}
 */
const files = ref([]);

/**
 * Currently selected file.
 * @type {Ref<string|null>}
 */
const selectedFile = ref(null);

/**
 * Fetches files from the server.
 * @async
 * @function fetchFiles
 */
async function fetchFiles() {
  try {
    const response = await axios.get('http://localhost:5001/api/get-resources?type=calendar');
    files.value = response.data.fileList;
  } catch (error) {
    console.error('Error fetching files:', error);
  }
}

/**
 * Fetches calendar events based on the selected file.
 * @async
 * @function fetchCalendarEvents
 */
async function fetchCalendarEvents() {
  if (selectedFile.value) {
    try {
      const response = await axios.get(`http://localhost:5001/api/get-ics-events/${selectedFile.value}`);
      console.log(response)
      calendarOptions.value.events = response.data;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    }
  }
}

// Lifecycle hooks
onMounted(() => {
  fetchFiles();
  selectedFile.value = filename.value;
  fetchCalendarEvents();
});

watch(selectedFile, (newFiles) => {
  console.log(newFiles);
});

</script>

<style lang="scss">

.calendar-container {
  // @apply max-w-5xl mx-auto my-10;
}

.fc.fc-media-screen {
  height: 90vh !important;
}

.fc-header-toolbar {
  position: sticky !important;
// fc-toolbar fc-toolbar-ltr
}

td {
  &.fc-day {
    &:hover {
      background: rgba(79, 130, 153, 0.1) !important;
    }
  }
}
</style>
