import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import Text from '../Text';
import useCategoryColor from '@shared/hooks/useCategoryColor';

import {
  ContainerButton,
  IconContainer,
  Body,
  Separator,
  TaskStatusContainer,
  DateAndMonthText,
  BodyBottom,
} from './styles';
import {Task} from '@shared/models';
import formatDate from '@shared/utils/fomatDate';
import {View} from 'react-native';

interface Props {
  task: Task;
  onPress?(): void;
}

const TaskListItem: React.FC<Props> = ({task, onPress}) => {
  const color = useCategoryColor(task.category);

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
        <View style={{flex: 1}}>
          <Text type="title">{task.title}</Text>
          <BodyBottom>
            <Text style={{flex: 1}}>{formatDate(task.date, "HH:mm'h'")}</Text>
            <TaskStatusContainer>
              <Text type="title-inverse" style={{fontSize: 12.5}}>
                Andamento
              </Text>
            </TaskStatusContainer>
          </BodyBottom>
        </View>

        <Separator color={color} />

        <DateAndMonthText>HOJE</DateAndMonthText>
      </Body>
    </ContainerButton>
  );
};

export default React.memo(TaskListItem);
