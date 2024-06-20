import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './Auth';
import {ProtectedStack} from './Protected';
import {useAuth} from 'contexts';

export const AppRouter = () => {
  const {isAuth} = useAuth();
  return <NavigationContainer>{isAuth ? <ProtectedStack /> : <AuthStack />}</NavigationContainer>;
};
