import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePomodoroCountStore } from './pomodoroCount'
import { usePokemonStore } from './pokemon'
import { useToast } from 'vue-toastification'

export const useTimerStore = defineStore('timer', () => {
  // State
  const timeLeft = ref(getNextTimer()) // 25 minutes in seconds
  const isRunning = ref(false)
  const timerInterval = ref<number | null>(null)

  // Computed
  const displayTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  // Actions
  async function handleTimerComplete() {
    const pomodoroCount = usePomodoroCountStore()
    const pokemonStore = usePokemonStore()
    const toast = useToast()

    pomodoroCount.increment()
    try {
      const pokemon = await pokemonStore.getNewPokemon()
      timeLeft.value = getNextTimer()
      toast.success(`${pokemon.name} has been added to your collection!`, {
        title: 'New Pokémon!',
      })
    } catch (error) {
      console.error('Failed to award Pokémon:', error)
    }
  }

  function getNextTimer() {
    const pomodoroCount = usePomodoroCountStore()
    const count = pomodoroCount.pomodoroCount
    if ((count + 1) % 4 === 0) {
      return 15 * 60 // Long break after 4 pomodoros
    } else {
      return count % 2 === 0 ? 25 * 60 : 5 * 60 // Alternate work/short break
    }
  }

  function startTimer() {
    if (!isRunning.value) {
      isRunning.value = true
      timerInterval.value = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value--
        } else {
          stopTimer()
          handleTimerComplete()
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
