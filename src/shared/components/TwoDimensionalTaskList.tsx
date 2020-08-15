import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useDimensions} from '@react-native-community/hooks';

import TaskListItem from './TaskListItem';
import {Task} from '@shared/models';

interface Props {
  tasks: any[];
  offset?: number;
  onItemPress(task: Task): void;
}

const TwoDimensionalTaskList: React.FC<Props> = ({
  tasks,
  offset = 0,
  onItemPress,
}) => {
  const [tasksScrollEnabled, setTasksScrollEnabled] = useState(false);
  const width = useDimensions().window.width;

  return (
    <FlatList
      style={{paddingVertical: 10}}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      horizontal
      data={tasks}
      renderItem={({item}) => (
        <View style={{width: width - offset}}>
          <FlatList<Task>
            nestedScrollEnabled={tasksScrollEnabled}
            data={item.data}
            keyExtractor={(task) => task.id}
            renderItem={({item: task}) => (
              <TaskListItem task={task} onPress={() => onItemPress(task)} />
            )}
          />
        </View>
      )}
    />
  );
};

export default TwoDimensionalTaskList;
