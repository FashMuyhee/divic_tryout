import React from 'react';
import {KeyboardTypeOptions, TextInput as RNTextInput, StyleSheet, View} from 'react-native';
import {TextInputProps} from './types';
import {COLORS, FONTS} from 'utils';
import Animated, {interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Text} from './Text';

const placeholderColor = COLORS.GREY;
const labelColor = COLORS.BLUE_GREY;

export const TextInput = (props: TextInputProps) => {
  const {returnKeyType = 'next', placeholder, value, errorMessage, mb = 15, onChangeText, disabled, inputType = 'text'} = props;
  const isPasswordField = inputType == 'password';
  const isFilled = value !== '' && value !== undefined;

  const [isFocus, setIsFocus] = React.useState(false);
  const isFocusedAnimatedVal = useSharedValue(0);

  const keyboardType = React.useMemo(() => {
    let options: KeyboardTypeOptions = 'default';

    switch (inputType) {
      case 'email':
        options = 'email-address';
        break;
      default:
        options = 'default';
        break;
    }
    return options;
  }, [inputType]);

  const getBorderColor = () => {
    let color = COLORS.GREY;

    if (!!errorMessage) {
      color = COLORS.RED;
    } else {
      color = COLORS.GREY;
    }

    if (isFocus) {
      color = COLORS.PRIMARY;
    }
    return color;
  };

  const animatedLabel = useAnimatedStyle(() => {
    const fontSize = interpolate(isFocusedAnimatedVal.value, [0, 1], [16, 11]);
    const top = interpolate(isFocusedAnimatedVal.value, [0, 1], [18, 8]);
    const color = interpolateColor(isFocusedAnimatedVal.value, [0, 1], [placeholderColor, labelColor]);
    return {
      top,
      fontSize,
      color,
    };
  });

  const onToggleFocusAnimation = (value: number) => {
    isFocusedAnimatedVal.value = withTiming(value);
  };

  const onBlur = () => {
    setIsFocus(false);
    onToggleFocusAnimation(isFilled ? 1 : 0);
  };

  const onFocus = () => {
    setIsFocus(true);
    onToggleFocusAnimation(1);
  };

  return (
    <View style={{marginBottom: mb, width: '100%'}}>
      <View style={[styles.container, {borderWidth: isFocus ? 1 : 0, borderColor: getBorderColor()}]}>
        <Animated.Text style={[styles.label, animatedLabel]}>{placeholder}</Animated.Text>
        <RNTextInput
          selectionColor={COLORS.PRIMARY}
          cursorColor={COLORS.BLACK}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          numberOfLines={1}
          editable={!disabled}
          textAlignVertical="auto"
          onBlur={onBlur}
          onFocus={onFocus}
          secureTextEntry={isPasswordField}
          focusable
          autoCapitalize="none"
        />
      </View>
      {Number(errorMessage?.length) > 0 && (
        <Text color={COLORS.RED} fontSize={12}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 7,
    backgroundColor: '#F4F2F8',
    alignItems: 'center',
    height: 56,
    justifyContent: 'flex-end',
  },

  label: {
    position: 'absolute',
    left: 7,
    fontFamily: FONTS.REGULAR,
  },
  input: {
    backgroundColor: 'transparent',
    height: '70%',
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.PRIMARY,
    paddingVertical: 0,
    overflow: 'scroll',
    flexWrap: 'wrap',
    textAlign: 'justify',
    textAlignVertical: 'auto',
    width: '100%',
  },
});
