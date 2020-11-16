import React, {useEffect, useState, useCallback} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Text,
  ScreenWrapper,
  //TwoDimensionalTaskList,
  OutlineButton,
  TaskListItem,
  FlatListWithFetchIndicator,
} from '@shared/components';
import {selectAppTheme} from '@store/configs';
import {AuthenticatedStackParams} from '@navigation/types';

import {
  Header,
  HeaderContent,
  Body,
  FooterSeparator,
  Footer,
  VerticalSeparator,
} from './styles';
import {
  getTasks,
  tasksListSelectors,
  selectTasksFetchState,
} from '@store/tasks';

import TaskDetailsModal from '../../../shared/modals/TaskDetailsModal';
import {Task} from '@shared/models';

type TaskListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: TaskListNavigationProp;
}

const TaskList: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const appTheme = useSelector(selectAppTheme);
  const tasks = useSelector(tasksListSelectors.selectAll);
  const fetchState = useSelector(selectTasksFetchState);

  const [taskSelected, setTaskSelected] = useState<Task | null>(null);

  /*const tasksSections = [
    {
      title: 'HOJE',
      data: tasks,
    },
    {
      title: 'Amanhã',
      data: tasks,
    },
  ];*/

  const handleTaskDetailsModalEditButtonPress = useCallback(() => {
    if (taskSelected) {
      const selectedTask = {
        ...taskSelected,
      };

      setTaskSelected(null);
      navigation.navigate('TaskForm', {task: selectedTask});
    }
  }, [navigation, taskSelected]);

  return (
    <ScreenWrapper>
      <Header backgroundColor={appTheme.aboveBackground}>
        <Text type="title-big"> Minhas tarefas</Text>
        {false && (
          <HeaderContent>
            <Text>Todas</Text>
            <VerticalSeparator color={appTheme.textColor} />
            <Text>Em Andamento</Text>
            <VerticalSeparator color={appTheme.textColor} />
            <Text>Concluídas</Text>
          </HeaderContent>
        )}
      </Header>
      <Body backgroundColor={appTheme.aboveBackground}>
        <FlatListWithFetchIndicator
          onRefresh={() => dispatch(getTasks())}
          emptyListText={'Nenhuma Tarefa Encontrada'}
          hasError={fetchState.hasError}
          isLoading={fetchState.isLoading}
          style={{marginVertical: 10}}
          data={tasks}
          keyExtractor={(task) => task.id}
          renderItem={({item: task}) => (
            <TaskListItem task={task} onPress={() => setTaskSelected(task)} />
          )}
        />
        {/*<TwoDimensionalTaskList
          tasks={tasksSections}
          offset={30}
          onItemPress={setTaskSelected}
        />*/}
      </Body>
      <View style={{marginHorizontal: 20}}>
        <FooterSeparator />
      </View>
      <Footer>
        <OutlineButton
          iconName="plus"
          text="Criar Nova Tarefa"
          onPress={() => navigation.navigate('TaskForm')}
        />
      </Footer>
      <TaskDetailsModal
        onEditButtonPress={handleTaskDetailsModalEditButtonPress}
        task={taskSelected}
        onBackButtonPress={() => setTaskSelected(null)}
      />
    </ScreenWrapper>
  );
};

export default TaskList;
