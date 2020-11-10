import React, {useCallback} from 'react';

import {AnimatedBackground} from '@shared/components';

import ChooseTheme from '../../account/ChooseUserConfigurations/ChooseTheme';
import {Content} from './styles';
import {AuthenticatedStackParams} from '@navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {updateUser} from '@store/account/user';
import {showToast} from '@shared/components/Toast';
import {useDispatch} from 'react-redux';
import {AppThemeName} from '@shared/models';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategoryDetails'>;
  route: RouteProp<AuthenticatedStackParams, 'CategoryDetails'>;
}

function ChangeNameForm({navigation}: Props) {
  const dispatch = useDispatch();

  const handleSaveTheme = useCallback(
    async (theme: AppThemeName) => {
      const payloadAction = await dispatch(
        updateUser({
          theme,
        }),
      );

      if (payloadAction.payload) {
        navigation.navigate('BottomNavigation');
        showToast({
          text: 'Tema alterado com sucesso',
          type: 'success',
        });
      }
    },
    [dispatch, navigation],
  );

  return (
    <AnimatedBackground>
      <Content>
        <ChooseTheme
          onAdvancePress={handleSaveTheme}
          advanceButtonText="SALVAR"
          onBackPress={() => navigation.pop()}
        />
      </Content>
    </AnimatedBackground>
  );
}

export default ChangeNameForm;
