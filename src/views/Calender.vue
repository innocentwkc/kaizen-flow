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
import { ref, onMounted } from 'vue';
import axios from 'axios'
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid'; // import this if you need dayGrid
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid'; // for timeGrid views

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialDate: '2023-11-12',
  navLinks: true, // can click day/week names to navigate views
  selectable: false,
  select: function (info) {
    const title = prompt('Event Title:');
    let eventData;
    if (title) {
      eventData = {
        title: title,
        start: info.startStr,
        end: info.endStr,
        allDay: info.allDay
      };
      calendarOptions.value.events.push(eventData);
    }
  },
  editable: true,
  dayMaxEvents: true, // allow "more" link when too many events
  events: []
  // other fullCalendar options you might want to use
});

const files = ref([]);
const selectedFile = ref(null);

// Fetch files from the server
async function fetchFiles() {
  try {
    const response = await axios.get('http://localhost:5001/api/get-resources?type=calender');
    files.value = response.data.fileList;
  } catch (error) {
    console.error('Error fetching files:', error);
  }
}

// Fetch calendar events based on selected file
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

onMounted(fetchFiles);

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
