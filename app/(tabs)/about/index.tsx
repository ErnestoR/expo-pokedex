import { StyleSheet, ScrollView, Text, View } from 'react-native'

import { Collapsible } from '@/components/Collapsible'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { IconSymbol } from '@/components/ui/IconSymbol'

import packageJson from '@/package.json'

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <View className="flex gap-2 ">
        <Text className="text-2xl ">About</Text>
        <Text className="text-xl ">
          Simple Pokedex API using Expo-go, tanstack-query and nativewind
        </Text>
      </View>
      <Text>Built with ❤️ by Ernesto </Text>
      <Collapsible title="Package.json">
        <ScrollView className="flex-1 bg-white gap-3 p-2 ">
          {Object.entries(packageJson.dependencies).map(([name, version]) => (
            <View
              key={name}
              className="flex-row justify-between items-center bg-white rounded-lg p-4 mb-2 shadow-sm"
            >
              <Text className="text-lg font-medium text-gray-800">{name}</Text>
              <Text className="text-sm text-gray-500">{version}</Text>
            </View>
          ))}
        </ScrollView>
      </Collapsible>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
