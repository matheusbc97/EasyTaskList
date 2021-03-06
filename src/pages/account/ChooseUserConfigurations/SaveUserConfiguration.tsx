import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {selectUser} from '@store/account/user';
import {setIsLogged} from '@store/configs';
import {Avatar, Text, RoundedButton} from '@shared/components';

import ThemeBox from './ThemeBox';
import {updateUser} from '@store/account/user/thunkActions';

interface Props {
  onChagePress(index: number): void;
}

const SaveUserConfiguration: React.FC<Props> = ({onChagePress}) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Avatar avatarNumber={user?.avatar} size={100} />
        <Text type="title-big" style={styles.text}>
          {user?.name}
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', marginTop: 15}}>
        <ThemeBox theme={user?.theme ? user?.theme : 'BLUE_GREEN'} />
      </View>
      <View style={styles.row}>
        <RoundedButton
          text="Alterar Nome"
          inverted
          style={styles.button}
          onPress={() => onChagePress(1)}
        />
        <View style={styles.betweenButtonsSpace} />
        <RoundedButton
          text="Alterar Avatar"
          inverted
          style={styles.button}
          onPress={() => onChagePress(2)}
        />
      </View>
      <RoundedButton
        text="Alterar Tema"
        inverted
        style={styles.alterateThemeButton}
        onPress={() => onChagePress(0)}
      />
      <RoundedButton
        text="Finalizar Cadastro"
        style={styles.finalizeRegisterBtn}
        onPress={async () => {
          const payloadAction = await dispatch(
            updateUser({
              name: user?.name,
              avatar: user?.avatar,
              theme: user?.theme,
            }),
          );

          if (payloadAction.payload) {
            dispatch(setIsLogged(true));
          }
        }}
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
