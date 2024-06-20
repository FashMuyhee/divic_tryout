import {View, Image, StatusBar} from 'react-native';
import React from 'react';
import {COLORS, SCREEN_PADDING, SCREEN_WIDTH} from 'utils';
import logoFull from 'assets/imgs/logo-full.png';
import {Button} from 'components';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreens} from 'routes';
import {useToggle} from 'hooks';
import {LoginScreen} from './auth';

type Props = {
  navigation: StackNavigationProp<AuthScreens>;
};

export const OnboardingScreen = ({navigation}: Props) => {
  const [isLoginVisible, onToggleLogin] = useToggle();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.PRIMARY,
        paddingHorizontal: SCREEN_PADDING * 1.2,
      }}>
      <StatusBar backgroundColor={COLORS.PRIMARY} barStyle="light-content" />
      <Image source={logoFull} style={{width: SCREEN_WIDTH * 0.6, height: 36}} />
      <Button onPress={onToggleLogin} text="Login" bgColor={COLORS.WHITE} textColor={COLORS.PRIMARY} style={{position: 'absolute', bottom: 50}} />
      <LoginScreen isVisible={isLoginVisible} onClose={onToggleLogin} />
    </View>
  );
};
