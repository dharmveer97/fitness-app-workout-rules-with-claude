import React from 'react'

import { Pressable as _Pressable } from 'react-native'

import { Link as _Link, Tabs } from 'expo-router'

import FontAwesome from '@expo/vector-icons/FontAwesome'

import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { useColorScheme } from '@/components/useColorScheme'
import { Colors } from '@/constants/colors'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='workouts'
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='heartbeat' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='calories'
        options={{
          title: 'Calories',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='cutlery' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='challenges'
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='trophy' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          href: null, // Hide this tab
        }}
      />
    </Tabs>
  )
}
