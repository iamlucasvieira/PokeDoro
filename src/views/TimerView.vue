<script lang="ts">
import { useTimerStore } from '@/stores/timer'
import { usePomodoroCountStore } from '@/stores/pomodoroCount'
import PomoTimer from '@/components/PomoTimer.vue'

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
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <PomoTimer />
    <div class="mt-4 text-lg">Completed Pomodoros: {{ pomodoroCountStore.pomodoroCount }}</div>
  </div>
</template>
