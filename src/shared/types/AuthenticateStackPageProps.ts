import {AuthenticatedStackParams} from '@/navigation/types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface AuthenticateStackPageProps<
  T extends keyof AuthenticatedStackParams,
> {
  navigation: StackNavigationProp<AuthenticatedStackParams, T>;
  route: RouteProp<AuthenticatedStackParams, T>;
}
