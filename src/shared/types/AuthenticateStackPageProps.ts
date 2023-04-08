import {AuthenticatedStackParams} from '@/navigation/types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type AuthenticateStackNavigationProp<
  T extends keyof AuthenticatedStackParams,
> = StackNavigationProp<AuthenticatedStackParams, T>;

export interface AuthenticateStackPageProps<
  T extends keyof AuthenticatedStackParams,
> {
  navigation: AuthenticateStackNavigationProp<T>;
  route: RouteProp<AuthenticatedStackParams, T>;
}
