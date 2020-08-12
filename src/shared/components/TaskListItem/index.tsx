import React, {useMemo} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import Text from '../Text';
import categoryColors from '../../../assets/categoryColors';

import {ContainerButton, IconContainer, Body} from './styles';
import {Task} from '@shared/models';

interface Props {
  task: Task;
  onPress?(): void;
}

const TaskListItem: React.FC<Props> = ({task, onPress}) => {
  const color = useMemo(
    () =>
      task.category?.colorIndex
        ? categoryColors[task.category?.colorIndex].color1
        : categoryColors[0].color1,
    [task.category],
  );

  return (
    <ContainerButton onPress={onPress}>
      <IconContainer backgroundColor={color}>
        <FontAwesomeIcon
          name="users"
          size={25}
          color="#FFF"
          style={{marginLeft: 5}}
        />
      </IconContainer>

      <Body borderColor={color}>
        <Text type="title">{task.title}</Text>
        <Text>{task.description}</Text>
      </Body>
    </ContainerButton>
  );
};

export default React.memo(TaskListItem);
