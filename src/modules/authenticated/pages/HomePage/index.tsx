import React from 'react';
import {FlatList} from 'react-native';

import {ScreenWrapper} from '@/modules/shared/components';

import HomeHeader from './components/HomeHeader';
import TasksListSection from './components/TasksListSection';
import CategoryListSection from './components/CategoryListSection';
import HomeFooter from './components/HomeFooter';

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

function HomePage() {
  return (
    <ScreenWrapper>
      <FlatList
        data={HomeListData}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => {
          switch (item) {
            case HomeItemEnum.HEADER:
              return <HomeHeader />;
            case HomeItemEnum.CATEGORIES_LIST:
              return <CategoryListSection />;
            case HomeItemEnum.TASK_LIST:
              return <TasksListSection />;
          }
        }}
      />
      <HomeFooter />
    </ScreenWrapper>
  );
}

export default HomePage;
