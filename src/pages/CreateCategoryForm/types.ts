import {AuthenticatedStackParams} from '@navigation/types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface Props {
  navigation: StackNavigationProp<
    AuthenticatedStackParams,
    'CreateCategoryForm'
  >;
  route: RouteProp<AuthenticatedStackParams, 'CreateCategoryForm'>;
}

export interface FormObject {
  name: string;
}
