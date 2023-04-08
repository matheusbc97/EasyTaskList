import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthenticatedStackParams} from '@/modules/core/navigation/types';

type ChangeThemeFormNavigation = StackNavigationProp<
  AuthenticatedStackParams,
  'ChangeThemeForm'
>;
type ChangeThemeFormRoute = RouteProp<
  AuthenticatedStackParams,
  'ChangeThemeForm'
>;

export interface Props {
  navigation: ChangeThemeFormNavigation;
  route: ChangeThemeFormRoute;
}
