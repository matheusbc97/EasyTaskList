import React from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useCategoryColor, useFormatDate} from '@/shared/hooks';
import {
  Text,
  CheckInput,
  TextButton,
  Header,
  ScreenWrapper,
  Separator,
  VerticalSeparator,
  Section,
} from '@/shared/components';
import {selectAppTheme} from '@/store/configs';
import {updateTaskStatus} from '@/store/tasks/thunkActions';
import categoryIconNames from '@/assets/categoryIconNames';
import {useTranslation} from '@/shared/hooks';
import {AuthenticatedStackParams} from '@/navigation/types';

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

export default function TaskDetails({route}: TaskDetailsProps) {
  const {translation} = useTranslation();

  const task = route.params.task;

  const color = useCategoryColor(task.category);
  const {primaryColor} = useSelector(selectAppTheme);
  const dispatch = useDispatch();

  const formatDate = useFormatDate();

  const handleMarkAsDonePress = () => {
    dispatch(updateTaskStatus({id: task!.id, done: !task?.done}));
  };

  const navigation = useNavigation();

  const navigateToTaskForm = () => {
    const navigationOptions = {
      task: {
        ...task,
      },
    };
    navigation.navigate('UpdateTaskForm', navigationOptions);
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
          <TextButton
            style={{flex: 1}}
            text={translation('DELETE')}
            textType="title"
            onPress={() => {}}
          />
          <VerticalSeparator />
          <TextButton
            style={{flex: 1}}
            text={translation('EDIT')}
            onPress={navigateToTaskForm}
            textType="title"
            primaryColor
            icon={
              <FontAwesomeIcon name="pencil" size={18} color={primaryColor} />
            }
          />
        </Footer>
      </Section>
    </ScreenWrapper>
  );
}
