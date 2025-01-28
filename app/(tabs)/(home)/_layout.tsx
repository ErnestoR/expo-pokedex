import { Stack } from 'expo-router'

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff', // Tailwind: bg-blue-800
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
