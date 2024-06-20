import {View} from 'react-native';
import React from 'react';
import {COLORS, SCREEN_PADDING} from 'utils';
import {StackView, Text} from 'components';
import {Filter, ScanBarcode, Searchbar} from './components';

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
      <StackView style={{marginVertical: 24, justifyContent: 'space-between', paddingHorizontal: SCREEN_PADDING}}>
        <Filter />
        <ScanBarcode />
      </StackView>
    </View>
  );
};
