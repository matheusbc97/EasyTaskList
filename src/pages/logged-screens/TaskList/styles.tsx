import styled from 'styled-components/native';

interface HeaderProps {
  backgroundColor: string;
}

export const Header = styled.View<HeaderProps>`
  background-color: ${(props) => props.backgroundColor};
  elevation: 3;
  padding: 20px 20px 15px 35px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin: 0 5px 0 5px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  margin: 5px 6px 5px 6px;
`;

interface BodyProps {
  backgroundColor: string;
}

export const Body = styled.View<BodyProps>`
  background-color: ${(props) => props.backgroundColor};
  elevation: 2;
  margin: 10px;
  padding: 0 5px 0 5px;
  border-radius: 10px;
  flex: 1;
`;

export const FooterSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #e0e0e0;
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
  background-color: ${(props) => props.color};
  margin: 0 5px;
`;
