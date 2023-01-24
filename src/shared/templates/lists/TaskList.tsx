import React from 'react';

import {FlatListWithFetchIndicator, TaskListItem} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';
import {Task, FetchState} from '@/shared/models';

interface TasksListProps {
  tasks: Task[];
  isLoading: boolean;
  hasError: boolean;
  onTaskPress: (task: Task) => void;
  onRefresh?: () => void;
}

function TasksList({
  tasks,
  isLoading,
  hasError,
  onTaskPress,
  onRefresh,
}: TasksListProps) {
  const {translation} = useTranslation();

  return (
    <FlatListWithFetchIndicator
      onRefresh={onRefresh}
      data={tasks}
      isLoading={isLoading}
      hasError={hasError}
      emptyListText={translation('NO_TASK_TO_DO')}
      keyExtractor={task => task.id}
      renderItem={({item: task}) => (
        <TaskListItem task={task} onPress={() => onTaskPress(task)} />
      )}
    />
  );
}

export default TasksList;
