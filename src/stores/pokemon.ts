import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getRandomPokemon } from '@/services/pokeApi'
import type { PokemonCollection } from '@/types/pokemon'

const COLLECTION_KEY = 'pokemonCollection'

export const usePokemonStore = defineStore('pokemon', () => {
  const collection = ref<PokemonCollection>({})
  const isLoading = ref(false)

  // Load from localStorage on init
  function init() {
    const stored = localStorage.getItem(COLLECTION_KEY)
    collection.value = stored ? JSON.parse(stored) : {}
  }

  // Get a new Pokémon reward
  async function getNewPokemon() {
    isLoading.value = true
    try {
      const pokemon = await getRandomPokemon()
      collection.value[pokemon.id] = pokemon
      localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection.value))
      return pokemon
    } catch (error) {
      console.error('Failed to get Pokémon:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Computed property to get collection as array
  const collectionArray = computed(() => Object.values(collection.value))

  return {
    collection: computed(() => collection.value),
    collectionArray,
    isLoading,
    init,
    getNewPokemon,
  }
})
