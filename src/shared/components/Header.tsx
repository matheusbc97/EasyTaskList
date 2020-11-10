import React from 'react';
import {View, ViewStyle, TextStyle} from 'react-native';
import {useSelector} from 'react-redux';

import {selectAppTheme} from '../../store/configs';
import {Text} from '@shared/components';

interface Props {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Header: React.FC<Props> = ({title, style, textStyle, children}) => {
  const appTheme = useSelector(selectAppTheme);
  return (
    <View
      style={[
        {
          backgroundColor: appTheme.aboveBackground,
          elevation: 3,
          paddingVertical: 13,
          paddingHorizontal: 20,
          marginHorizontal: 5,
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
          flexDirection: 'row',
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
