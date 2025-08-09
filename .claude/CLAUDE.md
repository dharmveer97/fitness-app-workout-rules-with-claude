# Daily Deposits App - Development Guidelines

## Project Overview
This is a React Native Expo application using TypeScript, Redux Toolkit, Formik, Zod, and NativeWind for styling.

## Core Development Rules

### 1. TypeScript Type System Architecture

#### Type Definition Files (.d.ts)
- All type definition files MUST end with `.d.ts`
- Located in `/types` directory
- These files are globally available - NO imports/exports needed in .d.ts files
- Components can use types directly without importing

#### Import Type Pattern
When referencing Zod schema types in .d.ts files, use this pattern:
```typescript
type LoginFormType = import('../schemas/auth').LoginFormInfer;
type RegisterFormType = import('../schemas/auth').RegisterFormInfer;
```

#### Schema Structure
1. Define Zod schemas in `/schemas` directory
2. Export inferred types from schema files:
```typescript
export type LoginFormInfer = z.infer<typeof loginSchema>;
```
3. Reference these in .d.ts files using the import pattern above

### 2. Form Handling Rules

#### ALWAYS Use Formik
- Every form in the application MUST use Formik
- Never use plain React state for form management
- Use formik hooks: `useFormik`, `useField`, `useFormikContext`

#### ALWAYS Use Zod for Validation
- Define validation schemas in `/schemas` directory
- Use `zod-formik-adapter` for integration
- Never write custom validation logic

Example pattern:
```typescript
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { loginSchema } from '@/schemas/auth';

const formik = useFormik({
  initialValues: { email: '', password: '' },
  validationSchema: toFormikValidationSchema(loginSchema),
  onSubmit: handleSubmit,
});
```

### 3. Component Structure

#### File Organization
```
components/
  common/        # Reusable UI components
  forms/         # Form-specific components
  layouts/       # Layout components
  features/      # Feature-specific components
```

#### Component Rules
- Use functional components with TypeScript
- Props interfaces defined in component file or types/components.d.ts
- Use NativeWind classes for styling
- Prefer composition over inheritance

### 4. State Management

#### Redux Toolkit Patterns
- Store configuration in `/state/store.ts`
- Slices in `/state/slices/`
- Use Redux Toolkit's `createSlice` and `createAsyncThunk`
- Persist sensitive data using `expo-secure-store` via `securePersistStorage.ts`

#### State Types
- Define state interfaces in respective .d.ts files
- Use typed hooks: `useAppDispatch`, `useAppSelector`

### 5. Styling with NativeWind

#### Class Usage
- Use Tailwind classes via NativeWind
- Custom colors defined in `tailwind.config.js`
- Dark mode support with `darkMode: 'class'`
- Avoid inline styles unless absolutely necessary

### 6. Navigation

#### Expo Router
- File-based routing in `/app` directory
- Layout files: `_layout.tsx`
- Tab navigation in `(tabs)` group
- Auth screens in `(auth)` group

### 7. API & Data Fetching

#### Patterns
- Use Redux Toolkit's `createAsyncThunk` for API calls
- Handle loading states in slices
- Type all API responses
- Use proper error handling

### 8. Testing Requirements

#### Before Committing
- Run `npm run lint` - ESLint must pass
- Run `npm run typecheck` - TypeScript must compile without errors
- Run `npm run test` - All tests must pass
- Run `npm run format:check` - Code must be formatted

### 9. Code Quality Standards

#### No Comments Unless Necessary
- Write self-documenting code
- Use descriptive variable/function names
- Comments only for complex business logic

#### Import Organization
Follow ESLint import order:
1. Built-in modules
2. External packages
3. Internal modules
4. Parent imports
5. Sibling imports
6. Index imports

### 10. Security Rules

#### Never Commit Secrets
- Use environment variables
- Store sensitive data in `expo-secure-store`
- Never log sensitive information
- Use `.gitignore` properly

### 11. Performance Guidelines

#### Optimization Rules
- Use React.memo for expensive components
- Implement virtualization for long lists
- Lazy load screens and components
- Optimize images and assets

### 12. Expo SDK Integration

Required SDK features to implement:
- `expo-splash-screen` - App loading screen
- `expo-status-bar` - Status bar configuration
- `expo-tracking-transparency` - iOS tracking
- `@react-native-community/datetimepicker` - Date/time selection
- `expo-image-picker` - Image selection
- Safe area handling with `react-native-safe-area-context`

## File Naming Conventions

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase with .d.ts (e.g., `Auth.d.ts`)
- Schemas: camelCase (e.g., `auth.ts`)
- Hooks: camelCase starting with 'use' (e.g., `useAuth.ts`)

## Git Workflow

1. Create feature branches from `main`
2. Run all checks before committing
3. Write descriptive commit messages
4. Keep commits atomic and focused

## Development Commands

```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run typecheck  # Check TypeScript
npm run format     # Format code with Prettier
npm run test       # Run tests
```

## Environment Setup

Required tools:
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator
- VS Code with recommended extensions

## Common Patterns

### Form Component Template
```typescript
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { View, TextInput, Button, Text } from 'react-native';

const MyForm = () => {
  const formik = useFormik<FormType>({
    initialValues: defaultValues,
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      // Handle submission
    },
  });

  return (
    <View>
      <TextInput
        value={formik.values.field}
        onChangeText={formik.handleChange('field')}
        onBlur={formik.handleBlur('field')}
      />
      {formik.touched.field && formik.errors.field && (
        <Text>{formik.errors.field}</Text>
      )}
      <Button onPress={() => formik.handleSubmit()} title="Submit" />
    </View>
  );
};
```

### Custom Hook Template
```typescript
import { useState, useEffect } from 'react';

export const useCustomHook = (param: ParamType): ReturnType => {
  const [state, setState] = useState<StateType>(initialState);

  useEffect(() => {
    // Effect logic
  }, [param]);

  return state;
};
```

## Troubleshooting

### Common Issues

1. **Babel Plugin Error**: Ensure plugins in babel.config.js don't use `require.resolve()`
2. **NativeWind Not Working**: Check metro.config.js and global.css setup
3. **Types Not Found**: Ensure .d.ts files are in /types and tsconfig includes them
4. **Form Validation Not Working**: Check Zod schema and formik adapter usage

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [NativeWind Documentation](https://www.nativewind.dev)
- [Formik Documentation](https://formik.org)
- [Zod Documentation](https://zod.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)