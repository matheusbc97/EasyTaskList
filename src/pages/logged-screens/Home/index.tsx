import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  ScreenWrapper,
  Avatar,
  Text,
  CategoryListItem,
  TaskListItem,
  OutlineButton,
} from '@shared/components';
import {useFormatDate, useTranslation} from '@shared/hooks';
import FlatListWithFetchControl from '@shared/components/FlatListWithFetchIndicator';
import {AuthenticatedStackParams} from '@navigation/types';
import TaskDetailsModal from '@shared/modals/TaskDetailsModal';
import {Task} from '@shared/models';
import useGetUser from '@/hooks/useGetUser';
import useTaskNotDone from '@hooks/useTaskNotDone';
import useCategories from '@hooks/useCategories';
import useFetchTasks from '@/hooks/useFetchTasks';

import styles from './styles';

type TaskListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: TaskListNavigationProp;
}

const Home: React.FC<Props> = ({navigation}) => {
  const formatDate = useFormatDate();

  const {lsCategories, lsCategoriesFetchState} = useCategories();
  const {tasksFetchState, tasksNotDone} = useTaskNotDone();

  const user = useGetUser();
  const fetchTasks = useFetchTasks();

  const {translation} = useTranslation();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const [taskSelected, setTaskSelected] = useState<Task | null>(null);

  const navigateToTaskForm = (task: Task) => {
    const navigationOptions = {
      task: {
        ...task,
      },
    };
    navigation.navigate('TaskForm', navigationOptions);
  };

  const handleTaskDetailsModalEditButtonPress = () => {
    if (taskSelected) {
      setTaskSelected(null);
      navigateToTaskForm(taskSelected);
    }
  };

  return (
    <ScreenWrapper>
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => {
          if (item === 1) {
            return (
              <View style={styles.header}>
                <Avatar avatarNumber={user?.avatar} size={50} />
                <View style={styles.headerContent}>
                  <Text type="title-medium">
                    {translation('HELLO')}, {user?.name}
                  </Text>
                  <Text>{formatDate(new Date(), 'dateOfMotnhAndYear')}</Text>
                </View>
              </View>
            );
          }

          if (item === 2) {
            return (
              <View>
                <Text type="title-medium" style={styles.title}>
                  {translation('CATEGORIES')}
                </Text>
                <View style={styles.contentWrapper}>
                  <FlatListWithFetchControl
                    emptyListText={translation('NO_CATEGORIES_FOUND')}
                    hasError={lsCategoriesFetchState.hasError}
                    isLoading={lsCategoriesFetchState.isLoading}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={lsCategories}
                    keyExtractor={category => category.id}
                    renderItem={({item: category}) => (
                      <CategoryListItem
                        category={category}
                        onPress={() =>
                          navigation.navigate('CategoryDetails', {category})
                        }
                      />
                    )}
                  />
                </View>
              </View>
            );
          }

          return (
            <>
              <View>
                <Text type="title-medium" style={styles.title}>
                  {translation('TASKS_NOT_DONE')}
                </Text>
                <View style={[styles.contentWrapper]}>
                  <FlatListWithFetchControl
                    data={tasksNotDone}
                    isLoading={tasksFetchState.isLoading}
                    hasError={tasksFetchState.hasError}
                    emptyListText={translation('NO_TASK_TO_DO')}
                    keyExtractor={task => task.id}
                    onRefresh={fetchTasks}
                    renderItem={({item: task}) => (
                      <TaskListItem
                        task={task}
                        onPress={() => setTaskSelected(task)}
                      />
                    )}
                  />
                </View>
              </View>
              <TaskDetailsModal
                onEditButtonPress={handleTaskDetailsModalEditButtonPress}
                task={taskSelected}
                onBackButtonPress={() => setTaskSelected(null)}
              />
            </>
          );
        }}
      />
      <View style={{paddingVertical: 5, paddingHorizontal: 20}}>
        <OutlineButton
          iconName="plus"
          text={translation('CREATE_NEW_TASK')}
          onPress={() => navigation.navigate('TaskForm')}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Home;
