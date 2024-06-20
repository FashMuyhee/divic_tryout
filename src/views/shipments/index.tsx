import {FlatList, View} from 'react-native';
import React from 'react';
import {COLORS, SCREEN_PADDING} from 'utils';
import {Checkbox, StackView, Text} from 'components';
import {ListHeader, Filter, ScanBarcode, Searchbar, ShipmentTile, ShipmentStatus} from './components';
import {useToggle} from 'hooks';

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
      <ListHeader />
      <FlatList
        contentContainerStyle={{paddingHorizontal: SCREEN_PADDING, marginTop: 10}}
        renderItem={({item}) => <ShipmentTile status={item} />}
        data={['canceled', 'canceled', 'delivered', 'error', 'on hold', 'received', 'received'] as ShipmentStatus[]}
      />
      <View style={{paddingHorizontal: SCREEN_PADDING}}></View>
    </View>
  );
};
