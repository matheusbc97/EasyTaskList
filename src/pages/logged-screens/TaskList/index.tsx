import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
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
import {getTasks, tasksListSelectors} from '@store/tasks';

type TaskListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: TaskListNavigationProp;
}

const TaskList: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const appTheme = useSelector(selectAppTheme);
  const tasks = useSelector(tasksListSelectors.selectAll);

  const tasksSections = [
    {
      title: 'HOJE',
      data: tasks,
    },
    {
      title: 'Amanhã',
      data: tasks,
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
        <TwoDimensionalTaskList tasks={tasksSections} offset={30} />
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
