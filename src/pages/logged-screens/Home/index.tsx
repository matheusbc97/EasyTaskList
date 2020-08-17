import React from 'react';
//import {StackNavigationProp} from '@react-navigation/stack';
import {View, FlatList} from 'react-native';

import {
  ScreenWrapper,
  Avatar,
  TwoDimensionalTaskList,
  Text,
  CategoryListItem,
} from '@shared/components';

import {useSelector} from 'react-redux';
import {selectUser} from '@store/account/user';
import {useFormatDate} from '@shared/hooks';
import {categoryListSelectors} from '@store/categories';

import styles from './styles';

//type HomeNavigationProp = StackNavigationProp<RootStackParams, 'DrawerStack'>;

interface Props {
  //navigation: HomeNavigationProp;
}

const Home = ({}: Props) => {
  const user = useSelector(selectUser);
  const lsCategories = useSelector(categoryListSelectors.selectAll);
  const formatDate = useFormatDate();

  const tasks = [
    {
      title: 'HOJE',
      data: [],
    },
    {
      title: 'Amanhã',
      data: [],
    },
    {
      title: '14/06',
      data: [],
    },
    {
      title: '15/06',
      data: [],
    },
  ];

  return (
    <ScreenWrapper>
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(item) => item.toString()}
        renderItem={({item}) => {
          if (item === 1) {
            return (
              <View style={styles.header}>
                <Avatar avatarNumber={user?.avatar} size={50} />
                <View style={styles.headerContent}>
                  <Text type="title-medium">Olá, {user?.name}</Text>
                  <Text>{formatDate(new Date(), 'dateOfMotnhAndYear')}</Text>
                </View>
              </View>
            );
          }

          if (item === 2) {
            return (
              <View>
                <Text type="title-medium" style={styles.title}>
                  Categorias
                </Text>
                <View style={styles.contentWrapper}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={lsCategories}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item: category}) => (
                      <CategoryListItem category={category} />
                    )}
                  />
                </View>
              </View>
            );
          }

          return (
            <View>
              <Text type="title-medium" style={styles.title}>
                Próximas Tarefas
              </Text>
              <View style={[styles.contentWrapper]}>
                <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                  {tasks.map((item) => (
                    <Text
                      style={{
                        borderBottomWidth: 2,
                        marginHorizontal: 5,
                        borderColor: '#4ADDB5',
                        color: '#bdbdbd',
                      }}>
                      {item.title.toUpperCase()}
                    </Text>
                  ))}
                </View>
                <TwoDimensionalTaskList
                  tasks={tasks}
                  offset={30}
                  onItemPress={() => {}}
                />
              </View>
            </View>
          );
        }}
      />
    </ScreenWrapper>
  );
};

export default Home;
