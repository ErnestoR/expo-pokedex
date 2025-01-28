import {
  View,
  StatusBar,
  VirtualizedList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { Image } from 'expo-image'
import { Text } from 'react-native'
import { Link } from 'expo-router'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const PAGE_SIZE = 50
const API_URL = `https://pokeapi.co/api/v2/`

type TGET_POKEMON = {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    name: string
    url: string
  }>
}

export default function HomeScreen() {
  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `${API_URL}pokemon?limit=${PAGE_SIZE}&offset=${pageParam}`
      )

      return (await response.json()) as TGET_POKEMON
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => {
      if (!firstPage.previous) return undefined
      const url = new URL(firstPage.previous)
      const offset = parseInt(url.searchParams.get('offset') || '0', 10) || 0

      return offset
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined
      const url = new URL(lastPage.next)
      const offset = parseInt(url.searchParams.get('offset') || '0', 10) || 0

      return offset
    },
  })

  if (status === 'pending')
    return <ActivityIndicator size="large" color="#0000ff" />
  if (error) return <Text>Error loading data</Text>

  const allPokemon = data.pages.flatMap((page) => page.results)

  return (
    <View
      className="flex flex-col gap-2 flex-1 bg-white pt-14"
      style={{ marginTop: StatusBar.currentHeight || 0 }}
    >
      <View className="flex flex-col gap-2 p-8">
        <Text className="text-4xl ">Pokedex</Text>
        {/* <Text>
          Search for a Pokemon by name or using its National Pokemon number.
        </Text> */}
      </View>
      <VirtualizedList
        data={allPokemon}
        initialNumToRender={20}
        getItemCount={() => allPokemon.length}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.url}
        renderItem={({ item, index }) => (
          <View className="bg-white border-4 border-gray-200 rounded-2xl m-4 shadow-lg">
            <TouchableOpacity activeOpacity={0.5}>
              <Link href={`(home)/details/${item.name}`}>
                <View className="flex flex-row items-center px-2 py-2 gap-6 ml-2">
                  <View className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center  ">
                    <Image
                      source={{
                        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                      }}
                      style={{
                        width: '100%',
                        aspectRatio: 1,
                      }}
                      contentFit="contain"
                      contentPosition="center"
                    />
                  </View>
                  <View className="flex flex-row gap-2 justify-center items-center">
                    <Text className="text-gray-400 text-xl font-bold">
                      #{(index + 1).toString().padStart(3, '0')}
                    </Text>
                    <Text className="text-black text-2xl font-bold">
                      {item.name.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </Link>
            </TouchableOpacity>
          </View>
        )}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage()
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator className="p-2" size="small" color="#0000ff" />
          ) : null
        }
      />
    </View>
  )
}
