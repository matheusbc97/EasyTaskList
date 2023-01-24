import React from 'react';
import {ViewStyle, TextStyle, View} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {shadowStyledComponents} from '@/shared/styles';
import {selectAppTheme} from '@/store/configs';

import BackButton from './buttons/BackButton';
import Text from './Text';

interface Props {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onBackPress?: () => void;
  type?: 'secondary' | 'default';
}

interface ContainerProps {
  backgroundColor: string;
}

const Container = styled.View<ContainerProps>`
  background-color: ${props => props.backgroundColor};
  elevation: 3;
  padding: 20px 20px 15px 35px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin: 0 5px 0 5px;
  flex-direction: row;
  ${shadowStyledComponents};
`;

const Header: React.FC<Props> = ({
  title,
  style,
  textStyle,
  onBackPress,
  type,
}) => {
  const appTheme = useSelector(selectAppTheme);

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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 5,
          paddingBottom: 10,
          paddingHorizontal: 5,
          ...style,
        }}>
        <View style={{flex: 1}}>
          <BackButton showLabel={false} />
        </View>
        <Text type="title-big" primaryColor>
          {title}
        </Text>
        <View style={{flex: 1}} />
      </View>
    );
  }

  return (
    <Container backgroundColor={appTheme.aboveBackground} style={style}>
      <MaterialIcon
        name="arrow-back"
        size={30}
        color={appTheme.textColor}
        style={{marginRight: 10}}
        onPress={handleBackPress}
      />
      <Text type="title-big" style={textStyle}>
        {title}
      </Text>
    </Container>
  );
};

export default Header;
