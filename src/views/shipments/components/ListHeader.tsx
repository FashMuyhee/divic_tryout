import {Checkbox, StackView, Text} from 'components';
import {useToggle} from 'hooks';
import React from 'react';
import {COLORS, SCREEN_PADDING} from 'utils';

type Props = {};

export const ListHeader = (props: Props) => {
  const [checked, onCheck] = useToggle();

  return (
    <StackView style={{paddingHorizontal: SCREEN_PADDING, width: '100%'}} align="center" justify="space-between">
      <Text fontSize={22} fontWeight="bold">
        Shipments
      </Text>
      <StackView align="center" style={{columnGap: 5}}>
        <Checkbox isChecked={checked} onChange={onCheck} />
        <Text fontSize={18} color={COLORS.PRIMARY}>
          Mark All
        </Text>
      </StackView>
    </StackView>
  );
};
