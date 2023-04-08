import styled from 'styled-components/native';
import Button from '../../buttons/Button';
import Text from '../../Text';

export const ContainerButton = styled(Button)`
  height: 60px;
  background-color: #fff;
  margin: 5px;
  flex-direction: row;
  align-items: center;
`;

interface IconContainerProps {
  backgroundColor: string;
}

export const IconContainer = styled.View<IconContainerProps>`
  width: 50px;
  height: 100%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.backgroundColor};
`;

interface BodyProps {
  borderColor: string;
}

export const Body = styled.View<BodyProps>`
  border-width: 1px;
  flex: 1;
  height: 59.5px;
  border-color: ${props => props.borderColor};
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  padding: 0 10px;
  align-items: center;
  flex-direction: row;
`;

export const BodyBottom = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
`;

interface Separator {
  color: string;
}

export const Separator = styled.View<Separator>`
  background-color: ${props => props.color};
  width: 1px;
  height: 80%;
  margin: 0 8px;
`;

export const DateAndMonthText = styled(Text)`
  width: 36px;
  margin-right: 5px;
  text-align: center;
`;

export const TaskStatusContainer = styled.View`
  width: 76px;
  height: 18px;
  margin-top: 2px;
  background-color: #00ff80;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
