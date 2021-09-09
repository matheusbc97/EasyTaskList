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

export interface Props {
  route: RouteProp<AuthenticatedStackParams, 'UpdateTaskForm'>;
  navigation: StackNavigationProp<AuthenticatedStackParams, 'UpdateTaskForm'>;
}
