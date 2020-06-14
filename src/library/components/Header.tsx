import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

import {selectAppTheme} from '../../store/configs';
import {Text} from '../../library/components';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({title}) => {
  const appTheme = useSelector(selectAppTheme);
  return (
    <View
      style={{
        backgroundColor: appTheme.aboveBackground,
        elevation: 3,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
      }}>
      <Text type="title-big">{title}</Text>
    </View>
  );
};

export default Header;
