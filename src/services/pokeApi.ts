import type { Pokemon } from '@/types/pokemon'

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2'

export async function getRandomPokemon(): Promise<Pokemon> {
  // Get a random Pokémon ID (assuming first 151 Pokémon for now)
  const randomId = Math.floor(Math.random() * 151) + 1

  const response = await fetch(`${POKE_API_BASE_URL}/pokemon/${randomId}`)
  const data = await response.json()

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map((type: { type: { name: string } }) => type.type.name),
  }
}
