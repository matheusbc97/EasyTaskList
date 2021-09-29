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

export type CreateTaskFormRouteProp = RouteProp<
  AuthenticatedStackParams,
  'CreateTaskForm'
>;
export type CreateTaskFormNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'CreateTaskForm'
>;

export interface Props {
  route: CreateTaskFormRouteProp;
  navigation: CreateTaskFormNavigationProp;
}
