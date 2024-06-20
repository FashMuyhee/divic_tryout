import {Pressable} from 'react-native';
import React from 'react';
import {BORDER_RADIUS, COLORS} from 'utils';
import {FilterIcon, Text} from 'components';

type Props = {
  onPress: () => void;
};

export const Filter = ({onPress}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={{height: 44, width: '48%', borderRadius: BORDER_RADIUS, backgroundColor: COLORS.DIRT_GREY, alignItems: 'center', justifyContent: 'center', columnGap: 10, flexDirection: 'row'}}>
      <FilterIcon />
      <Text fontSize={16} color={COLORS.BLUE_GREY}>
        Filter
      </Text>
    </Pressable>
  );
};
