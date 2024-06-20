import {KeyboardType, ReturnKeyType, StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface ButtonProps {
  onPress?: () => void;
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  textColor?: string;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
  withIcon?: boolean;
  icon?: React.ReactElement;
}

export interface TextProps {
  children?: string | undefined | React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  fontWeight?: 'bold' | 'medium' | 'regular';
  fontSize?: number;
  textAlign?: TextStyle['textAlign'];
  textTransform?: TextStyle['textTransform'];
  onPress?: () => void;
  truncate?: boolean;
  truncateLength?: number;
  numberLines?: number;
}

export interface ScreenWrapperProps {
  bg?: string;
  children: React.ReactNode;
  padding?: number;
  padded?: boolean;
  noEdges?: boolean;
  style?: StyleProp<ViewStyle>;
  barColor?: string;
}

export interface IconButtonProps {
  icon: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
  rounded?: boolean;
  bg?: string;
}

export type TextInputType = 'text' | 'password' | 'email' | 'url';

export interface TextInputProps {
  returnKeyType?: ReturnKeyType;
  placeholder?: string;
  errorMessage?: string | null;
  required?: boolean;
  mb?: number;
  disabled?: boolean;
  value?: string;
  onChangeText?: (t: string) => void;
  inputType?: TextInputType;
}

export interface CheckboxProps {
  isChecked?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}
