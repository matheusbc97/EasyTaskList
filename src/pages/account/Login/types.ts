import {StackNavigationProp} from '@react-navigation/stack';
import {AccountStackParams} from '../../../navigation/types';

type LoginScreenNavigationProp = StackNavigationProp<
  AccountStackParams,
  'Login'
>;

export interface Props {
  navigation: LoginScreenNavigationProp;
}

export interface FormDetails {
  email: string;
  password: string;
}
