import React, {useEffect, useRef} from 'react';
import {View, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {ScreenWrapper, CreateNewTaskButton} from '@shared/components';
import {useTranslation} from '@/shared/hooks';
import {AuthenticatedStackParams} from '@/navigation/types';
import TaskDetailsModal, {
  TaskDetailsModalHandles,
} from '@shared/modals/TaskDetailsModal';
import useGetUser from '@/hooks/useGetUser';
import useTaskNotDone from '@/hooks/useTaskNotDone';
import useCategories from '@/hooks/useCategories';
import useFetchTasks from '@/hooks/useFetchTasks';
import TasksList from '@/templates/lists/TaskList';

import CategoriesList from './templates/CategoriesList';
import HomeHeader from './components/HomeHeader';
import HomeSection from './components/HomeSection';

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
  const taskModalRef = useRef<TaskDetailsModalHandles>(null);

  const user = useGetUser();
  const {lsCategories, lsCategoriesFetchState} = useCategories();

  const fetchTasks = useFetchTasks();
  const {tasksFetchState, tasksNotDone} = useTaskNotDone();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
                <HomeSection title={translation('TASKS_NOT_DONE')}>
                  <TasksList
                    tasks={tasksNotDone}
                    tasksFetchState={tasksFetchState}
                    onTaskPress={task => taskModalRef.current?.open(task)}
                  />
                </HomeSection>
              );
            default:
              return null;
          }
        }}
      />
      <View style={{paddingVertical: 5, paddingHorizontal: 20}}>
        <CreateNewTaskButton />
      </View>
      <TaskDetailsModal ref={taskModalRef} onBackButtonPress={() => {}} />
    </ScreenWrapper>
  );
};

export default Home;
