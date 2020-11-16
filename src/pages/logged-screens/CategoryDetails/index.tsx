import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {createSelector} from '@reduxjs/toolkit';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  ScreenWrapper,
  Header,
  FlatListWithFetchIndicator,
  TaskListItem,
} from '@shared/components';
import {AuthenticatedStackParams} from '@navigation/types';
import {
  getTasks,
  selectTasksFetchState,
  selectTaskOfCategory,
} from '@store/tasks';

import {Content} from './styles';
import TaskDetailsModal from '@shared/modals/TaskDetailsModal';
import {Task} from '@shared/models';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategoryDetails'>;
  route: RouteProp<AuthenticatedStackParams, 'CategoryDetails'>;
}

const CategoryDetails: React.FC<Props> = ({route, navigation}) => {
  const category = useMemo(() => route.params.category, [
    route.params.category,
  ]);

  const dispatch = useDispatch();
  const selectTasks = useMemo(() => selectTaskOfCategory(category), [category]);
  const tasks = useSelector(selectTasks);
  const tasksFetchState = useSelector(selectTasksFetchState);
  const dispatchGetTasks = useCallback(() => dispatch(getTasks()), [dispatch]);

  useEffect(() => {
    dispatchGetTasks();
  }, [dispatchGetTasks]);

  const [taskSelected, setTaskSelected] = useState<Task | null>(null);

  const handleTaskDetaisModalEditButtonPress = useCallback(() => {
    if (taskSelected) {
      const selectedTask = {
        ...taskSelected,
      };

      setTaskSelected(null);
      navigation.navigate('TaskForm', {task: selectedTask});
    }
  }, [navigation, taskSelected]);

  return (
    <>
      <ScreenWrapper style={{marginHorizontal: 5}}>
        <Header
          title={category.name}
          onBackPress={() => navigation.navigate('BottomNavigation')}
        />
        <Content>
          <FlatListWithFetchIndicator
            data={tasks}
            isLoading={tasksFetchState.isLoading}
            hasError={tasksFetchState.hasError}
            emptyListText="Nenhuma Tarefa a fazer"
            keyExtractor={(task) => task.id}
            onRefresh={dispatchGetTasks}
            renderItem={({item: task}) => (
              <TaskListItem task={task} onPress={() => setTaskSelected(task)} />
            )}
          />
        </Content>
      </ScreenWrapper>
      <TaskDetailsModal
        onEditButtonPress={handleTaskDetaisModalEditButtonPress}
        task={taskSelected}
        onBackButtonPress={() => setTaskSelected(null)}
      />
    </>
  );
};

export default CategoryDetails;
