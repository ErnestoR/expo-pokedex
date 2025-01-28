import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'

import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About</ThemedText>
      </ThemedView>
      <ThemedText>Built with ❤️.</ThemedText>
      <Collapsible title="Package.json">
        <ScrollView className="flex-1 ">
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
