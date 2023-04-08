import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

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
