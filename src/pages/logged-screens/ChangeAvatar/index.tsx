import React, {useCallback} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthenticatedStackParams} from '@navigation/types';
import {RouteProp} from '@react-navigation/native';

import {AnimatedBackground} from '@shared/components';

import ChoosePhotoOrAvatar from '../../account/ChooseUserConfigurations/ChoosePhotoOrAvatar';
import {Content} from './styles';
import {useDispatch} from 'react-redux';
import {updateUser} from '@store/account/user';
import {showToast} from '@shared/components/Toast';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategoryDetails'>;
  route: RouteProp<AuthenticatedStackParams, 'CategoryDetails'>;
}

function ChangeAvatar({navigation}: Props) {
  const dispatch = useDispatch();

  const handleSaveAvatar = useCallback(
    async (avatarIndex: number) => {
      const payloadAction = await dispatch(
        updateUser({
          avatar: avatarIndex,
        }),
      );

      if (payloadAction.payload) {
        navigation.navigate('BottomNavigation');
        showToast({
          text: 'Avatar alterado com sucesso',
          type: 'success',
        });
      }
    },
    [dispatch, navigation],
  );

  return (
    <AnimatedBackground>
      <Content>
        <ChoosePhotoOrAvatar
          //onAdvancePress={() => {}}
          //advanceButtonText="SALVAR"
          onBackPress={() => navigation.pop()}
          onAvatarPress={handleSaveAvatar}
        />
      </Content>
    </AnimatedBackground>
  );
}

export default ChangeAvatar;
