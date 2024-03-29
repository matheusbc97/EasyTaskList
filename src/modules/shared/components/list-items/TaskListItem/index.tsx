import React from 'react';
import {View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import categoryIconNames from '@/assets/categoryIconNames';
import {useFormatDate, useCategoryColor} from '@/modules/shared/hooks';
import {Task} from '@/modules/shared/models';

import Text from '../../Text';

import {
  ContainerButton,
  IconContainer,
  Body,
  Separator,
  TaskStatusContainer,
  DateAndMonthText,
  BodyBottom,
} from './styles';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

interface Props {
  task: Task;
  onPress?(): void;
}

function TaskStatus() {
  return (
    <TaskStatusContainer testID={TEST_IDS.TASK_STATUS}>
      <Text type="title-inverse" style={{fontSize: 12.5}}>
        Feita
      </Text>
    </TaskStatusContainer>
  );
}

const TaskListItem: React.FC<Props> = ({task, onPress}) => {
  const color = useCategoryColor(task.category);

  const formatDate = useFormatDate();

  return (
    <ContainerButton onPress={onPress}>
      <IconContainer backgroundColor={color}>
        <FontAwesomeIcon
          name={categoryIconNames[task.category?.iconIndex]}
          size={25}
          color="#FFF"
          style={{marginLeft: 5}}
        />
      </IconContainer>

      <Body borderColor={color}>
        <View style={{flex: 1}}>
          <Text type="title">{task.title}</Text>
          <BodyBottom>
            <Text style={{flex: 1}}>{formatDate(task.date, 'time')}</Text>
            {task.done && <TaskStatus />}
          </BodyBottom>
        </View>

        <Separator color={color} />

        <DateAndMonthText>
          {formatDate(task.date, 'dateOfMonth').toUpperCase()}
        </DateAndMonthText>
      </Body>
    </ContainerButton>
  );
};

export default React.memo(TaskListItem);
