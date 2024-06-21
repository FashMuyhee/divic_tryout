import {Checkbox, StackView, Text} from 'components';
import React from 'react';
import {COLORS, SCREEN_PADDING} from 'utils';

type Props = {
  onMarkAll: () => void;
  markedAll: boolean;
};

export const ListHeader = (props: Props) => {
  return (
    <StackView style={{paddingHorizontal: SCREEN_PADDING, width: '100%'}} align="center" justify="space-between">
      <Text fontSize={22} fontWeight="bold">
        Shipments
      </Text>
      <StackView align="center" style={{columnGap: 5}}>
        <Checkbox isChecked={props.markedAll} onChange={props.onMarkAll} />
        <Text onPress={props.onMarkAll} fontSize={18} color={COLORS.PRIMARY}>
          Mark All
        </Text>
      </StackView>
    </StackView>
  );
};
