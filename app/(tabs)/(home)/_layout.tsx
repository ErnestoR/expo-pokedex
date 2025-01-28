import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { Stack } from 'expo-router'

export default function HomeLayout() {
  const colorScheme = useColorScheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].tint, // Tailwind: bg-blue-800
        },
        headerTitleStyle: {
          fontFamily: 'SpaceMono',
          fontSize: 24,
          color: '#fff', // Tailwind: text-white
        },
        headerTintColor: '#f3f4f6', // Tailwind: text-gray-100
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="details/[name]"
        options={{
          title: '',
        }}
      />
    </Stack>
  )
}
