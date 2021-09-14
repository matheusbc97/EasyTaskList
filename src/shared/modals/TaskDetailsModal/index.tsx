import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {Checkbox} from 'react-native-paper';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {useCategoryColor, useFormatDate} from '@shared/hooks';
import {useNavigation} from '@react-navigation/native';

import {Text} from '@shared/components';
import {Task} from '@shared/models';
import {selectAppTheme} from '@store/configs';
import {updateTaskStatus} from '@store/tasks/thunkActions';
import categoryIconNames from '@assets/categoryIconNames';

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
            <Text>Categoria</Text>
          </View>
        </CategoryContainer>

        <Text>{taskSelected?.description}</Text>

        <DoneCheckButton onPress={handleMarkAsDonePress}>
          <Checkbox status={taskSelected?.done ? 'checked' : 'unchecked'} />
          <Text>{taskSelected?.done ? 'Feito' : 'Não feito'}</Text>
        </DoneCheckButton>

        <Footer>
          <FooterButton onPress={navigateToTaskForm}>
            <Text type="title" primaryColor>
              EDITAR
            </Text>
            <FontAwesomeIcon
              name="pencil"
              size={18}
              style={{marginLeft: 10}}
              color={primaryColor}
            />
          </FooterButton>
          <FooterButton onPress={resetSelectedTask}>
            <Text>FECHAR</Text>
          </FooterButton>
        </Footer>
      </Container>
    </Modal>
  );
};

export default forwardRef(TaskDetailsModal);
