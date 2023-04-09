import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {setAppTheme} from '@/store/configs';
import {Text, RoundedButton} from '@/modules/shared/components';
import * as appThemes from '@/assets/themes';
import {AppTheme, AppThemeName} from '@/modules/shared/models';
import {useTranslation} from '@/modules/shared/hooks';
import ChooseTheme from '@/modules/shared/templates/ChooseTheme';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {setUserPreppingTheme} from '../store/userPrepping';

interface Props {
  onAdvancePress(theme: AppThemeName): void;
  advanceButtonText?: string;
}

const ChooseThemeSubPage: React.FC<Props> = ({
  onAdvancePress,
  advanceButtonText,
}) => {
  const {translation} = useTranslation();
  const [appThemeState, setAppThemeState] = useState<AppTheme>(
    appThemes.BLUE_GREEN,
  );
  const dispatch = useDispatch();

  const handleThemeChoose = (theme: AppTheme) => {
    setAppThemeState(theme);
    dispatch(setAppTheme(theme));
    dispatch(setUserPreppingTheme(theme.name));
  };

  return (
    <View style={styles.container}>
      <Text type="title-big">{translation('CHOOSE_A_THEME')}:</Text>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ChooseTheme onThemePress={handleThemeChoose} />
      </View>
      <RoundedButton
        testID={TEST_IDS.CHOOSE_THEME_ADVANCE_BUTTON}
        text={advanceButtonText ?? translation('ADVANCE')}
        onPress={() => onAdvancePress(appThemeState.name)}
      />
    </View>
  );
};

export default ChooseThemeSubPage;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
    flex: 1,
  },
});
