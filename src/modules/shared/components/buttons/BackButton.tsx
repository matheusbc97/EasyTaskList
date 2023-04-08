import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import {useTranslation, useAppTheme} from '@/modules/shared/hooks';

import Button from './Button';
import Text from '../Text';

interface Props {
  onPress?: (() => void) | undefined;
  showLabel?: boolean;
}

const BackButton: React.FC<Props> = ({onPress, showLabel = true}) => {
  const navigation = useNavigation();
  const appTheme = useAppTheme();
  const {translation} = useTranslation();

  return (
    <Button
      style={showLabel ? styles.container : {}}
      onPress={onPress ?? navigation.goBack}>
      <View style={styles.content}>
        <MaterialIcon
          name="arrow-back"
          size={24}
          color={appTheme.primaryColor}
        />
        {showLabel && (
          <Text
            testID="back-button-label"
            type="title"
            primaryColor
            style={styles.text}>
            {translation('GO_BACK').toUpperCase()}
          </Text>
        )}
      </View>
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
