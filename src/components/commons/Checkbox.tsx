import React from 'react';
import {CheckboxProps} from './types';
import {BORDER_RADIUS, COLORS} from 'utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import check from 'assets/imgs/check.png';

export const Checkbox = ({disabled, onChange, isChecked}: CheckboxProps) => {
  return (
    <BouncyCheckbox
      fillColor="#dae5fd"
      innerIconStyle={{borderWidth: 1, borderRadius: BORDER_RADIUS / 2, borderColor: isChecked ? COLORS.PRIMARY : COLORS.LIGHT_GREY}}
      iconStyle={{borderRadius: BORDER_RADIUS / 2}}
      size={20}
      disabled={disabled}
      isChecked={isChecked}
      onPress={onChange}
      checkIconImageSource={check}
      iconImageStyle={{height: 12, width: 14}}
    />
  );
};
