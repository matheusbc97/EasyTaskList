import React, {useRef} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {AuthenticatedStackParams} from '@/modules/core/navigation/types';
import {
  AnimatedBackground,
  BackButton,
  Text,
  RoundedSaveButton,
  Center,
  FormContainer,
} from '@/modules/shared/components';
import {useTranslation} from '@/modules/shared/hooks';
import {selectUserName, setUserName} from '@/store/account/user';
import {showToast} from '@/modules/shared/components/Toast';
import NameForm from '@/modules/shared/templates/forms/NameForm';
import {FormHandles} from '@/modules/shared/models';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'ChangeNameForm'>;
  route: RouteProp<AuthenticatedStackParams, 'ChangeNameForm'>;
}

function ChangeNameFormPage({navigation}: Props) {
  const dispatch = useDispatch();
  const {translation} = useTranslation();

  const handleSaveName = (name: string) => {
    dispatch(setUserName(name));

    navigation.navigate('BottomNavigation');
    showToast({
      text: 'Nome alterado com sucesso',
      type: 'success',
    });
  };

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

export default ChangeNameFormPage;
