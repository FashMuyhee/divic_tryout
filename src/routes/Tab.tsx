import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BellIcon} from 'components';
import {ProfileIcon, ScanIcon, ShipmentIcon, WalletIcon} from './component';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {BottomTabScreens} from './types';
import {COLORS, FONTS, IS_ANDROID, SCREEN_PADDING} from 'utils';
import {Image, Pressable, View} from 'react-native';
import logoFull from 'assets/imgs/logo-full.png';
import profile from 'assets/imgs/profile.png';
import {IconButton} from 'components/commons/IconButton';
import {ShipmentsScreen} from 'views';
import {useAuth} from 'contexts';

const Tab = createBottomTabNavigator<BottomTabScreens>();
type Props = {
  route: RouteProp<BottomTabScreens>;
};

const PlaceholderScreen = ({route}: Props) => <View style={{flex: 1, backgroundColor: COLORS.WHITE}} />;

export const BottomsTabs = () => {
  const {logout} = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: IS_ANDROID ? 60 : 90, backgroundColor: COLORS.WHITE, paddingBottom: IS_ANDROID ? 10 : 25},
        tabBarLabelStyle: {fontFamily: FONTS.REGULAR, fontSize: 11, textTransform: 'capitalize', marginTop: -10},
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.LIGHT_GREY,
        headerStyle: {backgroundColor: COLORS.WHITE, shadowOffset: {height: 0, width: 0}, elevation: 0},
        headerTitleAlign: 'center',
        headerTitleStyle: {fontFamily: FONTS.MEDIUM},
      }}>
      <Tab.Screen
        name="shipments"
        component={ShipmentsScreen}
        options={{
          tabBarIcon: ({focused}) => <ShipmentIcon active={focused} />,
          headerLeft: () => (
            <Pressable onPress={logout}>
              <Image source={profile} style={{marginLeft: SCREEN_PADDING, width: 40, height: 40, borderRadius: 20, resizeMode: 'center'}} />
            </Pressable>
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
