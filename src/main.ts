import './assets/main.css'
import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { usePokemonStore } from './stores/pokemon'
import { usePomodoroCountStore } from './stores/pomodoroCount'

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Toast)

// Initialize stores
const pokemonStore = usePokemonStore()
const pomodoroCountStore = usePomodoroCountStore()

pokemonStore.init()
pomodoroCountStore.init()

app.mount('#app')
