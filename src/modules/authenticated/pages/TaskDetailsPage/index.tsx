import React from 'react';
import {View} from 'react-native';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Text,
  CheckInput,
  Header,
  ScreenWrapper,
  Separator,
  VerticalSeparator,
  Section,
  EditButton,
  DeleteButton,
} from '@/modules/shared/components';
import categoryIconNames from '@/assets/categoryIconNames';
import {
  useTranslation,
  useCategoryColor,
  useFormatDate,
  useUpdateTask,
  useDeleteTask,
} from '@/modules/shared/hooks';
import {AuthenticatedStackParams} from '@/modules/core/navigation/types';
import {QUERY_KEYS} from '@/modules/shared/constants/queryKeys';
import {useQuery} from 'react-query';
import {dbGetTaskById} from '@/database/functions/dbGetTaskById';
import {Task} from '@/modules/shared/models';

import {
  CategoryContainer,
  IconContainer,
  DoneCheckButton,
  Footer,
} from './styles';

export interface TaskDetailsProps {
  route: RouteProp<AuthenticatedStackParams, 'TaskDetails'>;
  navigation: StackNavigationProp<AuthenticatedStackParams, 'TaskDetails'>;
}

export default function TaskDetails({route, navigation}: TaskDetailsProps) {
  const {translation} = useTranslation();

  const {data: task} = useQuery([QUERY_KEYS.TASKS, route.params.task.id], () =>
    dbGetTaskById(route.params.task.id),
  );

  const color = useCategoryColor(task?.category);
  const formatDate = useFormatDate();

  const updateTask = useUpdateTask(() => {
    navigation.goBack();
  });

  const deleteTask = useDeleteTask(() => {
    navigation.goBack();
  });

  const handleMarkAsDonePress = (_task: Task) => {
    updateTask({
      taskId: _task.id,
      done: !_task.done,
    });
  };

  const navigateToTaskForm = (_task: Task) => {
    navigation.navigate('UpdateTaskForm', {
      task: {
        ..._task,
      },
    });
  };

  return (
    <ScreenWrapper>
      <Header title={translation('TASKS')} />

      {task && (
        <>
          <Section
            style={{marginTop: 10, flex: 1}}
            contentStyle={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              flex: 1,
            }}>
            <Text type="title-big" primaryColor>
              {task.title}
            </Text>

            <Text type="subtitle">{formatDate(task.date, 'dateAndTime')}</Text>

            <CategoryContainer>
              <IconContainer backgroundColor={color}>
                <FontAwesomeIcon5
                  name={categoryIconNames[task.category?.iconIndex]}
                  size={25}
                  color="#FFF"
                  style={{marginLeft: 5}}
                />
              </IconContainer>
              <View style={{marginLeft: 10}}>
                <Text type="subtitle">{translation('CATEGORY')}:</Text>
                <Text type="title-medium">{task.category?.name}</Text>
              </View>
            </CategoryContainer>

            <View style={{flex: 1}}>
              <Text style={{marginVertical: 10}}>{task.description}</Text>
            </View>

            <DoneCheckButton onPress={() => handleMarkAsDonePress(task)}>
              <Text>{task.done ? 'Feito' : 'Não feito'}</Text>
              <CheckInput
                value={task.done}
                onChange={() => handleMarkAsDonePress(task)}
              />
            </DoneCheckButton>
          </Section>

          <Separator style={{marginTop: 5}} />

          <Section style={{marginTop: 5}} contentStyle={{paddingTop: 0}}>
            <Footer>
              <DeleteButton
                style={{flex: 1}}
                onPress={() => deleteTask(task.id)}
              />
              <VerticalSeparator />
              <EditButton
                style={{flex: 1}}
                onPress={() => navigateToTaskForm(task)}
              />
            </Footer>
          </Section>
        </>
      )}
    </ScreenWrapper>
  );
}
