import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

interface Props {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('🔴 ErrorBoundary: Error caught:', error)
    console.error('🔴 ErrorBoundary: Error message:', error.message)
    console.error('🔴 ErrorBoundary: Error stack:', error.stack)
    
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🔴 ErrorBoundary: Component did catch:', error, errorInfo)
    console.error('🔴 ErrorBoundary: Component stack:', errorInfo.componentStack)
  }

  resetError = () => {
    console.log('🟡 ErrorBoundary: Resetting error state')
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return (
        <View className='flex-1 items-center justify-center bg-dark-900 px-6'>
          <Text className='mb-4 text-xl font-bold text-white'>
            Something went wrong
          </Text>
          <Text className='mb-6 text-center text-dark-300'>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          
          <TouchableOpacity
            onPress={this.resetError}
            className='mb-4 rounded-lg bg-primary-500 px-6 py-3'
          >
            <Text className='font-semibold text-white'>Try Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/sign-in')}
            className='rounded-lg border border-dark-600 px-6 py-3'
          >
            <Text className='font-semibold text-dark-300'>Go to Sign In</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary