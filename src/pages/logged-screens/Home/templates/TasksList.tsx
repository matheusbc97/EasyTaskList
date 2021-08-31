import React from 'react';

import {FlatListWithFetchIndicator, TaskListItem} from '@shared/components';
import {useTranslation} from '@shared/hooks';
import {Task, FetchState} from '@/shared/models';

import HomeSection from '../components/HomeSection';

interface TasksListProps {
  tasks: Task[];
  tasksFetchState: FetchState;
  onTaskPress: (category: Task) => void;
}

function TasksList({tasks, tasksFetchState, onTaskPress}: TasksListProps) {
  const {translation} = useTranslation();

  return (
    <HomeSection title={translation('TASKS_NOT_DONE')}>
      <FlatListWithFetchIndicator
        data={tasks}
        isLoading={tasksFetchState.isLoading}
        hasError={tasksFetchState.hasError}
        emptyListText={translation('NO_TASK_TO_DO')}
        keyExtractor={task => task.id}
        renderItem={({item: task}) => (
          <TaskListItem task={task} onPress={() => onTaskPress(task)} />
        )}
      />
    </HomeSection>
  );
}

export default TasksList;
