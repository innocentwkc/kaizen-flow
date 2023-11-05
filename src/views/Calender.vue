<template>
  <div class="w-full p-2">
    <div class='calendar-container'>
      <FullCalendar class="" :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
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
  events: [
    {
      title: 'All Day Event',
      start: '2023-11-01'
    },
    {
      title: 'Long Event',
      start: '2023-11-07',
      end: '2023-11-10'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: '2023-11-09T16:00:00'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: '2023-11-16T16:00:00'
    },
    {
      title: 'Conference',
      start: '2023-11-11',
      end: '2023-11-13'
    },
    {
      title: 'Meeting',
      start: '2023-11-12T10:30:00',
      end: '2023-11-12T12:30:00'
    },
    {
      title: 'Lunch',
      start: '2023-11-12T12:00:00'
    },
    {
      title: 'Meeting',
      start: '2023-11-12T14:30:00'
    },
    {
      title: 'Happy Hour',
      start: '2023-11-12T17:30:00'
    },
    {
      title: 'Dinner',
      start: '2023-11-12T20:00:00'
    },
    {
      title: 'Birthday Party',
      start: '2023-11-13T07:00:00'
    },
    {
      title: 'Click for Google',
      url: 'http://google.com/',
      start: '2023-11-28'
    }
  ]
  // other fullCalendar options you might want to use
});
</script>

<style lang="scss">

.calendar-container {
  // @apply max-w-5xl mx-auto my-10;
}

.fc.fc-media-screen {
  height: 98vh !important;
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
