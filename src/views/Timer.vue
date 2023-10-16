<template>
  <div class="w-full flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-large mb-4">{{ formattedTime }}</h1>
    <div class="mb-4">
      <!-- <div ref="editableTime" contenteditable="true" class="text-6xl mb-4" @blur="updateCustomTime">{{ formattedTime }}</div> -->
      <!-- Custom time input fields -->
      <input type="number" v-model="customHours" min="0" placeholder="Custom hours" class="p-2 border rounded mx-2">
      <input type="number" v-model="customMinutes" min="0" max="59" placeholder="Custom minutes" class="p-2 border rounded mx-2">
      <input type="number" v-model="customSeconds" min="0" max="59" placeholder="Custom seconds" class="p-2 border rounded mx-2">
      <button @click="setCustomTime" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Set Custom Time</button>
    </div>
  <!-- Display the formatted time -->
    <!-- Timer control buttons -->
    <div class="mb-4">
      <button @click="startTimer" :disabled="isRunning" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Start</button>
      <button @click="stopTimer" :disabled="!isRunning" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Stop</button>
      <button @click="resetTimer" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Reset</button>
    </div>

    <!-- Lap counter and button -->
    <div class="mt-4">
      <button @click="decrementLap" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">-</button>
      <span class="mx-2 text-lg">Session: {{ lapCount }}</span>
      <button @click="incrementLap" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">+</button>
      <input type="number" v-model="customLap" min="1" placeholder="Custom lap" class="p-2 border rounded mx-2" />
      <button @click="setCustomLap" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Set Session</button>
    </div>
  </div>
</template>

<script setup>

  import { ref, onMounted, computed } from 'vue';

  /**
  * Represents the current time in seconds.
  */
  const time = ref(0);

  /**
   * Represents the custom hours set by the user.
   */
  const customHours = ref(0);

  /**
   * Represents the custom minutes set by the user.
   */
  const customMinutes = ref(6);

  /**
   * Represents the custom seconds set by the user.
   */
  const customSeconds = ref(0);

  /**
   * Flag to indicate whether the timer is running.
   */
  const isRunning = ref(false);

  /**
   * Interval used for updating the timer.
   */
  let interval;

  // Local storage key for lap count
  const localStorageKey = 'pomodoroLapCount';

  // Ref for lap count
  const lapCount = ref(0);

  // Ref for custom lap value
  const customLap = ref(1);

  /**
   * Increments the lap count by 1.
   */
  const incrementLap = () => {
    lapCount.value += 1;
    storeLapCount();
  };

  /**
   * Decrements the lap count by 1, if greater than 0.
   */
  const decrementLap = () => {
    if (lapCount.value > 0) {
      lapCount.value -= 1;
      storeLapCount();
    }
  };

  /**
   * Sets the lap count to the custom lap value.
   */
  const setCustomLap = () => {
    lapCount.value = customLap.value;
    storeLapCount();
  };

  /**
   * Stores the lap count in local storage.
   */
  const storeLapCount = () => {
    localStorage.setItem(localStorageKey, lapCount.value.toString());
  };


 // Create a ref to hold a reference to the editable time element
// const editableTime = ref(null);
// ``
// // Update the custom time based on the edited time text
// const updateCustomTime = () => {
//   const editedTime = parseInt(editableTime.value.innerText);
//   console.log("....")
//   if (!isNaN(editedTime) && editedTime >= 0) {
//     time.value = editedTime;
//   } else {
//     alert('Please enter a valid positive number for the time.');
//     editableTime.value.innerText = time.value;
//   }
// };

  /**
   * Computes the formatted time in HH:MM:SS format.
   *
   * @returns {string} The formatted time.
   */
  const formattedTime = computed(() => {
    const hours = Math.floor(time.value / 3600);
    const minutes = Math.floor((time.value % 3600) / 60);
    const seconds = time.value % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  /**
   * Represents the audio element for the alarm sound.
   */
  const audio = new Audio('/assets/sounds/handbell.mp3'); // Declare audio file

  /**
   * Starts the timer based on the custom time set by the user.
   */
  const startTimer = () => {
    const totalSeconds = customHours.value * 3600 + customMinutes.value * 60 + customSeconds.value;
    if (totalSeconds > 0) {
      time.value = totalSeconds;
      isRunning.value = true;
      interval = setInterval(() => {
        if (time.value > 0) {
          time.value -= 1;
          if (time.value === 0) {
            ringAlarm();
          }
        } else {
          stopTimer();
          alert('Time is up! Take a break.');
        }
      }, 1000);
    }
  };

  /**
   * Stops the timer.
   */
  const stopTimer = () => {
    isRunning.value = false;
    clearInterval(interval);
  };

  /**
   * Resets the timer and custom time to zero.
   */
  const resetTimer = () => {
    stopTimer();
    customHours.value = 0;
    customMinutes.value = 0;
    customSeconds.value = 0;

    time.value = customHours.value + customMinutes.value + customSeconds.value;
  };

  /**
   * Sets the timer to the custom time specified by the user.
   */
  const setCustomTime = () => {
    time.value = customHours.value * 3600 + customMinutes.value * 60 + customSeconds.value;
  };

  const ringAlarm = () => {
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  };

  onMounted(() => {
    audio.preload = 'auto'; // Preload the audio when the component is mounted

    // Fetch lap count from local storage on component mount
    const storedLapCount = localStorage.getItem(localStorageKey);
    if (storedLapCount) {
      lapCount.value = parseInt(storedLapCount, 10);
    }
  });
</script>

<style scoped>
/* .timer {
  text-align: center;
}

.timer h1 {
  font-size: 3em;
} */
</style>
