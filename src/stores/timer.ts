import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePomodoroCountStore } from './pomodoroCount'
import { usePokemonStore } from './pokemon'
import { useSessionStore, SessionType } from './sessionStore'
import { useToast } from 'vue-toastification'

export const useTimerStore = defineStore('timer', () => {
  const sessionStore = useSessionStore()

  // State
  const timeLeft = ref(sessionStore.sessionConfig.duration * 60)
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

    // Only award Pokemon and increment count after focus sessions
    if (sessionStore.currentSession === SessionType.FOCUS) {
      pomodoroCount.increment()
      try {
        const pokemon = await pokemonStore.getNewPokemon()
        toast.success(`${pokemon.name} has been added to your collection!`, {
          title: 'New Pokémon!',
        })
      } catch (error) {
        console.error('Failed to award Pokémon:', error)
      }
    }

    // Set next session type and timer
    const nextSession = sessionStore.getNextSession()
    sessionStore.setSession(nextSession)
    timeLeft.value = sessionStore.sessionConfig.duration * 60
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
