import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Text,
  ScreenWrapper,
  TwoDimensionalTaskList,
  OutlineButton,
} from '@shared/components';
import {selectAppTheme} from '@store/configs';
import {AuthenticatedStackParams} from '@navigation/types';

import {
  Header,
  HeaderContent,
  Body,
  FooterSeparator,
  Footer,
  VerticalSeparator,
} from './styles';
import {getUserTasks} from '@shared/firebase';

type TaskListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: TaskListNavigationProp;
}

const TaskList: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    async function getTaks() {
      console.log('task', await getUserTasks());
    }

    getTaks();
  }, []);

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
      <Header backgroundColor={appTheme.aboveBackground}>
        <Text type="title-big"> Minhas tarefas</Text>
        <HeaderContent>
          <Text>Todas</Text>
          <VerticalSeparator color={appTheme.textColor} />
          <Text>Em Andamento</Text>
          <VerticalSeparator color={appTheme.textColor} />
          <Text>Concluídas</Text>
        </HeaderContent>
      </Header>
      <Body backgroundColor={appTheme.aboveBackground}>
        <TwoDimensionalTaskList tasks={tasks} offset={30} />
      </Body>
      <View style={{marginHorizontal: 20}}>
        <FooterSeparator />
      </View>
      <Footer>
        <OutlineButton
          iconName="plus"
          text="Criar Nova Tarefa"
          onPress={() => navigation.navigate('TaskForm')}
        />
      </Footer>
    </ScreenWrapper>
  );
};

export default TaskList;
