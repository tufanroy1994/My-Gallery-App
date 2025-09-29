import React, { ReactNode } from 'react';
import { TouchableOpacity, Alert, Platform } from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
  CameraOptions,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

interface ImagePickerProps {
  onImageSelected: (imageUri: string) => void;
  children: ReactNode;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelected,
  children,
}) => {
  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;

      const result = await request(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };

  const requestGalleryPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      let permission;
      if (Platform.Version >= 33) {
        permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      } else {
        permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }

      const result = await request(permission);

      if (result === RESULTS.GRANTED) return true;

      if (result === RESULTS.DENIED) {
        Alert.alert('Permission Denied', 'Gallery access denied by user');
        return false;
      }

      if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Gallery permission is blocked. Please enable it in Settings',
        );
        return false;
      }
      return false;
    }

    // iOS photo library permission
    return true;
  };

  const showImagePicker = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const hasPermission = await requestCameraPermission();
            if (hasPermission) {
              openCamera();
            } else {
              Alert.alert(
                'Permission Required',
                'Camera permission is required to take photos.',
              );
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const hasPermission = await requestGalleryPermission();
            if (hasPermission) {
              openGallery();
            } else {
              Alert.alert(
                'Permission Required',
                'Gallery permission is required to select photos.',
              );
            }
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
      saveToPhotos: true,
      cameraType: 'back',
    };

    launchCamera(options, handleImageResponse);
  };

  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
      selectionLimit: 1,
    };

    launchImageLibrary(options, handleImageResponse);
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }

    if (response.errorCode) {
      console.error('ImagePicker Error:', response.errorMessage);
      Alert.alert(
        'Error',
        response.errorMessage || 'Failed to pick image. Please try again.',
      );
      return;
    }

    if (response.assets && response.assets.length > 0) {
      const asset: Asset = response.assets[0];
      const imageUri = asset.uri;

      if (imageUri) {
        onImageSelected(imageUri);
      } else {
        Alert.alert('Error', 'Failed to get image URI');
      }
    }
  };

  return (
    <TouchableOpacity onPress={showImagePicker}>{children}</TouchableOpacity>
  );
};
