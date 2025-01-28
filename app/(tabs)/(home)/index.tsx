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
import * as Haptics from 'expo-haptics'

import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPokemons } from '@/api/pokemon'

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
    queryFn: fetchPokemons,
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
      className="flex flex-col gap-2 flex-1 bg-neutral-50 dark:bg-slate-800 pt-14"
      style={{ marginTop: StatusBar.currentHeight || 0 }}
    >
      <View className="flex flex-col gap-2 p-4 relative  ">
        <Text
          className="text-5xl pt-8 text-slate-600 dark:text-neutral-100 tracking-[0.07em]"
          style={{
            fontFamily: 'PokemonSolid',
          }}
        >
          Pokédex
        </Text>
      </View>
      <VirtualizedList
        data={allPokemon}
        initialNumToRender={20}
        getItemCount={() => allPokemon.length}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.url}
        renderItem={({ item, index }) => (
          <View className="bg-neutral-50 border-4 border-gray-200 rounded-2xl m-4 shadow-lg">
            <Link href={`/details/${item.name}`} asChild>
              <TouchableOpacity onPress={() => Haptics.selectionAsync()}>
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
                    <Text className="text-gray-800 text-2xl font-semibold capitalize flex-1">
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
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
