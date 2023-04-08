import React from 'react';
import {Section} from '@/modules/shared/components';
import {useTranslation} from '@/modules/shared/hooks';
import TasksList from '@/modules/shared/templates/lists/TaskList';

import {useTaskNotDone} from '@/modules/shared/hooks';
import {AuthenticateStackNavigationProp} from '@/modules/shared/types/AuthenticateStackPageProps';
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
