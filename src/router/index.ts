import { createRouter, createWebHistory } from 'vue-router'
import TimerView from '../views/TimerView.vue'
import PokedexView from '../views/PokedexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Timer',
      component: TimerView,
    },
    {
      path: '/pokedex',
      name: 'Pokedex',
      component: PokedexView,
    },
  ],
})

export default router
