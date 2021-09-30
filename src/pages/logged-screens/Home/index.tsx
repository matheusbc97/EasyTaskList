import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  ScreenWrapper,
  CreateNewTaskButton,
  Section,
  Separator,
} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';
import {AuthenticatedStackParams} from '@/navigation/types';
import useGetUser from '@/hooks/useGetUser';
import useTaskNotDone from '@/hooks/useTaskNotDone';
import useCategories from '@/hooks/useCategories';
import useFetchTasks from '@/hooks/useFetchTasks';
import TasksList from '@/templates/lists/TaskList';

import CategoriesList from './templates/CategoriesList';
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
                <Section
                  title={translation('CATEGORIES')}
                  contentStyle={{height: 143}}>
                  <CategoriesList
                    lsCategories={lsCategories}
                    lsCategoriesFetchState={lsCategoriesFetchState}
                    onCategoryPress={category =>
                      navigation.navigate('CategoryDetails', {category})
                    }
                  />
                </Section>
              );
            case HomeItemEnum.TASK_LIST:
              return (
                <Section title={translation('TASKS_NOT_DONE')}>
                  <TasksList
                    onRefresh={fetchTasks}
                    tasks={tasksNotDone}
                    tasksFetchState={tasksFetchState}
                    onTaskPress={task =>
                      navigation.navigate('TaskDetails', {task})
                    }
                  />
                </Section>
              );
            default:
              return null;
          }
        }}
      />
      <Separator style={{marginTop: 5}} />
      <View style={{paddingVertical: 5, paddingHorizontal: 20}}>
        <CreateNewTaskButton />
      </View>
    </ScreenWrapper>
  );
};

export default Home;
