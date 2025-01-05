<template>
  <div class="timer">
    <div class="display">{{ timer.displayTime }}</div>

    <div class="controls">
      <button @click="startTimer()" :disabled="timer.isRunning">Play</button>
      <button @click="timer.stopTimer()" :disabled="!timer.isRunning">Stop</button>
    </div>

    <div class="timer-form">
      <input type="number" v-model="minutes" min="1" :disabled="timer.isRunning" />
      <button @click="setNewTimer" :disabled="timer.isRunning">Set Timer</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useTimerStore } from '@/stores/timer'
import { usePomodoroCountStore } from '@/stores/pomodoroCount'

export default {
  data() {
    return {
      minutes: 25,
      timer: useTimerStore(),
      pomodoroCount: usePomodoroCountStore(),
    }
  },
  methods: {
    setNewTimer() {
      this.timer.setTimer(this.minutes)
    },

    startTimer() {
      this.timer.startTimer()
    },
  },
}
</script>

<style scoped>
.timer {
  text-align: center;
  padding: 20px;
}

.display {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.controls {
  margin-bottom: 20px;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
}

.timer-form {
  display: flex;
  justify-content: center;
  gap: 10px;
}

input[type='number'] {
  width: 80px;
  padding: 8px;
}
</style>
