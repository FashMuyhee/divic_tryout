import {Pressable} from 'react-native';
import React from 'react';
import {BORDER_RADIUS, COLORS} from 'utils';
import {ScanIcon, Text} from 'components';

type Props = {};

export const ScanBarcode = (props: Props) => {
  return (
    <Pressable style={{flexDirection: 'row', height: 44, width: '48%', borderRadius: BORDER_RADIUS, backgroundColor: COLORS.PRIMARY, alignItems: 'center', justifyContent: 'center', columnGap: 10}}>
      <ScanIcon />
      <Text fontSize={16} color={COLORS.WHITE}>
        Add Scan
      </Text>
    </Pressable>
  );
};
