import React, {useCallback} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthenticatedStackParams} from '@navigation/types';
import {RouteProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {AnimatedBackground} from '@shared/components';

import ChooseName from '../../account/ChooseUserConfigurations/ChooseName';
import {Content} from './styles';
import {updateUser} from '@store/account/user';
import {showToast} from '@shared/components/Toast';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'ChangeNameForm'>;
  route: RouteProp<AuthenticatedStackParams, 'ChangeNameForm'>;
}

function ChangeNameForm({navigation}: Props) {
  const dispatch = useDispatch();

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
          advanceButtonText="SALVAR"
          onBackPress={() => navigation.pop()}
        />
      </Content>
    </AnimatedBackground>
  );
}

export default ChangeNameForm;
