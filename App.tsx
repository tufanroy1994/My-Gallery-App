import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GalleryScreen, LoginScreen } from './src/screens';
import { AuthProvider } from './src/context/AuthContext';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID.googleusercontent.com',
      iosClientId: 'YOUR_IOS_CLIENT_ID.googleusercontent.com',
    });
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            }),
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
