import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import {useSelector} from 'react-redux';

import {
  UnformInput as TextInput,
  RoundedButton,
  Text,
  BackButton,
} from '@shared/components';
import {validateAll} from '@shared/utils/validations';
import {selectUserName} from '@store/account/user';
import {useTranslation, useValidateField} from '@/shared/hooks';

interface Props {
  onAdvancePress(name: string): void;
  onBackPress?(): void;
  showBackButton?: boolean;
  advanceButtonText?: string;
}

type FormDetails = {
  name: string;
};

const ChooseName: React.FC<Props> = ({
  onAdvancePress,
  onBackPress,
  showBackButton = true,
  advanceButtonText,
}) => {
  const {translation} = useTranslation();
  const userName = useSelector(selectUserName);
  const formRef = useRef<FormHandles>(null);
  const validateField = useValidateField(formRef);

  const handleSubmit = (form: FormDetails) => {
    const [errors, isValid] = validateAll(form);

    formRef.current?.setErrors(errors);
    if (isValid) {
      onAdvancePress(form.name);
    }
  };

  return (
    <View style={styles.container}>
      {showBackButton && <BackButton onPress={onBackPress} />}
      <Text
        type="title-big"
        style={[styles.text, {marginTop: showBackButton ? 0 : 35}]}>
        {translation('TELL_US_YOUR_NAME')}
      </Text>
      <Form
        style={{width: '100%'}}
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{name: userName}}>
        <TextInput
          label="Nome"
          name="name"
          validateField={validateField}
          containerStyle={styles.input}
        />
      </Form>
      <RoundedButton
        text={advanceButtonText ?? 'AVANÇAR'}
        onPress={() => formRef.current?.submitForm()}
        style={styles.button}
      />
    </View>
  );
};

export default ChooseName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  text: {textAlign: 'center'},
  input: {width: '100%', paddingHorizontal: 10},
  button: {marginVertical: 5},
});
