import React from 'react';
import {useSelector} from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import {selectAppTheme} from '@store/configs';
import Button from './Button';

interface Props {
  onPress(): void;
}

const FloatingActionButton: React.FC<Props> = ({onPress}) => {
  const {secondaryColor, background} = useSelector(selectAppTheme);

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
