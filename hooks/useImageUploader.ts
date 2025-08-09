import * as ImagePicker from 'expo-image-picker'
import { useState, Dispatch, SetStateAction } from 'react'
import { Alert } from 'react-native'

export const useImageUploader = (
  onImageUploaded?: (uri: string) => void,
): UseImageUploaderResult => {
  const [image, setImage]: [
    string | null,
    Dispatch<SetStateAction<string | null>>,
  ] = useState<string | null>(null)

  const [uploading, setUploading]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false)

  const simulateUpload = async (uri: string): Promise<void> => {
    return new Promise((resolve) => {
      if (uri) {
        setTimeout(() => resolve(), 1000)
      } else {
        resolve()
      }
    })
  }

  const handleImagePicked = async (uri: string): Promise<void> => {
    try {
      setUploading(true)
      await simulateUpload(uri)
      setImage(uri)
      onImageUploaded?.(uri)
    } catch (error) {
      console.error('Upload error:', error)
      Alert.alert(
        'Upload failed',
        'Sorry, the image upload failed. Please try again.',
      )
    } finally {
      setUploading(false)
    }
  }

  const pickImage = async (): Promise<void> => {
    try {
      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage: string = result.assets[0].uri
        await handleImagePicked(selectedImage) // Await the promise here
      }
    } catch (error) {
      console.error('Error picking image:', error)
      Alert.alert('Error', 'Failed to select image. Please try again.')
    }
  }

  const takePhoto = async (): Promise<void> => {
    try {
      const { status }: { status: ImagePicker.PermissionStatus } =
        await ImagePicker.requestCameraPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Camera permission is required to take photos',
        )
        return
      }

      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage: string = result.assets[0].uri
        await handleImagePicked(selectedImage)
      }
    } catch (error) {
      console.error('Error taking photo:', error)
      Alert.alert('Error', 'Failed to take photo. Please try again.')
    }
  }

  return {
    image,
    uploading,
    pickImage,
    takePhoto,
  }
}
