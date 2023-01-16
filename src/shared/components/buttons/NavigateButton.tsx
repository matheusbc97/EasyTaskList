import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {Text} from '@shared/components';
import useAppTheme from '@/shared/hooks/useAppTheme';
import Button from './Button';

type IconType = 'FontAwesome' | 'FontAwesome5';

interface NavigateButtonProps {
  title: string;
  iconName: string;
  type?: IconType;
  onPress?(): void;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({
  title,
  iconName,
  type = 'FontAwesome',
  onPress,
}) => {
  const appTheme = useAppTheme();

  return (
    <Button
      onPress={onPress}
      style={{
        paddingVertical: 5,
        backgroundColor: appTheme.aboveBackground,
        elevation: 3,
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      }}>
      {type === 'FontAwesome' ? (
        <FontAwesomeIcon
          color={appTheme.textColor}
          name={iconName}
          size={18}
          style={{paddingHorizontal: 5}}
        />
      ) : (
        <FontAwesomeIcon5
          color={appTheme.textColor}
          name={iconName}
          size={18}
          style={{paddingHorizontal: 5}}
        />
      )}
      <Text
        testID="NavigateButton-title"
        style={{marginHorizontal: 10, flex: 1}}>
        {title}
      </Text>
      <MaterialIcon name="keyboard-arrow-right" size={30} />
    </Button>
  );
};

export default NavigateButton;
