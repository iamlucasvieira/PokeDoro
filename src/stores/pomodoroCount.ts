import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const POMODORO_COUNT_KEY = 'pomodoroCount'

export const usePomodoroCountStore = defineStore('pomodoroCount', () => {
  const pomodoroCount = ref<number>(0)

  // Load from localStorage on init
  function init() {
    const stored = localStorage.getItem(POMODORO_COUNT_KEY)
    pomodoroCount.value = stored ? parseInt(stored) : 0
  }

  function increment() {
    pomodoroCount.value += 1
    localStorage.setItem(POMODORO_COUNT_KEY, pomodoroCount.value.toString())
  }

  function reset() {
    pomodoroCount.value = 0
    localStorage.setItem(POMODORO_COUNT_KEY, '0')
  }

  return {
    pomodoroCount: computed(() => pomodoroCount.value),
    init,
    increment,
    reset,
  }
})
