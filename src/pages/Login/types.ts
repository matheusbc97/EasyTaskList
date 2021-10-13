import {StackNavigationProp} from '@react-navigation/stack';
import {UnauthenticatedStackParams} from '@navigation/types';

export type LoginScreenNavigationProp = StackNavigationProp<
  UnauthenticatedStackParams,
  'Login'
>;

export interface Props {
  navigation: LoginScreenNavigationProp;
}

export interface FormDetails {
  email: string;
  password: string;
}
