import React from 'react';

import {OutlineButton} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';
import {useNavigation} from '@react-navigation/native';

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
