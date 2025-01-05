<script lang="ts">
import { defineComponent } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'

export default defineComponent({
  name: 'PokedexView',
  data() {
    return {
      pokemonStore: usePokemonStore(),
    }
  },
})
</script>

<template>
  <main>
    <h1>Pokédex</h1>
    <div class="pokemon-grid">
      <div v-for="pokemon in pokemonStore.collectionArray" :key="pokemon.id" class="pokemon-card">
        <h3>{{ pokemon.name }}</h3>
        <!-- Add more pokemon details as needed -->
      </div>
    </div>
  </main>
</template>

<style scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.pokemon-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
}
</style>
