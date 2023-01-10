import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  AnimatedBackground,
  Avatar,
  BackButton,
  Text,
  Center,
  FormContainer,
} from '@/shared/components';
import AvatarList from '@/shared/templates/AvatarGrid';
import {showToast} from '@/shared/components/Toast';
import {useTranslation} from '@/shared/hooks';
import {setUserAvatar} from '@/store/account/user';
import {RootState} from '@/store/index';
import {AuthenticatedStackParams} from '@/navigation/types';

import {Header, AvatarListContainer} from './styles';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'ChangeAvatar'>;
  route: RouteProp<AuthenticatedStackParams, 'ChangeAvatar'>;
}

function ChangeAvatarPage({navigation}: Props) {
  const dispatch = useDispatch();
  const {translation} = useTranslation();

  const userAvatar = useSelector(
    (state: RootState) => state.account.user.avatar,
  );

  const handleSaveAvatar = async (avatarIndex: number) => {
    const payloadAction = dispatch(setUserAvatar(avatarIndex));

    if (payloadAction.payload) {
      navigation.navigate('BottomNavigation');
      showToast({
        text: 'Avatar alterado com sucesso',
        type: 'success',
      });
    }
  };

  return (
    <AnimatedBackground>
      <Center>
        <FormContainer>
          <Header>
            <BackButton
              onPress={() => navigation.navigate('BottomNavigation')}
            />
            <Avatar avatarNumber={userAvatar} size={80} />
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

export default ChangeAvatarPage;