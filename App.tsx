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
      webClientId:
        '827378856723-6ai5bg5mer1lisc63r91p4ggudiacdg4.apps.googleusercontent.com',
      iosClientId:
        '827378856723-couvoru5ug7outfb07kp5c9j633q7nbf.apps.googleusercontent.com',
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
