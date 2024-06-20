import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const CancelIcon = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18m12 0L6 6" stroke="#6E91EC" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
};
