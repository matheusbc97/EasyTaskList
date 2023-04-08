import React from 'react';

import {useTranslation} from '@/modules/shared/hooks';
import {useNavigation} from '@react-navigation/native';
import OutlineButton from '../../OutlineButton';

export default function CreateNewTaskButton() {
  const {translation} = useTranslation();
  const navigation = useNavigation();

  return (
    <OutlineButton
      iconName="plus"
      text={translation('CREATE_NEW_TASK')}
      onPress={() => navigation.navigate('CreateTaskForm')}
    />
  );
}
