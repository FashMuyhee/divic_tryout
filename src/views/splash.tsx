import {StyleSheet} from 'react-native';
import React from 'react';
import {CenterView} from 'components';
import Animated, {interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming} from 'react-native-reanimated';
import logo from 'assets/imgs/logo.png';
import {COLORS, SCREEN_WIDTH} from 'utils';
import {Path, Svg} from 'react-native-svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreens, ProtectedScreens} from 'routes';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

type Props = {
  navigation: StackNavigationProp<AuthScreens | ProtectedScreens>;
};

export const SplashScreen = ({navigation}: Props) => {
  const animatedImageVal = useSharedValue(1 / 4);
  const onboardContent = useSharedValue(0);
  const logoPx = useSharedValue(1);
  const [scaleCompleted, setScaleCompleted] = React.useState(false);

  const logoContentWrapperStyle = useAnimatedStyle(() => {
    return {
      display: onboardContent.value == 1 ? 'none' : 'flex',
    };
  });

  const logoScaleStyle = useAnimatedStyle(() => {
    const scale = animatedImageVal.value;
    return {
      transform: [{scale}],
    };
  });

  const moveLogoTopSection = useAnimatedStyle(() => {
    const translateY = interpolate(logoPx.value, [1, 4], [0, -200]);
    return {
      transform: [{scale: logoPx.value}, {translateY}],
    };
  });

  const moveLogoBottomSection = useAnimatedStyle(() => {
    const translateY = interpolate(logoPx.value, [1, 4], [0, -600]);
    const translateX = interpolate(logoPx.value, [1, 4], [0, -SCREEN_WIDTH * 0.7]);
    const scale = interpolate(logoPx.value, [1, 4], [1, 2]);
    return {
      transform: [{translateY}, {translateX}, {scale}],
    };
  });

  const animatedWrapperStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(logoPx.value, [1, 4], [COLORS.WHITE, COLORS.PRIMARY]);
    return {
      backgroundColor: bgColor,
    };
  });

  const startAnimation = () => {
    //handles logo scaling animation
    animatedImageVal.value = withTiming(1, {duration: 1500}, () => {
      // handles logo swapping
      runOnJS(setScaleCompleted)(true);
    });
    // handle logo position shift and scaling
    logoPx.value = withDelay(
      4000,
      withTiming(4, {duration: 1000}, () => {
        // handles onboarding content
        runOnJS(navigation.replace)('onboarding');
      }),
    );
  };
  React.useEffect(() => {
    startAnimation();
  }, []);

  const LogoContent = () => {
    return (
      <Animated.View style={[styles.logoContent, logoContentWrapperStyle]}>
        {!scaleCompleted ? (
          <Animated.Image source={logo} style={[styles.logo, logoScaleStyle]} />
        ) : (
          <CenterView style={{rowGap: 4}}>
            <AnimatedSvg width={146} height={48} viewBox="0 0 146 48" style={[moveLogoTopSection]} fill="none">
              <Path d="M145.231 0c0 13.244-5.377 25.241-14.07 33.936-8.496 8.492-20.191 13.85-33.119 14.053H.776L48.994 0h96.237z" fill="#2F50C1" />
            </AnimatedSvg>
            <AnimatedSvg width={146} height={92} viewBox="0 0 144 92" style={[moveLogoBottomSection]} fill="none">
              <Path
                d="M143.374 43.64L94.784 92H.949v-.101l-.028-.017v-.168c0-1.668.372-13.329 7.378-24.517 3.574-5.695 8.78-11.273 16.616-15.586 7.178-3.943 22.315-7.617 34.777-7.55l-.371 15.924 18.816-17.979L60.15 23.185l-.057 2.578-.315 13.53c-3.926-.135-9.969-.067-16.845 1.28L3.037.826h97.324l43.013 42.816z"
                fill="#2F50C1"
              />
            </AnimatedSvg>
          </CenterView>
        )}
      </Animated.View>
    );
  };

  return (
    <Animated.View style={[styles.wrapper, animatedWrapperStyle]}>
      <LogoContent />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
  },
  logoContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 146,
    height: 146,
    resizeMode: 'contain',
  },
  halfLogo: {
    width: SCREEN_WIDTH * 0.6,
    height: 144,
    resizeMode: 'contain',
  },
});
