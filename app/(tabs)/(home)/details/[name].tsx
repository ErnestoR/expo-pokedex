import React from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { Stack, useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'
import config from '@/tailwind.config'
import { fetchPokemon } from '@/api/pokemon'

const pokemonColors = (config.theme?.extend?.colors as any)?.pokemon || {}

const colorMap = {
  normal: 'bg-pokemon-types-normal',
  fire: 'bg-pokemon-types-fire',
  water: 'bg-pokemon-types-water',
  electric: 'bg-pokemon-types-electric',
  grass: 'bg-pokemon-types-grass',
  ice: 'bg-pokemon-types-ice',
  fighting: 'bg-pokemon-types-fighting',
  poison: 'bg-pokemon-types-poison',
  ground: 'bg-pokemon-types-ground',
  flying: 'bg-pokemon-types-flying',
  psychic: 'bg-pokemon-types-psychic',
  bug: 'bg-pokemon-types-bug',
  rock: 'bg-pokemon-types-rock',
  ghost: 'bg-pokemon-types-ghost',
  dragon: 'bg-pokemon-types-dragon',
  dark: 'bg-pokemon-types-dark',
  steel: 'bg-pokemon-types-steel',
  fairy: 'bg-pokemon-types-fairy',
}

export default function Details() {
  const { name = '' } = useLocalSearchParams()

  const pokemonQuery = useQuery({
    queryKey: ['pokemon', name],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      return await response.json()
    },
  })
  const pokemonSpeciesQuery = useQuery({
    queryKey: ['pokemon-species', name],
    queryFn: async () => {
      const data = await fetchPokemon(name as string)

      return data
    },
  })

  const capitalizedName =
    (name as string).charAt(0).toUpperCase() + name.slice(1)

  if (
    pokemonQuery.status === 'pending' ||
    pokemonSpeciesQuery.status === 'pending'
  ) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <View
            className={`flex flex-1 w-full items-center bg-pokemon-types-normal`}
          >
            <View className="p-0">
              <View className="opacity-25">
                <Image
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg',
                  }}
                  style={{
                    width: 250,
                    height: 250,
                    position: 'absolute',
                    left: 105,
                    top: -15,
                    transform: 'rotate(-15deg) scale(.8)',
                  }}
                />
              </View>
            </View>
          </View>
        }
      >
        <View className="flex flex-col rouded-t-3xl  flex-1 w-full px-4 gap-4 pb-16">
          <Stack.Screen
            options={{
              title: capitalizedName || '',
              headerShown: true,
              headerStyle: {
                backgroundColor: pokemonColors.types.normal,
              },
            }}
          />
          <Text>Loading...</Text>
        </View>
      </ParallaxScrollView>
    )
  }

  const pokemonData = pokemonQuery.data

  const pokemonSpeciesData = pokemonSpeciesQuery.data
  const flavorTextEntries = pokemonSpeciesData.flavor_text_entries.filter(
    (entry: {
      flavor_text: string
      language: {
        name: string
      }
    }) => entry.language.name === 'en'
  )
  const mainType = pokemonData.types[0].type.name as keyof typeof colorMap
  const color = colorMap[mainType || 'normal']

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <View className={`flex flex-1 w-full items-center ${color}`}>
          <View className="p-0">
            <View className="opacity-25">
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg',
                }}
                style={{
                  width: 250,
                  height: 250,
                  position: 'absolute',
                  left: 105,
                  top: -15,
                  transform: 'rotate(-15deg) scale(.8)',
                }}
              />
            </View>
            <View className="bg-white/25 rounded-full border-4 border-white/25">
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
                }}
                style={{
                  height: 200,
                  aspectRatio: 1,
                }}
                contentFit="contain"
                contentPosition="center"
              />
            </View>
          </View>
        </View>
      }
    >
      <View className="flex flex-col rouded-t-3xl  flex-1 w-full px-4 gap-4 pb-16">
        <Stack.Screen
          options={{
            title: capitalizedName || '',
            headerShown: true,
            headerStyle: {
              backgroundColor: pokemonColors.types[mainType], // Tailwind: bg-blue-800
            },
          }}
        />
        <View className="flex flex-row gap-4">
          {pokemonData.types.map((type: any) => (
            <Text
              key={type.type.name}
              className={`bg-pokemon-types-${type.type.name} rounded-full px-4 py-2 text-white text-sm capitalize`}
            >
              {type.type.name}
            </Text>
          ))}
        </View>
        <Text className="w-full flex py-2 text-xl">
          {flavorTextEntries[0].flavor_text.replace(/[\n\f]/g, ' ')}
        </Text>
        <View className="flex items-center flex-1">
          <View className="p-4 flex flex-row shadow border-gray-200 rounded-3xl bg-white ">
            <View className="flex-1">
              <Text className="text-sm text-gray-500">Height</Text>
              <Text className="text-xl font-semibold">
                {pokemonData.height * 10} cm
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500">Weight</Text>
              <Text className="text-xl font-semibold">
                {(pokemonData.weight * 0.1).toFixed(1)} kg
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col gap-2 shadow bg-white rounded-3xl px-4 py-2 pb-4">
          <Text className="text-lg font-semibold">Stats</Text>
          {pokemonData.stats.map((stat: any) => (
            <View
              key={stat.stat.name}
              className="flex flex-row gap-4 items-center"
            >
              <Text className="flex-1 capitalize">{stat.stat.name}</Text>
              <Text className="text-right">{stat.base_stat}</Text>
              <View className="w-1/2">
                <View
                  className={`h-2 rounded-full bg-gray-200 absolute `}
                  style={{ width: `100%` }}
                />
                <View
                  className={`h-2 rounded-full ${color}`}
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                />
              </View>
            </View>
          ))}
        </View>
        <View className="flex flex-col gap-4 shadow bg-white rounded-3xl px-4 py-2 pb-4">
          <Text className="text-lg font-semibold">Abilities</Text>
          {pokemonData.abilities.map((ability: any) => (
            <Text key={ability.ability.name} className="capitalize">
              {ability.ability.name}
            </Text>
          ))}
        </View>
        <View className="w-full flex items-center justify-center">
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonData.id}.gif`,
            }}
            style={{
              height: 100,
              aspectRatio: 0.7,
            }}
            contentFit="contain"
            contentPosition="center"
          />
        </View>
      </View>
    </ParallaxScrollView>
  )
}
