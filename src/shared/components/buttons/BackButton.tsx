import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {useTranslation} from '@/shared/hooks';
import {selectAppTheme} from '@store/configs';
import Button from './Button';
import Text from '../Text';

interface Props {
  onPress?: (() => void) | undefined;
  showLabel?: boolean;
}

const BackButton: React.FC<Props> = ({onPress, showLabel = true}) => {
  const navigation = useNavigation();
  const appTheme = useSelector(selectAppTheme);
  const {translation} = useTranslation();

  if (showLabel) {
    return (
      <Button style={styles.container} onPress={onPress ?? navigation.goBack}>
        <View style={styles.content}>
          <MaterialIcon
            name="arrow-back"
            size={24}
            color={appTheme.primaryColor}
          />
          {showLabel && (
            <Text type="title" primaryColor style={styles.text}>
              {translation('GO_BACK').toUpperCase()}
            </Text>
          )}
        </View>
      </Button>
    );
  }

  return (
    <Button
      onPress={onPress ?? navigation.goBack}
      style={{alignSelf: 'flex-start'}}>
      <MaterialIcon name="arrow-back" size={24} color={appTheme.primaryColor} />
    </Button>
  );
};

export default BackButton;

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
