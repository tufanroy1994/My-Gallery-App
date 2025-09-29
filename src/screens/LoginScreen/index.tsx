import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Alert, Image } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

import { AppImages, AppColors, hp, wp } from '../../utils';
import { useAppNavigation } from '../../hooks';
import { styles } from './styles';

GoogleSignin.configure({
  webClientId:
    '827378856723-6ai5bg5mer1lisc63r91p4ggudiacdg4.apps.googleusercontent.com',
  iosClientId:
    '827378856723-couvoru5ug7outfb07kp5c9j633q7nbf.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

const LoginScreen = () => {
  const navigation = useAppNavigation('LoginScreen');

  const [loading, setLoading] = useState(false);

  const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('u', userInfo);
    return userInfo;
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const userInfo = await GoogleLogin(); // Google sign-in
      console.log(userInfo);
      navigation.navigate('GalleryScreen', { user: userInfo });
    } catch (error: any) {
      console.log('Login Error:', error);
      Alert.alert('Login Failed', error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer]}>
        <Image source={AppImages.LOGO} style={[styles.logo]} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>My Gallery</Text>
            <Text style={styles.subtitle}>
              Store and organize your memories with voice captions
            </Text>
          </View>
          {loading ? (
            <ActivityIndicator color={AppColors.PRIMARY_TEXT} size={'large'} />
          ) : (
            <GoogleSigninButton
              style={{ width: wp(50), height: hp(7) }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={handleGoogleLogin}
            />
          )}
          <Text style={styles.footerText}>
            Secure authentication • Voice captions • Cross-platform sync
          </Text>
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;
