import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {setAppTheme} from '@store/configs';
import {setUserTheme} from '@store/account/user';
import {Text, RoudedButton} from '@shared/components';
import * as appThemes from '@assets/themes';

import ThemeBox from './ThemeBox';
import {AppThemeName} from '@shared/models';

interface Props {
  onAdvancePress(): void;
}

const ChooseTheme: React.FC<Props> = ({onAdvancePress}) => {
  const dispatch = useDispatch();

  const handleThemeChoose = useCallback(
    (theme: AppThemeName) => {
      dispatch(setAppTheme(appThemes[theme]));
      dispatch(setUserTheme(theme));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <Text type="title-big">Escolha um Tema:</Text>
      <View style={styles.content}>
        <View style={styles.themeRow}>
          <ThemeBox theme={'BLUE_GREEN'} onPress={handleThemeChoose} />
          <ThemeBox theme={'BLUE_RED'} onPress={handleThemeChoose} />
        </View>
        <View style={styles.themRowAlignCenter}>
          <ThemeBox theme={'DARK'} onPress={handleThemeChoose} />
        </View>
      </View>
      <RoudedButton text="AVANÇAR" onPress={onAdvancePress} />
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
    marginVertical: 10,
    flex: 1,
    justifyContent: 'center',
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  themRowAlignCenter: {
    alignSelf: 'center',
    marginVertical: 5,
  },
});
