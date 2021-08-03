import React from 'react';
import {View, StyleSheet} from 'react-native';
import useGetUser from '@hooks/useGetUser';
import useUpdateUser from '@hooks/useUpdateUser';
import useSetUserLogged from '@hooks/useSetUserLogged';

import {Avatar, Text, RoundedButton} from '@shared/components';

import ThemeBox from './ThemeBox';

interface Props {
  onChangePress(index: number): void;
}

const SaveUserConfiguration: React.FC<Props> = ({onChangePress}) => {
  const user = useGetUser();
  const updateUser = useUpdateUser();
  const setUserLogged = useSetUserLogged();

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
          onPress={() => onChangePress(1)}
        />
        <View style={styles.betweenButtonsSpace} />
        <RoundedButton
          text="Alterar Avatar"
          inverted
          style={styles.button}
          onPress={() => onChangePress(2)}
        />
      </View>
      <RoundedButton
        text="Alterar Tema"
        inverted
        style={styles.alterateThemeButton}
        onPress={() => onChangePress(0)}
      />
      <RoundedButton
        text="Finalizar Cadastro"
        style={styles.finalizeRegisterBtn}
        onPress={async () => {
          try {
            await updateUser({
              name: user?.name,
              avatar: user?.avatar,
              theme: user?.theme,
            });

            setUserLogged(true);
          } catch (error) {}
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
