import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from 'utils';

export const ExpandIcon = ({isWhite = false}) => {
  const color = isWhite ? COLORS.WHITE : '#4561DB';
  return (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none">
      <Path d="M9.471 3.167h3.862m0 0v3.862m0-3.862L8.827 7.673m-2.298 6.16H2.667m0 0V9.971m0 3.862l4.506-4.505" stroke={color} strokeWidth={1.33333} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};
