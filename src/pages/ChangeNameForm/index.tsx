import React, {useCallback, useRef} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthenticatedStackParams} from '@navigation/types';
import {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  AnimatedBackground,
  BackButton,
  Text,
  RoundedSaveButton,
  Center,
  FormContainer,
} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';
import {selectUserName, updateUser} from '@/store/account/user';
import {showToast} from '@/shared/components/Toast';
import NameForm from '@/templates/forms/NameForm';
import {FormHandles} from '@/shared/models';

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

  const formRef = useRef<FormHandles>(null);
  const userName = useSelector(selectUserName);

  return (
    <AnimatedBackground>
      <Center>
        <FormContainer height={320} spaceBetween>
          <BackButton />
          <Text type="title-big" centerText>
            {translation('TELL_US_YOUR_NAME')}
          </Text>
          <NameForm
            ref={formRef}
            initialValues={{name: userName}}
            onSubmitSuccess={form => handleSaveName(form.name)}
          />

          <RoundedSaveButton onPress={() => formRef.current?.submitForm()} />
        </FormContainer>
      </Center>
    </AnimatedBackground>
  );
}

export default ChangeNameForm;
