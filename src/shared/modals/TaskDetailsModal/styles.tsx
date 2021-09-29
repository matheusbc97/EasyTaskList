import styled from 'styled-components/native';
import {Button} from '@/shared/components';

export const Container = styled.View`
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
`;

export const CategoryContainer = styled.View`
  flex-direction: row;
  padding: 10px 0;
`;

interface IconContainerProps {
  backgroundColor: string;
}

export const IconContainer = styled.View<IconContainerProps>`
  width: 45px;
  height: 45px;
  border-radius: 3px;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.backgroundColor};
`;

export const DoneCheckButton = styled(Button)`
  flex-direction: row;
  align-items: center;
  margin: 5px -10px;
`;

export const Footer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;
