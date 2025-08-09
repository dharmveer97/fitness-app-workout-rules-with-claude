import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/state/store';
import { Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { updateProfile } from '@/state/slices/authSlice';

const ProfileSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  heightCm: z.string().optional(),
  weightKg: z.string().optional(),
});

export default function ProfileScreen() {
  const user = useSelector((s: RootState) => s.auth.user);
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} className="flex-1 bg-white dark:bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-4">
          <Text className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">Profile</Text>
          <Formik
            initialValues={{
              name: user?.name ?? '',
              email: user?.email ?? '',
              heightCm: user?.heightCm ? String(user.heightCm) : '',
              weightKg: user?.weightKg ? String(user.weightKg) : '',
            }}
            validationSchema={toFormikValidationSchema(ProfileSchema)}
            onSubmit={(values) => {
              dispatch(
                updateProfile({
                  name: values.name,
                  email: values.email,
                  heightCm: values.heightCm ? Number(values.heightCm) : undefined,
                  weightKg: values.weightKg ? Number(values.weightKg) : undefined,
                })
              );
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View className="gap-4">
                <View>
                  <Text className="text-gray-700 dark:text-gray-200 mb-2">Name</Text>
                  <TextInput
                    className="rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-50"
                    placeholder="Your name"
                    placeholderTextColor="#9CA3AF"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {touched.name && errors.name ? <Text className="text-red-500 mt-1">{String(errors.name)}</Text> : null}
                </View>

                <View>
                  <Text className="text-gray-700 dark:text-gray-200 mb-2">Email</Text>
                  <TextInput
                    className="rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-50"
                    placeholder="you@example.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email ? <Text className="text-red-500 mt-1">{String(errors.email)}</Text> : null}
                </View>

                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <Text className="text-gray-700 dark:text-gray-200 mb-2">Height (cm)</Text>
                    <TextInput
                      className="rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-50"
                      placeholder="175"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="number-pad"
                      onChangeText={handleChange('heightCm')}
                      onBlur={handleBlur('heightCm')}
                      value={values.heightCm}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-700 dark:text-gray-200 mb-2">Weight (kg)</Text>
                    <TextInput
                      className="rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-50"
                      placeholder="70"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="number-pad"
                      onChangeText={handleChange('weightKg')}
                      onBlur={handleBlur('weightKg')}
                      value={values.weightKg}
                    />
                  </View>
                </View>

                <TouchableOpacity className="mt-2 rounded-xl bg-primary-500 py-4" onPress={() => handleSubmit()}>
                  <Text className="text-center font-semibold text-white">Save changes</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
