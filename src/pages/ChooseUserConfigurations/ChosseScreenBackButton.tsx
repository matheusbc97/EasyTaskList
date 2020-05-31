import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import {Text} from '../../library/components';
import {selectAppTheme} from '../../store/configs';

interface Props {
  onPress(): void;
}

const ChosseScreenBackButton: React.FC<Props> = ({onPress}) => {
  const appTheme = useSelector(selectAppTheme);
  return (
    <TouchableRipple style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <MaterialIcon
          name="arrow-back"
          size={24}
          color={appTheme.primaryColor}
        />
        <Text type="title" primaryColor style={styles.text}>
          VOLTAR
        </Text>
      </View>
    </TouchableRipple>
  );
};

export default ChosseScreenBackButton;

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
