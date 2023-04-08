import {AuthenticatedStackParams} from '@navigation/types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface FormObject {
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
}

export type UpdateTaskFormRoute = RouteProp<
  AuthenticatedStackParams,
  'UpdateTaskForm'
>;
export type UpdateTaskFormNavigation = StackNavigationProp<
  AuthenticatedStackParams,
  'UpdateTaskForm'
>;

export interface Props {
  route: UpdateTaskFormRoute;
  navigation: UpdateTaskFormNavigation;
}
