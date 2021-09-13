import React, {useCallback} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {AuthenticatedStackParams} from '@navigation/types';
import {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  AnimatedBackground,
  Avatar,
  BackButton,
  Text,
  Center,
  FormContainer,
} from '@shared/components';
import AvatarList from '@/templates/AvatarGrid';
import {selectUser, updateUser} from '@store/account/user';
import {showToast} from '@shared/components/Toast';

import {Header, AvatarListContainer} from './styles';
import {useTranslation} from '@/shared/hooks';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategoryDetails'>;
  route: RouteProp<AuthenticatedStackParams, 'CategoryDetails'>;
}

function ChangeAvatar({navigation}: Props) {
  const dispatch = useDispatch();
  const {translation} = useTranslation();

  const user = useSelector(selectUser);

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
      <Center>
        <FormContainer>
          <Header>
            <BackButton
              onPress={() => navigation.navigate('BottomNavigation')}
            />
            <Avatar avatarNumber={user?.avatar} size={80} />
          </Header>
          <Text type="title-medium" centerText>
            {translation('SELECT_ONE_AVATAR_TO_CHANGE')}
          </Text>
          <AvatarListContainer>
            <AvatarList onAvatarPress={handleSaveAvatar} />
          </AvatarListContainer>
        </FormContainer>
      </Center>
    </AnimatedBackground>
  );
}

export default ChangeAvatar;
