import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {setAppTheme} from '@store/configs';
import {Text, RoudedButton} from '@shared/components';
import {DARK, BLUE_GREEN, BLUE_RED} from '@assets/themes';

import ThemeBox from './ThemeBox';

interface Props {
  onAdvancePress(): void;
}

const ChooseTheme: React.FC<Props> = ({onAdvancePress}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text type="title-big">Escolha um Tema:</Text>
      <View style={styles.content}>
        <View style={styles.themeRow}>
          <ThemeBox
            theme={BLUE_GREEN}
            onPress={() => dispatch(setAppTheme(BLUE_GREEN))}
          />
          <ThemeBox
            theme={BLUE_RED}
            onPress={() => dispatch(setAppTheme(BLUE_RED))}
          />
        </View>
        <View style={styles.themRowAlignCenter}>
          <ThemeBox theme={DARK} onPress={() => dispatch(setAppTheme(DARK))} />
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
