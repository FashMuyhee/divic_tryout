import {View, StyleSheet, Pressable, Linking} from 'react-native';
import React from 'react';
import {ArrowRightIcon, Button, Checkbox, ExpandIcon, ParcelIcon, PhoneIcon, StackView, Text, WhatsappIcon} from 'components';
import Animated, {Easing, interpolate, interpolateColor, ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {BORDER_RADIUS, COLORS, SCREEN_PADDING} from 'utils';
import {useToggle} from 'hooks';
import {Shipment} from '../api';
import {StatusTag} from './StatusTag';

type Props = {
  shipment: Shipment;
  isMarked: boolean;
  onMarkedShipment: (id: string) => void;
};

const ShipmentTileBaseComponent = ({shipment, isMarked, onMarkedShipment}: Props) => {
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
        <Checkbox isChecked={isMarked} onChange={() => onMarkedShipment(shipment.shippingId)} />
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

export const ShipmentTileLoader = () => {
  return (
    <View style={{paddingHorizontal: SCREEN_PADDING, marginTop: 20}}>
      {Array(2)
        .fill(4)
        .map((_, index) => (
          <StackView key={`loader_${index}`} style={[styles.container, styles.loaderContainer]} align="center" justify="space-between">
            <View style={styles.checkbox} />
            <View style={styles.details} />
            <View style={styles.status} />
            <View style={styles.toggle} />
          </StackView>
        ))}
    </View>
  );
};

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
  loaderContainer: {
    backgroundColor: COLORS.DIRT_GREY,
    marginBottom: 10,
    borderRadius: BORDER_RADIUS,
    paddingVertical: 10,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 5,
    backgroundColor: `${COLORS.GREY}40`,
  },
  details: {
    height: '100%',
    backgroundColor: `${COLORS.GREY}40`,
    width: '45%',
  },
  status: {
    width: '20%',
    height: 20,
    backgroundColor: `${COLORS.GREY}40`,
    borderRadius: 5,
  },
  toggle: {
    width: 30,
    height: 30,
    backgroundColor: `${COLORS.GREY}40`,
    borderRadius: 15,
  },
});
