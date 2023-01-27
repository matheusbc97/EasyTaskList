import {ViewStyle, TextStyle} from 'react-native';

export interface HeaderProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onBackPress?: () => void;
  type?: 'secondary' | 'default';
}
