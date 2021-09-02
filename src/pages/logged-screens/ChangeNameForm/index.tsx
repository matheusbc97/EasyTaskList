import React, {useCallback} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthenticatedStackParams} from '@navigation/types';
import {RouteProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {AnimatedBackground} from '@shared/components';
import {useTranslation} from '@/shared/hooks';

import ChooseName from '../../account/ChooseUserConfigurations/ChooseName';
import {updateUser} from '@store/account/user';
import {showToast} from '@shared/components/Toast';

import {Content} from './styles';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'ChangeNameForm'>;
  route: RouteProp<AuthenticatedStackParams, 'ChangeNameForm'>;
}

function ChangeNameForm({navigation}: Props) {
  const dispatch = useDispatch();
  const {translation} = useTranslation();

  const handleSaveName = useCallback(
    async (name: string) => {
      const payloadAction = await dispatch(
        updateUser({
          name,
        }),
      );

      if (payloadAction.payload) {
        navigation.navigate('BottomNavigation');
        showToast({
          text: 'Nome alterado com sucesso',
          type: 'success',
        });
      }
    },
    [dispatch, navigation],
  );

  return (
    <AnimatedBackground>
      <Content>
        <ChooseName
          onAdvancePress={handleSaveName}
          advanceButtonText={translation('SAVE').toUpperCase()}
          onBackPress={() => navigation.pop()}
        />
      </Content>
    </AnimatedBackground>
  );
}

export default ChangeNameForm;
