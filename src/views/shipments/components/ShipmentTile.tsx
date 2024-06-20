import {View, StyleSheet, Pressable, Linking} from 'react-native';
import React from 'react';
import {ArrowRightIcon, Button, CenterView, Checkbox, ExpandIcon, ParcelIcon, PhoneIcon, StackView, Text, WhatsappIcon} from 'components';
import Animated, {Easing, interpolate, interpolateColor, ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {BORDER_RADIUS, COLORS} from 'utils';
import {useToggle} from 'hooks';
import {Shipment, ShipmentStatus} from '../api/types';

type Props = {
  shipment: Shipment;
};

const StatusTag = ({status = 'error'}: {status: ShipmentStatus}) => {
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

const ShipmentTileBaseComponent = ({shipment}: Props) => {
  const shareValue = useSharedValue(0);
  const [accordionHeight, setAccordionHeight] = React.useState(0);
  const [isToggled, onToggle] = useToggle();

  const contentHeight = useAnimatedStyle(() => ({
    height: interpolate(shareValue.value, [0, 1], [0, accordionHeight]),
  }));

  const iconBtn = useAnimatedStyle(() => {
    const bg = interpolateColor(shareValue.value, [0, 1], ['#fff', COLORS.ROYAL_BLUE]);
    return {
      backgroundColor: bg,
      borderWidth: shareValue.value,
    };
  });

  const toggleButton = () => {
    shareValue.value = withTiming(shareValue.value === 0 ? 1 : 0, {
      duration: 500,
      easing: Easing.elastic(1),
      reduceMotion: ReduceMotion.System,
    });
    runOnJS(onToggle)();
  };

  const onOpenWhatApp = () => {
    Linking.openURL(`https://wa.me/${shipment.phoneNo}`);
  };

  const onOpenDialer = () => {
    Linking.openURL(`tel:${shipment.phoneNo}`);
  };

  return (
    <View style={styles.wrapper}>
      {/* TOP CONTENT */}
      <View style={styles.container}>
        <Checkbox />
        <ParcelIcon />
        <View style={{width: '40%'}}>
          <Text color="#3F395C" fontSize={13}>
            AWB
          </Text>
          <Text fontWeight="bold" fontSize={18}>
            {shipment.shippingId}
          </Text>
          <StackView align="center" style={{columnGap: 5}}>
            <Text fontSize={13} color="#757281" truncate>
              {shipment.origin.city}
            </Text>
            <ArrowRightIcon />
            <Text fontSize={13} color="#757281" truncate>
              {shipment.destination.city}
            </Text>
          </StackView>
        </View>
        <StackView style={{flex: 1}} justify="space-between">
          <StatusTag status={shipment.status} />
          <Pressable hitSlop={{left: 10, right: 10, bottom: 10, top: 10}} onPress={toggleButton}>
            <Animated.View style={[styles.iconBtn, iconBtn]}>
              <ExpandIcon isWhite={isToggled} />
            </Animated.View>
          </Pressable>
        </StackView>
      </View>
      {/* ACCORDION CONTENT */}
      <Animated.View style={[styles.contentContainer, contentHeight]}>
        <View
          style={styles.content}
          onLayout={event => {
            setAccordionHeight(event.nativeEvent.layout.height);
          }}>
          <StackView align="center" style={{width: '100%', justifyContent: 'space-between'}}>
            <View style={{rowGap: 2, maxWidth: '45%'}}>
              <Text fontSize={11} color={COLORS.PRIMARY}>
                Origin
              </Text>
              <Text numberLines={1} fontSize={16}>
                {shipment.origin.city}
              </Text>
              <Text numberLines={1} color={COLORS.BLUE_GREY} fontSize={13}>
                {shipment.origin.address}
              </Text>
            </View>
            <ArrowRightIcon big />
            <View style={{rowGap: 2, maxWidth: '45%'}}>
              <Text fontSize={11} color={COLORS.PRIMARY}>
                Destination
              </Text>
              <Text numberLines={1} fontSize={16}>
                {shipment.destination.city}
              </Text>
              <Text numberLines={1} color={COLORS.BLUE_GREY} fontSize={13}>
                {shipment.destination.address}
              </Text>
            </View>
          </StackView>
          <StackView align="center" justify="flex-end" style={{columnGap: 10, marginTop: 20}}>
            <Button onPress={onOpenDialer} withIcon bgColor={COLORS.ROYAL_BLUE} icon={<PhoneIcon />} style={styles.button} text="Call" />
            <Button onPress={onOpenWhatApp} withIcon bgColor="#25D366" icon={<WhatsappIcon />} style={styles.button} text="WhatsApp" />
          </StackView>
        </View>
      </Animated.View>
    </View>
  );
};

export const ShipmentTile = React.memo(ShipmentTileBaseComponent);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.DIRT_GREY,
    marginBottom: 8,
  },
  container: {
    height: 70,
    // justifyContent: 'space-between',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  contentContainer: {
    backgroundColor: '#f9f9fb',
    overflow: 'hidden',
    borderBottomEndRadius: BORDER_RADIUS,
    borderBottomStartRadius: BORDER_RADIUS,
    borderTopWidth: 2,
    borderTopColor: COLORS.WHITE,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 14,
    paddingVertical: 7,
    width: '100%',
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    borderRadius: 12,
    height: 25,
    borderColor: '#c8cdf1',
  },
  button: {
    height: 40,
    width: 'auto',
    paddingHorizontal: 20,
  },
});
