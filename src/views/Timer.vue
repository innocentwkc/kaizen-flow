<template>
  <div class="text-center p-4">
    <div class="mb-4">
      <input type="number" v-model="customHours" min="0" placeholder="Custom hours" class="p-2 border rounded">
      <input type="number" v-model="customMinutes" min="0" max="59" placeholder="Custom minutes" class="p-2 border rounded mx-2">
      <input type="number" v-model="customSeconds" min="0" max="59" placeholder="Custom seconds" class="p-2 border rounded">
      <button @click="setCustomTime" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Set Custom Time</button>
    </div>
    <h1 class="text-4xl mb-4">{{ formattedTime }}</h1>
    <button @click="startTimer" :disabled="isRunning" class="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-700">Start</button>
    <button @click="stopTimer" :disabled="!isRunning" class="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-700">Stop</button>
    <button @click="resetTimer" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Reset</button>
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
  const customMinutes = ref(0);

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
  });
</script>

<style scoped>
.timer {
  text-align: center;
}

.timer h1 {
  font-size: 3em;
}
</style>
