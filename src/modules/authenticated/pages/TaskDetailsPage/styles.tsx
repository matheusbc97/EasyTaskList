import styled from 'styled-components/native';
import {Button} from '@/modules/shared/components';

export const CategoryContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
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
  justify-content: flex-end;
  margin: 5px 0;
`;

export const Footer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;
