import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import Text from '../Text';
import categoryColors from '../../../assets/categoryColors';

import {ContainerButton, IconContainer, Body} from './styles';

interface Props {
  colorIndex: number;
  name: string;
  onPress?(): void;
}

const TaskListItem: React.FC<Props> = ({
  colorIndex = 1,
  name = 'Atividades Fisícas',
  onPress,
}) => {
  return (
    <ContainerButton onPress={onPress}>
      <IconContainer backgroundColor={categoryColors[colorIndex].color1}>
        <FontAwesomeIcon
          name="users"
          size={25}
          color="#FFF"
          style={{marginLeft: 5}}
        />
      </IconContainer>

      <Body borderColor={categoryColors[colorIndex].color1}>
        <Text type="title" style={{padding: 5}}>
          {name}
        </Text>
      </Body>
    </ContainerButton>
  );
};

export default TaskListItem;
