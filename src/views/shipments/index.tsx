import {FlatList, StatusBar, View} from 'react-native';
import React from 'react';
import {COLORS, SCREEN_PADDING} from 'utils';
import {StackView, Text} from 'components';
import {ListHeader, Filter, ScanBarcode, Searchbar, ShipmentTile} from './components';
import {useToggle} from 'hooks';
import {FilterSheet} from './sheets';
import {shipmentHistory} from './api/mock-shipment';

type Props = {};

export const ShipmentsScreen = (props: Props) => {
  const [isToggled, toggle] = useToggle();
  const [filters, setFilters] = React.useState<string[]>([]);

  const filteredShipment = React.useMemo(() => {
    return shipmentHistory.filter(shipment => {
      if (filters.length === 0) return true;
      return filters.includes(shipment.status);
    });
  }, [filters]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.WHITE, paddingTop: 20}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
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
        keyExtractor={i => i.shippingId}
        contentContainerStyle={{paddingHorizontal: SCREEN_PADDING, marginTop: 10}}
        renderItem={({item}) => <ShipmentTile shipment={item} />}
        data={!!filters ? filteredShipment : shipmentHistory}
      />
      <FilterSheet status={filters} onDone={setFilters} visible={isToggled} onClose={toggle} />
    </View>
  );
};
