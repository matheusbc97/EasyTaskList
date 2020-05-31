import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {selectUser} from '../../store/account/user';
import {selectAppTheme} from '../../store/configs';
import {Avatar, Text, RoudedButton} from '../../library/components';

import ThemeBox from './ThemeBox';

interface Props {
  onChagePress(index: number): void;
}

const SaveUserConfiguration: React.FC<Props> = ({onChagePress}) => {
  const user = useSelector(selectUser);

  const appTheme = useSelector(selectAppTheme);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Avatar avatarNumber={user?.avatar} size={100} />
        <Text type="title-big" style={styles.text}>
          {user?.name}
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', marginTop: 15}}>
        <ThemeBox theme={appTheme} />
      </View>
      <View style={styles.row}>
        <RoudedButton
          text="Alterar Nome"
          inverted
          style={styles.button}
          onPress={() => onChagePress(1)}
        />
        <View style={styles.betweenButtonsSpace} />
        <RoudedButton
          text="Alterar Avatar"
          inverted
          style={styles.button}
          onPress={() => onChagePress(2)}
        />
      </View>
      <RoudedButton
        text="Alterar Tema"
        inverted
        style={styles.alterateThemeButton}
        onPress={() => onChagePress(0)}
      />
      <RoudedButton
        text="Finalizar Cadastro"
        style={styles.finalizeRegisterBtn}
      />
    </View>
  );
};

export default SaveUserConfiguration;

const styles = StyleSheet.create({
  container: {padding: 15, alignItems: 'center', flex: 1},
  content: {flex: 1, alignItems: 'center'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {marginTop: 5, textAlign: 'center'},
  button: {flex: 1, height: 30},
  alterateThemeButton: {marginTop: 5, height: 30},
  betweenButtonsSpace: {width: 10},
  finalizeRegisterBtn: {marginTop: 15},
});
