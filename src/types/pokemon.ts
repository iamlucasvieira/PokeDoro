export interface Pokemon {
  id: number
  name: string
  sprite: string
  types: string[]
}

export interface PokemonCollection {
  [id: number]: Pokemon
}
