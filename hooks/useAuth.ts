import { useEffect, useState } from 'react'

import { StorageUtils } from '../lib/storage'

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: LoginFormType): Promise<void> => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const newUser: UserProfile = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
        goals: {
          dailyWater: 2500,
          dailySteps: 10000,
          dailyCalories: 2000,
          sleepHours: 8,
          weeklyWorkouts: 3,
        },
        fitnessLevel: 'beginner',
        unitSystem: 'metric',
        joinDate: new Date(),
        preferences: {
          notifications: {
            workoutReminders: true,
            waterReminders: true,
            sleepReminders: false,
          },
          privacy: {
            shareStats: false,
            shareWorkouts: true,
          },
        },
        stats: {
          totalWorkouts: 0,
          totalDuration: 0,
          caloriesBurned: 0,
          averageIntensity: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Store tokens securely
      await StorageUtils.storeAuthTokens(
        'mock-access-token',
        'mock-refresh-token',
      )

      // Store user profile
      await StorageUtils.storeUserProfile(newUser)

      setUser(newUser)
      setIsAuthenticated(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (_userData: RegisterFormType): Promise<void> => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Mock registration success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      // Clear all user data including secure tokens
      await StorageUtils.clearUserData()
      setUser(null)
      setIsAuthenticated(false)
      setError(null)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const forgotPassword = async (_email: string): Promise<void> => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
      console.error('Forgot password error:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to send reset email',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (_data: ResetPasswordFormType): Promise<void> => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = (): void => {
    setError(null)
  }

  const refreshUser = async (): Promise<void> => {
    if (!user) return

    try {
      // Simulate API call to refresh user data
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update user data
      const updatedUser = {
        ...user,
        updatedAt: new Date(),
      }

      // Store updated user profile
      await StorageUtils.storeUserProfile(updatedUser)
      setUser(updatedUser)
    } catch (err) {
      console.error('Failed to refresh user:', err)
    }
  }

  const setUserProfile = (userProfile: UserProfile): void => {
    setUser(userProfile)
    setIsAuthenticated(true)
  }

  // Check for stored tokens on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isUserAuthenticated = await StorageUtils.isAuthenticated()
        if (isUserAuthenticated && !isAuthenticated) {
          // Token exists but user not authenticated, load user profile
          const userProfile = await StorageUtils.getUserProfile()
          if (userProfile) {
            setUserProfile(userProfile)
          }
          // Note: Not calling refreshUser here to avoid dependency issues
        }
      } catch (err) {
        console.error('Auth check error:', err)
      }
    }

    checkAuthStatus()
  }, [isAuthenticated])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyOTP: async (data) => {
      // TODO: Implement OTP verification
      console.warn('OTP verification not implemented', data)
    },
    resetPasswordWithOTP: async (data) => {
      // TODO: Implement password reset with OTP
      console.warn('Password reset with OTP not implemented', data)
    },
    resendOTP: async (email) => {
      // TODO: Implement OTP resend
      console.warn('OTP resend not implemented', email)
    },
    clearError,
    refreshUser,
    setUser: setUserProfile,
  }
}
