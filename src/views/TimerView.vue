<script lang="ts">
import { usePomodoroCountStore } from '@/stores/pomodoroCount'
import PomoTimer from '@/components/PomoTimer.vue'
import { useTimerStore } from '@/stores/timer'

export default {
  components: {
    PomoTimer,
  },

  data() {
    return {
      timer: useTimerStore(),
      pomodoroCountStore: usePomodoroCountStore(),
    }
  },

  mounted() {
    this.pomodoroCountStore.init()
  },

  watch: {
    'timer.timeLeft'(newVal) {
      if (newVal === 0) {
        this.pomodoroCountStore.increment()
      }
    },
  },
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
      <PomoTimer />
      <div class="mt-4 text-lg">Completed Pomodoros: {{ pomodoroCountStore.pomodoroCount }}</div>
  </div>
</template>
