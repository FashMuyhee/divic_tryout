import {
  TouchableNativeFeedback,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import React from 'react';
import {ButtonProps} from './types';
import {COLORS} from 'utils';
import {Text} from './Text';

export const Button = ({
  onPress,
  text,
  isLoading,
  textColor = COLORS.WHITE,
  bgColor = COLORS.PRIMARY,
}: ButtonProps) => {
  return (
    <TouchableNativeFeedback onPress={onPress} disabled={isLoading}>
      <View style={[styles.wrapper, {backgroundColor: bgColor}]}>
        {isLoading && <ActivityIndicator size="small" color={COLORS.WHITE} />}
        <Text
          textAlign="center"
          color={textColor}
          fontSize={17}
          fontWeight="bold">
          {isLoading ? 'Loading' : text}
        </Text>
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
