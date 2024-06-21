import {CenterView, Text} from 'components';
import {COLORS} from 'utils';
import {ShipmentStatus} from '../api';
import React from 'react';

type Props = {
  status: ShipmentStatus;
};

const StatusTagBase = ({status}: Props) => {
  const color = React.useMemo(() => {
    switch (status) {
      case 'canceled':
        return '#58536E';
      case 'delivered':
        return '#208D28';
      case 'received':
        return COLORS.PRIMARY;
      case 'on hold':
        return '#DB7E21';
      case 'error':
        return COLORS.RED;
      default:
        return COLORS.RED;
    }
  }, [status]);

  const bgColor = React.useMemo(() => {
    switch (status) {
      case 'canceled':
        return COLORS.DIRT_GREY;
      case 'delivered':
        return '#E3FAD6';
      case 'received':
        return '#D9E6FD';
      case 'on hold':
        return '#FFF3D5';
      case 'error':
        return '#FEE3D4';
      default:
        return '#FEE3D4';
    }
  }, [status]);

  return (
    <CenterView style={{backgroundColor: bgColor, borderRadius: 4, borderWidth: 1, borderColor: COLORS.WHITE, paddingHorizontal: 6, paddingVertical: 4}}>
      <Text fontSize={11} color={color} textTransform="uppercase" textAlign="center">
        {status}
      </Text>
    </CenterView>
  );
};

export const StatusTag = React.memo(StatusTagBase);
