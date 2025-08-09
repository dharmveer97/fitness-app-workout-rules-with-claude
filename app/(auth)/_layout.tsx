import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen 
        name="onboarding" 
        options={{ 
          gestureEnabled: false,
          animation: 'slide_from_right' 
        }} 
      />
      <Stack.Screen 
        name="sign-in" 
        options={{ 
          animation: 'slide_from_right',
          presentation: 'card' 
        }} 
      />
      <Stack.Screen 
        name="sign-up" 
        options={{ 
          animation: 'slide_from_right',
          presentation: 'card' 
        }} 
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{ 
          animation: 'slide_from_bottom',
          presentation: 'modal' 
        }} 
      />
      <Stack.Screen 
        name="verify-otp" 
        options={{ 
          animation: 'slide_from_right',
          presentation: 'card'
        }} 
      />
      <Stack.Screen 
        name="reset-password" 
        options={{ 
          animation: 'slide_from_right',
          presentation: 'card'
        }} 
      />
    </Stack>
  );
}
