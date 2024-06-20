import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const SearchIcon = ({color = '#A7A3B3'}: {color: string}) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M16.927 17.04L20.4 20.4m-1.12-8.96a7.84 7.84 0 11-15.68 0 7.84 7.84 0 0115.68 0z" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
};
