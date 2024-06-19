import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreens} from './types';
import {LoginScreen, SplashScreen} from 'views';

const Nav = createStackNavigator<AuthScreens>();

export const AuthStack = () => {
  return (
    <Nav.Navigator
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Nav.Screen name="login" component={LoginScreen} />
      <Nav.Screen name="splash" component={SplashScreen} />
    </Nav.Navigator>
  );
};
