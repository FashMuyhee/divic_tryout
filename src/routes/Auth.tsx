import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {AuthScreens} from './types';
import {OnboardingScreen, SplashScreen} from 'views';

const Nav = createStackNavigator<AuthScreens>();

export const AuthStack = () => {
  return (
    <Nav.Navigator
      initialRouteName="onboarding"
      screenOptions={{
        headerShown: false,
      }}>
      <Nav.Screen name="splash" component={SplashScreen} />
      <Nav.Screen
        name="onboarding"
        component={OnboardingScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
    </Nav.Navigator>
  );
};
