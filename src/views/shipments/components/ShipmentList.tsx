import {FlatList, View} from 'react-native';
import React from 'react';
import {useGetFakeShipments} from '../api';
import {ShipmentTile, ShipmentTileLoader} from './ShipmentTile';
import {SCREEN_PADDING} from 'utils';
import {StackView} from 'components';
import {FilterSheet} from '../sheets';
import {Filter} from './Filter';
import {ListHeader} from './ListHeader';
import {ScanBarcode} from './ScanBarcode';
import {useToggle} from 'hooks';

export const ShipmentList = () => {
  const [isToggled, toggle] = useToggle();
  const {isLoading, onRefetch, shipments} = useGetFakeShipments();
  const [filters, setFilters] = React.useState<string[]>([]);
  // const {data, isLoading, refetch, isRefetching} = useGetShipment();

  const [markedShipments, setMarkShipment] = React.useState(new Set());

  const onToggleMarkShipment = (id: string) => {
    const newSet = new Set(markedShipments);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setMarkShipment(newSet);
  };

  const onToggleMarkAllShipments = () => {
    let newSet = new Set();
    if (markedShipments.size == 20) {
      setMarkShipment(new Set());
    } else {
      for (const shipment of shipments) {
        newSet.add(shipment.shippingId);
      }
      setMarkShipment(newSet);
    }
  };

  const onCheckIsMarked = (id: string) => {
    return markedShipments.has(id);
  };

  const filteredShipment = React.useMemo(() => {
    return shipments.filter(shipment => {
      if (filters.length === 0) return true;
      return filters.includes(shipment.status);
    });
  }, [filters, shipments]);

  return (
    <View style={{flex: 1}}>
      <StackView style={{marginVertical: 24, justifyContent: 'space-between', paddingHorizontal: SCREEN_PADDING}}>
        <Filter onPress={toggle} />
        <ScanBarcode />
      </StackView>
      <ListHeader markedAll={markedShipments.size == 20} onMarkAll={onToggleMarkAllShipments} />

      {isLoading && shipments.length == 0 ? (
        <ShipmentTileLoader />
      ) : (
        <FlatList
          refreshing={isLoading}
          onRefresh={onRefetch}
          keyExtractor={i => i.shippingId}
          contentContainerStyle={{paddingHorizontal: SCREEN_PADDING, marginTop: 20, paddingBottom: 30}}
          renderItem={({item}) => <ShipmentTile isMarked={onCheckIsMarked(item.shippingId)} onMarkedShipment={onToggleMarkShipment} shipment={item} />}
          // data={data} DATA WILL REPLACE shipmentHistory IF API WERE TO BE WORKING
          data={!!filters ? filteredShipment : shipments}
        />
      )}
      <FilterSheet status={filters} onDone={setFilters} visible={isToggled} onClose={toggle} />
    </View>
  );
};
