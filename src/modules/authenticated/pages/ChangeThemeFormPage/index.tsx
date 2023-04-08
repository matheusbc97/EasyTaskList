import React, {useState} from 'react';

import {
  BackButton,
  RoundedButton,
  Text,
  FormScreenWrapper,
} from '@/modules/shared/components';
import {AppTheme} from '@/modules/shared/models';
import {useTranslation, useAppTheme} from '@/modules/shared/hooks';
import ChooseTheme from '@/modules/shared/templates/ChooseTheme';

import useHandleSaveTheme from './hooks/useHandleSaveTheme';

import {Props} from './types';

function ChangeNameFormPage({}: Props) {
  const {translation} = useTranslation();

  const appTheme = useAppTheme();

  const [appThemeState, setAppThemeState] = useState<AppTheme>(appTheme);

  const handleThemeChoose = (theme: AppTheme) => {
    setAppThemeState(theme);
  };

  const handleSaveTheme = useHandleSaveTheme();

  return (
    <FormScreenWrapper alignCenter theme={appThemeState}>
      <BackButton />
      <Text type="title-big" centerText style={{marginTop: 5}}>
        {translation('CHOOSE_A_THEME')}:
      </Text>
      <ChooseTheme
        onThemePress={handleThemeChoose}
        style={{marginVertical: 20}}
      />
      <RoundedButton
        text={translation('SAVE').toUpperCase()}
        onPress={() => handleSaveTheme(appThemeState)}
      />
    </FormScreenWrapper>
  );
}

export default ChangeNameFormPage;
