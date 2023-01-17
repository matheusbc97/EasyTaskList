import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {setAppTheme} from '@/store/configs';
import {setUserTheme} from '@/store/account/user';
import {Text, RoundedButton} from '@/shared/components';
import * as appThemes from '@/assets/themes';
import {AppTheme, AppThemeName} from '@/shared/models';
import {useTranslation} from '@/shared/hooks';
import ChooseTheme from '@/shared/templates/ChooseTheme';

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
    dispatch(setUserTheme(theme.name));
  };

  return (
    <View style={styles.container}>
      <Text type="title-big">{translation('CHOOSE_A_THEME')}:</Text>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ChooseTheme onThemePress={handleThemeChoose} />
      </View>
      <RoundedButton
        testID="ChooseThemeAdvanceButton"
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
