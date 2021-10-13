import {UnauthenticatedStackParams} from '@navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

export type ChooseUserConfigurationsNavigationProp = StackNavigationProp<
  UnauthenticatedStackParams,
  'ChooseUserConfigurations'
>;

export interface FormDetails {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Props {
  navigation: ChooseUserConfigurationsNavigationProp;
}
