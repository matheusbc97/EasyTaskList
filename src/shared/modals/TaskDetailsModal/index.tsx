import React, {useState} from 'react';
import {View} from 'react-native';

import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {Checkbox} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {Text} from '@shared/components';
import {Task} from '@shared/models';
import {useCategoryColor, useFormatDate} from '@shared/hooks';

import {
  Container,
  CategoryContainer,
  IconContainer,
  DoneCheckButton,
  Footer,
  FooterButton,
} from './styles';
import {selectAppTheme} from '@store/configs';

interface Props {
  isVisible?: boolean;
  task: Task | null;
  onBackButtonPress(): void;
  onEditButtonPress(): void;
}

const TaskDetailsModal: React.FC<Props> = ({
  isVisible = true,
  task,
  onBackButtonPress,
  onEditButtonPress,
}) => {
  const color = useCategoryColor(task?.category);
  const {primaryColor} = useSelector(selectAppTheme);

  const formatDate = useFormatDate();

  const [isDone, setIsDone] = useState(task?.done ? true : false);

  return (
    <Modal
      isVisible={isVisible && !!task}
      onBackButtonPress={onBackButtonPress}>
      <Container>
        <Text type="title-big" primaryColor>
          {task?.title}
        </Text>

        {task?.date && (
          <Text type="subtitle">{formatDate(task?.date, 'dateAndTime')}</Text>
        )}

        <CategoryContainer>
          <IconContainer backgroundColor={color}>
            <FontAwesomeIcon
              name="users"
              size={25}
              color="#FFF"
              style={{marginLeft: 5}}
            />
          </IconContainer>
          <View style={{marginLeft: 10}}>
            <Text type="title-medium">{task?.category?.name}</Text>
            <Text>Categoria</Text>
          </View>
        </CategoryContainer>

        <Text>{task?.description}</Text>

        <DoneCheckButton onPress={() => setIsDone(!isDone)}>
          <Checkbox status={isDone ? 'checked' : 'unchecked'} />
          <Text>{isDone ? 'Feito' : 'Não feito'}</Text>
        </DoneCheckButton>

        <Footer>
          <FooterButton onPress={onEditButtonPress}>
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
          <FooterButton onPress={onBackButtonPress}>
            <Text>FECHAR</Text>
          </FooterButton>
        </Footer>
      </Container>
    </Modal>
  );
};

export default TaskDetailsModal;
