import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BellIcon} from 'components';
import {ProfileIcon, ScanIcon, ShipmentIcon, WalletIcon} from './component';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {BottomTabScreens} from './types';
import {COLORS, FONTS, IS_ANDROID, SCREEN_PADDING} from 'utils';
import {Image, View} from 'react-native';
import logoFull from 'assets/imgs/logo-full.png';
import {IconButton} from 'components/commons/IconButton';
import {ShipmentsScreen} from 'views';

const Tab = createBottomTabNavigator<BottomTabScreens>();
type Props = {
  route: RouteProp<BottomTabScreens>;
};

const PlaceholderScreen = ({route}: Props) => <View style={{flex: 1, backgroundColor: COLORS.WHITE}} />;

export const BottomsTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: IS_ANDROID ? 60 : 90, backgroundColor: COLORS.WHITE},
        tabBarLabelStyle: {fontFamily: FONTS.REGULAR, fontSize: 11, textTransform: 'capitalize', marginTop: -10},
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.LIGHT_GREY,
        headerStyle: {backgroundColor: COLORS.WHITE, shadowOffset: {height: 0, width: 0}},
      }}>
      <Tab.Screen
        name="shipments"
        component={ShipmentsScreen}
        options={{
          tabBarIcon: ({focused}) => <ShipmentIcon active={focused} />,
          headerLeft: () => (
            <Image
              source={{
                uri: 'https://pixabay.com/get/gcced22f629d6f007d0e28d89341ca63fa171304457a3d8049ec9a2def2502112e246824630dfa93f7822cfabceb610f1d30a0ba91ae6f7fe2ea0bb9245364fde0679b60eafa9f619ae153be1f51bbe02_1280.png?attachment=',
              }}
              style={{marginLeft: SCREEN_PADDING, width: 40, height: 40, borderRadius: 20, resizeMode: 'center'}}
            />
          ),
          headerRight: () => <IconButton icon={<BellIcon />} style={{marginRight: SCREEN_PADDING}} size={40} bg="#F4F2F8" />,
          headerTitle: () => <Image style={{height: 16, tintColor: COLORS.PRIMARY, width: 90, resizeMode: 'contain'}} source={logoFull} />,
        }}
      />
      <Tab.Screen name="scan" component={PlaceholderScreen} options={{tabBarIcon: ({focused}) => <ScanIcon active={focused} />}} />
      <Tab.Screen name="wallet" component={PlaceholderScreen} options={{tabBarIcon: ({focused}) => <WalletIcon active={focused} />}} />
      <Tab.Screen name="profile" component={PlaceholderScreen} options={{tabBarIcon: ({focused}) => <ProfileIcon active={focused} />}} />
    </Tab.Navigator>
  );
};
