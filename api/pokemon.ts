const PAGE_SIZE = 50
const API_URL = `https://pokeapi.co/api/v2/`

type TGET_POKEMON = {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

type TGET_POKEMON_SPECIES = {
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
    }
  }[]
}

export const fetchPokemons = async ({
  pageParam,
}: {
  pageParam: number
}): Promise<TGET_POKEMON> => {
  const response = await fetch(
    `${API_URL}pokemon?limit=${PAGE_SIZE}&offset=${pageParam}`
  )

  return await response.json()
}

export const fetchPokemon = async (
  name: string
): Promise<TGET_POKEMON_SPECIES> => {
  const response = await fetch(`${API_URL}pokemon-species/${name}`)
  return await response.json()
}
