import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {useTranslation} from '@/shared/hooks';
import {Text} from '@shared/components';
import {selectAppTheme} from '@store/configs';

interface Props {
  onPress?: (() => void) | undefined;
}

const ChooseScreenBackButton: React.FC<Props> = ({onPress}) => {
  const navigation = useNavigation();
  const appTheme = useSelector(selectAppTheme);
  const {translation} = useTranslation();

  return (
    <TouchableRipple
      style={styles.container}
      onPress={onPress ?? navigation.goBack}>
      <View style={styles.content}>
        <MaterialIcon
          name="arrow-back"
          size={24}
          color={appTheme.primaryColor}
        />
        <Text type="title" primaryColor style={styles.text}>
          {translation('GO_BACK').toUpperCase()}
        </Text>
      </View>
    </TouchableRipple>
  );
};

export default ChooseScreenBackButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {marginLeft: 5},
});
