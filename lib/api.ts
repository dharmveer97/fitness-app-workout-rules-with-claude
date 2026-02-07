import * as SecureStore from 'expo-secure-store'

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api'

interface ApiResponse<T> {
  data?: T
  error?: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync('access_token')
    } catch {
      return null
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = await this.getAccessToken()
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || 'Request failed' }
      }

      return { data }
    } catch (error) {
      console.error('API Error:', error)
      return { error: 'Network error' }
    }
  }

  // Auth endpoints
  async signUp(email: string, password: string, name?: string) {
    return this.request<{
      user: any
      accessToken: string
      refreshToken: string
    }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  }

  async signIn(email: string, password: string) {
    return this.request<{
      user: any
      accessToken: string
      refreshToken: string
    }>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async refreshToken(refreshToken: string) {
    return this.request<{
      accessToken: string
      refreshToken: string
    }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  }

  async signOut(refreshToken: string) {
    return this.request('/auth/signout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me')
  }

  // Workout endpoints
  async getWorkouts(params?: {
    startDate?: string
    endDate?: string
    limit?: number
  }) {
    const query = new URLSearchParams(params as any).toString()
    return this.request<any[]>(`/workouts${query ? `?${query}` : ''}`)
  }

  async createWorkout(workout: any) {
    return this.request<any>('/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
    })
  }

  async getWorkout(id: string) {
    return this.request<any>(`/workouts/${id}`)
  }

  async updateWorkout(id: string, workout: Partial<any>) {
    return this.request<any>(`/workouts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workout),
    })
  }

  async deleteWorkout(id: string) {
    return this.request(`/workouts/${id}`, {
      method: 'DELETE',
    })
  }
}

export const api = new ApiClient(API_URL)
