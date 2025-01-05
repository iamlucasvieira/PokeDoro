import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePomodoroCountStore } from '@/stores/pomodoroCount'

export enum SessionType {
  FOCUS = 'focus',
  SHORT_BREAK = 'shortBreak',
  LONG_BREAK = 'longBreak',
}

interface SessionConfig {
  duration: number // in minutes
  label: string
}

const SESSION_CONFIGS: Record<SessionType, SessionConfig> = {
  [SessionType.FOCUS]: {
    duration: 25,
    label: 'Focus Time',
  },
  [SessionType.SHORT_BREAK]: {
    duration: 5,
    label: 'Short Break',
  },
  [SessionType.LONG_BREAK]: {
    duration: 15,
    label: 'Long Break',
  },
}

export const useSessionStore = defineStore('session', () => {
  const currentSession = ref<SessionType>(SessionType.FOCUS)

  const sessionConfig = computed(() => SESSION_CONFIGS[currentSession.value])

  function setSession(type: SessionType) {
    currentSession.value = type
  }

  function getNextSession() {
    const pomodoroCount = usePomodoroCountStore()
    const count = pomodoroCount.pomodoroCount

    if ((count + 1) % 4 === 0) {
      return SessionType.LONG_BREAK
    } else {
      return count % 2 === 0 ? SessionType.FOCUS : SessionType.SHORT_BREAK
    }
  }

  return {
    currentSession,
    sessionConfig,
    setSession,
    getNextSession,
  }
})
