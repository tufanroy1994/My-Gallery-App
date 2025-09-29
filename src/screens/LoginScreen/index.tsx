import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
      navigation.navigate('GalleryScreen');
    } catch (error: any) {
      console.log('Login Error:', error);
      Alert.alert('Login Failed', error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* <Icon name="photo-library" size={80} color="#4285F4" /> */}
          <Text style={styles.title}>My Gallery</Text>
          <Text style={styles.subtitle}>
            Store and organize your memories with voice captions
          </Text>
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={'large'} />
          ) : (
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Secure authentication • Voice captions • Cross-platform sync
        </Text>
      </View>
    </View>
  );
};
export default LoginScreen;
