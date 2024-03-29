import styled from 'styled-components/native';
import {shadowStyledComponents} from '@/modules/shared/styles';

interface HeaderProps {
  backgroundColor: string;
}

export const Header = styled.View<HeaderProps>`
  background-color: ${props => props.backgroundColor};
  padding: 20px 20px 15px 35px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin: 0 5px 0 5px;
  ${shadowStyledComponents}
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  margin: 5px 6px 5px 6px;
`;

interface BodyProps {
  backgroundColor: string;
}

export const Body = styled.View<BodyProps>`
  background-color: ${props => props.backgroundColor};
  margin: 10px;
  padding: 10px 5px 10px 5px;
  border-radius: 10px;
  flex: 1;
  ${shadowStyledComponents}
`;

export const Footer = styled.View`
  padding: 5px 20px 5px 20px;
`;

interface VerticalSeparatorProps {
  color: string;
}

export const VerticalSeparator = styled.View<VerticalSeparatorProps>`
  width: 2px;
  height: 100%;
  background-color: ${props => props.color};
  margin: 0 5px;
`;
