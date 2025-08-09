# Storage System Documentation

## Overview

Our fitness app uses a hybrid storage approach combining **Expo SecureStore** for sensitive data and
**MMKV** for non-sensitive data, providing both security and performance.

## Storage Architecture

### 🔐 Expo SecureStore (Sensitive Data)

- **Purpose**: Store sensitive user data securely
- **Encryption**: Hardware-backed encryption on supported devices
- **Use Cases**:
  - Authentication tokens (access/refresh tokens)
  - User credentials for biometric login
  - Any PII or sensitive information

### ⚡ MMKV (Non-sensitive Data)

- **Purpose**: Fast, efficient storage for app data
- **Performance**: Up to 30x faster than AsyncStorage
- **Use Cases**:
  - User profiles and preferences
  - Journal entries
  - Challenge data
  - Food diary entries
  - App settings

## Usage Examples

### Authentication Tokens

```typescript
// Store tokens securely
await StorageUtils.storeAuthTokens(accessToken, refreshToken);

// Check authentication status
const isAuth = await StorageUtils.isAuthenticated();

// Get tokens
const accessToken = await StorageUtils.getAccessToken();
const refreshToken = await StorageUtils.getRefreshToken();
```

### User Profile

```typescript
// Store user profile
await StorageUtils.storeUserProfile(userProfile);

// Get user profile
const profile = await StorageUtils.getUserProfile();
```

### Journal Entries

```typescript
// Store journal entries
await StorageUtils.storeJournalEntries(entries);

// Get journal entries
const entries = await StorageUtils.getJournalEntries();
```

### App Settings

```typescript
// Store app settings
await StorageUtils.storeAppSettings({ theme: 'dark', language: 'en' });

// Get app settings
const settings = await StorageUtils.getAppSettings();
```

## Security Best Practices

### ✅ What Goes in SecureStore

- Authentication tokens
- User credentials
- Biometric data
- Payment information
- Any personally identifiable information (PII)

### ✅ What Goes in MMKV

- User preferences (theme, language)
- App settings
- Journal entries (non-sensitive)
- Challenge progress
- Food diary entries
- Cache data

### ❌ Never Store in Plain Text

- Passwords
- Credit card numbers
- Social security numbers
- Authentication tokens

## Error Handling

All storage operations include proper error handling:

```typescript
try {
  await StorageUtils.storeUserProfile(profile);
} catch (error) {
  console.error('Failed to store profile:', error);
  // Handle error appropriately
}
```

## Data Migration

When updating data structures, use versioning:

```typescript
// Example migration
const currentVersion = (await StorageUtils.getItem('data_version')) || '1.0';
if (currentVersion < '2.0') {
  // Perform migration
  await migrateToV2();
  await StorageUtils.setItem('data_version', '2.0');
}
```

## Performance Considerations

### MMKV Advantages

- **Synchronous operations**: No async/await needed for simple operations
- **Memory mapping**: Efficient memory usage
- **Multi-process safe**: Can be accessed from multiple processes
- **Encryption support**: Optional encryption for sensitive MMKV data

### Best Practices

- Use batch operations when possible
- Avoid storing large objects frequently
- Consider data compression for large datasets
- Regular cleanup of unused data

## Storage Limits

### SecureStore Limits

- **iOS**: Limited by keychain capacity (~1MB per item)
- **Android**: Limited by keystore capacity
- **Web**: Uses browser's secure storage (limited)

### MMKV Limits

- **Theoretical**: Up to 2GB per file
- **Practical**: Depends on device memory
- **Recommended**: Keep individual entries under 1MB

## Debugging

### Storage Information

```typescript
// Get storage size info
const info = StorageUtils.getStorageInfo();
console.log('MMKV size:', info.mmkvSize);
```

### Clear Data (Development)

```typescript
// Clear all user data
await StorageUtils.clearUserData();

// Clear everything (complete reset)
await StorageUtils.clearAllData();
```

## Testing

Mock storage in tests:

```typescript
// Jest setup
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
  })),
}));
```

## Migration from AsyncStorage

If migrating from AsyncStorage:

```typescript
// Migration utility
async function migrateFromAsyncStorage() {
  try {
    // Get data from AsyncStorage
    const oldData = await AsyncStorage.getItem('user_profile');

    if (oldData) {
      // Store in new system
      const profile = JSON.parse(oldData);
      await StorageUtils.storeUserProfile(profile);

      // Remove from AsyncStorage
      await AsyncStorage.removeItem('user_profile');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  }
}
```

## Expo SecureStore Configuration

In `app.config.ts`:

```typescript
plugins: [
  'expo-secure-store',
  // ... other plugins
];
```

## Platform Differences

### iOS

- Uses Keychain Services
- Hardware encryption on devices with Secure Enclave
- Biometric authentication support

### Android

- Uses Android Keystore
- Hardware-backed security on supported devices
- Fingerprint/Face unlock integration

### Web

- Uses browser's secure storage APIs
- Limited compared to native platforms
- Consider additional encryption for sensitive data

## Troubleshooting

### Common Issues

1. **SecureStore not available**

   ```typescript
   import * as SecureStore from 'expo-secure-store';

   if (SecureStore.isAvailableAsync()) {
     // Use SecureStore
   } else {
     // Fallback to encrypted MMKV or other solution
   }
   ```

2. **MMKV initialization errors**

   ```typescript
   try {
     const storage = new MMKV();
   } catch (error) {
     console.error('MMKV initialization failed:', error);
     // Use fallback storage
   }
   ```

3. **Data corruption**
   ```typescript
   try {
     const data = storage.getString('key');
     return JSON.parse(data);
   } catch (error) {
     console.error('Data corruption detected:', error);
     // Clear corrupted data and return default
     storage.delete('key');
     return defaultValue;
   }
   ```

This storage system provides a robust, secure, and performant foundation for the fitness app's data
management needs.
