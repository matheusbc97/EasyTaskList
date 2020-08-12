import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useDimensions} from '@react-native-community/hooks';

import TaskListItem from './TaskListItem';
import {Task} from '@shared/models';

interface Props {
  tasks: any[];
  offset?: number;
}

const TwoDimensionalTaskList: React.FC<Props> = ({tasks, offset = 0}) => {
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
        <View style={{width: width - offset, height: 300}}>
          <FlatList<Task>
            nestedScrollEnabled={tasksScrollEnabled}
            data={item.data}
            keyExtractor={(task) => task.id}
            renderItem={({item: task}) => <TaskListItem task={task} />}
          />
        </View>
      )}
    />
  );
};

export default TwoDimensionalTaskList;
