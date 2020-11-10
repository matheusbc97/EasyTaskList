import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {setAppTheme} from '@store/configs';
import {setUserTheme} from '@store/account/user';
import {Text, RoundedButton} from '@shared/components';
import * as appThemes from '@assets/themes';

import ThemeBox from './ThemeBox';
import {AppTheme, AppThemeName} from '@shared/models';

import ChooseScreenBackButton from './ChooseScreenBackButton';

interface Props {
  onAdvancePress(theme: AppThemeName): void;
  advanceButtonText?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const ChooseTheme: React.FC<Props> = ({
  onAdvancePress,
  advanceButtonText,
  showBackButton = true,
  onBackPress,
}) => {
  const [appThemeState, setAppThemeState] = useState<AppThemeName>(
    'BLUE_GREEN',
  );
  const dispatch = useDispatch();

  const handleThemeChoose = useCallback(
    (theme: AppThemeName) => {
      setAppThemeState(theme);
      dispatch(setAppTheme(appThemes[theme]));
      dispatch(setUserTheme(theme));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      {showBackButton && <ChooseScreenBackButton onPress={onBackPress} />}
      <Text type="title-big" style={{marginVertical: showBackButton ? 15 : 0}}>
        Escolha um Tema:
      </Text>
      <View style={styles.content}>
        <View style={styles.themeRow}>
          <ThemeBox theme={'BLUE_GREEN'} onPress={handleThemeChoose} />
          <ThemeBox theme={'BLUE_RED'} onPress={handleThemeChoose} />
        </View>
        {/*<View style={styles.themRowAlignCenter}>
          <ThemeBox theme={'DARK'} onPress={handleThemeChoose} />
  </View>*/}
      </View>
      <RoundedButton
        text={advanceButtonText ?? 'AVANÇAR'}
        onPress={() => onAdvancePress(appThemeState)}
      />
    </View>
  );
};

export default ChooseTheme;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
    flex: 1,
  },
  content: {
    width: 140,
    flex: 1,
    marginTop: 33,
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themRowAlignCenter: {
    alignSelf: 'center',
    marginVertical: 5,
  },
});
