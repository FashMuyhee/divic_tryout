import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './Auth';
import {ProtectedStack} from './Protected';

export const AppRouter = () => {
  return (
    <NavigationContainer>
      <ProtectedStack />
    </NavigationContainer>
  );
};
