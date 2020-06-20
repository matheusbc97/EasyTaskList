import React from 'react';
import {View, ViewStyle, TextStyle} from 'react-native';
import {useSelector} from 'react-redux';

import {selectAppTheme} from '../../store/configs';
import {Text} from '../../library/components';

interface Props {
  title: string;
  style: ViewStyle;
  textStyle: TextStyle;
}

const Header: React.FC<Props> = ({title, style, textStyle}) => {
  const appTheme = useSelector(selectAppTheme);
  return (
    <View
      style={[
        {
          backgroundColor: appTheme.aboveBackground,
          elevation: 3,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginHorizontal: 5,
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
        },
        style,
      ]}>
      <Text type="title-big" style={textStyle}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
