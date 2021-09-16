import React from 'react';
import {useSelector} from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import {selectAppTheme} from '@store/configs';
import {RectButton} from 'react-native-gesture-handler';

interface Props {
  onPress(): void;
}

const FloatingActionButton: React.FC<Props> = ({onPress}) => {
  const {secondaryColor, background} = useSelector(selectAppTheme);

  return (
    <RectButton
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
    </RectButton>
  );
};

export default FloatingActionButton;
