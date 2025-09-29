import React, { useContext } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import { LoginScreen, GalleryScreen } from '../screens';
import { RootStackParamList } from './types/RootStackTypes';
import { AppColors, navigationRef } from '../utils';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const appTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: AppColors.PRIMARY_BACKGROUND,
      text: AppColors.PRIMARY_TEXT,
    },
  };

  return (
    <NavigationContainer theme={appTheme} ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
