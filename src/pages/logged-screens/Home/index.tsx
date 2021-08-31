import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {ScreenWrapper, OutlineButton} from '@shared/components';
import {useTranslation} from '@shared/hooks';
import {AuthenticatedStackParams} from '@navigation/types';
import TaskDetailsModal from '@shared/modals/TaskDetailsModal';
import {Task} from '@shared/models';
import useGetUser from '@/hooks/useGetUser';
import useTaskNotDone from '@hooks/useTaskNotDone';
import useCategories from '@hooks/useCategories';
import useFetchTasks from '@/hooks/useFetchTasks';

import CategoriesList from './templates/CategoriesList';
import TasksList from './templates/TasksList';
import HomeHeader from './components/HomeHeader';

type TaskListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: TaskListNavigationProp;
}

// eslint-disable-next-line no-shadow
enum HomeItemEnum {
  HEADER,
  CATEGORIES_LIST,
  TASK_LIST,
}

const HomeListData = [
  HomeItemEnum.HEADER,
  HomeItemEnum.CATEGORIES_LIST,
  HomeItemEnum.TASK_LIST,
];

const Home: React.FC<Props> = ({navigation}) => {
  const {translation} = useTranslation();

  const fetchTasks = useFetchTasks();
  const user = useGetUser();
  const {lsCategories, lsCategoriesFetchState} = useCategories();
  const {tasksFetchState, tasksNotDone} = useTaskNotDone();

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
        data={HomeListData}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => {
          switch (item) {
            case HomeItemEnum.HEADER:
              return <HomeHeader user={user} />;
            case HomeItemEnum.CATEGORIES_LIST:
              return (
                <CategoriesList
                  lsCategories={lsCategories}
                  lsCategoriesFetchState={lsCategoriesFetchState}
                  onCategoryPress={category =>
                    navigation.navigate('CategoryDetails', {category})
                  }
                />
              );
            case HomeItemEnum.TASK_LIST:
              return (
                <TasksList
                  tasks={tasksNotDone}
                  tasksFetchState={tasksFetchState}
                  onTaskPress={task => setTaskSelected(task)}
                />
              );
            default:
              return null;
          }
        }}
      />
      <View style={{paddingVertical: 5, paddingHorizontal: 20}}>
        <OutlineButton
          iconName="plus"
          text={translation('CREATE_NEW_TASK')}
          onPress={() => navigation.navigate('TaskForm')}
        />
      </View>
      <TaskDetailsModal
        onEditButtonPress={handleTaskDetailsModalEditButtonPress}
        task={taskSelected}
        onBackButtonPress={() => setTaskSelected(null)}
      />
    </ScreenWrapper>
  );
};

export default Home;
