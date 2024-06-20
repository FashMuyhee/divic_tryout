import {TouchableNativeFeedback, StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';
import {ButtonProps} from './types';
import {COLORS} from 'utils';
import {Text} from './Text';

export const Button = ({onPress, text, isLoading, textColor = COLORS.WHITE, bgColor = COLORS.PRIMARY, style, disabled = false}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  const bg = React.useMemo(() => {
    if (disabled) return '#EAE7F2';
    return bgColor;
  }, [disabled]);

  const color = React.useMemo(() => {
    if (disabled) return COLORS.LIGHT_GREY;
    return textColor;
  }, [disabled]);

  return (
    <TouchableNativeFeedback onPress={onPress} disabled={isDisabled}>
      <View style={[styles.wrapper, {backgroundColor: bg}, style]}>
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.WHITE} />
        ) : (
          <Text textAlign="center" color={color} fontSize={17} fontWeight="bold">
            {isLoading ? 'Loading' : text}
          </Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    justifyContent: 'center',
  },
});
