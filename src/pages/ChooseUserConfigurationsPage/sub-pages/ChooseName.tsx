import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {FormHandles} from '@unform/core';
import {useSelector} from 'react-redux';

import {RoundedButton, Text, BackButton} from '@/shared/components';
import {selectUserName} from '@/store/account/user';
import {useTranslation} from '@/shared/hooks';
import NameForm from '@/shared/templates/forms/NameForm';

interface Props {
  onAdvancePress(name: string): void;
  onBackPress?(): void;
  showBackButton?: boolean;
}

const ChooseName: React.FC<Props> = ({
  onAdvancePress,
  onBackPress,
  showBackButton = true,
}) => {
  const {translation} = useTranslation();
  const userName = useSelector(selectUserName);
  const formRef = useRef<FormHandles>(null);

  return (
    <View style={styles.container}>
      {showBackButton && <BackButton onPress={onBackPress} />}
      <Text
        type="title-big"
        style={[styles.text, {marginTop: showBackButton ? 0 : 35}]}>
        {translation('TELL_US_YOUR_NAME')}
      </Text>
      <NameForm
        ref={formRef}
        initialValues={{name: userName}}
        onSubmitSuccess={form => onAdvancePress(form.name)}
      />

      <RoundedButton
        testID="ChooseNameAdvanceButton"
        text={translation('ADVANCE')}
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
