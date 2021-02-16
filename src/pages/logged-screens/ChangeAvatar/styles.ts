import styled from 'styled-components/native';

export const Content = styled.View`
  width: 85%;
  border-radius: 15px;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.5;
  shadow-radius: 1.5;
  overflow: hidden;
  height: 320px;
  background-color: #fff;
`;

export const Header = styled.View`
  align-items: center;
  padding: 15px 0;
`;

export const AvatarListContainer = styled.View`
  padding: 5px 10px 0 10px;
`;
