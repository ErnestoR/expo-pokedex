const PAGE_SIZE = 50
const API_URL = `https://pokeapi.co/api/v2/`

type TGET_POKEMONS = {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

type TGET_POKEMON = {
  name: string
  url: string
  height: number
  weight: number
  id: number
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
  types: {
    type: {
      name: string
    }
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
  species: {
    name: string
    url: string
  }
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
      showdown: {
        front_default: string
      }
    }
    front_default: string
  }
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
}): Promise<TGET_POKEMONS> => {
  const response = await fetch(
    `${API_URL}pokemon?limit=${PAGE_SIZE}&offset=${pageParam}`
  )

  return await response.json()
}

export const fetchPokemon = async (id: number): Promise<TGET_POKEMON> => {
  const response = await fetch(`${API_URL}pokemon/${id}`)
  return await response.json()
}

export const fetchPokemonSpecies = async (
  id: number
): Promise<TGET_POKEMON_SPECIES> => {
  const response = await fetch(`${API_URL}pokemon-species/${id}`)
  return await response.json()
}
