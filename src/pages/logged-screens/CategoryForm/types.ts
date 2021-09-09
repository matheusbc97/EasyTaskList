import {AuthenticatedStackParams} from '@navigation/types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategoryForm'>;
  route: RouteProp<AuthenticatedStackParams, 'CategoryForm'>;
}

export interface FormObject {
  name: string;
}
