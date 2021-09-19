import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

import {useCategoryColor, useFormatDate} from '@shared/hooks';
import {Text, CheckInput} from '@shared/components';
import {Task} from '@shared/models';
import {selectAppTheme} from '@store/configs';
import {updateTaskStatus} from '@store/tasks/thunkActions';
import categoryIconNames from '@assets/categoryIconNames';
import {useTranslation} from '@/shared/hooks';

import {
  Container,
  CategoryContainer,
  IconContainer,
  DoneCheckButton,
  Footer,
  FooterButton,
} from './styles';

export interface TaskDetailsModalHandles {
  open: (task: Task) => void;
}

const TaskDetailsModal: ForwardRefRenderFunction<TaskDetailsModalHandles> = (
  {},
  ref,
) => {
  const [taskSelected, setTaskSelected] = useState<Task | null>(null);
  const {translation} = useTranslation();

  useImperativeHandle(ref, () => ({
    open: task => {
      setTaskSelected(task);
    },
  }));

  const color = useCategoryColor(taskSelected?.category);
  const {primaryColor} = useSelector(selectAppTheme);
  const dispatch = useDispatch();

  const formatDate = useFormatDate();

  const resetSelectedTask = () => {
    setTaskSelected(null);
  };

  const handleMarkAsDonePress = () => {
    resetSelectedTask();
    dispatch(
      updateTaskStatus({id: taskSelected!.id, done: !taskSelected?.done}),
    );
  };

  const navigation = useNavigation();

  const navigateToTaskForm = () => {
    resetSelectedTask();
    const navigationOptions = {
      task: {
        ...taskSelected,
      },
    };
    navigation.navigate('UpdateTaskForm', navigationOptions);
  };

  return (
    <Modal isVisible={!!taskSelected} onBackButtonPress={resetSelectedTask}>
      <Container>
        <Text type="title-big" primaryColor>
          {taskSelected?.title}
        </Text>

        {taskSelected?.date && (
          <Text type="subtitle">
            {formatDate(taskSelected?.date, 'dateAndTime')}
          </Text>
        )}

        <CategoryContainer>
          <IconContainer backgroundColor={color}>
            <FontAwesomeIcon5
              name={categoryIconNames[taskSelected?.category?.iconIndex]}
              size={25}
              color="#FFF"
              style={{marginLeft: 5}}
            />
          </IconContainer>
          <View style={{marginLeft: 10}}>
            <Text type="title-medium">{taskSelected?.category?.name}</Text>
            <Text>{translation('CATEGORY')}</Text>
          </View>
        </CategoryContainer>

        <Text>{taskSelected?.description}</Text>

        <DoneCheckButton onPress={handleMarkAsDonePress}>
          <CheckInput
            value={!!taskSelected?.done}
            onChange={handleMarkAsDonePress}
          />
          <Text>{taskSelected?.done ? 'Feito' : 'Não feito'}</Text>
        </DoneCheckButton>

        <Footer>
          <FooterButton onPress={navigateToTaskForm}>
            <Text type="title" primaryColor>
              {translation('EDIT')}
            </Text>
            <FontAwesomeIcon
              name="pencil"
              size={18}
              style={{marginLeft: 10}}
              color={primaryColor}
            />
          </FooterButton>
          <FooterButton onPress={resetSelectedTask}>
            <Text> {translation('CLOSE')}</Text>
          </FooterButton>
        </Footer>
      </Container>
    </Modal>
  );
};

export default forwardRef(TaskDetailsModal);
