import React from 'react';
import {ViewStyle, TextStyle} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import {selectAppTheme} from '../../store/configs';
import {Text} from '@shared/components';

interface Props {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onBackPress?: () => void;
}
interface ContainerProps {
  backgroundColor: string;
}
const Container = styled.View<ContainerProps>`
  background-color: ${(props) => props.backgroundColor};
  elevation: 3;
  padding: 20px 20px 15px 35px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin: 0 5px 0 5px;
  flex-direction: row;
`;

const Header: React.FC<Props> = ({title, style, textStyle, onBackPress}) => {
  const appTheme = useSelector(selectAppTheme);
  return (
    <Container backgroundColor={appTheme.aboveBackground} style={style}>
      <MaterialIcon
        name="arrow-back"
        size={30}
        color={appTheme.textColor}
        style={{marginRight: 10}}
        onPress={onBackPress}
      />
      <Text type="title-big" style={textStyle}>
        {title}
      </Text>
    </Container>
  );
};

export default Header;
