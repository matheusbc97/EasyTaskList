import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TEST_IDS} from '../constants/testIds';

interface Props {
  onTryAgainPress?: (() => void) | undefined | null;
}

const ErrorMessage = ({onTryAgainPress}: Props) => {
  return (
    <View style={styles.container} testID={TEST_IDS.ERROR_MESSAGE}>
      <Icon name={'frown'} style={styles.icon} />
      <Button
        onPress={onTryAgainPress ?? (() => {})}
        title={'Tentar novamente'}
        color={'red'}
      />
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  icon: {
    padding: 15,
    fontSize: 70,
    color: '#666',
  },
});
