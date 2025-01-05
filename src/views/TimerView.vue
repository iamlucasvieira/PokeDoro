<script lang="ts">
import { useTimerStore } from '@/stores/timer'
import { usePomodoroCountStore } from '@/stores/pomodoroCount'
import { useSessionStore } from '@/stores/sessionStore'
import PomoTimer from '@/components/PomoTimer.vue'

export default {
  components: {
    PomoTimer,
  },

  data() {
    return {
      timer: useTimerStore(),
      pomodoroCountStore: usePomodoroCountStore(),
      sessionStore: useSessionStore(),
    }
  },
}
</script>

<template>
  <div class="flex flex-col items-center justify-between h-full">
    <!-- Timer Section -->
    <div class="flex-grow flex items-center justify-center">
      <PomoTimer />
    </div>

    <!-- Status Bar -->
    <div class="w-full bg-white/10 backdrop-blur-sm border-t border-gray-200 p-4 mt-auto">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <!-- Session Type -->
        <div class="flex items-center space-x-2">
          <div
            class="h-2 w-2 rounded-full"
            :class="{
              'bg-green-500': sessionStore.currentSession === 'focus',
              'bg-blue-500': sessionStore.currentSession === 'shortBreak',
              'bg-purple-500': sessionStore.currentSession === 'longBreak',
            }"
          ></div>
          <span class="text-sm font-medium">{{ sessionStore.sessionConfig.label }}</span>
        </div>

        <!-- Pomodoro Count -->
        <div class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm font-medium">
            {{ pomodoroCountStore.pomodoroCount }} Pomodoros Completed
          </span>
        </div>

        <!-- Current Duration -->
        <div class="text-sm font-medium">{{ sessionStore.sessionConfig.duration }} min session</div>
      </div>
    </div>
  </div>
</template>
