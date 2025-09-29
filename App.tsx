import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import { AuthProvider } from './src/context/AuthContext';
import { AppColors } from './src/utils';

const App = () => {
  return (
    <>
      <AuthProvider>
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor={AppColors.PRIMARY_BACKGROUND}
        />
        <AppNavigation />
      </AuthProvider>
    </>
  );
};

export default App;
