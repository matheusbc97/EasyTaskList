import {StackNavigationProp} from '@react-navigation/stack';
import {UnauthenticatedStackParams} from '@navigation/types';

export type ForgotPasswordFormNavigation = StackNavigationProp<
  UnauthenticatedStackParams,
  'ForgotPasswordForm'
>;

export interface Props {
  navigation: ForgotPasswordFormNavigation;
}

export interface FormDetails {
  email: string;
}
