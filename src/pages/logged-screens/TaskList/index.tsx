import React from 'react';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Text,
  ScreenWrapper,
  CreateNewTaskButton,
  Separator,
} from '@/shared/components';
import {selectAppTheme} from '@/store/configs';
import {AuthenticatedStackParams} from '@/navigation/types';
import useTasks from '@/hooks/useTasks';
import useFetchTasks from '@/hooks/useFetchTasks';
import {useTranslation} from '@/shared/hooks';
import TaskList from '@/templates/lists/TaskList';

import {Header, Body, Footer} from './styles';

type TaskListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: TaskListNavigationProp;
}

const TaskListPage: React.FC<Props> = ({navigation}) => {
  const {translation} = useTranslation();
  const fetchTasks = useFetchTasks();

  const appTheme = useSelector(selectAppTheme);

  const {tasks, tasksFetchState} = useTasks();

  return (
    <ScreenWrapper>
      <Header backgroundColor={appTheme.aboveBackground}>
        <Text type="title-big">{translation('MY_TASKS')}</Text>
      </Header>
      <Body backgroundColor={appTheme.aboveBackground}>
        <TaskList
          tasks={tasks}
          tasksFetchState={tasksFetchState}
          onTaskPress={task => navigation.navigate('TaskDetails', {task})}
          onRefresh={fetchTasks}
        />
      </Body>
      <Separator />
      <Footer>
        <CreateNewTaskButton />
      </Footer>
    </ScreenWrapper>
  );
};

export default TaskListPage;
