import styled from 'styled-components/native';
import {RoundedButton, Text} from '@shared/components';
import {RectButton} from 'react-native-gesture-handler';

export const Header = styled.View`
  padding: 0 10px 10px 10px;
  flex-direction: row;
  align-items: center;
`;

export const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
`;

interface TitleProps {
  color: string;
}

export const Title = styled(Text)<TitleProps>`
  color: ${props => props.color};
  margin-left: -38px;
`;

export const ColorAndIconContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const SelectColorOrIconButton = styled(RectButton)`
  align-items: center;
  padding-bottom: 10px;
  margin: 0 15px;
`;

export const SelectIconContainer = styled.View`
  width: 60px;
  height: 60px;
  border-width: 2px;
  border-color: #e0e0e0;
  border-radius: 5px;
  margin: 0 15px;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 10px;
`;

export const BackButton = styled(RoundedButton)`
  align-self: center;
  width: 100px;
`;

export const SaveButton = styled(RoundedButton)`
  align-self: center;
  margin-left: 5px;
  width: 150px;
`;
