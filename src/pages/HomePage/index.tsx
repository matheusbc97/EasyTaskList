import React from 'react';
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
import useGetUser from '@/shared/hooks/useGetUser';
import TasksList from '@/shared/templates/lists/TaskList';

import CategoriesList from './templates/CategoriesList';
import HomeHeader from './components/HomeHeader';
import {useQueryCategories} from '../../shared/hooks/useGetCategories';
import {useTaskNotDone} from '@/shared/hooks';

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

function HomePage({navigation}: Props) {
  const {translation} = useTranslation();

  const user = useGetUser();
  const {categories, hasError, isLoading} = useQueryCategories();

  const {
    tasksNotDone,
    hasError: hasTasksError,
    isLoading: isTasksLoading,
    refetchTasksNotDone,
  } = useTaskNotDone();

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
                    lsCategories={categories}
                    lsCategoriesFetchState={{hasError, isLoading}}
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
                    onRefresh={refetchTasksNotDone}
                    tasks={tasksNotDone}
                    isLoading={isTasksLoading}
                    hasError={hasTasksError}
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
}

export default HomePage;
