import React, { useEffect } from 'react'

import * as SplashScreen from 'expo-splash-screen'

export interface NavigationProviderProps {
  children: React.ReactNode
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    // Simple one-time initialization
    const hideSplash = async () => {
      try {
        await SplashScreen.hideAsync()
      } catch (e) {
        console.log(e, 'Error: SplashScreen might already be hidden')
        // SplashScreen might already be hidden
      }
    }

    hideSplash()
  }, [])

  return <>{children}</>
}

export default NavigationProvider
