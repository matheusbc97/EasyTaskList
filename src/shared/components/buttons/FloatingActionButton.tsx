import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import useAppTheme from '@/shared/hooks/useAppTheme';
import Button from './Button';

interface Props {
  onPress(): void;
}

const FloatingActionButton: React.FC<Props> = ({onPress}) => {
  const {secondaryColor, background} = useAppTheme();

  return (
    <Button
      onPress={onPress}
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: secondaryColor,
        position: 'absolute',
        bottom: 10,
        right: 20,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FontAwesomeIcon name="plus" size={25} color={background} />
    </Button>
  );
};

export default FloatingActionButton;
