import React, {useRef} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {Text, ScreenWrapper, CreateNewTaskButton} from '@/shared/components';
import {selectAppTheme} from '@/store/configs';
import {AuthenticatedStackParams} from '@/navigation/types';
import TaskDetailsModal, {
  TaskDetailsModalHandles,
} from '@/shared/modals/TaskDetailsModal';
import useTasks from '@/hooks/useTasks';
import useFetchTasks from '@/hooks/useFetchTasks';
import {useTranslation} from '@/shared/hooks';
import TaskList from '@/templates/lists/TaskList';

import {Header, Body, FooterSeparator, Footer} from './styles';

type TaskListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: TaskListNavigationProp;
}

const TaskListPage: React.FC<Props> = ({}) => {
  const {translation} = useTranslation();
  const fetchTasks = useFetchTasks();
  const taskModalRef = useRef<TaskDetailsModalHandles>(null);

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
          onTaskPress={task => taskModalRef.current?.open(task)}
          onRefresh={fetchTasks}
        />
      </Body>
      <View style={{marginHorizontal: 20}}>
        <FooterSeparator />
      </View>
      <Footer>
        <CreateNewTaskButton />
      </Footer>
      <TaskDetailsModal ref={taskModalRef} />
    </ScreenWrapper>
  );
};

export default TaskListPage;
