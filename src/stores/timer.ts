import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
  // State
  const timeLeft = ref(25 * 60) // 25 minutes in seconds
  const isRunning = ref(false)
  const timerInterval = ref<number | null>(null)

  // Computed
  const displayTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  // Actions
  function startTimer() {
    if (!isRunning.value) {
      isRunning.value = true
      timerInterval.value = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value--
        } else {
          stopTimer()
        }
      }, 1000)
    }
  }

  function stopTimer() {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
    isRunning.value = false
  }

  function setTimer(minutes: number) {
    stopTimer()
    timeLeft.value = minutes * 60
  }

  return {
    timeLeft,
    isRunning,
    displayTime,
    startTimer,
    stopTimer,
    setTimer,
  }
})
