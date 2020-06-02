import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import {useSelector} from 'react-redux';

import {
  UnformInput as TextInput,
  RoudedButton,
  Text,
} from '../../library/components';
import useValidateField from '../../library/hooks/useValidateField';
import {validateAll} from '../../library/utils/validations';
import {selectUserName} from '../../store/account/user';

import ChosseScreenBackButton from './ChosseScreenBackButton';

interface Props {
  onAdvancePress(name: string): void;
  onBackPress(): void;
  showBackButton: boolean;
}

type FormDetails = {
  name: string;
};

const ChooseName: React.FC<Props> = ({
  onAdvancePress,
  onBackPress,
  showBackButton = true,
}) => {
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
      {showBackButton && <ChosseScreenBackButton onPress={onBackPress} />}
      <Text type="title-big" style={styles.text}>
        Nos diga como deseja ser chamado
      </Text>
      <Form
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
      <RoudedButton
        text="AVANÇAR"
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
