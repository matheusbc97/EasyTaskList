import React from 'react';
import {Section} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';
import TasksList from '@/shared/templates/lists/TaskList';

import {useTaskNotDone} from '@/shared/hooks';
import {AuthenticateStackNavigationProp} from '@/shared/types/AuthenticateStackPageProps';
import {useNavigation} from '@react-navigation/native';

function TasksListSection() {
  const {translation} = useTranslation();
  const navigation =
    useNavigation<AuthenticateStackNavigationProp<'BottomNavigation'>>();

  const {
    tasksNotDone,
    hasError: hasTasksError,
    isLoading: isTasksLoading,
    refetchTasksNotDone,
  } = useTaskNotDone();

  return (
    <Section title={translation('TASKS_NOT_DONE')}>
      <TasksList
        onRefresh={refetchTasksNotDone}
        tasks={tasksNotDone}
        isLoading={isTasksLoading}
        hasError={hasTasksError}
        onTaskPress={task => navigation.navigate('TaskDetails', {task})}
      />
    </Section>
  );
}

export default TasksListSection;
