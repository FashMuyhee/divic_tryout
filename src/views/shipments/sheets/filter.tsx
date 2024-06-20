import {View, Modal, Pressable} from 'react-native';
import React from 'react';
import {BORDER_RADIUS, COLORS, SCREEN_HEIGHT, SCREEN_WIDTH} from 'utils';
import {StackView, Text} from 'components';
import {useGetShipmentStatusList, shipmentStatusList} from '../api';

type Props = {
  visible: boolean;
  onClose: () => void;
  status: string[];
  onDone: (s: string[]) => void;
};

type FilterChipProps = {
  status: string;
  onChange: (s: string) => void;
  selected: boolean;
};

const FilterChip = ({onChange, status, selected}: FilterChipProps) => {
  return (
    <Pressable
      onPress={() => onChange(status)}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingHorizontal: 14,
        borderRadius: BORDER_RADIUS,
        backgroundColor: COLORS.DIRT_GREY,
        borderWidth: selected ? 1 : 0,
        borderColor: COLORS.ROYAL_BLUE,
      }}>
      <Text color={selected ? COLORS.PRIMARY : COLORS.BLUE_GREY} textTransform="capitalize">
        {status}
      </Text>
    </Pressable>
  );
};

export const FilterSheet = ({onClose, visible, onDone, status}: Props) => {
  const [filters, setFilters] = React.useState<string[]>([]);
  const {data, isLoading} = useGetShipmentStatusList();

  const onChange = (s: string) => {
    if (findStatus(s)) {
      const filter = filters.filter(e => e != s);
      setFilters(filter);
    } else {
      setFilters([...filters, s]);
    }
  };

  const findStatus = (status: string) => {
    return !!filters.find(e => e == status);
  };

  const onFilterDone = () => {
    onDone(filters);
    onClose();
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose} transparent>
      <View style={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,.4)'}}>
        <Pressable style={{flex: 1}} onPress={onClose} />
        <View style={{backgroundColor: COLORS.WHITE, height: SCREEN_HEIGHT * 0.4, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <StackView align="center" justify="space-between" style={{height: 50, paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: '#EAE7F2'}}>
            <Text onPress={onClose} fontWeight="medium" fontSize={16} color={COLORS.PRIMARY}>
              Cancel
            </Text>
            <Text fontSize={16} fontWeight="bold">
              Filters
            </Text>
            <Text onPress={onFilterDone} fontSize={16} fontWeight="medium" color={COLORS.PRIMARY}>
              Done
            </Text>
          </StackView>
          <View style={{paddingHorizontal: 24, paddingVertical: 10}}>
            <Text fontWeight="medium" fontSize={13} color={COLORS.BLUE_GREY}>
              SHIPMENT STATUS
            </Text>

            <StackView style={{flexWrap: 'wrap', columnGap: 10, rowGap: 10, marginTop: 20}}>
              {/* data will replace shipmentStatusList if API  were to be working */}
              {shipmentStatusList.map((item, i) => (
                <FilterChip onChange={onChange} key={i} selected={findStatus(item)} status={item} />
              ))}
            </StackView>
          </View>
        </View>
      </View>
    </Modal>
  );
};
