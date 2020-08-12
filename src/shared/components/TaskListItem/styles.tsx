import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const ContainerButton = styled(RectButton)`
  height: 50px;
  background-color: #fff;
  margin: 5px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

interface IconContainerProps {
  backgroundColor: string;
}

export const IconContainer = styled.View<IconContainerProps>`
  width: 50px;
  height: 100%;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.backgroundColor};
`;

interface BodyProps {
  borderColor: string;
}

export const Body = styled.View<BodyProps>`
  border-width: 1px;
  flex: 1;
  height: 49.5px;
  border-color: ${(props) => props.borderColor};
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  padding: 0 10px;
  justify-content: center;
`;
