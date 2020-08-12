import React from 'react';
//import {StackNavigationProp} from '@react-navigation/stack';
import {View, FlatList} from 'react-native';

import {
  ScreenWrapper,
  Avatar,
  TwoDimensionalTaskList,
  Text,
} from '@shared/components';

import styles from './styles';
import CategoryListItem from './CategoryListItem';

//type HomeNavigationProp = StackNavigationProp<RootStackParams, 'DrawerStack'>;

interface Props {
  //navigation: HomeNavigationProp;
}

const Home = ({}: Props) => {
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
                <Avatar avatarNumber={1} size={50} />
                <View style={styles.headerContent}>
                  <Text type="title-medium">Olá, João</Text>
                  <Text>06 de Abril, 2020</Text>
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
                    data={[1, 5, 8, 2, 1, 3]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <CategoryListItem colorIndex={item} />
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
                <TwoDimensionalTaskList tasks={tasks} offset={30} />
              </View>
            </View>
          );
        }}
      />
    </ScreenWrapper>
  );
};

export default Home;
