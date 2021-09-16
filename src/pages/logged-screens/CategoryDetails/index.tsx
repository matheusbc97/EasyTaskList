import React, {useEffect, useRef} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {
  ScreenWrapper,
  Header,
  OutlineButton,
  Separator,
} from '@/shared/components';
import {AuthenticatedStackParams} from '@/navigation/types';
import TaskDetailsModal, {
  TaskDetailsModalHandles,
} from '@/shared/modals/TaskDetailsModal';
import TaskList from '@/templates/lists/TaskList';

import useFetchTasks from '@/hooks/useFetchTasks';
import useTasksOfCategory from '@/hooks/useTasksOfCategory';
import {useTranslation} from '@/shared/hooks';

import {Content} from './styles';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategoryDetails'>;
  route: RouteProp<AuthenticatedStackParams, 'CategoryDetails'>;
}

const CategoryDetails: React.FC<Props> = ({route, navigation}) => {
  const taskModalRef = useRef<TaskDetailsModalHandles>(null);
  const {translation} = useTranslation();
  const category = route.params.category;

  const {tasks, tasksFetchState} = useTasksOfCategory(category.id);
  const fetchTasks = useFetchTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <ScreenWrapper style={{marginHorizontal: 5}}>
        <Header
          title={category.name}
          onBackPress={() => navigation.navigate('BottomNavigation')}
        />
        <Content>
          <TaskList
            onRefresh={fetchTasks}
            tasks={tasks}
            onTaskPress={task => taskModalRef.current?.open(task)}
            tasksFetchState={tasksFetchState}
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
      <TaskDetailsModal ref={taskModalRef} />
    </>
  );
};

export default CategoryDetails;
