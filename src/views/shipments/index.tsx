import {View} from 'react-native';
import React from 'react';
import {COLORS, SCREEN_PADDING} from 'utils';
import {Text} from 'components';
import {Searchbar} from './components';

type Props = {};

export const ShipmentsScreen = (props: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.WHITE, paddingTop: 20}}>
      <View style={{paddingHorizontal: SCREEN_PADDING}}>
        <Text color={COLORS.LIGHT_GREY} style={{marginBottom: 2}}>
          Hello
        </Text>
        <Text fontWeight="bold" fontSize={28}>
          Ibrahim Shaker
        </Text>
      </View>
      <Searchbar />
    </View>
  );
};
