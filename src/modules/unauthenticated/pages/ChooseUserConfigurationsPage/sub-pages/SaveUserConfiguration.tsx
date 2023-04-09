import React from 'react';
import {View, StyleSheet} from 'react-native';
import useGetUser from '@/modules/shared/hooks/data/useGetUser';
import useSetUserLogged from '@/modules/shared/hooks/data/useSetUserLogged';

import {
  Avatar,
  Text,
  RoundedButton,
  ThemeBox,
} from '@/modules/shared/components';
import {useTranslation} from '@/modules/shared/hooks';
import {dbCreateUser} from '@/database';
import {handleErrorMessage} from '@/modules/shared/utils/errorHandler';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {useUserPreppingSelector} from '../store';

interface Props {
  onChangePress(index: number): void;
}

const SaveUserConfiguration: React.FC<Props> = ({onChangePress}) => {
  const user = useUserPreppingSelector(_user => _user);
  const setUserLogged = useSetUserLogged();

  const {translation} = useTranslation();

  const handleFinishRegistrationPress = async () => {
    try {
      await dbCreateUser({
        avatar: user?.avatar!,
        name: user?.name!,
        theme: user?.theme!,
      });
      setUserLogged(true);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

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
          text={translation('CHANGE_NAME')}
          inverted
          style={styles.button}
          onPress={() => onChangePress(1)}
        />
        <View style={styles.betweenButtonsSpace} />
        <RoundedButton
          text={translation('CHANGE_AVATAR')}
          inverted
          style={styles.button}
          onPress={() => onChangePress(2)}
        />
      </View>
      <RoundedButton
        text={translation('CHANGE_THEME')}
        inverted
        style={styles.alterateThemeButton}
        onPress={() => onChangePress(0)}
      />
      <RoundedButton
        testID={TEST_IDS.SAVE_USER_CONFIGURATIONS_BUTTON}
        text={translation('FINISH_REGISTRATION')}
        style={styles.finalizeRegisterBtn}
        onPress={handleFinishRegistrationPress}
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
