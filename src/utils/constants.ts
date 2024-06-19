import {Dimensions, Platform} from 'react-native';

/**
 *  default fonts
 */
export const FONTS = {
  REGULAR: 'Inter-Regular',
  BOLD: 'Inter-Bold',
  MEDIUM: 'Inter-Medium',
};

/**
 * COLORS LIST
 */
export const COLORS = {
  PRIMARY: '#2F50C1',
  PRIMARY_2: '#4169E1',
  PRIMARY_DISABLED: '#D9E6FD',
  ROYAL_BLUE: '#6E91EC',
  WHITE: '#FFF',
  OFF_WHITE: '#F4F4F4',
  BLACK: 'black',
  RED: '#D12030',
  GREY: '#B6B6B6',
  LIGHT_GREY: '#A7A3B3',
  BLUE_GREY: '#58536E',
  ORANGE: '#DB7E21',
  GREEN: '#208D28',
};

export const SCREEN_PADDING = 16;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const IS_ANDROID = Platform.OS == 'android';
