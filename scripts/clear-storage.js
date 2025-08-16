#!/usr/bin/env node

/**
 * Storage Cleanup Script for React Native Expo App
 * This script helps you clear all app storage for debugging purposes
 */

console.log('🧹 Storage Cleanup Guide')
console.log('=======================')
console.log('')

console.log('To completely clear all app storage, follow these steps:')
console.log('')

console.log('📱 EXPO GO (Development):')
console.log('1. Stop the running app (Ctrl+C in terminal)')
console.log('2. In Expo Go app:')
console.log('   - iOS: Long press your app → "Clear data and reload"')
console.log('   - Android: Menu → "Clear data" → "Clear data and reload"')
console.log('3. Or shake device → "Reload" to restart fresh')
console.log('')

console.log('🔧 MANUAL RESET (if needed):')
console.log('1. Delete node_modules: rm -rf node_modules')
console.log('2. Clear npm cache: npm cache clean --force')
console.log('3. Reinstall: npm install')
console.log('4. Clear Expo cache: npx expo start --clear')
console.log('')

console.log('📊 REDUX DEVTOOLS:')
console.log('For debugging Redux state:')
console.log('1. Install Flipper app: https://fbflipper.com/')
console.log(
  '2. Or use React Native Debugger: https://github.com/jhen0409/react-native-debugger',
)
console.log('3. For web testing: Use browser Redux DevTools extension')
console.log('')

console.log('🔍 CURRENT STORAGE KEYS IN THIS APP:')
console.log('- AsyncStorage keys:')
console.log('  • root (Redux persist root)')
console.log('  • persist:preferences')
console.log('')
console.log('- SecureStore keys:')
console.log('  • auth (authentication data)')
console.log('  • onboarding (onboarding progress)')
console.log('  • onboarding_completed')
console.log('  • onboarding_progress')
console.log('  • onboarding_start_time')
console.log('  • onboarding_completion_time')
console.log('')

console.log('💡 DEBUGGING TIPS:')
console.log(
  '1. Check React Native logs: npx react-native log-android (or log-ios)',
)
console.log('2. Check Expo logs in terminal where you ran "npm start"')
console.log(
  '3. Use console.log statements (already added to preferences screen)',
)
console.log(
  '4. Enable Chrome DevTools: Shake device → "Debug" → "Debug with Chrome"',
)
console.log('')

console.log('⚠️  IMPORTANT:')
console.log('- Clearing data will reset onboarding and authentication')
console.log('- All user preferences will be lost')
console.log('- This is expected for debugging')
console.log('')

console.log('✅ Ready to test with clean storage!')
