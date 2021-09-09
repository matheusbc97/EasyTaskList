import React, {useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Text,
  ScreenWrapper,
  OutlineButton,
  TaskListItem,
  FlatListWithFetchIndicator,
} from '@shared/components';
import {selectAppTheme} from '@store/configs';
import {AuthenticatedStackParams} from '@navigation/types';
import TaskDetailsModal from '@/shared/modals/TaskDetailsModal';
import {Task} from '@shared/models';
import useTasks from '@/hooks/useTasks';
import useFetchTasks from '@/hooks/useFetchTasks';
import {useTranslation} from '@/shared/hooks';

import {Header, Body, FooterSeparator, Footer} from './styles';

type TaskListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: TaskListNavigationProp;
}

const TaskList: React.FC<Props> = ({navigation}) => {
  const {translation} = useTranslation();
  const fetchTasks = useFetchTasks();

  const appTheme = useSelector(selectAppTheme);

  const [taskSelected, setTaskSelected] = useState<Task | null>(null);

  const {tasks, tasksFetchState} = useTasks();

  const handleTaskDetailsModalEditButtonPress = () => {
    if (taskSelected) {
      const selectedTask = {
        ...taskSelected,
      };

      setTaskSelected(null);
      navigation.navigate('UpdateTaskForm', {task: selectedTask});
    }
  };

  return (
    <ScreenWrapper>
      <Header backgroundColor={appTheme.aboveBackground}>
        <Text type="title-big">{translation('MY_TASKS')}</Text>
      </Header>
      <Body backgroundColor={appTheme.aboveBackground}>
        <FlatListWithFetchIndicator
          onRefresh={fetchTasks}
          emptyListText={translation('NO_TASKS_FOUND')}
          hasError={tasksFetchState.hasError}
          isLoading={tasksFetchState.isLoading}
          style={{marginVertical: 10}}
          data={tasks}
          keyExtractor={task => task.id}
          renderItem={({item: task}) => (
            <TaskListItem task={task} onPress={() => setTaskSelected(task)} />
          )}
        />
      </Body>
      <View style={{marginHorizontal: 20}}>
        <FooterSeparator />
      </View>
      <Footer>
        <OutlineButton
          iconName="plus"
          text={translation('CREATE_NEW_TASK')}
          onPress={() => navigation.navigate('CreateTaskForm')}
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
