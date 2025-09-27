import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { user, isLoading, signIn } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate('GalleryScreen' as never);
    }
  }, [user, navigation]);

  const handleGoogleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(
        'Sign In Error',
        'Failed to sign in with Google. Please try again.',
        [{ text: 'OK' }],
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

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
          onPress={handleGoogleSignIn}
        >
          {/* <Icon name="login" size={24} color="#fff" style={styles.googleIcon} /> */}
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Secure authentication • Voice captions • Cross-platform sync
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
