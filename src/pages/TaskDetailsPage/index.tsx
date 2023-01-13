import React, {useState} from 'react';
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
} from '@/shared/components';
import categoryIconNames from '@/assets/categoryIconNames';
import {
  useTranslation,
  useCategoryColor,
  useFormatDate,
  useUpdateTask,
} from '@/shared/hooks';
import {AuthenticatedStackParams} from '@/navigation/types';
//import useDeleteTask from '@/hooks/useDeleteTask';

import {
  CategoryContainer,
  IconContainer,
  DoneCheckButton,
  Footer,
} from './styles';
import {dbDeleteTask, dbUpdateTask} from '@/database';
import {QUERY_KEYS} from '@/shared/constants/queryKeys';
import {useQueryClient, useMutation} from 'react-query';

export interface TaskDetailsProps {
  route: RouteProp<AuthenticatedStackParams, 'TaskDetails'>;
  navigation: StackNavigationProp<AuthenticatedStackParams, 'TaskDetails'>;
}

export default function TaskDetails({route, navigation}: TaskDetailsProps) {
  const {translation} = useTranslation();

  const [task, setTask] = useState(route.params.task);

  const color = useCategoryColor(task.category);
  const formatDate = useFormatDate();

  const queryClient = useQueryClient();

  const updateTask = useUpdateTask(() => {
    navigation.goBack();
  });

  const deleteMutation = useMutation(dbDeleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TASKS);
      navigation.goBack();
    },
    onError: () => {},
  });

  const handleMarkAsDonePress = () => {
    updateTask({
      taskId: task.id,
      done: !task.done,
    });

    setTask(oldState => ({
      ...oldState,
      done: !task.done,
    }));
  };

  const handleDeleteTask = () => {
    deleteMutation.mutate(task.id);

    navigation.goBack();
  };

  const navigateToTaskForm = () => {
    navigation.navigate('UpdateTaskForm', {
      task: {
        ...task,
      },
      onTaskUpdatedCallback: _task => {
        setTask(_task);
      },
    });
  };

  return (
    <ScreenWrapper>
      <Header title={translation('TASKS')} />

      <Section
        style={{marginTop: 10, flex: 1}}
        contentStyle={{paddingHorizontal: 20, paddingVertical: 15, flex: 1}}>
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

        <DoneCheckButton onPress={handleMarkAsDonePress}>
          <Text>{task.done ? 'Feito' : 'Não feito'}</Text>
          <CheckInput value={task.done} onChange={handleMarkAsDonePress} />
        </DoneCheckButton>
      </Section>

      <Separator style={{marginTop: 5}} />

      <Section style={{marginTop: 5}} contentStyle={{paddingTop: 0}}>
        <Footer>
          <DeleteButton style={{flex: 1}} onPress={handleDeleteTask} />
          <VerticalSeparator />
          <EditButton style={{flex: 1}} onPress={navigateToTaskForm} />
        </Footer>
      </Section>
    </ScreenWrapper>
  );
}
