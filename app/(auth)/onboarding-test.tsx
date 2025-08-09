import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

import { StatusBar } from 'expo-status-bar'

export default function OnboardingTest() {
  console.log('OnboardingTest component rendering')

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Text style={styles.text}>Onboarding Test Screen</Text>
      <Text style={styles.subtext}>
        If you can see this, the navigation is working!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtext: {
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
  },
})
