import {FlatList, View} from 'react-native';
import React from 'react';
import {COLORS, SCREEN_PADDING} from 'utils';
import {Checkbox, StackView, Text} from 'components';
import {ListHeader, Filter, ScanBarcode, Searchbar, ShipmentTile, ShipmentStatus} from './components';
import {useToggle} from 'hooks';
import {FilterSheet} from './sheets';

type Props = {};

export const ShipmentsScreen = (props: Props) => {
  const [isToggled, toggle] = useToggle();
  const [filters, setFilters] = React.useState<string[]>([]);

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
        <Filter onPress={toggle} />
        <ScanBarcode />
      </StackView>
      <ListHeader />
      <FlatList
        contentContainerStyle={{paddingHorizontal: SCREEN_PADDING, marginTop: 10}}
        renderItem={({item}) => <ShipmentTile status={item} />}
        data={['canceled', 'canceled', 'delivered', 'error', 'on hold', 'received', 'received'] as ShipmentStatus[]}
      />
      <FilterSheet status={filters} onDone={setFilters} visible={isToggled} onClose={toggle} />
    </View>
  );
};
