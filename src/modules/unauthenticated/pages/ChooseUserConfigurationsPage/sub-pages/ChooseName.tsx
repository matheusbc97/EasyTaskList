import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';

import {RoundedButton, Text, BackButton} from '@/modules/shared/components';
import {useTranslation} from '@/modules/shared/hooks';
import NameForm from '@/modules/shared/templates/forms/NameForm';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {FormHandles} from '@/modules/shared/models';

import {useUserPreppingSelector} from '../store';

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
  const userName = useUserPreppingSelector(userPrepping => userPrepping.name);
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
        testID={TEST_IDS.CHOOSE_NAME_ADVANCE_BUTTON}
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
