import {View, Image} from 'react-native';
import React from 'react';
import {COLORS, SCREEN_PADDING, SCREEN_WIDTH} from 'utils';
import logoFull from 'assets/imgs/logo-full.png';
import {Button} from 'components';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreens} from 'routes';

type Props = {
  navigation: StackNavigationProp<AuthScreens>;
};

export const OnboardingScreen = ({navigation}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.PRIMARY,
        paddingHorizontal: SCREEN_PADDING * 1.2,
      }}>
      <Image source={logoFull} style={{width: SCREEN_WIDTH * 0.6, height: 36}} />
      <Button onPress={() => navigation.navigate('login')} text="Login" bgColor={COLORS.WHITE} textColor={COLORS.PRIMARY} style={{position: 'absolute', bottom: 50}} />
    </View>
  );
};
