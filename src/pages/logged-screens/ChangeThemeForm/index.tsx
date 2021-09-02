import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AnimatedBackground} from '@shared/components';
import {AuthenticatedStackParams} from '@navigation/types';
import {updateUser} from '@store/account/user';
import {showToast} from '@shared/components/Toast';
import {AppThemeName} from '@shared/models';
import {useTranslation} from '@/shared/hooks';

import ChooseTheme from '../../account/ChooseUserConfigurations/ChooseTheme';
import {Content} from './styles';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategoryDetails'>;
  route: RouteProp<AuthenticatedStackParams, 'CategoryDetails'>;
}

function ChangeNameForm({navigation}: Props) {
  const {translation} = useTranslation();
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
          advanceButtonText={translation('SAVE').toUpperCase()}
          onBackPress={() => navigation.pop()}
        />
      </Content>
    </AnimatedBackground>
  );
}

export default ChangeNameForm;
