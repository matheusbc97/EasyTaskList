import React from 'react';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Text,
  ScreenWrapper,
  CreateNewTaskButton,
  Separator,
} from '@/modules/shared/components';
import {selectAppTheme} from '@/store/configs';
import {AuthenticatedStackParams} from '@/modules/core/navigation/types';
import {useTasks} from '@/modules/shared/hooks';
import {useTranslation} from '@/modules/shared/hooks';
import TaskList from '@/modules/shared/templates/lists/TaskList';

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

  const appTheme = useSelector(selectAppTheme);

  const {tasks, refetchTasks, hasError, isLoading} = useTasks();

  return (
    <ScreenWrapper>
      <Header backgroundColor={appTheme.aboveBackground}>
        <Text type="title-big">{translation('MY_TASKS')}</Text>
      </Header>
      <Body backgroundColor={appTheme.aboveBackground}>
        <TaskList
          tasks={tasks}
          hasError={hasError}
          isLoading={isLoading}
          onTaskPress={task => navigation.navigate('TaskDetails', {task})}
          onRefresh={refetchTasks}
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
