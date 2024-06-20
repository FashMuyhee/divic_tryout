import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {ProtectedScreens} from './types';
import {SplashScreen} from 'views';
import {BottomsTabs} from './Tab';

const Nav = createStackNavigator<ProtectedScreens>();

export const ProtectedStack = () => {
  return (
    <Nav.Navigator
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Nav.Screen name="splash" component={SplashScreen} />
      <Nav.Screen
        name="dashboard"
        component={BottomsTabs}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
    </Nav.Navigator>
  );
};
