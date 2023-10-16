<template>
  <div class="text-center p-4">
    <h1 class="text-4xl mb-4">{{ formattedTime }}</h1>
    <div class="mb-4">
      <input type="number" v-model="customTime" min="1" placeholder="Custom time (minutes)" class="p-2 border rounded">
      <button @click="setCustomTime" class="px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-700">Set Custom Time</button>
    </div>
    <button @click="startTimer" :disabled="isRunning" class="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-700">Start</button>
    <button @click="stopTimer" :disabled="!isRunning" class="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-700">Stop</button>
    <button @click="resetTimer" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Reset</button>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';

  /** Current time remaining in seconds. */
  const time = ref(600); // NOTE: 10 minutes in seconds

  /** Custom time input in minutes. */
  const customTime = ref('');

  /** Flag to indicate if the timer is running. */
  const isRunning = ref(false);

  /** Timer interval. */
  let interval;

  /** Formatted time in mm:ss format. */
  const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60);
    const seconds = time.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  const audio = new Audio('/assets/sounds/handbell.mp3'); // Declare audio file

  /**
   * Starts the timer countdown.
   */
  const startTimer = () => {
    isRunning.value = true;
    interval = setInterval(() => {
      if (time.value > 0) {
        time.value -= 1;
      } else {
        ringAlarm();
        stopTimer();
        alert('Time is up! Take a break.');
      }
    }, 1000);
  };

  /**
   * Stops the timer.
   */
  const stopTimer = () => {
    isRunning.value = false;
    clearInterval(interval);
  };

  /**
   * Resets the timer to the default time (25 minutes).
   */
  const resetTimer = () => {
    stopTimer();
    time.value = 1500; // Reset to 25 minutes
  };

  /**
   * Sets the timer to the custom time specified by the user.
   */
  const setCustomTime = () => {
    if (customTime.value) {
      time.value = customTime.value * 60; // Convert minutes to seconds
      customTime.value = ''; // Clear input after setting the custom time
    }
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
