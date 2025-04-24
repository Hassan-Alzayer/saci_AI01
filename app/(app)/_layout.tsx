import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="welcome"
        options={{
          title: 'Welcome',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}