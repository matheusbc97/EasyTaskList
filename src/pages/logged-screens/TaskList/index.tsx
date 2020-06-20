import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Text,
  ScreenWrapper,
  TwoDimensionalTaskList,
  TaskListItem,
  OutlineButton
} from '../../../library/components';
import {selectAppTheme} from '../../../store/configs';
import {AuthenticatedStackParams} from '../../../navigation/types';

import styles from './styles';

type TaskListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

const VerticalSeparator = ({color = ''}) => (
  <View
    style={{
      width: 2,
      height: '100%',
      backgroundColor: color,
      marginHorizontal: 5,
    }}
  />
);

interface Props {
  navigation: TaskListNavigationProp;
}

const TaskList: React.FC<Props> = ({navigation}) => {
  const appTheme = useSelector(selectAppTheme);

  const tasks = [
    {
      title: 'HOJE',
      data: [8, 2, 1, 3],
    },
    {
      title: 'Amanhã',
      data: [1, 5, 8, 2, 1, 3],
    },
    {
      title: '14/06',
      data: [1, 5, 8, 2],
    },
    {
      title: '15/06',
      data: [1, 5, 1, 3],
    },
  ];

  return (
    <ScreenWrapper>
      <View
        style={{
          backgroundColor: appTheme.aboveBackground,
          elevation: 3,
          paddingTop: 10,
          paddingBottom: 10,
          borderBottomStartRadius: 40,
          borderBottomEndRadius: 40,
          paddingHorizontal: 20,
          marginHorizontal: 5,
        }}>
        <Text type="title-big"> Minhas tarefas</Text>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 6,
            marginVertical: 5,
          }}>
          <Text>Todas</Text>
          <VerticalSeparator color={appTheme.textColor} />
          <Text>Em Andamento</Text>
          <VerticalSeparator color={appTheme.textColor} />
          <Text>Concluídas</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: appTheme.aboveBackground,
          elevation: 2,
          marginHorizontal: 10,
          paddingHorizontal: 5,
          marginVertical: 10,
          borderRadius: 10,
          flex: 1,
        }}>
        <TwoDimensionalTaskList tasks={tasks} offset={30} />
      </View>
      <View style={{marginHorizontal: 20}}>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#e0e0e0',
          }}
        />
      </View>
      {/*<View
        style={{
          backgroundColor: appTheme.aboveBackground,
          elevation: 2,
          marginHorizontal: 10,
          paddingHorizontal: 10,
          marginVertical: 10,
          borderRadius: 10,
          paddingVertical: 10,
        }}>
        <Text type="title-medium">Correr 3 Km</Text>
        <Text>
          Acordar cedo e correr em volta do quarteirão de casa por cerca de 3km
        </Text>
        <Text type="subtitle">08h até 8:30h</Text>
        <View style={{alignItems: 'center', marginTop: 2}}>
          <Text>VER MAIS / EDITAR</Text>
        </View>
      </View>*/}
      <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
        <OutlineButton
          iconName="plus"
          text="Criar Nova Tarefa"
          onPress={() => navigation.navigate('TaskForm')}
        />
      </View>
    </ScreenWrapper>
  );
};

export default TaskList;
