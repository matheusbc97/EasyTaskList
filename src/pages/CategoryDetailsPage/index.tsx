import React from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {
  ScreenWrapper,
  Header,
  OutlineButton,
  Separator,
} from '@/shared/components';
import {AuthenticatedStackParams} from '@/navigation/types';

import TaskList from '@/shared/templates/lists/TaskList';

import {useTranslation} from '@/shared/hooks';

import {Content} from './styles';
import {useTasks} from '@/hooks';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategoryDetails'>;
  route: RouteProp<AuthenticatedStackParams, 'CategoryDetails'>;
}

const CategoryDetails: React.FC<Props> = ({route, navigation}) => {
  const {translation} = useTranslation();
  const category = route.params.category;

  const {tasks, hasError, isLoading, refetchTasks} = useTasks();

  return (
    <ScreenWrapper style={{marginHorizontal: 5}}>
      <Header
        title={category.name}
        onBackPress={() => navigation.navigate('BottomNavigation')}
      />
      <Content>
        <TaskList
          onRefresh={refetchTasks}
          tasks={tasks}
          onTaskPress={task => navigation.navigate('TaskDetails', {task})}
          hasError={hasError}
          isLoading={isLoading}
        />
      </Content>
      <Separator />
      <OutlineButton
        style={{marginHorizontal: 20, marginTop: 10}}
        iconName="pen"
        text={translation('EDIT_CATEGORY')}
        onPress={() => navigation.navigate('UpdateCategoryForm', {category})}
      />
    </ScreenWrapper>
  );
};

export default CategoryDetails;
