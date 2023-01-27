import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {HeaderProps} from './types/HeaderProps';
import PrimaryHeader from './components/PrimaryHeader';
import SecondaryHeader from './components/SecondaryHeader';

const Header: React.FC<HeaderProps> = ({
  title,
  style,
  textStyle,
  onBackPress,
  type,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    navigation.goBack();
  };

  if (type === 'secondary') {
    return (
      <SecondaryHeader
        title={title}
        onBackPress={handleBackPress}
        style={style}
        textStyle={textStyle}
      />
    );
  }

  return (
    <PrimaryHeader
      title={title}
      onBackPress={handleBackPress}
      style={style}
      textStyle={textStyle}
    />
  );
};

export default Header;
